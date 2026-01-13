import {
  Package,
  Boxes,
  BarChart3,
  Home
} from 'lucide-react'
import { NavLink } from '@/components/common/NavLink'
import { ROUTES } from '@/constants/routes'

export default function MobileNavbar() {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2 font-bold text-gray-900 mr-4">
        <span className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-xs">C</span>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 justify-end">
        <NavLink to={ROUTES.HOME} icon={Home} label="Home" variant="mobile" />
        <NavLink to={ROUTES.INVENTORY} icon={Package} label="Inventory" variant="mobile" />
        <NavLink to={ROUTES.CATEGORIES} icon={Boxes} label="Catalog" variant="mobile" />
        <NavLink to={ROUTES.ANALYTICS} icon={BarChart3} label="Stats" variant="mobile" />
      </nav>
    </div>
  )
}