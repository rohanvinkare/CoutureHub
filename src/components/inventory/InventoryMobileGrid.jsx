import ProductCard from '@/components/cards/ProductCard'

export default function InventoryMobileGrid({ products }) {
    if (!products || products.length === 0) return null

    return (
        <div className="lg:hidden flex-1 min-h-0 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pb-20 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {products.map(p => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    )
}
