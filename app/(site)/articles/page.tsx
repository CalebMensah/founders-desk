import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { Clock } from 'lucide-react'

type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  image_url: string
  published_at: string
  categories: { title: string; slug: string }
  authors: { name: string; photo_url: string }
}

type Category = {
  id: string
  title: string
  slug: string
}

async function getArticlesData(categorySlug?: string) {
  const { data: categories } = await supabase
    .from('categories')
    .select('id, title, slug')
    .order('title')

  let query = supabase
    .from('articles')
    .select('*, categories(title, slug), authors(name, photo_url)')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (categorySlug) {
    const category = categories?.find((c) => c.slug === categorySlug)
    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  const { data: articles } = await query

  return {
    articles: (articles as Article[]) || [],
    categories: (categories as Category[]) || [],
  }
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const { articles, categories } = await getArticlesData(category)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            All articles
          </h1>
          <p className="text-gray-500 text-sm">
            Business ideas, startup guides, and founder stories from across Africa
          </p>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          <Link
            href="/articles"
            className={`text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              !category
                ? 'bg-[#0A1628] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/articles?category=${cat.slug}`}
              className={`text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                category === cat.slug
                  ? 'bg-[#0A1628] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              {cat.title}
            </Link>
          ))}
        </div>

        {/* Articles grid */}
        {articles.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
            <p className="text-gray-400 text-sm">
              No articles found{category ? ' in this category' : ''}.
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