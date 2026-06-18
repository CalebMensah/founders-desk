'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const values = [
  {
    title: 'Practical over theoretical',
    description:
      'We do not write about ideas that sound good in boardrooms. Everything we publish is actionable — things you can do today with what you have.',
  },
  {
    title: 'Africa first',
    description:
      'Our content is built around African markets, African realities, and African opportunities. Not repackaged Silicon Valley advice.',
  },
  {
    title: 'Accessible to everyone',
    description:
      'Whether you are a university student in Accra, a trader in Lagos, or a developer in Nairobi — Founders Desk is built for you.',
  },
  {
    title: 'Honest and direct',
    description:
      'We tell you what works and what does not. No hype, no fluff. Just real information that helps you make better decisions.',
  },
]

const stats = [
  { num: 'Africa', label: 'Our focus' },
  { num: 'Free', label: 'Always' },
  { num: '54', label: 'Countries covered' },
  { num: '100%', label: 'Independent' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <div className="bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 bg-blue-500" />
            <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest">
              About us
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Built for the next generation of African founders.
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Founders Desk is a content platform dedicated to helping young Africans start businesses, build side hustles, and understand how successful startups operate. We believe Africa&apos;s best builders just need the right information.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                {stat.num}
              </p>
              <p className="text-blue-200 text-xs font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Mission */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">
            Our mission
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <p className="text-gray-600 text-base leading-relaxed mb-5">
              Africa is home to the youngest population on earth. By 2050, one in four people in the world will be African. That generation deserves a platform that speaks directly to their ambitions, their challenges, and their opportunities.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-5">
              Most entrepreneurship content online is built for Western markets. Funding rounds in Silicon Valley. Growth tactics for US audiences. Products designed for people with credit cards and reliable internet.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Founders Desk exists to change that. We publish content that is rooted in African realities — practical guides, real founder stories, and curated opportunities that actually apply to someone building in Accra, Lagos, Nairobi, Kigali, or anywhere across the continent.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl border border-gray-100 p-6"
              >
                <div className="w-8 h-1 bg-blue-600 rounded-full mb-4" />
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-5">
            The story
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <p className="text-gray-600 text-base leading-relaxed mb-5">
              Founders Desk started with a simple frustration — the best business content online rarely spoke to the African experience. The challenges of starting a business without access to traditional funding, navigating informal markets, building with limited infrastructure, or finding the right opportunities in your country.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-5">
              We set out to build the platform we wished existed. A place where a student in Ghana could find a practical guide to starting their first business, discover a grant they qualify for, and read about how a founder just like them built something from nothing.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              That is Founders Desk. Ideas. Builders. Opportunities.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0A1628] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600 rounded-full opacity-10 translate-x-16 -translate-y-16" />
          <div className="relative z-10">
            <h3 className="text-2xl font-extrabold text-white mb-3">
              Join the Founders Desk community
            </h3>
            <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
              Get weekly business ideas, opportunities, and founder stories straight to your inbox. Free forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/newsletter"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                Subscribe to newsletter
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/articles"
                className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Read our articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}