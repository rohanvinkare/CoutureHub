import { Link, useLocation } from 'react-router-dom'
import { 
  Package, 
  Boxes, 
  BarChart3, 
  Home
} from 'lucide-react'

export default function MobileNavbar() {
  const { pathname } = useLocation()

  const MobileLink = ({ to, icon: Icon, label }) => {
     const isActive = pathname.startsWith(to) && to !== '/' || pathname === to
     
     return (
       <Link 
         to={to} 
         className={`flex flex-col items-center justify-center min-w-[72px] py-2 rounded-lg gap-1 transition-colors ${
            isActive 
              ? 'text-indigo-600 bg-indigo-50' 
              : 'text-gray-500 hover:bg-gray-50'
         }`}
       >
         <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
         <span className="text-[10px] font-medium">{label}</span>
       </Link>
     )
  }

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2 font-bold text-gray-900 mr-4">
         <span className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white text-xs">C</span>
      </div>
      
      <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 justify-end">
        <MobileLink to="/" icon={Home} label="Home" />
        <MobileLink to="/inventory" icon={Package} label="Inventory" />
        <MobileLink to="/categories" icon={Boxes} label="Catalog" />
        <MobileLink to="/analytics" icon={BarChart3} label="Stats" />
      </nav>
    </div>
  )
}