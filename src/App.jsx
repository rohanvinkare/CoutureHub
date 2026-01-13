import { Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { InventoryProvider } from '@/context/InventoryContext'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ROUTES } from '@/constants/routes'

// Static Page Imports (No Double Loader)
import Home from './pages/Home'
import InventoryOverview from './pages/InventoryOverview'
import Categories from './pages/Categories'
import ProductDetails from './pages/ProductDetails'
import InventoryAnalytics from './pages/Analytics'
import Profile from './pages/Profile'
import Unauthorized from './pages/Unauthorized'

export default function App() {
  return (
    <ErrorBoundary>
      <InventoryProvider>
        <DashboardLayout>
          {/* No Suspense needed for static imports -> No generic spinner glitch */}
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.INVENTORY} element={<InventoryOverview />} />

            <Route path={ROUTES.CATEGORIES} element={<Categories />} />
            <Route path={ROUTES.CATEGORY} element={<InventoryOverview />} />

            <Route path={ROUTES.PRODUCT} element={<ProductDetails />} />
            <Route path={ROUTES.ANALYTICS} element={<InventoryAnalytics />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />

            <Route path="*" element={<Unauthorized />} />
          </Routes>
        </DashboardLayout>
      </InventoryProvider>
    </ErrorBoundary>
  )
}