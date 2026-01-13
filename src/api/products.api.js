import { INVENTORY_CONFIG } from '@/constants/inventory'

const BASE_URL = 'https://dummyjson.com'

export async function fetchWithRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}

async function fetchProductsData(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(INVENTORY_CONFIG.API_TIMEOUT),
    })

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(
        errorData.message ||
        `Failed to fetch products (${res.status}: ${res.statusText})`
      )
    }

    return res.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection.')
    }
    throw error
  }
}

export async function getProductById(id) {
  return fetchWithRetry(() => fetchProductsData(`/products/${id}`))
}

export async function getCategories() {
  return fetchWithRetry(() => fetchProductsData(`/products/categories`))
}

export async function getProducts(limit = 20, skip = 0) {
  return fetchWithRetry(() => fetchProductsData(`/products?limit=${limit}&skip=${skip}`))
}

export async function searchProducts(query, limit = 20, skip = 0) {
  return fetchWithRetry(() => fetchProductsData(`/products/search?q=${query}&limit=${limit}&skip=${skip}`))
}

export async function getProductsByCategory(category, limit = 20, skip = 0) {
  return fetchWithRetry(() => fetchProductsData(`/products/category/${category}?limit=${limit}&skip=${skip}`))
}
