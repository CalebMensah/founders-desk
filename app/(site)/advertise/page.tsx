'use client'


import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

const adOptions = [
  {
    title: 'Newsletter sponsorship',
    description: 'Your brand featured in our weekly newsletter sent to thousands of African entrepreneurs.',
    features: ['Logo and brand mention', 'Custom message up to 100 words', 'Link to your product or landing page'],
  },
  {
    title: 'Article sponsorship',
    description: 'Sponsor a dedicated article or guide relevant to your product or service.',
    features: ['Clearly labelled as sponsored', 'Full article dedicated to your brand', 'Permanent page on our site'],
  },
  {
    title: 'Banner placement',
    description: 'Display your brand on high-traffic pages across the Founders Desk platform.',
    features: ['Homepage and article pages', 'Targeted by category', 'Monthly or quarterly placements'],
  },
]

const audience = [
  { label: 'Age range', value: '18 to 35 years' },
  { label: 'Location', value: 'Africa-wide, majority West Africa' },
  { label: 'Interests', value: 'Business, startups, finance, tech' },
  { label: 'Profile', value: 'Students, founders, young professionals' },
]

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <div className="bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 bg-blue-500" />
            <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest">
              Advertise
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Reach Africa&apos;s next generation of builders.
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            Partner with Founders Desk to put your brand in front of thousands of young African entrepreneurs, students, and startup founders.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">

        {/* Audience */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Our audience
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {audience.map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ad options */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            Partnership options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {adOptions.map((option) => (
              <div
                key={option.title}
                className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col"
              >
                <div className="w-8 h-1 bg-blue-600 rounded-full mb-4" />
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">
                  {option.description}
                </p>
                <div className="flex flex-col gap-2">
                  {option.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={10} className="text-blue-600" />
                      </div>
                      <span className="text-xs text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who should advertise */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Who should partner with us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Fintech and mobile money companies',
              'Banks and microfinance institutions',
              'Accelerators and incubators',
              'Online learning platforms',
              'B2B software and tools for businesses',
              'Grant and funding programs',
              'Coworking spaces and business hubs',
              'Logistics and e-commerce platforms',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0A1628] rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600 rounded-full opacity-10 translate-x-16 -translate-y-16" />
          <div className="relative z-10">
            <h3 className="text-xl font-extrabold text-white mb-3">
              Interested in partnering?
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Reach out to our team and we will send you our media kit and pricing within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Get in touch
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}