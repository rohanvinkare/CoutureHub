// import { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { getProductById, getProductsByCategory } from '@/api/products.api'
// import Loader from '@/components/common/Loader'
// import ErrorState from '@/components/common/ErrorState'
// import ProductCard from '@/components/cards/ProductCard'
// import {
//   Star,
//   Truck,
//   ShieldCheck,
//   RotateCcw,
//   Package,
//   ChevronRight,
//   Home,
//   Tag,
//   User
// } from 'lucide-react'

// export default function ProductDetails() {
//   const { id } = useParams()

//   const [product, setProduct] = useState(null)
//   const [similar, setSimilar] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [activeImage, setActiveImage] = useState('')

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         const prod = await getProductById(id)
//         setProduct(prod)
//         setActiveImage(prod.thumbnail)

//         // Fetch similar items based on category
//         const related = await getProductsByCategory(prod.category)
//         setSimilar(
//           related.products
//             .filter(p => p.id !== prod.id)
//             .slice(0, 6)
//         )
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [id])

//   if (loading) return <Loader />
//   if (error) return <ErrorState message={error} />

//   // Combine thumbnail and extra images
//   const images = [product.thumbnail, ...(product.images || [])]
//   const uniqueImages = [...new Set(images)]

//   return (
//     <div className="min-h-screen bg-gray-50/30 pb-12 sm:pb-20">

//       {/* Breadcrumb Navigation */}
//       <div className="border-b bg-white sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-hidden">
//           <Link to="/" className="hover:text-indigo-600 transition-colors flex-shrink-0">
//             <Home className="w-4 h-4" />
//           </Link>
//           <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//           <Link to="/inventory" className="hover:text-indigo-600 transition-colors flex-shrink-0">Inventory</Link>
//           <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
//           <span className="text-gray-900 font-medium truncate">{product.title}</span>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-12">

//         {/* ================= 1. MAIN PRODUCT CARD ================= */}
//         <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">

//             {/* LEFT: Image Gallery */}
//             <div className="p-4 sm:p-6 lg:p-8 bg-gray-50/50 flex flex-col gap-4 sm:gap-6">
//               {/* Main Active Image */}
//               <div className="bg-white rounded-xl border border-gray-200 aspect-square flex items-center justify-center p-4 shadow-sm relative overflow-hidden group">
//                 <img
//                   src={activeImage}
//                   alt={product.title}
//                   className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
//                 />
//               </div>

//               {/* Thumbnails Strip */}
//               <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
//                 {uniqueImages.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setActiveImage(img)}
//                     className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg border bg-white flex items-center justify-center transition-all ${activeImage === img
//                       ? 'border-indigo-600 ring-2 ring-indigo-100 opacity-100'
//                       : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300'
//                       }`}
//                   >
//                     <img src={img} alt="" className="max-h-full max-w-full object-contain p-1" />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* RIGHT: Product Details */}
//             <div className="p-4 sm:p-6 lg:p-10 flex flex-col h-full">

//               {/* Header Info */}
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-2 sm:mb-3">
//                   <span className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-semibold bg-indigo-50 text-indigo-700 capitalize">
//                     <Tag className="w-3 h-3" />
//                     {product.category}
//                   </span>
//                   <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wide">
//                     {product.brand}
//                   </span>
//                 </div>

//                 {/* Responsive Title Size */}
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
//                   {product.title}
//                 </h1>

//                 {/* Ratings */}
//                 <div className="flex items-center gap-3">
//                   <div className="flex items-center gap-0.5 text-amber-400">
//                     <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
//                     <span className="text-base sm:text-lg font-bold text-gray-900 ml-1">{product.rating}</span>
//                   </div>
//                   <span className="text-sm text-gray-400">•</span>
//                   <a href="#reviews" className="text-sm text-indigo-600 font-medium hover:underline cursor-pointer">
//                     See {product.reviews?.length || 0} reviews
//                   </a>
//                 </div>
//               </div>

//               {/* Price & Stock Block - More responsive layout */}
//               <div className="p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-100 mb-6 sm:mb-8">
//                 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">

//                   {/* Price */}
//                   <div>
//                     <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Price</p>
//                     <div className="flex items-center gap-3">
//                       {/* Scaled down font for mobile */}
//                       <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
//                         ${product.price}
//                       </span>
//                       {product.discountPercentage > 0 && (
//                         <span className="bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md">
//                           -{product.discountPercentage}%
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Stock - UPDATED to Orange/Bold */}
//                   <div className="text-left sm:text-right">
//                     <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Current Inventory</p>
//                     <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-0">

//                       <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[12px] uppercase font-bold tracking-wider sm:mb-1 ${product.stock > 0
//                         ? 'bg-emerald-100 text-emerald-800'
//                         : 'bg-red-100 text-red-800'
//                         }`}>
//                         <Package className="w-3 h-3" />
//                         {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
//                       </div>

//                       <div className="text-sm font-medium text-gray-600">
//                         Quantity  :  <span className="text-xl sm:text-2xl font-extrabold text-orange-500">{product.stock}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Technical Specs Grid */}
//               <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4 mb-8">
//                 <SpecRow label="SKU" value={product.sku} />
//                 <SpecRow label="Weight" value={`${product.weight}g`} />
//                 <SpecRow
//                   label="Dimensions"
//                   value={`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`}
//                 />
//                 <SpecRow label="Min Order" value={`${product.minimumOrderQuantity} units`} />
//               </div>

//               {/* Logistics & Trust */}
//               <div className="mt-auto border-t border-gray-100 pt-6 space-y-4">
//                 <TrustItem
//                   icon={Truck}
//                   title="Shipping Information"
//                   text={product.shippingInformation}
//                 />
//                 <TrustItem
//                   icon={ShieldCheck}
//                   title="Warranty Protection"
//                   text={product.warrantyInformation}
//                 />
//                 <TrustItem
//                   icon={RotateCcw}
//                   title="Return Policy"
//                   text={product.returnPolicy}
//                 />
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* ================= 2. DESCRIPTION (Full Width) ================= */}
//         <section className="bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
//           <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
//             Product Description
//           </h2>
//           <div className="prose prose-sm sm:prose-base prose-gray max-w-none text-gray-600 leading-relaxed">
//             <p>{product.description}</p>
//           </div>
//         </section>

//         {/* ================= 3. SIMILAR PRODUCTS ================= */}
//         {similar.length > 0 && (
//           <section>
//             <div className="flex items-center justify-between mb-4 sm:mb-6">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Similar Products</h2>
//               <Link to={`/categories/${product.category}`} className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
//                 View Category <ChevronRight className="w-4 h-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
//               {similar.map(p => (
//                 <ProductCard key={p.id} product={p} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* ================= 4. CUSTOMER REVIEWS (Moved to Bottom) ================= */}
//         <section id="reviews" className="scroll-mt-20">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

//           {product.reviews && product.reviews.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {product.reviews.map((review, i) => (
//                 <div key={i} className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
//                         <User className="w-4 h-4 sm:w-5 sm:h-5" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-sm text-gray-900">{review.reviewerName}</p>
//                         <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                     <div className="flex bg-amber-50 px-2 py-1 rounded text-amber-500 text-xs font-bold gap-1">
//                       <span>{review.rating}</span>
//                       <Star className="w-3.5 h-3.5 fill-current" />
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600 italic leading-relaxed">"{review.comment}"</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
//               <p className="text-gray-500">No reviews yet for this product.</p>
//             </div>
//           )}
//         </section>

//       </div>
//     </div>
//   )
// }

// /* ================= HELPER COMPONENTS ================= */

// function SpecRow({ label, value }) {
//   return (
//     <div className="flex flex-col border-b border-gray-100 pb-2 last:border-0 last:pb-0">
//       <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">{label}</span>
//       <span className="text-sm font-medium text-gray-900">{value}</span>
//     </div>
//   )
// }

// function TrustItem({ icon: Icon, title, text }) {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="p-2 bg-gray-50 rounded-lg text-gray-600 shrink-0">
//         <Icon className="w-4 h-4" />
//       </div>
//       <div>
//         <p className="text-xs font-bold text-gray-900 uppercase">{title}</p>
//         <p className="text-xs sm:text-sm text-gray-500 leading-tight">{text}</p>
//       </div>
//     </div>
//   )
// }


import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById, getProductsByCategory } from '@/api/products.api'
import Loader from '@/components/common/Loader'
import ErrorState from '@/components/common/ErrorState'
import ProductCard from '@/components/cards/ProductCard'
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Package,
  ChevronRight,
  Home,
  Tag,
  User
} from 'lucide-react'

export default function ProductDetails() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const prod = await getProductById(id)
        setProduct(prod)
        setActiveImage(prod.thumbnail)

        // Fetch similar items based on category
        const related = await getProductsByCategory(prod.category)
        setSimilar(
          related.products
            .filter(p => p.id !== prod.id)
            .slice(0, 6)
        )
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <Loader />
  if (error) return <ErrorState message={error} />

  // Combine thumbnail and extra images
  const images = [product.thumbnail, ...(product.images || [])]
  const uniqueImages = [...new Set(images)]

  return (
    <div className="min-h-screen bg-gray-50/30 pb-12 sm:pb-20">

      {/* Breadcrumb Navigation */}
      <div className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-hidden">
          {/* Accessibility: Added aria-label for icon-only link */}
          <Link to="/" className="hover:text-indigo-600 transition-colors flex-shrink-0" aria-label="Home">
            <Home className="w-4 h-4" aria-hidden="true" />
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
          <Link to="/inventory" className="hover:text-indigo-600 transition-colors flex-shrink-0">Inventory</Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
          <span className="text-gray-900 font-medium truncate">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-12">

        {/* ================= 1. MAIN PRODUCT CARD ================= */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">

            {/* LEFT: Image Gallery */}
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-50/50 flex flex-col gap-4 sm:gap-6">
              {/* Main Active Image */}
              <div className="bg-white rounded-xl border border-gray-200 aspect-square flex items-center justify-center p-4 shadow-sm relative overflow-hidden group">
                <img
                  src={activeImage}
                  alt={product.title}
                  // Performance: Explicit width/height to reduce CLS
                  width="600"
                  height="600"
                  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Thumbnails Strip */}
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {uniqueImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    // Accessibility: Added label for screen readers
                    aria-label={`View image ${idx + 1} of ${product.title}`}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg border bg-white flex items-center justify-center transition-all ${activeImage === img
                      ? 'border-indigo-600 ring-2 ring-indigo-100 opacity-100'
                      : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-300'
                      }`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      width="80" 
                      height="80"
                      className="max-h-full max-w-full object-contain p-1" 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Details */}
            <div className="p-4 sm:p-6 lg:p-10 flex flex-col h-full">

              {/* Header Info */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-2.5 rounded-full text-[10px] sm:text-xs font-semibold bg-indigo-50 text-indigo-700 capitalize">
                    <Tag className="w-3 h-3" aria-hidden="true" />
                    {product.category}
                  </span>
                  {/* Contrast Fix: text-gray-400 -> text-gray-500 */}
                  <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {product.brand}
                  </span>
                </div>

                {/* Responsive Title Size */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
                  {product.title}
                </h1>

                {/* Ratings */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" aria-hidden="true" />
                    <span className="text-base sm:text-lg font-bold text-gray-900 ml-1">{product.rating}</span>
                  </div>
                  {/* Contrast Fix: text-gray-400 -> text-gray-500 */}
                  <span className="text-sm text-gray-500" aria-hidden="true">•</span>
                  <a href="#reviews" className="text-sm text-indigo-600 font-medium hover:underline cursor-pointer">
                    See {product.reviews?.length || 0} reviews
                  </a>
                </div>
              </div>

              {/* Price & Stock Block */}
              <div className="p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-100 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">

                  {/* Price */}
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Price</p>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                        ${product.price}
                      </span>
                      {product.discountPercentage > 0 && (
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md">
                          -{product.discountPercentage}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="text-left sm:text-right">
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Current Inventory</p>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-0">

                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[12px] uppercase font-bold tracking-wider sm:mb-1 ${product.stock > 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        <Package className="w-3 h-3" aria-hidden="true" />
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </div>

                      <div className="text-sm font-medium text-gray-600">
                        {/* Contrast Fix: text-orange-500 -> text-orange-600 for better visibility */}
                        Quantity : <span className="text-xl sm:text-2xl font-extrabold text-orange-600">{product.stock}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specs Grid */}
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4 mb-8">
                <SpecRow label="SKU" value={product.sku} />
                <SpecRow label="Weight" value={`${product.weight}g`} />
                <SpecRow
                  label="Dimensions"
                  value={`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`}
                />
                <SpecRow label="Min Order" value={`${product.minimumOrderQuantity} units`} />
              </div>

              {/* Logistics & Trust */}
              <div className="mt-auto border-t border-gray-100 pt-6 space-y-4">
                <TrustItem
                  icon={Truck}
                  title="Shipping Information"
                  text={product.shippingInformation}
                />
                <TrustItem
                  icon={ShieldCheck}
                  title="Warranty Protection"
                  text={product.warrantyInformation}
                />
                <TrustItem
                  icon={RotateCcw}
                  title="Return Policy"
                  text={product.returnPolicy}
                />
              </div>

            </div>
          </div>
        </div>

        {/* ================= 2. DESCRIPTION ================= */}
        <section className="bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-indigo-600 rounded-full" aria-hidden="true"></span>
            Product Description
          </h2>
          <div className="prose prose-sm sm:prose-base prose-gray max-w-none text-gray-600 leading-relaxed">
            <p>{product.description}</p>
          </div>
        </section>

        {/* ================= 3. SIMILAR PRODUCTS ================= */}
        {similar.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Similar Products</h2>
              <Link to={`/categories/${product.category}`} className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
                View Category <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
              {similar.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* ================= 4. CUSTOMER REVIEWS ================= */}
        <section id="reviews" className="scroll-mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {product.reviews.map((review, i) => (
                <div key={i} className="bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <User className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{review.reviewerName}</p>
                        {/* Contrast Fix: text-gray-400 -> text-gray-500 */}
                        <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex bg-amber-50 px-2 py-1 rounded text-amber-500 text-xs font-bold gap-1">
                      <span>{review.rating}</span>
                      <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed">"{review.comment}"</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No reviews yet for this product.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

/* ================= HELPER COMPONENTS ================= */

function SpecRow({ label, value }) {
  return (
    <div className="flex flex-col border-b border-gray-100 pb-2 last:border-0 last:pb-0">
      {/* Contrast Fix: text-gray-400 -> text-gray-500 */}
      <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold mb-0.5">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  )
}

function TrustItem({ icon: Icon, title, text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gray-50 rounded-lg text-gray-600 shrink-0">
        <Icon className="w-4 h-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-900 uppercase">{title}</p>
        <p className="text-xs sm:text-sm text-gray-500 leading-tight">{text}</p>
      </div>
    </div>
  )
}