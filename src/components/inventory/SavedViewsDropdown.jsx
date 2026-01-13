import { useState, useRef, useEffect } from 'react'
import { Star, History, ArrowRight, Clock } from 'lucide-react'

export default function SavedViewsDropdown({ smartViews, onSelect }) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null)

    // smartViews.getTopViews() now returns { lastVisited, mostVisited }
    // We treat smartViews as the data object itself because of how we memoized it in the hook?
    // Wait, let's verify usage in InventoryOverview. 
    // InventoryOverview passes `smartViews` which is `{ trackView, getTopViews }`.
    // So we call smartViews.getTopViews() to get the data.

    const { lastVisited, mostVisited } = smartViews.getTopViews()
    const hasData = lastVisited || mostVisited.length > 0

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!hasData) return null

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors border ${isOpen ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-gray-200 text-gray-400 hover:text-amber-500 hover:border-amber-200'}`}
                title="Top Frequent Views"
            >
                <div className="relative">
                    <Star className={`w-5 h-5 ${isOpen ? 'fill-amber-500 text-amber-500' : ''}`} />
                    {/* Badge if we have saved data */}
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 origin-top-right">

                    {/* SECTION 1: LAST VISITED */}
                    {lastVisited && (
                        <div className="border-b border-gray-50 pb-1 mb-1">
                            <div className="px-4 py-2 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Last Visited</span>
                            </div>
                            <button
                                onClick={() => {
                                    onSelect(lastVisited)
                                    setIsOpen(false)
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center justify-between group transition-colors"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 capitalize group-hover:text-blue-600 transition-colors">
                                        {lastVisited.label.replace('Last Visited: ', '')}
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">
                                        Just now
                                    </p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </button>
                        </div>
                    )}

                    {/* SECTION 2: MOST FREQUENT */}
                    {mostVisited.length > 0 && (
                        <div>
                            <div className="px-4 py-2 flex items-center gap-2">
                                <History className="w-4 h-4 text-purple-500" />
                                <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">Most Frequent</span>
                            </div>
                            <div className="py-1">
                                {mostVisited.map((view) => (
                                    <button
                                        key={view.id}
                                        onClick={() => {
                                            onSelect(view)
                                            setIsOpen(false)
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between group transition-colors"
                                    >
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800 capitalize group-hover:text-amber-600 transition-colors">
                                                {view.label}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">
                                                Visited {view.count} times
                                            </p>
                                        </div>
                                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-amber-500 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
