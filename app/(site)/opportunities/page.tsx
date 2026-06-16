import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { Trophy, MapPin, Calendar, ArrowUpRight } from 'lucide-react'

type Opportunity = {
  id: string
  title: string
  type: string
  country: string
  deadline: string
  description: string
  link: string
}

const typeBadgeColor: Record<string, string> = {
  grant: 'bg-green-50 text-green-600',
  accelerator: 'bg-blue-50 text-blue-600',
  competition: 'bg-orange-50 text-orange-600',
  fellowship: 'bg-purple-50 text-purple-600',
  job: 'bg-gray-100 text-gray-600',
}

const typeLabels: Record<string, string> = {
  grant: 'Grant',
  accelerator: 'Accelerator',
  competition: 'Competition',
  fellowship: 'Fellowship',
  job: 'Job',
}

async function getOpportunities(type?: string) {
  let query = supabase
    .from('opportunities')
    .select('*')
    .order('deadline', { ascending: true })

  if (type) {
    query = query.eq('type', type)
  }

  const { data } = await query
  return (data as Opportunity[]) || []
}

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const opportunities = await getOpportunities(type)

  const filterTypes = ['grant', 'accelerator', 'competition', 'fellowship', 'job']

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Header */}
      <div className="bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-0.5 bg-blue-500" />
            <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest">
              Open opportunities
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Grants, fellowships & competitions
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl">
            Real opportunities for African founders, students, and builders. Updated regularly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Filters */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          <Link
            href="/opportunities"
            className={`text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              !type
                ? 'bg-[#0A1628] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            }`}
          >
            All
          </Link>
          {filterTypes.map((t) => (
            <Link
              key={t}
              href={`/opportunities?type=${t}`}
              className={`text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap capitalize transition-colors ${
                type === t
                  ? 'bg-[#0A1628] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              {typeLabels[t]}
            </Link>
          ))}
        </div>

        {/* List */}
        {opportunities.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy size={20} className="text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm">
              No opportunities found{type ? ` for ${typeLabels[type]}` : ''}.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {opportunities.map((opp) => {
              const isExpired = opp.deadline && new Date(opp.deadline) < new Date()
              return (
                <div
  key={opp.id}
  className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
>
  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
    <Link href={`/opportunities/${opp.id}`} className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {opp.type && (
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                              typeBadgeColor[opp.type] || 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {typeLabels[opp.type] || opp.type}
                          </span>
                        )}
                        {isExpired && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-500">
                            Closed
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {opp.title}
                      </h3>
                      {opp.description && (
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                          {opp.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 flex-wrap">
                        {opp.country && (
                          <span className="flex items-center gap-1.5 text-xs text-gray-400">
                            <MapPin size={13} />
                            {opp.country}
                          </span>
                        )}
                        {opp.deadline && (
                          <span className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Calendar size={13} />
                            Deadline: {new Date(opp.deadline).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                    </Link>

                    {opp.link && (
                      <Link
                        href={opp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
                      >
                        Apply now
                        <ArrowUpRight size={15} />
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}