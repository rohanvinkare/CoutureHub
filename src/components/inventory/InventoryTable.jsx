import { Link } from 'react-router-dom'
import {
    MoreHorizontal,
    AlertCircle,
    Hash,
    Star
} from 'lucide-react'

// Helper for discounting
const getDiscountedPrice = (price, discount) => {
    return (price - (price * (discount / 100))).toFixed(2)
}

export default function InventoryTable({ products }) {
    if (!products || products.length === 0) return null

    return (
        <div
            className="hidden lg:block flex-1 min-h-0 overflow-auto bg-white rounded-lg shadow-sm ring-1 ring-gray-200 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <table className="w-full text-sm text-left">
                {/* Sticky Header: bg-white to ensure no transparency issues */}
                <thead className="bg-gray-50/75 backdrop-blur-sm border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider sticky top-0 z-30 shadow-sm">
                    <tr>
                        <th scope="col" className="pl-6 pr-3 py-4 w-[60px] bg-gray-50">SKU</th>
                        <th scope="col" className="px-3 py-4 w-[350px] bg-gray-50">Product</th>
                        <th scope="col" className="px-3 py-4 bg-gray-50">Category</th>
                        <th scope="col" className="px-3 py-4 bg-gray-50">Stock</th>
                        <th scope="col" className="px-3 py-4 text-right bg-gray-50">Price</th>
                        <th scope="col" className="px-3 py-4 text-center bg-gray-50">Rating</th>
                        <th scope="col" className="pr-6 pl-3 py-4 text-right bg-gray-50">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {products.map(p => {
                        const finalPrice = getDiscountedPrice(p.price, p.discountPercentage)

                        return (
                            <tr key={p.id} className="hover:bg-gray-50/80 transition-colors group">
                                {/* SKU / ID */}
                                <td className="pl-6 pr-3 py-4 align-top">
                                    <div className="flex items-center gap-1 text-gray-500 mt-2 font-mono text-xs">
                                        <Hash className="w-3 h-3" aria-hidden="true" />
                                        {p.id}
                                    </div>
                                </td>

                                {/* Product Details */}
                                <td className="px-3 py-4">
                                    <div className="flex gap-4">
                                        <div className="h-14 w-14 rounded-lg border border-gray-100 bg-gray-50 p-1 shrink-0">
                                            <img
                                                src={p.thumbnail}
                                                alt=""
                                                width="56"
                                                height="56"
                                                loading="lazy"
                                                className="h-full w-full object-contain mix-blend-multiply"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center min-w-0">
                                            <Link
                                                to={`/product/${p.id}`}
                                                className="font-semibold text-gray-900 hover:text-indigo-600 truncate text-sm leading-tight"
                                            >
                                                {p.title}
                                            </Link>
                                            <span className="text-xs text-gray-500 mt-1">{p.brand}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-3 py-4 align-middle">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 capitalize border border-gray-200">
                                        {p.category}
                                    </span>
                                </td>

                                {/* Stock */}
                                <td className="px-3 py-4 align-middle">
                                    <div className="w-32">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className={`text-sm font-semibold 
                                ${p.stock === 0 ? 'text-red-700' :
                                                    p.stock <= 10 ? 'text-amber-700' : 'text-emerald-700'}`}>
                                                {p.stock === 0 ? 'Out of Stock' : p.stock}
                                            </span>
                                            {p.stock <= 10 && p.stock > 0 && (
                                                <span className="text-[10px] font-medium text-amber-700 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" aria-hidden="true" /> Low
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full 
                                ${p.stock === 0 ? 'bg-red-500' :
                                                        p.stock <= 10 ? 'bg-amber-400' : 'bg-emerald-500'}`}
                                                style={{ width: `${Math.min(p.stock, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="px-3 py-4 text-right align-middle">
                                    <div className="flex flex-col items-end gap-0.5">
                                        <span className="font-bold text-gray-900">${finalPrice}</span>
                                        {p.discountPercentage > 0 && (
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <span className="text-gray-500 line-through decoration-gray-400">${p.price}</span>
                                                <span className="text-emerald-700 font-medium bg-emerald-50 px-1 rounded">-{Math.round(p.discountPercentage)}%</span>
                                            </div>
                                        )}
                                    </div>
                                </td>

                                {/* Rating */}
                                <td className="px-3 py-4 align-middle">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <Star className={`h-4 w-4 ${p.rating >= 4 ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-300'}`} aria-hidden="true" />
                                        <span className="text-sm font-medium text-gray-700">{p.rating}</span>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="pr-6 pl-3 py-4 text-right align-middle">
                                    <button
                                        className="text-gray-500 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        aria-label={`Actions for ${p.title}`}
                                    >
                                        <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
