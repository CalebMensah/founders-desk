'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { Users, Trash2 } from 'lucide-react'

type Subscriber = {
  id: string
  email: string
  created_at: string
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchSubscribers = async () => {
    const { data } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setSubscribers(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Remove this subscriber?')
    if (!confirmed) return

    const { error } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', id)

    if (!error) fetchSubscribers()
  }

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
          <p className="text-gray-500 text-sm mt-1">
            {subscribers.length} total subscriber{subscribers.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="w-full md:w-80 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Users size={20} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">
              {search ? 'No subscribers match your search' : 'No subscribers yet'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">
                  Email
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">
                  Subscribed on
                </th>
                <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((subscriber) => (
                <tr
                  key={subscriber.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4 text-sm text-gray-900">
                    {subscriber.email}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell">
                    {new Date(subscriber.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleDelete(subscriber.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}