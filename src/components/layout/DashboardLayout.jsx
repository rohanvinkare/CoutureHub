// import { useLocation } from 'react-router-dom'
// import Sidebar from './laptop/Sidebar'
// import Topbar from './laptop/Topbar'
// import MobileNavbar from '@/components/layout/mobile/MobileNavbar'

// export default function DashboardLayout({ children }) {
//   const location = useLocation()
//   const isHome = location.pathname === '/'

//   // HOME PAGE → NO NAV / SIDEBAR / TOPBAR
//   if (isHome) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         {children}
//       </div>
//     )
//   }

//   // ALL OTHER ROUTES → DASHBOARD
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">

//       {/* TOPBAR → DESKTOP ONLY */}
//       <div className="hidden lg:block">
//         <Topbar />
//       </div>

//       {/* MOBILE NAVBAR */}
//       <div className="lg:hidden border-b bg-white">
//         <MobileNavbar />
//       </div>

//       {/* BODY */}
//       <div className="flex flex-1 overflow-hidden">

//         {/* SIDEBAR → DESKTOP ONLY */}
//         <div className="hidden lg:block">
//           <Sidebar />
//         </div>

//         {/* MAIN CONTENT */}
//         <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }



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
    <div className="min-h-screen bg-gray-50/50 flex flex-col">

      {/* TOPBAR (Desktop) */}
      <div className="hidden lg:block sticky top-0 z-50">
        <Topbar />
      </div>

      {/* MOBILE NAVBAR */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b shadow-sm">
        <MobileNavbar />
      </div>

      {/* MAIN BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR (Desktop) */}
        <div className="hidden lg:block shrink-0 h-[calc(100vh-64px)] sticky top-16">
          <Sidebar />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}