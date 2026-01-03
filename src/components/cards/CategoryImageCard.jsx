import { Link } from 'react-router-dom'
import { ArrowRight, Package } from 'lucide-react'

export default function CategoryImageCard({ category }) {
  return (
    <Link
      // FIX: Matches <Route path="/categories/:category" ... /> in App.js
      to={`/categories/${category.slug}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image Area with Gradient Overlay */}
      <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
        />
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 capitalize group-hover:text-indigo-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" />
            Browse Collection
          </p>
        </div>

        {/* Animated Arrow */}
        <div className="flex items-center text-sm font-semibold text-indigo-600 mt-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
          View Products <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  )
}