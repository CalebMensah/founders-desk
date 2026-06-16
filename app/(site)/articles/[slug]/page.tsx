import Link from 'next/link'
import { supabase } from '../../../../lib/supabase'
import { Clock, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  body: string
  image_url: string
  published_at: string
  categories: { title: string; slug: string }
  authors: {
    name: string
    bio: string
    photo_url: string
    twitter: string
    linkedin: string
  }
}

type RelatedArticle = {
  id: string
  title: string
  slug: string
  image_url: string
  categories: { title: string }
}

async function getArticle(slug: string) {
  const { data: article } = await supabase
    .from('articles')
    .select('*, categories(title, slug), authors(name, bio, photo_url, twitter, linkedin)')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!article) return { article: null, related: [] }

  const { data: related } = await supabase
    .from('articles')
    .select('id, title, slug, image_url, categories(title)')
    .eq('published', true)
    .eq('category_id', article.category_id)
    .neq('id', article.id)
    .limit(3)

  return {
    article: article as Article,
    related: (related as unknown as RelatedArticle[]) || [],
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { article, related } = await getArticle(slug)

  if (!article) notFound()

  return (
    <div className="min-h-screen bg-white">

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 pt-6 pb-8">
        {article.categories && (
          <Link
            href={`/category/${article.categories.slug}`}
            className="text-xs font-semibold text-blue-600 uppercase tracking-wider hover:underline"
          >
            {article.categories.title}
          </Link>
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mt-3 mb-5">
          {article.title}
        </h1>

        {/* Author + date */}
        <div className="flex items-center gap-3">
          {article.authors?.photo_url ? (
            <img
              src={article.authors.photo_url}
              alt={article.authors.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">
                {article.authors?.name?.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">
              {article.authors?.name}
            </p>
            {article.published_at && (
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={11} />
                {new Date(article.published_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cover image */}
      {article.image_url && (
        <div className="max-w-4xl mx-auto px-6 mb-10">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl"
          />
        </div>
      )}

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-strong:text-gray-900
            prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* Author bio card */}
        {article.authors && (
          <div className="mt-12 bg-gray-50 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start">
            {article.authors.photo_url ? (
              <img
                src={article.authors.photo_url}
                alt={article.authors.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 text-xl font-medium">
                  {article.authors.name?.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                Written by
              </p>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {article.authors.name}
              </h3>
              {article.authors.bio && (
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {article.authors.bio}
                </p>
              )}
              <div className="flex items-center gap-3">
<div className="flex items-center gap-3">
  {article.authors.twitter && (
    <Link
      href={article.authors.twitter}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-600 transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </Link>
  )}
  {article.authors.linkedin && (
    <Link
      href={article.authors.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-600 transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM7 10v8h2.5v-8H7zm5.5 0H10v8h2.5v-4.5c0-1.5.5-2 1.5-2s1.5.5 1.5 2V18H18v-5c0-2.5-1.5-3.5-3.5-3.5-1.5 0-2.3.8-2.7 1.3L11.5 10z" />
      </svg>
    </Link>
  )}
</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 pb-20 border-t border-gray-100 pt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            More from {article.categories?.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((item) => (
              <Link key={item.id} href={`/articles/${item.slug}`}>
                <div className="group">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gradient-to-br from-[#0A1628] to-blue-700 rounded-lg mb-3" />
                  )}
                  <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}