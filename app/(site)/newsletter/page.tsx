import NewsletterForm from '../../../components/NewsletterForm'
import Link from 'next/link'
import { Check } from 'lucide-react'

const perks = [
  'Fresh business ideas you can start this week',
  'Grants, fellowships and competitions open for applications',
  'Breakdowns of how successful African startups were built',
  'Side hustle guides and digital income strategies',
  'Founder spotlights from across the continent',
]

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <div className="bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-blue-500" />
            <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest">
              Weekly newsletter
            </span>
            <div className="w-6 h-0.5 bg-blue-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Do not miss what is building in Africa.
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Every week we send you the best business ideas, open opportunities, and founder stories from across Africa. Free forever.
          </p>
        </div>
      </div>

      {/* Form + perks */}
      <div className="max-w-xl mx-auto px-6 py-14">

        {/* Signup card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Join thousands of African founders
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your email below and get your first issue this week.
          </p>
          <NewsletterForm variant="light" />
          <p className="text-xs text-gray-400 mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>

        {/* What you get */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">
            What you get every week
          </h3>
          <ul className="flex flex-col gap-4">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-blue-600" />
                </div>
                <span className="text-sm text-gray-600 leading-relaxed">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Back link */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Changed your mind?{' '}
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            Go back home
          </Link>
        </p>
      </div>
    </div>
  )
}