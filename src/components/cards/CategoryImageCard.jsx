


import { Link } from 'react-router-dom'
import { ArrowRight, Package } from 'lucide-react'

export default function CategoryImageCard({ category }) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      aria-label={`View ${category.name} category`}
    >
      {/* Image Area with Gradient Overlay */}
      <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
        <img
          src={category.image}
          alt="" 
          role="presentation"
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
          {/* Contrast Fix: text-gray-500 -> text-gray-600 */}
          <p className="text-xs text-gray-600 font-medium mt-1 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" aria-hidden="true" />
            Browse Collection
          </p>
        </div>

        {/* Animated Arrow */}
        <div 
          className="flex items-center text-sm font-semibold text-indigo-600 mt-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75"
          aria-hidden="true" // Hidden from screen readers to avoid reading redundant "View Products" inside the link
        >
          View Products <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  )
}