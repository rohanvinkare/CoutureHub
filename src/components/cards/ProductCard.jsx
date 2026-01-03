import { Link } from 'react-router-dom'
import { Star, AlertCircle } from 'lucide-react'

export default function ProductCard({ product }) {
  // Calculate discounted price for display
  const finalPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
  const isLowStock = product.stock > 0 && product.stock < 10
  const isOutOfStock = product.stock === 0

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gray-50 p-4 flex items-center justify-center overflow-hidden">

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand & Category */}
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">{product.brand}</span>
          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
            <span>{product.rating}</span>
            <Star className="w-3 h-3 fill-current" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-gray-900">
              ${finalPrice}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${product.price}
              </span>
            )}
          </div>

          {/* Stock Status & Action */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
            {isOutOfStock ? (
              <span className="text-xs font-medium text-red-500 flex items-center gap-1">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="text-xs font-medium text-orange-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Only {product.stock} left
              </span>
            ) : (
              <span className="text-xs font-medium text-emerald-600">
                {product.stock} in stock
              </span>
            )}

            <Link
              to={`/product/${product.id}`}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}