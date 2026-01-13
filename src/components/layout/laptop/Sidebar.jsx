import {
  Package,
  Boxes,
  BarChart3,
  Settings,
  Home
} from 'lucide-react'
import { NavLink } from '@/components/common/NavLink'
import { ROUTES } from '@/constants/routes'

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white h-full flex flex-col justify-between p-4">

      {/* Main Navigation */}
      <nav className="space-y-1">
        <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Platform
        </div>
        <NavLink to={ROUTES.INVENTORY} icon={Package} label="Inventory Overview" />
        <NavLink to={ROUTES.CATEGORIES} icon={Boxes} label="Catalog Browser" />
        <NavLink to={ROUTES.ANALYTICS} icon={BarChart3} label="Analytics & Reports" />
      </nav>

      {/* Secondary / Bottom Navigation */}
      <div className="space-y-1 pt-4 border-t border-gray-100">
        <NavLink to={ROUTES.HOME} icon={Home} label="Back to Home" />
        {/* Placeholder for future settings */}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <Settings className="w-4 h-4 text-gray-400" />
          Settings
        </button>
      </div>
    </aside>
  )
}