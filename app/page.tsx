'use client';
import { useState } from 'react';

const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Home Services';
const OPT_IN_PURPOSE = process.env.NEXT_PUBLIC_OPT_IN_PURPOSE || 'estimates, scheduling, and service updates';
const SMS_MESSAGE_FREQUENCY = process.env.NEXT_PUBLIC_SMS_MESSAGE_FREQUENCY || 'Message frequency varies';
const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com';
const CONSENT_VERSION = process.env.NEXT_PUBLIC_CONSENT_VERSION || '2025-11-03';
const BUSINESS_LOCATION = process.env.NEXT_PUBLIC_BUSINESS_LOCATION || 'Austin, TX';
const BUSINESS_PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+15125550134';
const BUSINESS_PHONE_DISPLAY = process.env.NEXT_PUBLIC_BUSINESS_PHONE_DISPLAY || BUSINESS_PHONE;
const BUSINESS_LICENSE = process.env.NEXT_PUBLIC_BUSINESS_LICENSE || 'ISA Certified Arborists • Fully Insured';
const RESPONSE_TIME = process.env.NEXT_PUBLIC_RESPONSE_TIME || 'We confirm appointments in under 15 minutes on weekdays.';
const BUSINESS_TAGLINE = process.env.NEXT_PUBLIC_BUSINESS_TAGLINE || 'Tree trimming & canopy management';
const SERVICE_AREAS = ['West Lake Hills', 'Cedar Park', 'Round Rock', 'Dripping Springs'];
const SERVICE_TYPES = [
  'Tree trimming & canopy shaping',
  'Storm damage cleanup',
  'Tree removal & stump grinding',
  'Seasonal health inspection',
];
const CONSENT_TEXT = `By checking this box, I agree to receive SMS from ${BUSINESS_NAME} (${BUSINESS_PHONE_DISPLAY}) at the number provided regarding ${OPT_IN_PURPOSE}. ${SMS_MESSAGE_FREQUENCY}. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Terms and Privacy.`;

export default function Home() {
  const [msg, setMsg] = useState<string | null>(null);

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  const consentText = CONSENT_TEXT;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // Coerce checkbox to boolean
    const sms_opt_in = fd.get('sms_opt_in') ? true : false;
    fd.set('sms_opt_in', String(sms_opt_in));
    fd.set('consent_text', consentText);
    fd.set('consent_version', CONSENT_VERSION);
    fd.set('page_url', pageUrl);

    const data = Object.fromEntries(fd.entries());

    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    setMsg(json.ok ? 'Thanks! We will text you to schedule shortly.' : 'Error sending.');
  }

  return (
    <main className="bg-stone-50 min-h-dvh">
      <header className="max-w-6xl mx-auto flex flex-col gap-4 px-6 pt-10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <BrandMark />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-700">{BUSINESS_NAME}</p>
            <p className="text-sm text-gray-600">{BUSINESS_TAGLINE}</p>
          </div>
        </div>
        <a
          href={`tel:${BUSINESS_PHONE}`}
          className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-5 py-2 text-sm font-semibold text-emerald-700 shadow-sm hover:border-emerald-400"
        >
          Call {BUSINESS_PHONE_DISPLAY}
        </a>
      </header>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.3em] text-emerald-700 uppercase">{BUSINESS_LOCATION} tree care</p>
              <h1 className="text-4xl font-bold text-gray-900">
                {BUSINESS_NAME}: reliable arborists who confirm your tree service in minutes
              </h1>
              <p className="text-lg text-gray-700">
                Upload your details once and let our SMS concierge coordinate the onsite visit. Our crew trims,
                cleans up, and keeps you updated the entire time.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Highlight title="Fast scheduling" body={RESPONSE_TIME} />
              <Highlight title="Fully insured" body={BUSINESS_LICENSE} />
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold">What to expect</h2>
              <ol className="space-y-3 text-sm text-gray-700">
                <li>1. Submit the estimate form with the property details below.</li>
                <li>2. Our dispatcher texts you within minutes to lock in a window.</li>
                <li>3. You receive SMS reminders, crew ETA, and completion photos automatically.</li>
              </ol>
              <p className="text-sm text-gray-600">
                You can manage or reschedule by replying to any message sent from {BUSINESS_PHONE_DISPLAY}. STOP to opt out instantly.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Popular services</h3>
              <ul className="divide-y rounded-2xl border bg-white">
                {SERVICE_TYPES.map((service) => (
                  <li key={service} className="p-4 text-sm text-gray-800 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Service area</h3>
              <p className="text-sm text-gray-600">We dispatch daily crews across:</p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.map((area) => (
                  <span key={area} className="text-xs font-medium uppercase tracking-wide bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-700">
              Prefer to call? Reach our scheduler at <a href={`tel:${BUSINESS_PHONE}`} className="font-semibold text-emerald-700">{BUSINESS_PHONE_DISPLAY}</a>.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border bg-white p-8 shadow-xl">
            <div className="space-y-2 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Step 1</p>
              <h2 className="text-2xl font-semibold">Request your visit</h2>
              <p className="text-sm text-gray-600">
                We’ll text you right away with a confirmation and keep every update in one SMS thread.
              </p>
            </div>

            <div className="grid gap-4">
              <Field label="Full Name">
                <input name="full_name" required className="w-full rounded-xl border border-gray-200 p-3 focus:border-emerald-600 focus:outline-none" />
              </Field>
              <Field label="Email">
                <input type="email" name="email" required className="w-full rounded-xl border border-gray-200 p-3 focus:border-emerald-600 focus:outline-none" />
              </Field>
              <Field label="Mobile Phone">
                <input name="phone" required className="w-full rounded-xl border border-gray-200 p-3 focus:border-emerald-600 focus:outline-none" />
              </Field>
              <Field label="Street Address">
                <input name="street" required className="w-full rounded-xl border border-gray-200 p-3 focus:border-emerald-600 focus:outline-none" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City">
                  <input name="city" required className="w-full rounded-xl border border-gray-200 p-3 focus:border-emerald-600 focus:outline-none" />
                </Field>
                <Field label="ZIP Code">
                  <input name="zip" required className="w-full rounded-xl border border-gray-200 p-3 focus:border-emerald-600 focus:outline-none" />
                </Field>
              </div>
              <Field label="Service Needed">
                <select name="service_type" className="w-full rounded-xl border border-gray-200 p-3 focus:border-emerald-600 focus:outline-none">
                  <option value="">Select a service</option>
                  {SERVICE_TYPES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred date (optional)">
                <input type="date" name="preferred_date" className="w-full rounded-xl border border-gray-200 p-3 focus:border-emerald-600 focus:outline-none" />
              </Field>
              <Field label="Notes for the arborist">
                <textarea name="notes" rows={3} className="w-full rounded-xl border border-gray-200 p-3 focus:border-emerald-600 focus:outline-none" placeholder="Gate code, pets on site, photos link, etc." />
              </Field>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-stone-50 p-4 text-sm">
              <input type="checkbox" required name="sms_opt_in" id="sms_opt_in" className="mt-1 h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600" />
              <label htmlFor="sms_opt_in" className="text-gray-700">
                {consentText} <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy</a>. For help, contact {SUPPORT_EMAIL}.
              </label>
            </div>

            {/* Hidden consent evidence fields */}
            <input type="hidden" name="consent_version" value={CONSENT_VERSION} />
            <input type="hidden" name="page_url" value={pageUrl} />
            <input type="hidden" name="consent_text" value={consentText} />

            <button className="w-full rounded-2xl bg-emerald-600 py-3 text-white font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
              Send my request
            </button>

            {msg && <p className="text-center text-sm text-gray-700">{msg}</p>}
            <p className="text-center text-xs text-gray-500">
              We’ll text you from our toll-free line {BUSINESS_PHONE_DISPLAY} for every scheduling update.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

function Highlight({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-emerald-700">{title}</p>
      <p className="mt-2 text-sm text-gray-700">{body}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2 text-sm text-gray-700">
      <span className="font-medium text-gray-900">{label}</span>
      {children}
    </label>
  );
}

function BrandMark() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
      <span className="text-lg font-semibold tracking-tight">LT</span>
    </div>
  );
}
