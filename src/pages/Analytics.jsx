// import { useEffect, useMemo, useState } from 'react'
// import { getProducts } from '@/api/products.api'
// import {
//   Package,
//   AlertTriangle,
//   DollarSign,
//   CheckCircle2,
//   TrendingUp,
//   Tag,
//   Star
// } from 'lucide-react'

// export default function InventoryAnalytics() {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   /* ---------------- Fetch Data ---------------- */
//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         setLoading(true)
//         setError(null)
//         const data = await getProducts(0, 0)
//         setProducts(data?.products || [])
//       } catch {
//         setError('Failed to load analytics data')
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchProducts()
//   }, [])

//   /* ---------------- Derived Analytics ---------------- */
//   const stats = useMemo(() => {
//     const total = products.length
//     if (!total) return null

//     const inStock = products.filter(p => p.stock > 0).length
//     const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length

//     const inventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
//     const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / total

//     const categories = {}
//     const brands = {}

//     products.forEach(p => {
//       if (p.category) categories[p.category] = (categories[p.category] || 0) + 1
//       if (p.brand) brands[p.brand] = (brands[p.brand] || 0) + 1
//     })

//     // Sort and get max value for progress bars
//     const sortedCategories = Object.entries(categories)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 6)

//     const maxCategoryCount = sortedCategories[0]?.[1] || 1

//     const topBrands = Object.entries(brands)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 5)

//     const maxBrandCount = topBrands[0]?.[1] || 1

//     const avgRating = products.reduce((sum, p) => sum + (p.rating || 0), 0) / total

//     return {
//       total,
//       inStock,
//       stockPercentage: Math.round((inStock / total) * 100),
//       lowStock,
//       inventoryValue,
//       avgPrice,
//       sortedCategories,
//       maxCategoryCount,
//       topBrands,
//       maxBrandCount,
//       avgRating
//     }
//   }, [products])

//   /* ---------------- Formatters ---------------- */
//   const formatCurrency = (amount) =>
//     new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

//   /* ---------------- States ---------------- */
//   if (loading) return <DashboardSkeleton />
//   if (error) return <ErrorState message={error} />
//   if (!stats) return <EmptyState />

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50/50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Inventory Overview</h2>
//           <p className="text-xs sm:text-sm text-gray-500 mt-1">Real-time insights across your product catalog.</p>
//         </div>
//         <div className="flex items-center gap-2 self-start sm:self-auto">
//           <span className="text-[10px] sm:text-xs font-medium text-gray-500 bg-white border px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
//             Last updated: Just now
//           </span>
//         </div>
//       </div>

//       {/* KPI Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard
//           label="Total Products"
//           value={stats.total}
//           icon={Package}
//           color="blue"
//         />
//         <StatCard
//           label="Inventory Value"
//           value={formatCurrency(stats.inventoryValue)}
//           icon={DollarSign}
//           color="emerald"
//         />
//         <StatCard
//           label="Low Stock Items"
//           value={stats.lowStock}
//           subtext={`${stats.lowStock > 0 ? 'Requires attention' : 'Healthy levels'}`}
//           icon={AlertTriangle}
//           color={stats.lowStock > 0 ? "amber" : "gray"}
//         />
//         <StatCard
//           label="In Stock Rate"
//           value={`${stats.stockPercentage}%`}
//           icon={CheckCircle2}
//           color="indigo"
//         />
//       </div>

//       {/* Analytics Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

//         {/* Category Distribution (Spans 2 columns) */}
//         <DashboardCard title="Top Categories" icon={Tag} className="lg:col-span-2">
//           <div className="space-y-4 sm:space-y-5">
//             {stats.sortedCategories.map(([cat, count]) => (
//               <ProgressBarRow
//                 key={cat}
//                 label={cat}
//                 value={count}
//                 total={stats.maxCategoryCount}
//                 colorClass="bg-blue-600"
//               />
//             ))}
//           </div>
//         </DashboardCard>

//         {/* Right Column Stack */}
//         <div className="space-y-4 sm:space-y-6">
//           {/* Top Brands */}
//           <DashboardCard title="Top Brands" icon={TrendingUp}>
//             <div className="space-y-3 sm:space-y-4">
//               {stats.topBrands.map(([brand, count]) => (
//                 <ProgressBarRow
//                   key={brand}
//                   label={brand}
//                   value={count}
//                   total={stats.maxBrandCount}
//                   colorClass="bg-indigo-500"
//                   size="sm"
//                 />
//               ))}
//             </div>
//           </DashboardCard>

//           {/* Pricing & Rating Summary */}
//           <DashboardCard title="Catalog Health" icon={Star}>
//             <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
//               <div className="p-3 sm:p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
//                 <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-semibold tracking-wider">Avg Price</p>
//                 <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
//                   {formatCurrency(stats.avgPrice)}
//                 </p>
//               </div>
//               <div className="p-3 sm:p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
//                 <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-semibold tracking-wider">Avg Rating</p>
//                 <div className="flex items-center justify-center gap-1 mt-1">
//                   <span className="text-base sm:text-lg font-bold text-gray-900">{stats.avgRating.toFixed(1)}</span>
//                   <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
//                 </div>
//               </div>
//             </div>
//           </DashboardCard>
//         </div>
//       </div>
//     </div>
//   )
// }

// /* ---------------- Sub-Components ---------------- */

// function StatCard({ label, value, subtext, icon: Icon, color }) {
//   // Color mapping for backgrounds and text
//   const colors = {
//     blue: 'bg-blue-50 text-blue-600',
//     emerald: 'bg-emerald-50 text-emerald-600',
//     amber: 'bg-amber-50 text-amber-600',
//     indigo: 'bg-indigo-50 text-indigo-600',
//     gray: 'bg-gray-100 text-gray-600',
//   }

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-xs sm:text-sm font-medium text-gray-500">{label}</p>
//           <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{value}</h3>
//           {subtext && <p className="text-[10px] sm:text-xs text-gray-400 mt-1">{subtext}</p>}
//         </div>
//         <div className={`p-2 rounded-lg ${colors[color] || colors.gray}`}>
//           <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
//         </div>
//       </div>
//     </div>
//   )
// }

// function DashboardCard({ title, icon: Icon, children, className = '' }) {
//   return (
//     <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
//       <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 flex items-center gap-2">
//         {Icon && <Icon className="w-4 h-4 text-gray-400" />}
//         <h3 className="text-sm sm:text-base font-semibold text-gray-900">{title}</h3>
//       </div>
//       <div className="p-4 sm:p-6">
//         {children}
//       </div>
//     </div>
//   )
// }

// function ProgressBarRow({ label, value, total, colorClass, size = 'md' }) {
//   // Calculate width percentage relative to the highest item in the list
//   const percentage = Math.round((value / total) * 100)

//   return (
//     <div className="group">
//       <div className="flex justify-between text-xs sm:text-sm mb-1.5">
//         <span className="font-medium text-gray-700 capitalize truncate pr-2">{label}</span>
//         <span className="text-gray-500 font-mono text-[10px] sm:text-xs whitespace-nowrap">{value} items</span>
//       </div>
//       <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2 overflow-hidden">
//         <div
//           className={`h-full rounded-full ${colorClass} transition-all duration-500 ease-out`}
//           style={{ width: `${percentage}%` }}
//         />
//       </div>
//     </div>
//   )
// }

// /* ---------------- Loading / Error States ---------------- */

// function DashboardSkeleton() {
//   return (
//     <div className="p-4 sm:p-6 space-y-8 animate-pulse">
//       <div className="h-8 bg-gray-200 w-1/3 sm:w-1/4 rounded"></div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {[...Array(4)].map((_, i) => (
//           <div key={i} className="h-28 sm:h-32 bg-gray-200 rounded-xl"></div>
//         ))}
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 h-64 bg-gray-200 rounded-xl"></div>
//         <div className="h-64 bg-gray-200 rounded-xl"></div>
//       </div>
//     </div>
//   )
// }

// function ErrorState({ message }) {
//   return (
//     <div className="p-6">
//       <div className="rounded-xl border border-red-200 bg-red-50 p-6 flex items-center gap-3 text-red-700">
//         <AlertTriangle className="w-5 h-5" />
//         <span className="font-medium">{message}</span>
//       </div>
//     </div>
//   )
// }

// function EmptyState() {
//   return (
//     <div className="flex flex-col items-center justify-center h-64 text-gray-500">
//       <Package className="w-12 h-12 mb-2 opacity-20" />
//       <p>No inventory data available</p>
//     </div>
//   )
// }




import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '@/api/products.api'
import {
  Package,
  AlertTriangle,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Tag,
  Star
} from 'lucide-react'

export default function InventoryAnalytics() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /* ---------------- Fetch Data ---------------- */
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        const data = await getProducts(0, 0)
        setProducts(data?.products || [])
      } catch {
        setError('Failed to load analytics data')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  /* ---------------- Derived Analytics ---------------- */
  const stats = useMemo(() => {
    const total = products.length
    if (!total) return null

    const inStock = products.filter(p => p.stock > 0).length
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length

    const inventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
    const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / total

    const categories = {}
    const brands = {}

    products.forEach(p => {
      if (p.category) categories[p.category] = (categories[p.category] || 0) + 1
      if (p.brand) brands[p.brand] = (brands[p.brand] || 0) + 1
    })

    // Sort and get max value for progress bars
    const sortedCategories = Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)

    const maxCategoryCount = sortedCategories[0]?.[1] || 1

    const topBrands = Object.entries(brands)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    const maxBrandCount = topBrands[0]?.[1] || 1

    const avgRating = products.reduce((sum, p) => sum + (p.rating || 0), 0) / total

    return {
      total,
      inStock,
      stockPercentage: Math.round((inStock / total) * 100),
      lowStock,
      inventoryValue,
      avgPrice,
      sortedCategories,
      maxCategoryCount,
      topBrands,
      maxBrandCount,
      avgRating
    }
  }, [products])

  /* ---------------- Formatters ---------------- */
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

  /* ---------------- States ---------------- */
  if (loading) return <DashboardSkeleton />
  if (error) return <ErrorState message={error} />
  if (!stats) return <EmptyState />

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Inventory Overview</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Real-time insights across your product catalog.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Legibility Fix: Increased text size from text-[10px] to text-xs */}
          <span className="text-xs font-medium text-gray-500 bg-white border px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
            Last updated: Just now
          </span>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Products"
          value={stats.total}
          icon={Package}
          color="blue"
        />
        <StatCard
          label="Inventory Value"
          value={formatCurrency(stats.inventoryValue)}
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          label="Low Stock Items"
          value={stats.lowStock}
          subtext={`${stats.lowStock > 0 ? 'Requires attention' : 'Healthy levels'}`}
          icon={AlertTriangle}
          color={stats.lowStock > 0 ? "amber" : "gray"}
        />
        <StatCard
          label="In Stock Rate"
          value={`${stats.stockPercentage}%`}
          icon={CheckCircle2}
          color="indigo"
        />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Category Distribution (Spans 2 columns) */}
        <DashboardCard title="Top Categories" icon={Tag} className="lg:col-span-2">
          <div className="space-y-4 sm:space-y-5">
            {stats.sortedCategories.map(([cat, count]) => (
              <ProgressBarRow
                key={cat}
                label={cat}
                value={count}
                total={stats.maxCategoryCount}
                colorClass="bg-blue-600"
              />
            ))}
          </div>
        </DashboardCard>

        {/* Right Column Stack */}
        <div className="space-y-4 sm:space-y-6">
          {/* Top Brands */}
          <DashboardCard title="Top Brands" icon={TrendingUp}>
            <div className="space-y-3 sm:space-y-4">
              {stats.topBrands.map(([brand, count]) => (
                <ProgressBarRow
                  key={brand}
                  label={brand}
                  value={count}
                  total={stats.maxBrandCount}
                  colorClass="bg-indigo-500"
                  size="sm"
                />
              ))}
            </div>
          </DashboardCard>

          {/* Pricing & Rating Summary */}
          <DashboardCard title="Catalog Health" icon={Star}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-semibold tracking-wider">Avg Price</p>
                <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
                  {formatCurrency(stats.avgPrice)}
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-semibold tracking-wider">Avg Rating</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-base sm:text-lg font-bold text-gray-900">{stats.avgRating.toFixed(1)}</span>
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Sub-Components ---------------- */

function StatCard({ label, value, subtext, icon: Icon, color }) {
  // Color mapping for backgrounds and text
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    gray: 'bg-gray-100 text-gray-600',
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-500">{label}</p>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{value}</h3>
          {/* Contrast Fix: text-gray-400 -> text-gray-500 */}
          {subtext && <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className={`p-2 rounded-lg ${colors[color] || colors.gray}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, icon: Icon, children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-400" aria-hidden="true" />}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="p-4 sm:p-6">
        {children}
      </div>
    </div>
  )
}

function ProgressBarRow({ label, value, total, colorClass, size = 'md' }) {
  // Calculate width percentage relative to the highest item in the list
  const percentage = Math.round((value / total) * 100)

  return (
    <div className="group">
      <div className="flex justify-between text-xs sm:text-sm mb-1.5">
        <span className="font-medium text-gray-700 capitalize truncate pr-2">{label}</span>
        <span className="text-gray-500 font-mono text-[10px] sm:text-xs whitespace-nowrap">{value} items</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 sm:h-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

/* ---------------- Loading / Error States ---------------- */

function DashboardSkeleton() {
  return (
    <div className="p-4 sm:p-6 space-y-8 animate-pulse">
      <div className="h-8 bg-gray-200 w-1/3 sm:w-1/4 rounded"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 sm:h-32 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 bg-gray-200 rounded-xl"></div>
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <div className="p-6">
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 flex items-center gap-3 text-red-700">
        <AlertTriangle className="w-5 h-5" aria-hidden="true" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
      <Package className="w-12 h-12 mb-2 opacity-20" aria-hidden="true" />
      <p>No inventory data available</p>
    </div>
  )
}
