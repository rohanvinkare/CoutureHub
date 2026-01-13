


import { useLocation } from 'react-router-dom'
import Sidebar from './laptop/Sidebar'
import Topbar from './laptop/Topbar'
import MobileNavbar from '@/components/layout/mobile/MobileNavbar'

export default function DashboardLayout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  // HOME PAGE → NO DASHBOARD CHROME
  if (isHome) {
    return (
      <div className="min-h-screen bg-white">
        {children}
      </div>
    )
  }

  // DASHBOARD LAYOUT
  return (
    <div className="h-screen w-full bg-gray-50/50 flex flex-col overflow-hidden">

      {/* Accessibility: Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] bg-indigo-600 text-white px-4 py-2 rounded-md shadow-lg outline-none ring-2 ring-white"
      >
        Skip to main content
      </a>

      {/* TOPBAR (Desktop) */}
      <div className="hidden lg:block sticky top-0 z-50 flex-none">
        <Topbar />
      </div>

      {/* MOBILE NAVBAR */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b shadow-sm flex-none">
        <MobileNavbar />
      </div>

      {/* MAIN BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR (Desktop) */}
        <div className="hidden lg:block shrink-0 h-full overflow-y-auto border-r border-gray-200/50 bg-white">
          <Sidebar />
        </div>

        {/* PAGE CONTENT */}
        {/* If we are on inventory page, we want the page component to handle scrolling (for sticky headers) */}
        {/* Otherwise, we scroll the whole main area */}
        <main
          id="main-content"
          className={`flex-1 flex flex-col min-w-0 ${(location.pathname.includes('/inventory') || location.pathname.includes('/categories') || location.pathname.includes('/analytics') || location.pathname.includes('/profile')) ? 'overflow-hidden bg-gray-50/50' : 'overflow-y-auto'}`}
        >
          {/* For Inventory, Categories, Analytics, Profile: Use full width. For others: Keep centered. */}
          <div className={`w-full ${(location.pathname.includes('/inventory') || location.pathname.includes('/categories') || location.pathname.includes('/analytics') || location.pathname.includes('/profile')) ? 'h-full flex flex-col px-2 sm:px-4 lg:px-6 py-4' : 'max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}