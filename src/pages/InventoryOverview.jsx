
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProducts, getProductsByCategory, getCategories } from '@/api/products.api'
import { useDebounce } from '@/hooks/useDebounce'
import Loader from '@/components/common/Loader'
import ErrorState from '@/components/common/ErrorState'
import ProductCard from '@/components/cards/ProductCard'
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  MoreHorizontal,
  ArrowUpDown,
  AlertCircle,
  Hash
} from 'lucide-react'

const LIMIT = 20
const LOW_STOCK_THRESHOLD = 10
const EMPTY_IMAGE = 'https://thecafetable.com/assets/images/no-product.png?v=3'

export default function InventoryOverview() {
  // Capture the category from the URL
  const { category } = useParams()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const [sort, setSort] = useState('')

  // Initialize filter with the URL param if present
  const [filterCategory, setFilterCategory] = useState(category || '')

  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  /* ------------------------------------------------------------------
   * Lifecycle & Effects
   * ------------------------------------------------------------------ */

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setFilterCategory(category || '')
    setSearch('')
    setPage(0)
  }, [category])

  useEffect(() => {
    if (debouncedSearch) {
      setFilterCategory('')
      setPage(0)
    }
  }, [debouncedSearch])

  useEffect(() => {
    setPage(0)
  }, [sort, filterCategory])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        let list = []

        if (filterCategory) {
          const data = await getProductsByCategory(filterCategory, 1000, 0)
          list = data.products
        } else {
          const data = await getProducts(1000, 0)
          list = data.products
        }

        if (debouncedSearch) {
          const query = debouncedSearch.toLowerCase()
          list = list.filter(p =>
            p.title.toLowerCase().includes(query)
          )
        }

        if (sort === 'name') {
          list.sort((a, b) => a.title.localeCompare(b.title))
        } else if (sort === 'price_asc') {
          list.sort((a, b) => a.price - b.price)
        } else if (sort === 'price_desc') {
          list.sort((a, b) => b.price - a.price)
        } else if (sort === 'stock') {
          list.sort((a, b) => a.stock - b.stock)
        }

        setTotal(list.length)
        const start = page * LIMIT
        const end = start + LIMIT
        setProducts(list.slice(start, end))
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [debouncedSearch, filterCategory, sort, page])

  /* ------------------------------------------------------------------
   * Render Helpers
   * ------------------------------------------------------------------ */
  const totalPages = Math.ceil(total / LIMIT)

  const getDiscountedPrice = (price, discount) => {
    return (price - (price * (discount / 100))).toFixed(2)
  }

  if (error) return <ErrorState message={error} />

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Inventory Products
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 bg-white border px-3 py-1.5 rounded-full shadow-sm">
            Total Items: <span className="font-bold text-gray-900">{total}</span>
          </span>
        </div>
      </div>

      {/* Controls Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">

        {/* Search Bar */}
        <div className="relative w-full lg:w-96">
          <label htmlFor="inventory-search" className="sr-only">Search inventory</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="inventory-search"
            type="text"
            placeholder="Search by name, brand..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 h-10 w-full rounded-lg border-gray-200 bg-gray-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Filters & Sort */}
        <div className="flex w-full lg:w-auto gap-3">
          {/* Category Dropdown */}
          <div className="relative w-full lg:w-48">
            <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <select
              id="category-filter"
              value={filterCategory}
              onChange={e => { setFilterCategory(e.target.value); setSearch('') }}
              className="pl-10 h-10 w-full rounded-lg border-gray-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none cursor-pointer"
            >
              <option value="" className={filterCategory === '' ? 'hidden' : ''}>All Categories</option>
              {categories.map(c => (
                <option
                  key={c.slug}
                  value={c.slug}
                  className={filterCategory === c.slug ? 'hidden' : ''}
                >
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full lg:w-44">
            <label htmlFor="sort-order" className="sr-only">Sort Products</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ArrowUpDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <select
              id="sort-order"
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="pl-10 h-10 w-full rounded-lg border-gray-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none cursor-pointer"
            >
              <option value="" className={sort === '' ? 'hidden' : ''}>Sort By</option>
              <option value="name" className={sort === 'name' ? 'hidden' : ''}>Name (A-Z)</option>
              <option value="price_asc" className={sort === 'price_asc' ? 'hidden' : ''}>Price: Low to High</option>
              <option value="price_desc" className={sort === 'price_desc' ? 'hidden' : ''}>Price: High to Low</option>
              <option value="stock" className={sort === 'stock' ? 'hidden' : ''}>Stock Level</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

      </div>

      {loading && <Loader />}

      {!loading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-dashed border-gray-300">
          <img src={EMPTY_IMAGE} alt="" className="w-48 opacity-50 mb-4" />
          <p className="text-gray-500 font-medium">No products found matching your criteria</p>
        </div>
      )}

      {/* ================= DESKTOP TABLE ================= */}
      {!loading && products.length > 0 && (
        <>
          <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <tr>
                  <th scope="col" className="pl-6 pr-3 py-4 w-[60px]">SKU</th>
                  <th scope="col" className="px-3 py-4 w-[350px]">Product</th>
                  <th scope="col" className="px-3 py-4">Category</th>
                  <th scope="col" className="px-3 py-4">Stock</th>
                  <th scope="col" className="px-3 py-4 text-right">Price</th>
                  <th scope="col" className="px-3 py-4 text-center">Rating</th>
                  <th scope="col" className="pr-6 pl-3 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {products.map(p => {
                  const finalPrice = getDiscountedPrice(p.price, p.discountPercentage)

                  return (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors group">

                      {/* SKU / ID - Contrast fixed: text-gray-400 -> text-gray-500 */}
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
                            <img src={p.thumbnail} alt="" className="h-full w-full object-contain mix-blend-multiply" />
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
                            <span className={`text-sm font-semibold ${p.stock < LOW_STOCK_THRESHOLD ? 'text-red-700' : 'text-gray-700'}`}>
                              {p.stock}
                            </span>
                            {p.stock < LOW_STOCK_THRESHOLD && (
                              <span className="text-[10px] font-medium text-red-700 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" aria-hidden="true" /> Low
                              </span>
                            )}
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${p.stock < LOW_STOCK_THRESHOLD ? 'bg-red-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min(p.stock, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Price - Contrast fixed: text-gray-400 -> 500, text-emerald-600 -> 700 */}
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

                      {/* Actions - Added aria-label */}
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

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center pt-6">
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 0))}
                  disabled={page === 0}
                  aria-label="Previous Page"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  if (i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 1) {
                    return (
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 ${i === page
                          ? 'z-10 bg-indigo-600 text-white ring-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                          : 'text-gray-900 ring-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        {i + 1}
                      </button>
                    )
                  }
                  if (i === page - 2 || i === page + 2) {
                    return <span key={i} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>
                  }
                  return null
                })}

                <button
                  onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
                  disabled={page + 1 >= totalPages}
                  aria-label="Next Page"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          )}
        </>
      )}

      {/* ================= MOBILE (Fallback to Cards) ================= */}
      {products.length > 0 && (
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}