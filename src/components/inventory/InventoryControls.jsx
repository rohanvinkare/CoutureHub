import {
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    AlertCircle,
    X,
    Clock
} from 'lucide-react'
import CustomSelect from '@/components/common/CustomSelect'
import SavedViewsDropdown from '@/components/inventory/SavedViewsDropdown'

export default function InventoryControls({
    search,
    handleSearchChange,
    showHistory,
    setShowHistory,
    history,
    clearHistory,
    page,
    setPage,
    totalPages,
    categories,
    filterCategory,
    filterStock,
    stockCounts,
    sort,
    updateParams,
    clearAllFilters,
    categoryRoute, // To know if we are in a category specific route
    smartViews // The useSmartViews hook object
}) {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center z-40 relative">

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-1">
                {/* Search Bar */}
                <div className="relative w-full lg:w-96 group">
                    <label htmlFor="inventory-search" className="sr-only">Search inventory</label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-500" aria-hidden="true" />
                    </div>
                    <input
                        id="inventory-search"
                        type="text"
                        autoComplete="off"
                        placeholder="Search by name, brand, category..."
                        value={search}
                        onChange={e => handleSearchChange(e.target.value)}
                        onFocus={() => setShowHistory(true)}
                        onBlur={() => setTimeout(() => setShowHistory(false), 200)} // Delay to allow click on history item
                        className="pl-10 h-10 w-full rounded-lg border-gray-200 bg-gray-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />

                    {/* Recent Searches Dropdown */}
                    {showHistory && history.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                            <div className="flex items-center justify-between px-3 py-1 text-xs text-gray-400 uppercase tracking-wider font-semibold">
                                <span>Recent Searches</span>
                                <button onMouseDown={clearHistory} className="hover:text-red-500">Clear</button>
                            </div>
                            {history.map((term, index) => (
                                <button
                                    key={index}
                                    onMouseDown={() => handleSearchChange(term)}
                                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <Clock className="w-3 h-3 text-gray-400" />
                                    {term}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination (Top Location) */}
                {totalPages > 1 && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200 self-start sm:self-auto">
                        <button
                            onClick={() => setPage(p => Math.max(p - 1, 0))}
                            disabled={page === 0}
                            className="p-1.5 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:shadow-none transition-all"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="text-xs font-medium text-gray-600 px-1 min-w-[3rem] text-center">
                            {page + 1} / {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
                            disabled={page + 1 >= totalPages}
                            className="p-1.5 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:shadow-none transition-all"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                )}
            </div>


            {/* Filters & Sort */}
            <div className="flex w-full lg:w-auto gap-3 items-center z-10 flex-wrap lg:flex-nowrap">
                {/* Category Dropdown (Only show if not in a category route) */}
                {!categoryRoute && (
                    <div className="w-full sm:w-48">
                        <label htmlFor="category-filter" className="sr-only">Filter by Category</label>
                        <CustomSelect
                            value={filterCategory}
                            onChange={(val) => {
                                updateParams({
                                    category: val,
                                    search: ''
                                })
                            }}
                            options={[
                                { value: '', label: 'All Categories' },
                                ...categories.map(c => ({ value: c.slug, label: c.name }))
                            ]}
                            placeholder="All Categories"
                            icon={Filter}
                        />
                    </div>
                )}

                {/* Stock Status Filter */}
                <div className="w-full sm:w-48">
                    <label htmlFor="stock-filter" className="sr-only">Filter by Stock</label>
                    <CustomSelect
                        value={filterStock}
                        onChange={(val) => updateParams('stockStatus', val)}
                        options={[
                            { value: '', label: 'All Stock Levels', count: stockCounts.all },
                            { value: 'in_stock', label: 'In Stock (11+)', count: stockCounts.in_stock },
                            { value: 'low_stock', label: 'Low Stock (1-10)', count: stockCounts.low_stock },
                            { value: 'out_of_stock', label: 'Out of Stock (0)', count: stockCounts.out_of_stock }
                        ]}
                        placeholder="All Stock Levels"
                        icon={AlertCircle}
                    />
                </div>

                {/* Sort Dropdown */}
                <div className="w-full sm:w-48">
                    <label htmlFor="sort-order" className="sr-only">Sort Products</label>
                    <CustomSelect
                        value={sort}
                        onChange={(val) => updateParams('sort', val)}
                        options={[
                            { value: 'stock', label: 'Stock Level' },
                            { value: 'name', label: 'Name (A-Z)' },
                            { value: 'price_asc', label: 'Price: Low to High' },
                            { value: 'price_desc', label: 'Price: High to Low' }
                        ]}
                        placeholder="Sort By"
                        icon={ArrowUpDown}
                    />
                </div>

                {/* Clear Filters Button */}
                {(search || filterCategory || filterStock || sort !== 'stock') && (
                    <button
                        onClick={clearAllFilters}
                        className="text-gray-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Clear all filters"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                {/* Saved/Smart Views */}
                {smartViews && (
                    <SavedViewsDropdown
                        smartViews={smartViews}
                        onSelect={(view) => {
                            updateParams({
                                category: view.category,
                                stockStatus: view.stockStatus,
                                sort: view.sort
                            })
                        }}
                    />
                )}

            </div>

        </div>
    )
}
