'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import Link from 'next/link'
import { PlusCircle, Pencil, Trash2, Trophy } from 'lucide-react'

type Opportunity = {
  id: string
  title: string
  type: string
  country: string
  deadline: string
  description: string
  link: string
  created_at: string
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOpportunities = async () => {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setOpportunities(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this opportunity?')
    if (!confirmed) return

    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id)

    if (!error) fetchOpportunities()
  }

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const typeBadge = (type: string) => {
    const styles: Record<string, string> = {
      grant: 'bg-green-50 text-green-600',
      accelerator: 'bg-blue-50 text-blue-600',
      competition: 'bg-orange-50 text-orange-600',
      fellowship: 'bg-purple-50 text-purple-600',
      job: 'bg-gray-100 text-gray-600',
    }
    return styles[type] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage grants, fellowships and competitions
          </p>
        </div>
        <Link
          href="/admin/opportunities/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <PlusCircle size={16} />
          New opportunity
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : opportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Trophy size={20} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No opportunities yet</p>
            <Link
              href="/admin/opportunities/new"
              className="text-blue-600 text-sm font-medium mt-2 hover:underline"
            >
              Add your first opportunity
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">
                  Title
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">
                  Type
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">
                  Country
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 hidden md:table-cell">
                  Deadline
                </th>
                <th className="text-right text-xs font-medium text-gray-500 px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr
                  key={opp.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4">
  <p className="text-sm font-medium text-gray-900 line-clamp-1">
    {opp.title}
  </p>

  {opp.link && (
    <a
      href={opp.link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-blue-500 hover:underline mt-0.5 inline-block"
    >
      View link
    </a>
  )}
</td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    {opp.type && (
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${typeBadge(opp.type)}`}
                      >
                        {opp.type}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell">
                    {opp.country || '-'}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell">
                    {opp.deadline
                      ? new Date(opp.deadline).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '-'}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/opportunities/${opp.id}/edit`}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(opp.id)}
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