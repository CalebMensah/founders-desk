'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import Link from 'next/link'
import { PlusCircle, Pencil, Trash2, FileText } from 'lucide-react'

type Article = {
  id: string
  title: string
  slug: string
  published: boolean
  featured: boolean
  published_at: string
  created_at: string
  categories: { title: string }
  authors: { name: string }
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*, categories(title), authors(name)')
      .order('created_at', { ascending: false })

    if (!error && data) setArticles(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this article?')
    if (!confirmed) return

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id)

    if (!error) fetchArticles()
  }

  const togglePublish = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('articles')
      .update({
        published: !current,
        published_at: !current ? new Date().toISOString() : null,
      })
      .eq('id', id)

    if (!error) fetchArticles()
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your content articles</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <PlusCircle size={16} />
          New article
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <FileText size={20} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No articles yet</p>
            <Link
              href="/admin/articles/new"
              className="text-blue-600 text-sm font-medium mt-2 hover:underline"
            >
              Write your first article
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Title</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">Category</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">Author</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Status</th>
                <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {article.title}
                    </p>
                    {article.featured && (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell">
                    {article.categories?.title || '-'}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell">
                    {article.authors?.name || '-'}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => togglePublish(article.id, article.published)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                        article.published
                          ? 'bg-green-50 text-green-600 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
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