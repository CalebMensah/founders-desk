export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated: June 2026
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10">
          <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed">

            <h2>1. Information we collect</h2>
            <p>
              We collect information you provide directly to us, such as your email address when you subscribe to our newsletter or contact us through our contact form. We also collect your name and message content when you reach out to us.
            </p>

            <h2>2. How we use your information</h2>
            <p>
              We use the information we collect to send you our weekly newsletter, respond to your messages and inquiries, improve our content and platform, and communicate important updates about Founders Desk.
            </p>

            <h2>3. Newsletter and email communications</h2>
            <p>
              When you subscribe to our newsletter, we store your email address in our database. You can unsubscribe at any time by clicking the unsubscribe link in any of our emails. We do not sell your email address to third parties.
            </p>

            <h2>4. Cookies and analytics</h2>
            <p>
              We use privacy-friendly analytics to understand how visitors use our site. We do not use advertising tracking cookies or share your browsing data with advertisers. Our analytics are designed to respect your privacy.
            </p>

            <h2>5. Data storage and security</h2>
            <p>
              Your data is stored securely using industry-standard infrastructure. We use Supabase for database storage, which is hosted on secure cloud servers. We take reasonable measures to protect your personal information from unauthorized access.
            </p>

            <h2>6. Third party services</h2>
            <p>
              We may use third party services to help operate our platform, including email delivery services and analytics tools. These services have their own privacy policies and we encourage you to review them.
            </p>

            <h2>7. Your rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. To make a request, contact us at hello@foundersdesk.africa and we will respond within 48 hours.
            </p>

            <h2>8. Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify subscribers of significant changes via email. Continued use of Founders Desk after changes means you accept the updated policy.
            </p>

            <h2>9. Contact us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at hello@foundersdesk.africa or through our contact page.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}