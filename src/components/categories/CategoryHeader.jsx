import { LayoutGrid, Search, ArrowUpDown } from 'lucide-react'
import CustomSelect from '@/components/common/CustomSelect'

export default function CategoryHeader({ searchTerm, setSearchTerm, sort, setSort }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <LayoutGrid className="w-6 h-6 text-indigo-600" />
                    Category Overview
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Manage and view your product catalog organization
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative w-full sm:w-64 group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Filter categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full rounded-xl border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    />
                </div>

                {/* Sort Dropdown */}
                <div className="w-full sm:w-48">
                    <CustomSelect
                        value={sort}
                        onChange={setSort}
                        options={[
                            { value: 'count_desc', label: 'Most Products' },
                            { value: 'count_asc', label: 'Fewest Products' },
                            { value: 'name_asc', label: 'Name (A-Z)' },
                            { value: 'name_desc', label: 'Name (Z-A)' },
                        ]}
                        placeholder="Sort By"
                        icon={ArrowUpDown}
                    />
                </div>
            </div>
        </div>
    )
}
