'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import Link from 'next/link'
import {
  FileText,
  Tag,
  Trophy,
  Users,
  PlusCircle,
} from 'lucide-react'

type Stats = {
  articles: number
  categories: number
  opportunities: number
  subscribers: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    articles: 0,
    categories: 0,
    opportunities: 0,
    subscribers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: articles },
        { count: categories },
        { count: opportunities },
        { count: subscribers },
      ] = await Promise.all([
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('opportunities').select('*', { count: 'exact', head: true }),
        supabase.from('subscribers').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        articles: articles || 0,
        categories: categories || 0,
        opportunities: opportunities || 0,
        subscribers: subscribers || 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [])

  const statCards = [
    { label: 'Total articles', value: stats.articles, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Categories', value: stats.categories, icon: Tag, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Opportunities', value: stats.opportunities, icon: Trophy, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Subscribers', value: stats.subscribers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  const quickActions = [
    { label: 'Write new article', href: '/admin/articles/new' },
    { label: 'Add opportunity', href: '/admin/opportunities/new' },
    { label: 'Add category', href: '/admin/categories/new' },
    { label: 'Add author', href: '/admin/authors/new' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome back to Founders Desk</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className={`w-8 h-8 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={16} />
              </div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              {loading ? (
                <div className="h-8 w-12 bg-gray-100 rounded animate-pulse" />
              ) : (
                <p className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-sm font-medium text-gray-900 mb-4">Quick actions</h2>
        <div className="flex flex-col gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-sm text-gray-700 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <PlusCircle size={15} className="text-gray-400 group-hover:text-blue-500" />
                {action.label}
              </div>
              <span className="text-gray-400 group-hover:text-blue-500">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}