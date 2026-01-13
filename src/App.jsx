import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { InventoryProvider } from '@/context/InventoryContext'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Loader from '@/components/common/Loader'
import { ROUTES } from '@/constants/routes'

// 1. Lazy Load Pages
const Home = lazy(() => import('./pages/Home'))
const InventoryOverview = lazy(() => import('./pages/InventoryOverview'))
const Categories = lazy(() => import('./pages/Categories'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const InventoryAnalytics = lazy(() => import('./pages/Analytics'))
const Unauthorized = lazy(() => import('./pages/Unauthorized'))

export default function App() {
  return (
    <ErrorBoundary>
      <InventoryProvider>
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
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.INVENTORY} element={<InventoryOverview />} />

              <Route path={ROUTES.CATEGORIES} element={<Categories />} />
              <Route path={ROUTES.CATEGORY} element={<InventoryOverview />} />

              <Route path={ROUTES.PRODUCT} element={<ProductDetails />} />
              <Route path={ROUTES.ANALYTICS} element={<InventoryAnalytics />} />

              <Route path="*" element={<Unauthorized />} />
            </Routes>
          </Suspense>
        </DashboardLayout>
      </InventoryProvider>
    </ErrorBoundary>
  )
}