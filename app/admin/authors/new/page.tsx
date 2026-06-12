'use client'

import { useState } from 'react'
import { supabase } from '../../../../lib/supabase'
import ImageUpload from '../../../../components/ImageUpload'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewAuthorPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [twitter, setTwitter] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase
      .from('authors')
      .insert([{
        name,
        bio,
        photo_url: photoUrl,
        twitter,
        linkedin,
      }])

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin/authors')
    }
  }

  return (
    <div className="max-w-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/authors"
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New author</h1>
          <p className="text-gray-500 text-sm mt-0.5">Add a new content author</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-5">

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Kofi Mensah"
            required
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Brief author biography..."
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          />
        </div>

        {/* Photo URL */}
        <ImageUpload
  label="Author photo"
  value={photoUrl}
  onChange={setPhotoUrl}/>

        {/* Twitter */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            Twitter URL
          </label>
          <input
            type="url"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="https://twitter.com/username"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={15} />
            {loading ? 'Saving...' : 'Save author'}
          </button>
          <Link
            href="/admin/authors"
            className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}