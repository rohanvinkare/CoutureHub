


import { Link } from 'react-router-dom'
import { ArrowRight, Package } from 'lucide-react'

export default function CategoryImageCard({ category }) {
  return (
    <Link
      to={`/inventory?category=${category.slug}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 shadow-[0_2px_8px_-3px_rgba(6,81,237,0.1)] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label={`View ${category.name} category`}
    >
      {/* Image Area with Gradient Overlay - Compact Aspect Ratio */}
      <div className="aspect-[3/2] bg-gray-50/50 relative overflow-hidden flex items-center justify-center">
        <img
          src={category.image}
          alt=""
          role="presentation"
          className="h-[85%] w-[85%] object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
        />
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 relative">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold text-gray-900 capitalize group-hover:text-indigo-600 transition-colors leading-tight">
              {category.name}
            </h3>
            {/* Item Count Badge */}
            <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors uppercase tracking-wide">
              <Package className="w-3 h-3" />
              {category.totalProducts ?? '-'} Items
            </span>
          </div>
        </div>

        {/* Animated Arrow (Bottom Right) */}
        <div
          className="absolute bottom-4 right-4 h-7 w-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-sm"
          aria-hidden="true"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  )
}