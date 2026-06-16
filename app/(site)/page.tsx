import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { ArrowRight, Clock, Trophy, Zap } from 'lucide-react'
import NewsletterForm from '../../components/NewsletterForm'

type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  image_url: string
  featured: boolean
  published_at: string
  categories: { title: string; slug: string }
  authors: { name: string; photo_url: string }
}

type Opportunity = {
  id: string
  title: string
  type: string
  country: string
  deadline: string
  link: string
}

const typeBadgeColor: Record<string, string> = {
  grant: 'bg-green-50 text-green-600',
  accelerator: 'bg-blue-50 text-blue-600',
  competition: 'bg-orange-50 text-orange-600',
  fellowship: 'bg-purple-50 text-purple-600',
  job: 'bg-gray-100 text-gray-600',
}

async function getHomepageData() {
  const [
    { data: featuredData },
    { data: latest },
    { data: opportunities },
    { count: articleCount },
    { count: opportunityCount },
  ] = await Promise.all([
    supabase
      .from('articles')
      .select('*, categories(title, slug), authors(name, photo_url)')
      .eq('published', true)
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(1),
    supabase
      .from('articles')
      .select('*, categories(title, slug), authors(name, photo_url)')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(6),
    supabase
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3),
    supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('published', true),
    supabase
      .from('opportunities')
      .select('*', { count: 'exact', head: true }),
  ])

  return {
    featured: featuredData?.[0] as Article | null,
    latest: (latest as Article[]) || [],
    opportunities: (opportunities as Opportunity[]) || [],
    articleCount: articleCount || 0,
    opportunityCount: opportunityCount || 0,
  }
}

export default async function HomePage() {
  const {
    featured,
    latest,
    opportunities,
    articleCount,
    opportunityCount,
  } = await getHomepageData()

  const stats = [
    { num: articleCount.toString(), label: 'Articles' },
    { num: opportunityCount.toString(), label: 'Opportunities' },
    { num: latest.length.toString(), label: 'Published' },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-0.5 bg-blue-500" />
            <span className="text-blue-500 text-xs font-semibold uppercase tracking-widest">
              Africa&apos;s startup content hub
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 max-w-3xl">
            Where African{' '}
            <span className="bg-blue-600 px-2 rounded-md">founders</span>{' '}
            get their edge.
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-10">
            Practical business ideas, startup guides, and real opportunities
            built for young Africans ready to build something.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/ideas"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              Explore ideas
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/opportunities"
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Browse opportunities
            </Link>
          </div>

          {/* Real stats from database */}
          <div className="grid grid-cols-3 gap-1 mt-14 max-w-sm">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 rounded-lg px-4 py-4 text-center"
              >
                <p className="text-2xl font-extrabold text-white">{stat.num}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending bar */}
      <div className="bg-blue-600 px-6 py-3 flex items-center gap-4 overflow-hidden">
        <span className="text-xs font-bold text-white bg-black/20 px-3 py-1 rounded whitespace-nowrap">
          TRENDING
        </span>
        <p className="text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis">
          How Paystack was acquired for $200M &nbsp;·&nbsp; Top 5 grants for
          African startups &nbsp;·&nbsp; Build a SaaS in 30 days
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Featured article */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Zap size={18} className="text-blue-600" />
              Featured
            </h2>
          </div>

          {!featured ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <p className="text-gray-400 text-sm">
                No featured article yet. Go to admin, open an article and check
                the featured checkbox.
              </p>
            </div>
          ) : (
            <Link href={`/articles/${featured.slug}`}>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow md:flex">
                {featured.image_url ? (
                  <img
                    src={featured.image_url}
                    alt={featured.title}
                    className="w-full md:w-80 h-52 md:h-auto object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-full md:w-80 h-52 md:h-auto bg-gradient-to-br from-[#0A1628] to-blue-700 flex-shrink-0" />
                )}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  {featured.categories && (
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                      {featured.categories.title}
                    </span>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-3">
                    {featured.title}
                  </h3>
                  {featured.excerpt && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                      {featured.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    {featured.authors?.photo_url ? (
                      <img
                        src={featured.authors.photo_url}
                        alt={featured.authors.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-xs font-medium">
                          {featured.authors?.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="text-xs text-gray-400">
                      {featured.authors?.name}
                    </span>
                    {featured.published_at && (
                      <>
                        <span className="text-gray-200">·</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={11} />
                          {new Date(featured.published_at).toLocaleDateString(
                            'en-GB',
                            { day: 'numeric', month: 'short', year: 'numeric' }
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )}
        </section>

        {/* Latest articles */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Latest articles</h2>
            <Link
              href="/articles"
              className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
            >
              See all <ArrowRight size={14} />
            </Link>
          </div>

          {latest.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <p className="text-gray-400 text-sm">
                No articles published yet. Go to admin and publish an article.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {latest.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    {article.image_url ? (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-44 object-cover"
                      />
                    ) : (
                      <div className="w-full h-44 bg-gradient-to-br from-[#0A1628] to-blue-700" />
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      {article.categories && (
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                          {article.categories.title}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-2 flex-1">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-auto">
                        {article.authors?.photo_url ? (
                          <img
                            src={article.authors.photo_url}
                            alt={article.authors.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 text-xs font-medium">
                              {article.authors?.name?.charAt(0)}
                            </span>
                          </div>
                        )}
                        <span className="text-xs text-gray-400">
                          {article.authors?.name}
                        </span>
                        {article.published_at && (
                          <span className="text-xs text-gray-300 ml-auto">
                            {new Date(article.published_at).toLocaleDateString(
                              'en-GB',
                              { day: 'numeric', month: 'short' }
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Opportunities */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Trophy size={18} className="text-blue-600" />
              Open opportunities
            </h2>
            <Link
              href="/opportunities"
              className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
            >
              See all <ArrowRight size={14} />
            </Link>
          </div>

          {opportunities.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <p className="text-gray-400 text-sm">
                No opportunities listed yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {opportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between hover:shadow-sm transition-shadow"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {opp.title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {opp.country && `${opp.country} · `}
                      {opp.deadline &&
                        `Deadline: ${new Date(opp.deadline).toLocaleDateString(
                          'en-GB',
                          { day: 'numeric', month: 'short', year: 'numeric' }
                        )}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    {opp.type && (
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                          typeBadgeColor[opp.type] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {opp.type}
                      </span>
                    )}
                    {opp.link && (
                      <Link
                        href={opp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 font-medium hover:underline"
                      >
                        Apply
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section className="bg-[#0A1628] rounded-2xl px-8 py-12 text-center relative overflow-hidden mb-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full opacity-10 translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600 rounded-full opacity-10 -translate-x-16 translate-y-16" />
          <div className="relative z-10">
            <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">
              Weekly newsletter
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-3 mb-3">
              Do not miss what is building in Africa.
            </h3>
            <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
              Ideas, opportunities, and founder stories every week. Free forever.
            </p>
            <div className="max-w-md mx-auto">
  <NewsletterForm variant="dark" />
</div>
          </div>
        </section>
      </div>
    </div>
  )
}