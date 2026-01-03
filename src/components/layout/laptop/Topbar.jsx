import { Link } from 'react-router-dom'
import { Bell, Search } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between shadow-sm">

      {/* Left: Brand / Title -> Wrapped in Link to Home */}
      <Link
        to="/"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Couture<span className="font-light">Hub</span>
        </h1>
      </Link>


      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">


        <div className="h-8 w-px bg-gray-200 mx-1"></div>

        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">Store Manager</p>
            <p className="text-xs text-gray-500 mt-1">admin@couture.com</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-indigo-200">
            SM
          </div>
        </div>
      </div>
    </header>
  )
}