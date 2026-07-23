import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Avora Ventures',
  description: 'How Avora Ventures collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-36 pb-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors mb-10"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to home
        </Link>

        <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--foreground)] mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--foreground-muted)] mb-12">
          Last updated:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <div className="space-y-8 text-[var(--foreground)]">
          <section>
            <h2 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-3">
              1. Information we collect
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              When you submit the contact form on our website, we collect your name, email
              address, company name (optional), selected service type, industry, and your
              message. This information is used solely to respond to your inquiry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-3">
              2. How we use your information
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              We use your contact form submissions only to respond to your inquiry and discuss
              potential engagements. We do not sell, rent, or share your personal information
              with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-3">
              3. Data storage
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              Form submissions are stored securely, accessible only to the Avora Ventures team.
              We retain this data for up to 24 months or until you request deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-3">
              4. Cookies
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              We use essential cookies only — specifically those required for theme preferences
              and session management. We do not use tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-3">
              5. Your rights
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              You have the right to request access to, correction of, or deletion of your
              personal data. To exercise these rights, contact us at{' '}
              <a
                href="mailto:contact@avora.ventures"
                className="text-[var(--accent)] hover:underline"
              >
                contact@avora.ventures
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-3">
              6. Analytics
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              We use Vercel Analytics to collect anonymous, aggregate usage statistics. No
              personally identifiable information is collected through analytics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-[var(--foreground)] mb-3">
              7. Contact
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed">
              For privacy inquiries, email{' '}
              <a
                href="mailto:contact@avora.ventures"
                className="text-[var(--accent)] hover:underline"
              >
                contact@avora.ventures
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
