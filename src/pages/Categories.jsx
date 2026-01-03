// import { useEffect, useState } from 'react'
// import { getCategories, getProductsByCategory } from '../api/products.api'
// import CategoryPageLoader from '../components/common/CategoryPageLoader'
// import ErrorState from '../components/common/ErrorState'
// import CategoryImageCard from '../components/cards/CategoryImageCard'
// import { Search, LayoutGrid } from 'lucide-react'

// export default function Categories() {
//   const [categories, setCategories] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     const fetchCategoriesWithImage = async () => {
//       try {
//         const data = await getCategories()

//         const enriched = await Promise.all(
//           data.map(async (cat) => {
//             // Optimization: Fetch only 1 product to get the thumbnail image faster
//             const res = await getProductsByCategory(cat.slug, 1, 0)
//             const product = res.products?.[0]

//             return {
//               slug: cat.slug,
//               name: cat.name,
//               image: product?.thumbnail || 'https://thecafetable.com/assets/images/no-product.png?v=3'
//             }
//           })
//         )

//         setCategories(enriched)
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCategoriesWithImage()
//   }, [])

//   // Client-side filtering
//   const filteredCategories = categories.filter(c =>
//     c.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   if (loading) return <CategoryPageLoader />
//   if (error) return <ErrorState message={error} />

//   return (
//     <div className="space-y-8">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <div className="flex items-center gap-3 mb-1">
//             <div className="p-2 bg-indigo-600 rounded-lg shadow-sm">
//               <LayoutGrid className="w-5 h-5 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
//               Categories
//             </h2>
//           </div>
//           <p className="text-gray-500 text-sm pl-1">
//             Select a category to view products
//           </p>
//         </div>

//         {/* Search Bar */}
//         <div className="relative w-full md:w-72 group">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
//           </div>
//           <input
//             type="text"
//             placeholder="Filter categories..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="block w-full rounded-xl border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
//           />
//         </div>
//       </div>

//       {/* Content Grid */}
//       {filteredCategories.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {filteredCategories.map(cat => (
//             <CategoryImageCard
//               key={cat.slug}
//               category={cat}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
//           <Search className="w-10 h-10 mb-3 opacity-20" />
//           <p>No categories found matching "{searchTerm}"</p>
//         </div>
//       )}
//     </div>
//   )
// }




import { useEffect, useState } from 'react'
import { getCategories, getProductsByCategory } from '@/api/products.api'
import CategoryPageLoader from '@/components/common/CategoryPageLoader'
import ErrorState from '@/components/common/ErrorState'
import CategoryImageCard from '@/components/cards/CategoryImageCard'
import { Search, LayoutGrid } from 'lucide-react'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchCategoriesWithImage = async () => {
      try {
        const data = await getCategories()

        const enriched = await Promise.all(
          data.map(async (cat) => {
            // Optimization: Fetch only 1 product to get the thumbnail image faster
            const res = await getProductsByCategory(cat.slug, 1, 0)
            const product = res.products?.[0]

            return {
              slug: cat.slug,
              name: cat.name,
              image: product?.thumbnail || 'https://thecafetable.com/assets/images/no-product.png?v=3'
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

    fetchCategoriesWithImage()
  }, [])

  // Client-side filtering
  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <CategoryPageLoader />
  if (error) return <ErrorState message={error} />

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-sm">
              <LayoutGrid className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Categories
            </h2>
          </div>
          <p className="text-gray-500 text-sm pl-1">
            Select a category to view products
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 group">
          {/* Accessible Label */}
          <label htmlFor="category-search" className="sr-only">
            Filter categories
          </label>

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Contrast fix: text-gray-400 -> text-gray-500 */}
            <Search className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-600 transition-colors" aria-hidden="true" />
          </div>
          <input
            id="category-search"
            type="text"
            placeholder="Filter categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-xl border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
          />
        </div>
      </div>

      {/* Content Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCategories.map(cat => (
            <CategoryImageCard
              key={cat.slug}
              category={cat}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
          <Search className="w-10 h-10 mb-3 opacity-20" aria-hidden="true" />
          <p>No categories found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}