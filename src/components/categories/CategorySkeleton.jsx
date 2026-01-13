export default function CategorySkeleton() {
    return (
        <div className="space-y-5 h-full flex flex-col animate-pulse">
            {/* ================= HEADER & ANALYTICS SHIMMER ================= */}
            <div className="flex-none space-y-4">

                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        {/* Title */}
                        <div className="h-8 w-48 bg-gray-200/80 rounded-lg" />
                        {/* Subtitle */}
                        <div className="h-4 w-64 bg-gray-100 rounded-md" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        {/* Search Bar */}
                        <div className="h-10 w-full sm:w-64 bg-gray-200/80 rounded-xl" />
                        {/* Sort Dropdown */}
                        <div className="h-10 w-full sm:w-48 bg-gray-200/80 rounded-xl" />
                    </div>
                </div>

                {/* Analytics Dashboard Shimmer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-3.5 rounded-xl border border-gray-100 flex items-center gap-3">
                            <div className="h-12 w-12 bg-gray-100 rounded-lg shrink-0" />
                            <div className="space-y-2 flex-1">
                                <div className="h-3 w-24 bg-gray-100 rounded" />
                                <div className="h-6 w-16 bg-gray-200/80 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= CONTENT GRID SHIMMER ================= */}
            <div className="flex-1 min-h-0 overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col"
                        >
                            {/* Image Area - Aspect 3:2 to match real card */}
                            <div className="aspect-[3/2] bg-gray-100/80 relative" />

                            {/* Content Area */}
                            <div className="p-4 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2 w-full">
                                        <div className="h-5 w-3/4 bg-gray-200/80 rounded-md" />
                                        <div className="h-4 w-20 bg-gray-100 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
