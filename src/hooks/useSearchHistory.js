import { useState, useCallback } from 'react'

const MAX_HISTORY = 5
const STORAGE_KEY = 'inventory_search_history'

export function useSearchHistory() {
    // Lazy initialization to read from storage only once on mount
    const [history, setHistory] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            try {
                return JSON.parse(stored)
            } catch (e) {
                console.error('Failed to parse search history', e)
                return []
            }
        }
        return []
    })

    const addToHistory = useCallback((query) => {
        if (!query || query.trim().length < 2) return

        setHistory(prev => {
            const normalized = query.trim().toLowerCase()
            // Remove duplicates and keep only the latest unique queries
            const filtered = prev.filter(item => item.toLowerCase() !== normalized)
            const newHistory = [query, ...filtered].slice(0, MAX_HISTORY)

            localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
            return newHistory
        })
    }, [])

    const clearHistory = useCallback(() => {
        setHistory([])
        localStorage.removeItem(STORAGE_KEY)
    }, [])

    return { history, addToHistory, clearHistory }
}
