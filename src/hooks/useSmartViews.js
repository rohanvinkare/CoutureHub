import { useState, useCallback, useMemo } from 'react'

export function useSmartViews() {
    // 1. Initialize state lazily to avoid layout thrashing
    const [smartViews, setSmartViews] = useState(() => {
        try {
            const stored = localStorage.getItem('smart_inventory_views')
            return stored ? JSON.parse(stored) : []
        } catch (e) {
            console.error("Failed to load smart views", e)
            return []
        }
    })

    const trackView = useCallback((filters) => {
        // Only track if there are actual filters applied (ignore empty/default)
        const hasFilters = Object.keys(filters).some(k => filters[k])
        if (!hasFilters) return

        setSmartViews(prev => {
            let newViews = [...prev]

            // Check if this view already exists
            const existingIndex = newViews.findIndex(v =>
                v.category === filters.category &&
                v.stockStatus === filters.stockStatus &&
                v.sort === filters.sort
            )

            if (existingIndex >= 0) {
                // Increment count
                newViews[existingIndex].count += 1
                newViews[existingIndex].lastUsed = Date.now()
            } else {
                // Add new view
                newViews.push({
                    ...filters,
                    count: 1,
                    lastUsed: Date.now(),
                    id: Date.now().toString()
                })
            }

            // NOTE: We do NOT sort here anymore, we sort in getTopViews
            // Just persist the raw list
            localStorage.setItem('smart_inventory_views', JSON.stringify(newViews))
            return newViews
        })
    }, [])

    const getTopViews = useCallback(() => {
        const generateLabel = (view) => {
            const parts = []
            if (view.category) parts.push(view.category)
            if (view.stockStatus) parts.push(view.stockStatus.replace('_', ' '))
            if (view.sort && view.sort !== 'stock') parts.push(`Sorted by ${view.sort}`)
            return parts.length > 0 ? parts.join(' + ') : 'Default View'
        }

        // 1. Find Last Visited (Most recent lastUsed timestamp)
        // We clone to sort safely
        const sortedByRecency = [...smartViews].sort((a, b) => b.lastUsed - a.lastUsed)
        const lastVisited = sortedByRecency.length > 0 ? sortedByRecency[0] : null

        // User request: "1 is last visited", "4 are most visited".
        // Use all smartViews (count >= 1) for the frequent list
        let freqList = [...smartViews]

        // Remove the current "Last Visited" item from the "Most Frequent" list to avoid duplicate slots?
        // If the user wants 5 distinct buttons, we should filter it out.
        if (lastVisited) {
            freqList = freqList.filter(v => v.id !== lastVisited.id)
        }

        // Sort by frequency
        freqList.sort((a, b) => b.count - a.count)

        // Take top 4
        const mostVisited = freqList.slice(0, 4)

        return {
            lastVisited: lastVisited ? { ...lastVisited, label: "Last Visited: " + generateLabel(lastVisited) } : null,
            mostVisited: mostVisited.map(v => ({ ...v, label: generateLabel(v) }))
        }
    }, [smartViews])

    return useMemo(() => ({ trackView, getTopViews }), [trackView, getTopViews])
}
