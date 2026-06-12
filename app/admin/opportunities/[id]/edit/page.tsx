'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../../../lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function EditOpportunityPage() {
  const router = useRouter()
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [country, setCountry] = useState('')
  const [deadline, setDeadline] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOpportunity = async () => {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('id', id)
        .single()

      if (!error && data) {
        setTitle(data.title)
        setType(data.type || '')
        setCountry(data.country || '')
        setDeadline(data.deadline || '')
        setDescription(data.description || '')
        setLink(data.link || '')
      }
      setFetching(false)
    }
    fetchOpportunity()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase
      .from('opportunities')
      .update({
        title,
        type,
        country,
        deadline: deadline || null,
        description,
        link,
      })
      .eq('id', id)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin/opportunities')
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/opportunities"
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit opportunity</h1>
          <p className="text-gray-500 text-sm mt-0.5">Update opportunity details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-5">

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
          >
            <option value="">Select type</option>
            <option value="grant">Grant</option>
            <option value="accelerator">Accelerator</option>
            <option value="competition">Competition</option>
            <option value="fellowship">Fellowship</option>
            <option value="job">Job</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. Ghana, Africa-wide, Remote"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Apply link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com/apply"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={15} />
            {loading ? 'Saving...' : 'Save changes'}
          </button>
          <Link
            href="/admin/opportunities"
            className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}