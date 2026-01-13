import CategoryImageCard from '@/components/cards/CategoryImageCard'
import { Search } from 'lucide-react'

export default function CategoryGrid({ categories, searchTerm }) {
    return (
        <div
            className="flex-1 min-h-0 overflow-y-auto -mx-1 px-1 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {categories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pb-12">
                    {categories.map(cat => (
                        <CategoryImageCard
                            key={cat.slug}
                            category={cat}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                    <Search className="w-12 h-12 mb-3 opacity-20" aria-hidden="true" />
                    <p className="font-medium">No results for "{searchTerm}"</p>
                </div>
            )}
        </div>
    )
}
