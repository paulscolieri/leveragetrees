export default function TermsPage() {
  const BUSINESS_LEGAL_NAME = process.env.BUSINESS_LEGAL_NAME || process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME || 'Business';
  const BUSINESS_NAME = process.env.BUSINESS_NAME || process.env.NEXT_PUBLIC_BUSINESS_NAME || BUSINESS_LEGAL_NAME;
  const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com';

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p className="text-sm text-gray-700">Last updated: {new Date().toISOString().slice(0,10)}</p>
      <p>
        These Terms govern your use of the estimate request and scheduling services provided by {BUSINESS_LEGAL_NAME} (doing business as {BUSINESS_NAME}).
      </p>
      <p>
        By submitting the form on this site, you agree that the information you provide is accurate and that {BUSINESS_NAME} may contact you regarding your request.
      </p>
      <h2 className="text-lg font-semibold">Messaging</h2>
      <p>
        With your express consent, we may send SMS messages regarding estimates, scheduling, and service updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance.
      </p>
      <h2 className="text-lg font-semibold">Contact</h2>
      <p>
        For questions, contact us at <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </main>
  );
}
