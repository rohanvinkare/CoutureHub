import { useEffect, useState, useMemo, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getProducts, getProductsByCategory, getCategories } from '@/api/products.api'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { useSmartViews } from '@/hooks/useSmartViews'
import ErrorState from '@/components/common/ErrorState'
import { INVENTORY_CONFIG } from '@/constants/inventory'

// Sub-components
import { InventorySkeleton } from '@/components/inventory/InventorySkeleton'
import InventoryStats from '@/components/inventory/InventoryStats'
import InventoryControls from '@/components/inventory/InventoryControls'
import InventoryTable from '@/components/inventory/InventoryTable'
import InventoryMobileGrid from '@/components/inventory/InventoryMobileGrid'

const { ITEMS_PER_PAGE } = INVENTORY_CONFIG
const EMPTY_IMAGE = 'https://thecafetable.com/assets/images/no-product.png?v=3'

export default function InventoryOverview() {
  // Capture the category from the URL
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { history, addToHistory, clearHistory } = useSearchHistory()

  const [rawProducts, setRawProducts] = useState([]) // Store raw fetched data
  const [categories, setCategories] = useState([])

  // 1. Read from URL to set initial view
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'stock'
  const filterCategory = category || searchParams.get('category') || ''
  const filterStock = searchParams.get('stockStatus') || ''

  const debouncedSearch = useDebounce(search)
  const smartViews = useSmartViews() // Hook for frequent views

  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showHistory, setShowHistory] = useState(false)

  /* ------------------------------------------------------------------
   * Lifecycle & Effects
   * ------------------------------------------------------------------ */

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  // NOTE: Auto-restore disabled per user request. Users start fresh.
  const lastTrackedRef = useRef('')

  // PERSISTENCE & SMART TRACKING: Save state and track habits
  useEffect(() => {
    const currentState = {
      sort: sort,
      category: filterCategory,
      stockStatus: filterStock,
      search: search
    }

    // Clean up empty values
    Object.keys(currentState).forEach(key => {
      if (!currentState[key]) delete currentState[key]
    })

    // 1. Persistence
    if (Object.keys(currentState).length > 0) {
      localStorage.setItem('inventory_view_state', JSON.stringify(currentState))
    }

    // 2. Smart Tracking (Habits)
    const trackingKey = JSON.stringify(currentState)

    // Ignore if same as last time
    if (trackingKey === lastTrackedRef.current) return

    // Ignore "Default View" (Just sort=stock, nothing else)
    const isDefault = Object.keys(currentState).length === 1 && currentState.sort === 'stock'
    if (isDefault) return

    // If we passed checks, track it
    lastTrackedRef.current = trackingKey
    smartViews.trackView({
      category: filterCategory,
      stockStatus: filterStock,
      sort: sort
    })
  }, [sort, filterCategory, filterStock, search, smartViews.trackView])

  // Sync page reset when filters change
  useEffect(() => {
    setPage(0)
  }, [debouncedSearch, sort, filterCategory, filterStock])

  // Add to history when debounced search settles and is not empty
  useEffect(() => {
    if (debouncedSearch) {
      addToHistory(debouncedSearch)
    }
  }, [debouncedSearch, addToHistory])

  // Fetch only when the underlying data source criteria (category) changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        let data
        if (filterCategory) {
          data = await getProductsByCategory(filterCategory, 1000, 0)
        } else {
          data = await getProducts(1000, 0)
        }
        setRawProducts(data.products)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [filterCategory])

  /* ------------------------------------------------------------------
   * URL State Updaters
   * ------------------------------------------------------------------ */
  const updateParams = (keyOrUpdates, value) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev)

      if (typeof keyOrUpdates === 'object') {
        Object.entries(keyOrUpdates).forEach(([k, v]) => {
          if (v) newParams.set(k, v); else newParams.delete(k);
        })
      } else {
        if (value) {
          newParams.set(keyOrUpdates, value)
        } else {
          newParams.delete(keyOrUpdates)
        }
      }

      return newParams
    })
  }

  // Search handler helper
  const handleSearchChange = (val) => {
    updateParams('search', val)
    setShowHistory(true)
  }

  const clearAllFilters = () => {
    // 1. Clear persistence
    localStorage.removeItem('inventory_view_state')

    // 2. Reset local state
    setPage(0)

    // 3. Clear URL params
    setSearchParams({})
  }

  /* ------------------------------------------------------------------
   * Derived State for Counts
   * ------------------------------------------------------------------ */
  const stockCounts = useMemo(() => {
    let list = [...rawProducts]

    // 1. Text Search
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      list = list.filter(p =>
        (p.title && p.title.toLowerCase().includes(query)) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query))
      )
    }

    return {
      in_stock: list.filter(p => p.stock > 10).length,
      low_stock: list.filter(p => p.stock > 0 && p.stock <= 10).length,
      out_of_stock: list.filter(p => p.stock === 0).length,
      all: list.length
    }
  }, [rawProducts, debouncedSearch])

  /* ------------------------------------------------------------------
   * Memoized Data Processing (Final List)
   * ------------------------------------------------------------------ */
  const processedProducts = useMemo(() => {
    let list = [...rawProducts]

    // 1. Text Search
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      list = list.filter(p =>
        (p.title && p.title.toLowerCase().includes(query)) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query))
      )
    }

    // 2. Stock Status Filter
    if (filterStock) {
      if (filterStock === 'out_of_stock') {
        list = list.filter(p => p.stock === 0)
      } else if (filterStock === 'low_stock') {
        list = list.filter(p => p.stock > 0 && p.stock <= 10)
      } else if (filterStock === 'in_stock') {
        list = list.filter(p => p.stock > 10)
      }
    }

    // 3. Sorting
    if (sort === 'name') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'price_asc') {
      list.sort((a, b) => a.price - b.price)
    } else if (sort === 'price_desc') {
      list.sort((a, b) => b.price - a.price)
    } else if (sort === 'stock') {
      list.sort((a, b) => a.stock - b.stock)
    }

    return list
  }, [rawProducts, debouncedSearch, sort, filterStock])

  /* ------------------------------------------------------------------
   * Analytics Stats
   * ------------------------------------------------------------------ */
  const stats = useMemo(() => {
    const totalItems = processedProducts.length
    const totalValue = processedProducts.reduce((acc, curr) => acc + (curr.price * curr.stock), 0)
    const lowStockCount = processedProducts.filter(p => p.stock <= 10).length
    const avgRating = totalItems > 0 ? (processedProducts.reduce((acc, curr) => acc + curr.rating, 0) / totalItems) : 0

    return { totalItems, totalValue, lowStockCount, avgRating }
  }, [processedProducts])

  // Pagination
  const total = processedProducts.length
  const start = page * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const visibleProducts = processedProducts.slice(start, end)
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)


  if (error) return <ErrorState message={error} />
  if (loading) return <InventorySkeleton />

  return (
    <div className="h-full flex flex-col gap-6">
      {/* ================= TOP SECTION (Fixed) ================= */}
      <div className="flex-none space-y-4">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Inventory Products
          </h2>
          <div className="flex items-center gap-2">
            {/* Last Updated or similar could go here */}
          </div>
        </div>

        {/* Quick Analytics Dashboard */}
        {!loading && (
          <InventoryStats stats={stats} stockCounts={stockCounts} />
        )}

        {/* Controls Toolbar */}
        <InventoryControls
          search={search}
          handleSearchChange={handleSearchChange}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          history={history}
          clearHistory={clearHistory}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          categories={categories}
          filterCategory={filterCategory}
          filterStock={filterStock}
          stockCounts={stockCounts}
          sort={sort}
          updateParams={updateParams}
          clearAllFilters={clearAllFilters}
          categoryRoute={category}
          smartViews={smartViews}
        />
      </div>

      {!loading && visibleProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-dashed border-gray-300">
          <img src={EMPTY_IMAGE} alt="" className="w-48 opacity-50 mb-4" />
          <p className="text-gray-500 font-medium">No products found matching your criteria</p>
        </div>
      )}

      {/* ================= DATA VIEWS ================= */}
      {!loading && visibleProducts.length > 0 && (
        <>
          <InventoryTable products={visibleProducts} />
          <InventoryMobileGrid products={visibleProducts} />
        </>
      )}
    </div>
  )
}