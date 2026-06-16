import Link from 'next/link'
import { supabase } from '../../../../lib/supabase'
import { Clock, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  image_url: string
  published_at: string
  authors: { name: string; photo_url: string }
}

type Category = {
  id: string
  title: string
  slug: string
  description: string
}

async function getCategoryData(slug: string) {
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) return { category: null, articles: [] }

  const { data: articles } = await supabase
    .from('articles')
    .select('*, authors(name, photo_url)')
    .eq('category_id', category.id)
    .eq('published', true)
    .order('published_at', { ascending: false })

  return {
    category: category as Category,
    articles: (articles as Article[]) || [],
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { category, articles } = await getCategoryData(slug)

  if (!category) notFound()

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Header */}
      <div className="bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={15} />
            All articles
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-gray-400 text-sm md:text-base max-w-xl">
              {category.description}
            </p>
          )}
          <p className="text-blue-500 text-sm font-medium mt-4">
            {articles.length} article{articles.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {articles.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
            <p className="text-gray-400 text-sm">
              No articles in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
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
                        <span className="text-xs text-gray-300 ml-auto flex items-center gap-1">
                          <Clock size={11} />
                          {new Date(article.published_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}