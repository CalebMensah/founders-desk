'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Check, AlertCircle } from 'lucide-react'

type Props = {
  variant?: 'dark' | 'light'
}

export default function NewsletterForm({ variant = 'dark' }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    const { error } = await supabase
      .from('subscribers')
      .insert([{ email: email.trim().toLowerCase() }])

    if (error) {
      if (error.code === '23505') {
        setStatus('error')
        setMessage('This email is already subscribed')
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } else {
      setStatus('success')
      setMessage('You are subscribed! Welcome to Founders Desk.')
      setEmail('')
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={status === 'loading' || status === 'success'}
          className={`flex-1 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 ${
            variant === 'dark'
              ? 'bg-white/10 border border-white/10 text-white placeholder:text-gray-500'
              : 'bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {status === 'loading' ? 'Joining...' : status === 'success' ? 'Subscribed' : 'Join free'}
        </button>
      </form>

      {message && (
        <div
          className={`flex items-center gap-2 text-xs mt-3 ${
            status === 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {status === 'success' ? <Check size={13} /> : <AlertCircle size={13} />}
          {message}
        </div>
      )}
    </div>
  )
}