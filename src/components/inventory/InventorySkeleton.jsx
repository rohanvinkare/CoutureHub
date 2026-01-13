export const InventorySkeleton = () => (
    <div className="animate-pulse flex flex-col gap-6 h-full">
        {/* Analytics Shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200/50 h-32 rounded-2xl border border-gray-200/50"></div>
            ))}
        </div>

        {/* Toolbar Shimmer */}
        <div className="h-20 bg-gray-200/50 rounded-xl border border-gray-200/50 shrink-0"></div>

        {/* Table Shimmer (Desktop) */}
        <div className="hidden lg:flex flex-1 flex-col gap-4">
            <div className="h-12 bg-gray-200/50 rounded-lg shrink-0"></div>
            <div className="flex-1 space-y-3 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100/50 rounded-lg border border-gray-100/50"></div>
                ))}
            </div>
        </div>

        {/* Card Shimmer (Mobile) */}
        <div className="lg:hidden flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200/50 h-64 rounded-xl border border-gray-200/50"></div>
            ))}
        </div>
    </div>
)
