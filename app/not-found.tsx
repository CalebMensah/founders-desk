import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="text-center max-w-md">

        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-medium">FD</span>
          </div>
          <span className="text-lg font-medium text-gray-900">
            Founders<span className="text-blue-600">Desk</span>
          </span>
        </Link>

        {/* 404 */}
        <div className="bg-[#0A1628] rounded-2xl px-8 py-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 rounded-full opacity-10 translate-x-12 -translate-y-12" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600 rounded-full opacity-10 -translate-x-10 translate-y-10" />
          <div className="relative z-10">
            <p className="text-8xl font-extrabold text-blue-600 mb-2">404</p>
            <h1 className="text-2xl font-extrabold text-white mb-3">
              Page not found
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              The page you are looking for does not exist or has been moved. Let us get you back on track.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go back home
          </Link>
          <Link
            href="/articles"
            className="bg-white border border-gray-200 hover:border-blue-300 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Browse articles
          </Link>
          <Link
            href="/opportunities"
            className="bg-white border border-gray-200 hover:border-blue-300 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg transition-colors"
          >
            View opportunities
          </Link>
        </div>
      </div>
    </div>
  )
}