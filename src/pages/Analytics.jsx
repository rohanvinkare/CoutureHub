



import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '@/api/products.api'
import {
  Package,
  AlertTriangle,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Tag,
  Star,
  BarChart3,
  PieChart,
  Percent
} from 'lucide-react'

// Charts
import CategoryDistributionChart from '@/components/analytics/charts/CategoryDistributionChart'
import BrandPerformanceChart from '@/components/analytics/charts/BrandPerformanceChart'
import PriceDistributionChart from '@/components/analytics/charts/PriceDistributionChart'
import StockStatusChart from '@/components/analytics/charts/StockStatusChart'
import RatingDistributionChart from '@/components/analytics/charts/RatingDistributionChart'
import DiscountDistributionChart from '@/components/analytics/charts/DiscountDistributionChart'
import InventoryValueByCategoryChart from '@/components/analytics/charts/InventoryValueByCategoryChart'

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
        // Fetch ALL products for accurate analytics
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

    // Data Aggregation for Charts
    const categories = {}
    const brands = {}

    products.forEach(p => {
      if (p.category) categories[p.category] = (categories[p.category] || 0) + 1
      if (p.brand) brands[p.brand] = (brands[p.brand] || 0) + 1
    })

    return {
      total,
      inStock,
      stockPercentage: Math.round((inStock / total) * 100),
      lowStock,
      inventoryValue,
      categories,
      brands
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
    <div className="space-y-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex-none flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Analytics Dashboard</h2>
          <p className="text-sm text-gray-500">Real-time performance metrics and inventory insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 bg-white border px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Data
          </span>
        </div>
      </div>

      {/* Main Scrollable Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
        <div className="space-y-4 pb-12">

          {/* KPI Section - Compact 4 Cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Products" value={stats.total} icon={Package} color="blue" />
            <StatCard label="Total Value" value={formatCurrency(stats.inventoryValue)} icon={DollarSign} color="emerald" />
            <StatCard label="Low Stock Impact" value={stats.lowStock} subtext="Items below threshold" icon={AlertTriangle} color={stats.lowStock > 0 ? "amber" : "gray"} />
            <StatCard label="Stock Health" value={`${stats.stockPercentage}%`} icon={CheckCircle2} color="indigo" />
          </div>

          {/* Charts Grid - High Density Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">

            {/* --- Row 1: Core Distribution --- */}

            {/* 1. Category Dist (Doughnut) */}
            <ChartCard title="Category Mix" icon={PieChart}>
              <CategoryDistributionChart categories={stats.categories} />
            </ChartCard>

            {/* 2. Brand Performance (Bar) - Spans 2 cols on wide */}
            <div className="md:col-span-2 xl:col-span-1 2xl:col-span-2">
              <ChartCard title="Top Brands by Volume" icon={TrendingUp}>
                <BrandPerformanceChart brands={stats.brands} />
              </ChartCard>
            </div>

            {/* 3. Stock Health (Pie) */}
            <ChartCard title="Stock Status" icon={AlertTriangle}>
              <div className="flex items-center justify-center h-full">
                <StockStatusChart products={products} />
              </div>
            </ChartCard>


            {/* --- Row 2: Financial & Pricing --- */}

            {/* 4. Value by Category (Bar) - Spans 2 cols */}
            <div className="md:col-span-2 2xl:col-span-2">
              <ChartCard title="Inventory Value by Category" icon={DollarSign}>
                <InventoryValueByCategoryChart products={products} />
              </ChartCard>
            </div>

            {/* 5. Price Segments (Histogram) */}
            <ChartCard title="Price Segments" icon={Tag}>
              <PriceDistributionChart products={products} />
            </ChartCard>

            {/* 6. Discount Strategy (Bar) */}
            <ChartCard title="Discount Strategy" icon={Percent}>
              <DiscountDistributionChart products={products} />
            </ChartCard>


            {/* --- Row 3: Satisfaction --- */}

            {/* 7. Ratings (Bar) */}
            <div className="xl:col-span-1">
              <ChartCard title="Customer Ratings" icon={Star}>
                <RatingDistributionChart products={products} />
              </ChartCard>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Sub-Components ---------------- */

function StatCard({ label, value, subtext, icon: Icon, color }) {
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
          {subtext && <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className={`p-2 rounded-lg ${colors[color] || colors.gray}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function ChartCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-gray-400" aria-hidden="true" />}
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      <div className="p-5 flex-1 relative min-h-[300px] flex flex-col justify-center">
        {children}
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
        <div className="lg:col-span-2 h-80 bg-gray-200 rounded-xl"></div>
        <div className="h-80 bg-gray-200 rounded-xl"></div>
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
