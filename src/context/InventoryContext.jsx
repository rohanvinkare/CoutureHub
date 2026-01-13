
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const InventoryContext = createContext()

export function InventoryProvider({ children }) {
    const [filters, setFilters] = useState({})
    const [cart, setCart] = useState([])

    const addToCart = (item) => {
        setCart(prev => [...prev, item])
    }

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(item => item.id !== itemId))
    }

    return (
        <InventoryContext.Provider value={{
            filters,
            setFilters,
            cart,
            addToCart,
            removeFromCart
        }}>
            {children}
        </InventoryContext.Provider>
    )
}

export const useInventory = () => useContext(InventoryContext)
