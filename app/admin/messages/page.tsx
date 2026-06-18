'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { Mail } from 'lucide-react'

type Message = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) setMessages(data)
      setLoading(false)
    }
    fetchMessages()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500 text-sm mt-1">Contact form submissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* List */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Mail size={20} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No messages yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors ${
                    selected?.id === msg.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {msg.name}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {msg.subject || msg.message}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          {selected ? (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {selected.subject || 'No subject'}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                  <span className="font-medium text-gray-600">
                    {selected.name}
                  </span>
                  <span>·</span>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {selected.email}
                  </a>
                  <span>·</span>
                  <span>
                    {new Date(selected.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {selected.message}
                </p>
              </div>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your message to Founders Desk'}`}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                <Mail size={15} />
                Reply via email
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Mail size={20} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-sm">
                Select a message to read it
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}