export default function PrivacyPage() {
  const BUSINESS_LEGAL_NAME = process.env.BUSINESS_LEGAL_NAME || process.env.NEXT_PUBLIC_BUSINESS_LEGAL_NAME || 'Business';
  const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com';

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="text-sm text-gray-700">Last updated: {new Date().toISOString().slice(0,10)}</p>
      <p>
        {BUSINESS_LEGAL_NAME} collects the information you submit (such as name, address, email, and phone number) to provide estimates, schedule services, and communicate about your request.
      </p>
      <h2 className="text-lg font-semibold">SMS Consent</h2>
      <p>
        If you opt in, we will send SMS messages related to estimates, scheduling, and service updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.
      </p>
      <h2 className="text-lg font-semibold">Data Sharing</h2>
      <p>
        We do not sell your personal information. We may share data with service providers (e.g., messaging and scheduling platforms) solely to fulfill your request.
      </p>
      <h2 className="text-lg font-semibold">Contact</h2>
      <p>
        For privacy requests, contact <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    </main>
  );
}

