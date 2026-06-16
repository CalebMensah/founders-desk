import Link from 'next/link'
import { supabase } from '../../../../lib/supabase'
import { ArrowLeft, MapPin, Calendar, ArrowUpRight, Trophy } from 'lucide-react'
import { notFound } from 'next/navigation'

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

async function getOpportunity(id: string) {
  const { data } = await supabase
    .from('opportunities')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) return { opportunity: null, related: [] }

  const { data: related } = await supabase
    .from('opportunities')
    .select('*')
    .eq('type', data.type)
    .neq('id', data.id)
    .limit(3)

  return {
    opportunity: data as Opportunity,
    related: (related as Opportunity[]) || [],
  }
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { opportunity, related } = await getOpportunity(id)

  if (!opportunity) notFound()

  const isExpired = opportunity.deadline && new Date(opportunity.deadline) < new Date()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Header */}
      <div className="bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={15} />
            All opportunities
          </Link>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {opportunity.type && (
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                  typeBadgeColor[opportunity.type] || 'bg-gray-100 text-gray-600'
                }`}
              >
                {typeLabels[opportunity.type] || opportunity.type}
              </span>
            )}
            {isExpired && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-50 text-red-500">
                Closed
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
            {opportunity.title}
          </h1>

          <div className="flex items-center gap-5 flex-wrap">
            {opportunity.country && (
              <span className="flex items-center gap-1.5 text-sm text-gray-400">
                <MapPin size={14} />
                {opportunity.country}
              </span>
            )}
            {opportunity.deadline && (
              <span className="flex items-center gap-1.5 text-sm text-gray-400">
                <Calendar size={14} />
                Deadline: {new Date(opportunity.deadline).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">

          {opportunity.description && (
            <>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                About this opportunity
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-8 whitespace-pre-line">
                {opportunity.description}
              </p>
            </>
          )}

          {opportunity.link && !isExpired && (
            <Link
              href={opportunity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3.5 rounded-lg transition-colors w-full sm:w-auto"
            >
              Apply now
              <ArrowUpRight size={16} />
            </Link>
          )}

          {isExpired && (
            <div className="bg-red-50 text-red-500 text-sm font-medium px-4 py-3 rounded-lg">
              This opportunity is no longer accepting applications.
            </div>
          )}

          {!opportunity.link && !isExpired && (
            <p className="text-sm text-gray-400">
              No application link provided for this opportunity.
            </p>
          )}
        </div>

        {/* Related opportunities */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Trophy size={18} className="text-blue-600" />
              Similar opportunities
            </h2>
            <div className="flex flex-col gap-3">
              {related.map((item) => (
                <Link key={item.id} href={`/opportunities/${item.id}`}>
                  <div className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {item.country && `${item.country} · `}
                        {item.deadline &&
                          `Deadline: ${new Date(item.deadline).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}`}
                      </p>
                    </div>
                    {item.type && (
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full capitalize flex-shrink-0 ml-4 ${
                          typeBadgeColor[item.type] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {typeLabels[item.type] || item.type}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}