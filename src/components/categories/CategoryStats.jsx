import { LayoutGrid, Package, Trophy } from 'lucide-react'

export default function CategoryStats({ stats }) {
    if (!stats) return null

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Total Categories */}
            <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-sm flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-600">
                    <LayoutGrid className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Categories</p>
                    <p className="text-2xl font-bold text-gray-900 leading-none mt-0.5">{stats.categories}</p>
                </div>
            </div>

            {/* Total Inventory Items */}
            <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600">
                    <Package className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900 leading-none mt-0.5">{stats.products.toLocaleString()}</p>
                </div>
            </div>

            {/* Top Category */}
            {stats.topCategory && (
                <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-sm flex items-center gap-3">
                    <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Top Category</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-lg font-bold text-gray-900 capitalize truncate">
                                {stats.topCategory.name}
                            </p>
                            <p className="text-xs text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded-md leading-none">{stats.topCategory.totalProducts}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
