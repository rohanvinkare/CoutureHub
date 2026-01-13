import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById, getProductsByCategory } from '@/api/products.api'
import { InventorySkeleton } from '@/components/inventory/InventorySkeleton'
import ErrorState from '@/components/common/ErrorState'
import ProductCard from '@/components/cards/ProductCard'
import RecentOrdersWidget from '@/components/inventory/RecentOrdersWidget'
import SalesTrendChart from '@/components/inventory/SalesTrendChart'
import {
    Star,
    Truck,
    ShieldCheck,
    RotateCcw,
    Package,
    ChevronRight,
    Home,
    Tag,
    User,
    Info,
    Box,
    BarChart3,
    Edit,
    TrendingUp,
    BoxSelect
} from 'lucide-react'

export default function ProductDetails() {
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [similar, setSimilar] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeImage, setActiveImage] = useState('')
    const [activeTab, setActiveTab] = useState('overview') // 'overview', 'reviews', 'logistics', 'analytics'

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
                        .slice(0, 4) // Show 4 similar items
                )
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    if (loading) return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <InventorySkeleton />
        </div>
    )

    if (error) return <ErrorState message={error} />

    // Combine thumbnail and extra images
    const images = [product.thumbnail, ...(product.images || [])]
    const uniqueImages = [...new Set(images)]

    const stockPercentage = Math.min((product.stock / 100) * 100, 100)
    let stockColor = "bg-emerald-500"
    if (product.stock === 0) stockColor = "bg-gray-300"
    else if (product.stock < 10) stockColor = "bg-red-500"
    else if (product.stock < 30) stockColor = "bg-amber-500"

    // NOTE on Layout: Uses "flex-col" in a full-height container, matching "InventoryOverview" styles.
    // The scrollbar here is hidden using Tailwind classes.

    return (
        <div className="flex-1 min-h-0 flex flex-col h-full overflow-hidden">

            {/* Breadcrumb & Actions Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm shrink-0">
                <div className="w-full px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Link to="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                            <Home className="w-3.5 h-3.5" />
                        </Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to="/inventory" className="hover:text-indigo-600 transition-colors">Inventory</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-xs">{product.title}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            <BarChart3 className="w-3.5 h-3.5" />
                            Analytics
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                            <Edit className="w-3.5 h-3.5" />
                            Edit SKU
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Scrollable Content */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>

                <div className="w-full px-2 sm:px-4 lg:px-6 py-6 space-y-6">

                    {/* ================= 3-COLUMN FLUID GRID ================= */}
                    {/* 
                We use a grid with strict pixel/percentage columns to reduce gaps.
                lg:grid-cols-[350px_1fr_300px] on very large screens for high density.
                Or standard 12-col.
                Let's use Grid-12 but with tighter gaps and adjusted spans to remove "whitespace".
            */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-4 xl:gap-6 items-start">

                        {/* COLUMN 1: VISUAL GALLERY (Sticky) */}
                        <div className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-6">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3">
                                <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden relative group flex items-center justify-center p-2 mb-3 border border-gray-100">
                                    <img
                                        src={activeImage}
                                        alt={product.title}
                                        className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {uniqueImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`aspect-square rounded-lg border bg-white p-1 flex items-center justify-center transition-all ${activeImage === img ? 'border-indigo-600 ring-2 ring-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Specs below image on desktop to fill vertical space */}
                            <div className="mt-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hidden xl:block">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <BoxSelect className="w-3.5 h-3.5" />
                                    Quick Specs
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">Weight</span>
                                        <span className="font-medium text-gray-900">{product.weight}g</span>
                                    </div>
                                    <div className="flex justify-between text-xs border-b border-gray-50 pb-2">
                                        <span className="text-gray-500">Min Order</span>
                                        <span className="font-medium text-gray-900">{product.minimumOrderQuantity}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-500">Return</span>
                                        <span className="font-medium text-gray-900">{product.returnPolicy}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COLUMN 2: CORE INFO & TABS */}
                        {/* Span increased to 5 or 6 depending on screen */}
                        <div className="lg:col-span-5 xl:col-span-6 space-y-4">

                            {/* Header Block */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 capitalize border border-indigo-100">
                                        {product.category}
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide px-2 border-l border-gray-200">{product.brand}</span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">{product.title}</h1>

                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded text-xs border border-amber-100">
                                        <span>{product.rating}</span>
                                        <Star className="w-3 h-3 fill-current" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => setActiveTab('reviews')}>
                                        {product.reviews?.length || 0} Reviews
                                    </span>
                                    <span className="text-xs text-gray-400 font-mono">SKU: {product.sku}</span>
                                </div>
                            </div>

                            {/* TABS INTERFACE */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
                                <div className="flex border-b border-gray-100 bg-gray-50/30 overflow-x-auto shrink-0">
                                    <TabButton id="overview" label="Overview" icon={Info} activeTab={activeTab} setActiveTab={setActiveTab} />
                                    <TabButton id="reviews" label="Reviews" icon={Star} activeTab={activeTab} setActiveTab={setActiveTab} />
                                    <TabButton id="logistics" label="Logistics" icon={Truck} activeTab={activeTab} setActiveTab={setActiveTab} />
                                    <TabButton id="analytics" label="Performance" icon={TrendingUp} activeTab={activeTab} setActiveTab={setActiveTab} />
                                </div>

                                <div className="p-5 grow">
                                    {activeTab === 'overview' && (
                                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
                                            {/* Description */}
                                            <div>
                                                <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                                            </div>

                                            {/* Embedded Chart */}
                                            <div className="pt-4 border-t border-gray-100">
                                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Sales Performance</h3>
                                                <SalesTrendChart />
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'reviews' && (
                                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                            {product.reviews?.map((review, i) => (
                                                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-bold text-xs text-gray-900">{review.reviewerName}</span>
                                                        <div className="flex text-amber-500 text-[10px] gap-0.5">
                                                            {[...Array(5)].map((_, r) => (
                                                                <Star key={r} className={`w-3 h-3 ${r < review.rating ? 'fill-current' : 'text-gray-300 fill-gray-300'}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-600 italic">"{review.comment}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'logistics' && (
                                        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                            <LogisticsRow icon={Truck} title="Shipping Info" text={product.shippingInformation} />
                                            <LogisticsRow icon={Box} title="Min Order Qty" text={`${product.minimumOrderQuantity} Units`} />
                                            <LogisticsRow icon={RotateCcw} title="Return Policy" text={product.returnPolicy} />
                                            <LogisticsRow icon={ShieldCheck} title="Warranty" text={product.warrantyInformation} />
                                        </div>
                                    )}

                                    {activeTab === 'analytics' && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                            <SalesTrendChart />
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                                                    <p className="text-xs text-gray-500 uppercase font-bold">Conversion Rate</p>
                                                    <p className="text-2xl font-bold text-gray-900 mt-1">2.4%</p>
                                                </div>
                                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                                                    <p className="text-xs text-gray-500 uppercase font-bold">Total Revenue</p>
                                                    <p className="text-2xl font-bold text-gray-900 mt-1">$4,290</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* COLUMN 3: STICKY ADMIN SIDEBAR (3 cols) */}
                        <div className="lg:col-span-3 xl:col-span-3 space-y-4 lg:sticky lg:top-6">

                            {/* Pricing Card */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Selling Price</p>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <span className="text-3xl font-extrabold text-gray-900">${product.price}</span>
                                    {product.discountPercentage > 0 && (
                                        <span className="text-[10px] font-bold text-white bg-emerald-500 px-1.5 py-0.5 rounded">- {product.discountPercentage}%</span>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm shadow-indigo-200">
                                        Update Pricing
                                    </button>
                                    <button className="w-full py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold rounded-lg transition-colors">
                                        Manage Discounts
                                    </button>
                                </div>
                            </div>

                            {/* Inventory Status Card */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">Inventory</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${product.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                        {product.stock > 0 ? 'Active' : 'OOS'}
                                    </span>
                                </div>

                                <div className="mb-4 text-center">
                                    <div className="inline-flex flex-col items-center">
                                        <span className="text-2xl font-extrabold text-gray-900">{product.stock}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">Available Units</span>
                                    </div>
                                </div>

                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                                    <div className={`h-full rounded-full ${stockColor}`} style={{ width: `${stockPercentage}%` }}></div>
                                </div>
                                <p className="text-[10px] text-gray-400 text-center mb-4">Reorder Point: 20 units</p>

                                <div className="grid grid-cols-2 gap-2">
                                    <StatSmall label="Reserved" value="4" />
                                    <StatSmall label="In-Transit" value={12} />
                                </div>
                            </div>

                            {/* NEW: Recent Orders Widget (Fill Space) */}
                            <RecentOrdersWidget />

                        </div>

                    </div>

                    {/* Similar Products (Bottom Full Width) */}
                    {similar.length > 0 && (
                        <section className="pt-6 border-t border-dashed border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Box className="w-4 h-4 text-indigo-500" />
                                Similar Products
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {similar.map(p => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </div>
    )
}

/* ---------------- Helper Components ---------------- */

function TabButton({ id, label, icon: Icon, activeTab, setActiveTab }) {
    const isActive = activeTab === id
    return (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex-1 min-w-[100px] py-3 flex items-center justify-center gap-2 text-xs font-bold transition-colors relative ${isActive ? 'text-indigo-600 bg-white shadow-sm border-t-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'}`}
        >
            <Icon className="w-3.5 h-3.5" />
            {label}
        </button>
    )
}

function SpecBox({ label, value }) {
    return (
        <div className="bg-white rounded-lg p-2 border border-gray-200/50">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">{label}</p>
            <p className="text-xs font-semibold text-gray-900">{value}</p>
        </div>
    )
}

function LogisticsRow({ icon: Icon, title, text }) {
    return (
        <div className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 bg-white">
            <div className="bg-gray-50 p-1.5 rounded-md text-indigo-600">
                <Icon className="w-3.5 h-3.5" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-gray-900 uppercase">{title}</p>
                <p className="text-xs text-gray-600">{text}</p>
            </div>
        </div>
    )
}

function StatSmall({ label, value }) {
    return (
        <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
            <p className="text-base font-bold text-gray-900 leading-none">{value}</p>
            <p className="text-[9px] text-gray-500 uppercase font-bold">{label}</p>
        </div>
    )
}
