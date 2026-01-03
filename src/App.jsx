import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Loader from '@/components/common/Loader' // Assuming this path exists based on previous files

// 1. Lazy Load Pages
// These components will only be loaded when the user navigates to their route
const Home = lazy(() => import('./pages/Home'))
const InventoryOverview = lazy(() => import('./pages/InventoryOverview'))
const Categories = lazy(() => import('./pages/Categories'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const InventoryAnalytics = lazy(() => import('./pages/Analytics'))
const Unauthorized = lazy(() => import('./pages/Unauthorized'))

export default function App() {
  return (
    <DashboardLayout>
      {/* 2. Wrap Routes in Suspense to handle the loading state */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<InventoryOverview />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<InventoryOverview />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/analytics" element={<InventoryAnalytics />} />

          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </Suspense>
    </DashboardLayout>
  )
}