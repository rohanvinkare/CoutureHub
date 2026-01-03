// import { Link, useLocation } from 'react-router-dom'

// export default function Sidebar() {
//   const { pathname } = useLocation()

//   const linkClass = path =>
//     `block rounded px-3 py-2 text-sm ${pathname === path
//       ? 'bg-indigo-50 text-indigo-600 font-semibold'
//       : 'hover:bg-gray-100'
//     }`

//   return (
//     <aside className="w-60 border-r bg-white px-4 py-4 shrink-0">
//       <nav className="flex flex-col gap-1">
//         <Link to="/" className={linkClass('/')}>Home</Link>
//         <Link to="/inventory" className={linkClass('/inventory')}>
//           Inventory
//         </Link>
//         <Link to="/categories" className={linkClass('/categories')}>
//           Categories
//         </Link>
//         <Link to="/analytics" className={linkClass('/analytics')}>
//           Analytics
//         </Link>
//       </nav>
//     </aside>
//   )
// }


import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  BarChart3, 
  Settings,
  Home
} from 'lucide-react'

export default function Sidebar() {
  const { pathname } = useLocation()

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = pathname.startsWith(to) && to !== '/' || pathname === to
    
    return (
      <Link 
        to={to} 
        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive 
            ? 'bg-indigo-50 text-indigo-700' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
        {label}
      </Link>
    )
  }

  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-full flex flex-col justify-between p-4">
      
      {/* Main Navigation */}
      <nav className="space-y-1">
        <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Platform
        </div>
        <NavItem to="/inventory" icon={Package} label="Inventory Overview" />
        <NavItem to="/categories" icon={Boxes} label="Catalog Browser" />
        <NavItem to="/analytics" icon={BarChart3} label="Analytics & Reports" />
      </nav>

      {/* Secondary / Bottom Navigation */}
      <div className="space-y-1 pt-4 border-t border-gray-100">
        <NavItem to="/" icon={Home} label="Back to Home" />
        {/* Placeholder for future settings */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Settings className="w-4 h-4 text-gray-400" />
            Settings
        </button>
      </div>
    </aside>
  )
}