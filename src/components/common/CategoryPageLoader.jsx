export default function CategoryPageLoader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="border rounded-xl overflow-hidden bg-white animate-pulse"
        >
          {/* Image skeleton */}
          <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
            <div className="h-24 w-24 bg-gray-300 rounded-md" />
          </div>

          {/* Category name skeleton */}
          <div className="p-4 text-center">
            <div className="mx-auto h-6 w-32 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}
