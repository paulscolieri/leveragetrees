import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const headers = req.headers;
    const ipHeader = headers.get('x-forwarded-for') || headers.get('x-real-ip') || '';
    const ip = Array.isArray(ipHeader) ? ipHeader[0] : String(ipHeader).split(',')[0]?.trim();
    const user_agent = headers.get('user-agent') || '';
    const referrer = headers.get('referer') || '';

    const lead = {
      full_name: body.full_name || '',
      email: body.email || '',
      phone: body.phone || '',
      street: body.street || '',
      city: body.city || '',
      zip: body.zip || '',
      service_type: body.service_type || '',
      preferred_date: body.preferred_date || null,
      notes: body.notes || '',
      status: 'new',
    };

    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert(lead)
      .select()
      .single();

    if (error) {
      console.error('DB_INSERT_ERROR:', error);
      return NextResponse.json({ ok: false, error: 'db_insert_failed' }, { status: 500 });
    }

    // Prepare consent evidence
    const consent = {
      sms_opt_in: parseBool(body.sms_opt_in),
      consent_text_client: body.consent_text || '',
      consent_text_server: buildConsentText(),
      consent_version: body.consent_version || process.env.CONSENT_VERSION || '',
      consent_timestamp: new Date().toISOString(),
      ip,
      user_agent,
      page_url: body.page_url || referrer || '',
      referrer,
    };

    // Optionally store consent in a separate table if configured
    const consentTable = process.env.SUPABASE_CONSENT_TABLE; // e.g., 'lead_consents'
    if (consentTable) {
      supabaseAdmin
        .from(consentTable)
        .insert({ lead_id: data.id, ...consent })
        .then(({ error }) => {
          if (error) console.warn('CONSENT_INSERT_WARNING:', error.message);
        })
        .catch((e) => console.warn('CONSENT_INSERT_ERROR', e));
    }

    // Fire Make webhook (non-blocking)
    const payload = { lead: data, consent };
    if (process.env.MAKE_LEAD_WEBHOOK_URL) {
      fetch(process.env.MAKE_LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((e) => console.warn('MAKE_POST_ERROR', e));
    } else {
      console.warn('MAKE_LEAD_WEBHOOK_URL not set');
    }

    console.log('LEAD_SAVED:', data.id);
    return NextResponse.json({ ok: true, lead_id: data.id });
  } catch (e) {
    console.error('ROUTE_ERROR:', e);
    return NextResponse.json({ ok: false, error: 'invalid_request' }, { status: 400 });
  }
}

function parseBool(v: any): boolean {
  if (typeof v === 'boolean') return v;
  const s = String(v || '').toLowerCase();
  return s === 'true' || s === '1' || s === 'on' || s === 'yes';
}

function buildConsentText(): string {
  const name = process.env.BUSINESS_NAME || process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Home Services';
  const purpose = process.env.OPT_IN_PURPOSE || process.env.NEXT_PUBLIC_OPT_IN_PURPOSE || 'estimates, scheduling, and service updates';
  const freq = process.env.SMS_MESSAGE_FREQUENCY || process.env.NEXT_PUBLIC_SMS_MESSAGE_FREQUENCY || 'Message frequency varies';
  const phone = process.env.BUSINESS_PHONE_DISPLAY || process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || '';
  const phoneSegment = phone ? ` (${phone})` : '';
  return `By checking this box, I agree to receive SMS from ${name}${phoneSegment} at the number provided regarding ${purpose}. ${freq}. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Terms and Privacy.`;
}
