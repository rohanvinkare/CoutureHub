import { useEffect, useState, useMemo } from 'react'
import { getCategories, getProductsByCategory } from '@/api/products.api'
import ErrorState from '@/components/common/ErrorState'

// Sub-components
import CategorySkeleton from '@/components/categories/CategorySkeleton'
import CategoryHeader from '@/components/categories/CategoryHeader'
import CategoryStats from '@/components/categories/CategoryStats'
import CategoryGrid from '@/components/categories/CategoryGrid'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // View State
  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState('count_desc') // Default: Most items first

  useEffect(() => {
    const fetchCategoriesWithStats = async () => {
      try {
        const data = await getCategories()

        const enriched = await Promise.all(
          data.map(async (cat) => {
            // Fetch 1 product to get stats (total count) and image
            const res = await getProductsByCategory(cat.slug, 1, 0)
            const product = res.products?.[0]

            return {
              slug: cat.slug,
              name: cat.name,
              image: product?.thumbnail || 'https://thecafetable.com/assets/images/no-product.png?v=3',
              totalProducts: res.total || 0
            }
          })
        )

        setCategories(enriched)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoriesWithStats()
  }, [])

  // Derived Analytics
  const stats = useMemo(() => {
    const totalData = {
      categories: categories.length,
      products: categories.reduce((acc, c) => acc + c.totalProducts, 0),
      topCategory: categories.length > 0 ? categories.reduce((prev, current) => (prev.totalProducts > current.totalProducts) ? prev : current) : null
    }
    return totalData
  }, [categories])


  // Processing: Filter -> Sort
  const processedCategories = useMemo(() => {
    let result = categories.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Sorting
    if (sort === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'name_desc') {
      result.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sort === 'count_desc') {
      result.sort((a, b) => b.totalProducts - a.totalProducts)
    } else if (sort === 'count_asc') {
      result.sort((a, b) => a.totalProducts - b.totalProducts)
    }

    return result
  }, [categories, searchTerm, sort])


  if (loading) return <CategorySkeleton />
  if (error) return <ErrorState message={error} />

  return (
    <div className="space-y-5 h-full flex flex-col">
      {/* ================= HEADER & ANALYTICS ================= */}
      <div className="flex-none space-y-4">

        <CategoryHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sort={sort}
          setSort={setSort}
        />

        <CategoryStats stats={stats} />

      </div>

      {/* ================= CONTENT GRID ================= */}
      <CategoryGrid
        categories={processedCategories}
        searchTerm={searchTerm}
      />
    </div>
  )
}