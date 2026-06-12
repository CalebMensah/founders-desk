'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import Link from 'next/link'
import { PlusCircle, Pencil, Trash2, Tag } from 'lucide-react'

type Category = {
  id: string
  title: string
  slug: string
  description: string
  created_at: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setCategories(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this category?')
    if (!confirmed) return

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (!error) fetchCategories()
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your content categories</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <PlusCircle size={16} />
          New category
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Tag size={20} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No categories yet</p>
            <Link
              href="/admin/categories/new"
              className="text-blue-600 text-sm font-medium mt-2 hover:underline"
            >
              Create your first category
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Title</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">Slug</th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">Description</th>
                <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">{cat.title}</td>
                  <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">
                      {cat.slug}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell">
                    {cat.description || '—'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/categories/${cat.id}/edit`}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(cat.id)}
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