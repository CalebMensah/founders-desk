'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PlusCircle, Pencil, Trash2, Users } from 'lucide-react'
import { supabase } from '../../../lib/supabase'

type Author = {
  id: string
  name: string
  bio: string
  photo_url: string
  twitter: string
  linkedin: string
  created_at: string
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAuthors = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setAuthors(data || [])
    } catch (error) {
      console.error('Failed to fetch authors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this author?'
    )

    if (!confirmed) return

    try {
      const { error } = await supabase
        .from('authors')
        .delete()
        .eq('id', id)

      if (error) throw error

      setAuthors((prev) => prev.filter((author) => author.id !== id))
    } catch (error) {
      console.error('Failed to delete author:', error)
      alert('Failed to delete author')
    }
  }

  useEffect(() => {
    fetchAuthors()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Authors</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your content authors
          </p>
        </div>

        <Link
          href="/admin/authors/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <PlusCircle size={16} />
          New Author
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : authors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Users size={20} className="text-gray-400" />
            </div>

            <p className="text-sm text-gray-500">No authors yet</p>

            <Link
              href="/admin/authors/new"
              className="text-blue-600 text-sm font-medium mt-2 hover:underline"
            >
              Add your first author
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">
                    Author
                  </th>

                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">
                    Bio
                  </th>

                  <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">
                    Socials
                  </th>

                  <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {authors.map((author) => (
                  <tr
                    key={author.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {author.photo_url ? (
                          <Image
                            src={author.photo_url}
                            alt={author.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 text-xs font-medium">
                              {author.name?.charAt(0)?.toUpperCase() || '?'}
                            </span>
                          </div>
                        )}

                        <span className="text-sm font-medium text-gray-900">
                          {author.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell max-w-xs">
                      <p className="truncate">{author.bio || '-'}</p>
                    </td>

                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-3">
                        {author.twitter && (
                          <a
                            href={author.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                          >
                            Twitter
                          </a>
                        )}

                        {author.linkedin && (
                          <a
                            href={author.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                          >
                            LinkedIn
                          </a>
                        )}

                        {!author.twitter && !author.linkedin && (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/authors/${author.id}/edit`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <Pencil size={15} />
                        </Link>

                        <button
                          onClick={() => handleDelete(author.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          aria-label={`Delete ${author.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}