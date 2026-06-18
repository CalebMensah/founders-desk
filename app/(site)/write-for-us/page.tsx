'use client'


import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

const guidelines = [
  'Articles must be original and not published elsewhere',
  'Minimum 800 words, maximum 3000 words',
  'Must be relevant to African entrepreneurship, startups, or business',
  'Practical and actionable — not purely theoretical',
  'No promotional content or paid placements disguised as editorial',
  'Include real examples, data, or personal experience where possible',
  'Written in clear, simple English accessible to a wide audience',
]

const topics = [
  'Business ideas and how to start them',
  'Startup stories and founder interviews',
  'How to make money online in Africa',
  'Grants, funding, and investment guides',
  'Marketing and growth tactics for African businesses',
  'Tech, fintech, and innovation in Africa',
  'Personal finance and wealth building',
  'Student entrepreneurship and campus business',
]

export default function WriteForUsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <div className="bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 bg-blue-500" />
            <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest">
              Write for us
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Share your knowledge with African founders.
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            Founders Desk is looking for writers, founders, and experts who want to share practical insights with our growing community of African entrepreneurs.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">

        {/* Why write */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Why write for Founders Desk?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Reach thousands',
                desc: 'Your article reaches a growing audience of young African entrepreneurs and students.',
              },
              {
                title: 'Build your brand',
                desc: 'Get an author profile with your bio, photo, and social links on every article you publish.',
              },
              {
                title: 'Make an impact',
                desc: 'Your practical experience could be the guide that helps someone start their first business.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-5">
                <div className="w-8 h-1 bg-blue-600 rounded-full mb-3" />
                <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Topics we cover
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topics.map((topic) => (
              <div key={topic} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Submission guidelines
          </h2>
          <div className="flex flex-col gap-3">
            {guidelines.map((guideline) => (
              <div key={guideline} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-green-600" />
                </div>
                <span className="text-sm text-gray-600">{guideline}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0A1628] rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600 rounded-full opacity-10 translate-x-16 -translate-y-16" />
          <div className="relative z-10">
            <h3 className="text-xl font-extrabold text-white mb-3">
              Ready to contribute?
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Send your article pitch or draft to our editorial team and we will get back to you within 48 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Send your pitch
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}