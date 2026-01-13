import { Hash, DollarSign, Activity } from 'lucide-react'
import { Star } from 'lucide-react'

export default function InventoryStats({ stats, stockCounts }) {
    if (!stats) return null

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Products */}
            <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-[0_2px_8px_rgb(99,102,241,0.08)] flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Products</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalItems}</p>
                </div>
                <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Hash className="h-6 w-6" />
                </div>
            </div>

            {/* Inventory Value */}
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-[0_2px_8px_rgb(16,185,129,0.08)] flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Value</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        ${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                </div>
                <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <DollarSign className="h-6 w-6" />
                </div>
            </div>

            {/* Stock Health (Responsive Split) */}
            <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center gap-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mt-1">Stock Health</p>
                <div className="grid grid-cols-3 gap-2 text-center h-full items-center p-1">
                    {/* Out */}
                    <div className="flex flex-col items-center justify-center py-2 rounded-xl bg-red-50/80 text-red-700 border border-red-100">
                        <span className="text-xl font-bold leading-none">{stockCounts.out_of_stock}</span>
                        <span className="text-[10px] uppercase font-bold mt-1 opacity-80">Out</span>
                    </div>
                    {/* Low */}
                    <div className="flex flex-col items-center justify-center py-2 rounded-xl bg-amber-50/80 text-amber-700 border border-amber-100">
                        <span className="text-xl font-bold leading-none">{stockCounts.low_stock}</span>
                        <span className="text-[10px] uppercase font-bold mt-1 opacity-80">Low</span>
                    </div>
                    {/* In */}
                    <div className="flex flex-col items-center justify-center py-2 rounded-xl bg-emerald-50/80 text-emerald-700 border border-emerald-100">
                        <span className="text-xl font-bold leading-none">{stockCounts.in_stock}</span>
                        <span className="text-[10px] uppercase font-bold mt-1 opacity-80">In</span>
                    </div>
                </div>
            </div>

            {/* Average Rating */}
            <div className="bg-white p-5 rounded-2xl border border-violet-100 shadow-[0_2px_8px_rgb(139,92,246,0.08)] flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Rating</p>
                    <div className="flex items-center gap-2 mt-2">
                        <p className="text-3xl font-bold text-gray-900">
                            {stats.avgRating.toFixed(1)}
                        </p>
                        <div className="flex -space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= Math.round(stats.avgRating) ? 'fill-violet-400 text-violet-400' : 'fill-gray-200 text-gray-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-12 w-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
                    <Activity className="h-6 w-6" />
                </div>
            </div>
        </div>
    )
}
