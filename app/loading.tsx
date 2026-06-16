export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Hero skeleton */}
      <div className="bg-[#0A1628] px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="h-3 w-32 bg-white/10 rounded-full mb-6 animate-pulse" />
          <div className="h-10 w-3/4 bg-white/10 rounded-lg mb-4 animate-pulse" />
          <div className="h-10 w-1/2 bg-white/10 rounded-lg mb-6 animate-pulse" />
          <div className="h-4 w-96 bg-white/10 rounded-full mb-3 animate-pulse" />
          <div className="h-4 w-80 bg-white/10 rounded-full mb-10 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-11 w-36 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-11 w-44 bg-white/10 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Featured skeleton */}
        <div className="h-5 w-24 bg-gray-200 rounded-full mb-6 animate-pulse" />
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-14 md:flex">
          <div className="w-full md:w-80 h-52 bg-gray-100 animate-pulse flex-shrink-0" />
          <div className="p-8 flex-1">
            <div className="h-3 w-20 bg-gray-100 rounded-full mb-4 animate-pulse" />
            <div className="h-7 w-full bg-gray-100 rounded-lg mb-3 animate-pulse" />
            <div className="h-7 w-3/4 bg-gray-100 rounded-lg mb-5 animate-pulse" />
            <div className="h-3 w-full bg-gray-100 rounded-full mb-2 animate-pulse" />
            <div className="h-3 w-2/3 bg-gray-100 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Articles grid skeleton */}
        <div className="h-5 w-32 bg-gray-200 rounded-full mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <div className="w-full h-44 bg-gray-100 animate-pulse" />
              <div className="p-5">
                <div className="h-3 w-16 bg-gray-100 rounded-full mb-3 animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded-lg mb-2 animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-100 rounded-lg mb-4 animate-pulse" />
                <div className="h-3 w-24 bg-gray-100 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Opportunities skeleton */}
        <div className="h-5 w-40 bg-gray-200 rounded-full mb-6 animate-pulse" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="h-4 w-64 bg-gray-100 rounded-lg mb-2 animate-pulse" />
                <div className="h-3 w-40 bg-gray-100 rounded-full animate-pulse" />
              </div>
              <div className="h-6 w-16 bg-gray-100 rounded-full ml-4 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}