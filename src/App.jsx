import { Suspense, lazy } from 'react' // Optimisation: Lazy Import
import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { InventoryProvider } from '@/context/InventoryContext'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ROUTES } from '@/constants/routes'
import { InventorySkeleton } from '@/components/inventory/InventorySkeleton' // Re-use skeleton for suspense fallback

// Static Page Imports (Critical Path - Keep Static for LCP)
import Home from './pages/Home'
import InventoryOverview from './pages/InventoryOverview'

// Lazy Load Heavy Pages (Code Splitting)
// Standard Lazy implementation with Suspense boundary below
const Categories = lazy(() => import('./pages/Categories'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const InventoryAnalytics = lazy(() => import('./pages/Analytics'))
const Profile = lazy(() => import('./pages/Profile'))
const Unauthorized = lazy(() => import('./pages/Unauthorized'))

// Skeleton Fallback Wrapper
const PageLoader = () => (
  <div className="p-6 h-full">
    <InventorySkeleton />
  </div>
)

export default function App() {
  return (
    <ErrorBoundary>
      <InventoryProvider>
        <DashboardLayout>
          {/* Suspense Boundary for Lazy Routes */}
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Critical Path (Instant Load) */}
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.INVENTORY} element={<InventoryOverview />} />

              {/* Lazy Loaded Routes */}
              <Route path={ROUTES.CATEGORIES} element={<Categories />} />
              <Route path={ROUTES.CATEGORY} element={<InventoryOverview />} /> {/* Re-uses InventoryOverview, static */}

              <Route path={ROUTES.PRODUCT} element={<ProductDetails />} />
              <Route path={ROUTES.ANALYTICS} element={<InventoryAnalytics />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />

              <Route path="*" element={<Unauthorized />} />
            </Routes>
          </Suspense>
        </DashboardLayout>
      </InventoryProvider>
    </ErrorBoundary>
  )
}