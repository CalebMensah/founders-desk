'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../../lib/supabase'
import ImageUpload from '../../../../components/ImageUpload'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

type Category = { id: string; title: string }
type Author = { id: string; name: string }

export default function NewArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [body, setBody] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [featured, setFeatured] = useState(false)
  const [published, setPublished] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setSlug(generateSlug(value))
  }

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: cats }, { data: auths }] = await Promise.all([
        supabase.from('categories').select('id, title').order('title'),
        supabase.from('authors').select('id, name').order('name'),
      ])
      if (cats) setCategories(cats)
      if (auths) setAuthors(auths)
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase
      .from('articles')
      .insert([{
        title,
        slug,
        excerpt,
        body,
        image_url: imageUrl,
        category_id: categoryId || null,
        author_id: authorId || null,
        featured,
        published,
        published_at: published ? new Date().toISOString() : null,
      }])

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin/articles')
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/articles"
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New article</h1>
          <p className="text-gray-500 text-sm mt-0.5">Write and publish a new article</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Title */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-5">
          <h2 className="text-sm font-medium text-gray-900">Article details</h2>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. How to Start a Business in Ghana With GH500"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">Auto-generated from title. Used in URLs.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary shown in article cards..."
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
            />
          </div>

         <ImageUpload
  label="Cover image"
  value={imageUrl}
  onChange={setImageUrl}/>
        </div>

        {/* Body */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-900">
              Article body <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-gray-400">Supports HTML</span>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your article here..."
            rows={16}
            required
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none font-mono"
          />
        </div>

        {/* Meta */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-5">
          <h2 className="text-sm font-medium text-gray-900">Meta</h2>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Author
            </label>
            <select
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700">Mark as featured article</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span className="text-sm text-gray-700">Publish immediately</span>
            </label>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3 pb-8">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={15} />
            {loading ? 'Saving...' : 'Save article'}
          </button>
          <Link
            href="/admin/articles"
            className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}