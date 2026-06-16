'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import Link from 'next/link'
import { Check, AlertCircle, Mail, MapPin, Clock } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'hello@foundersdesk.africa',
    href: 'mailto:hello@foundersdesk.africa',
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'Accra, Ghana',
    href: null,
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Within 24 to 48 hours',
    href: null,
  },
]

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const { error } = await supabase
      .from('messages')
      .insert([{ name, email, subject, message }])

    if (error) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    } else {
      setStatus('success')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <div className="bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 bg-blue-500" />
            <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest">
              Contact us
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            We would love to hear from you.
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            Have a question, partnership idea, or want to contribute to Founders Desk? Send us a message and we will get back to you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Contact info */}
          <div className="flex flex-col gap-5">
            {contactInfo.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="bg-white rounded-xl border border-gray-100 p-5"
                >
                  <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                    <Icon size={16} className="text-blue-600" />
                  </div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">
                      {item.value}
                    </p>
                  )}
                </div>
              )
            })}

            {/* Quick links */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Quick links
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/write-for-us"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Write for us
                </Link>
                <Link
                  href="/advertise"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Advertise with us
                </Link>
                <Link
                  href="/newsletter"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Subscribe to newsletter
                </Link>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Send us a message
              </h2>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <Check size={24} className="text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Message sent!
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Thanks for reaching out. We will get back to you within 24 to 48 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1.5">
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Kofi Mensah"
                        required
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1.5">
                        Email address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kofi@example.com"
                        required
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Partnership inquiry"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what is on your mind..."
                      rows={6}
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg">
                      <AlertCircle size={16} />
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}