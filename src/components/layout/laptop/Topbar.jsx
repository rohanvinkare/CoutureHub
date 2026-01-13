import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Search, AlertCircle, ShoppingBag, Info, X } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { getProducts } from '@/api/products.api'

export default function Topbar() {
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [outOfStockCount, setOutOfStockCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const dropdownRef = useRef(null)

  // Fetch Inventory Data for Alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getProducts(1000, 0) // Fetch all for count
        const oos = data.products.filter(p => p.stock === 0).length
        setOutOfStockCount(oos)
      } catch (error) {
        console.error("Failed to fetch notification data", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNotificationClick = (path) => {
    setShowNotifications(false)
    if (path) navigate(path)
  }

  // Construct Notifications List
  const notifications = [
    // Dynamic Stock Alert
    ...(outOfStockCount > 0 ? [{
      id: 'stock-alert',
      type: 'critical',
      title: 'Action Needed: Stock Alert',
      message: `${outOfStockCount} products have reached 0 inventory.`,
      icon: AlertCircle,
      actionLabel: 'Restock Now',
      actionPath: `${ROUTES.INVENTORY}?stockStatus=out_of_stock`,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }] : []),
    // Dummy Notifications
    {
      id: 'order-1',
      type: 'info',
      title: 'New Wave of Orders',
      message: '15 new orders received in the last hour.',
      icon: ShoppingBag,
      time: '12m ago',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'sys-1',
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance tonight at 2 AM.',
      icon: Info,
      time: '1h ago',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ]

  const unreadCount = notifications.length

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between shadow-sm relative z-50">

      {/* Left: Brand / Title */}
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

        {/* Search Bar (Visual Only) */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 w-64 focus-within:ring-2 focus-within:ring-indigo-100 transition-shadow">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Global Search..."
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <Bell className="w-6 h-6" />
            {!loading && unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden origin-top-right transform transition-all z-[100]">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{unreadCount} New</span>
              </div>

              <div className="max-h-[70vh] overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-sm text-gray-500">Loading alerts...</div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No new notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {notifications.map((note) => (
                      <div
                        key={note.id}
                        onClick={() => note.actionPath && handleNotificationClick(note.actionPath)}
                        className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 ${note.actionPath ? 'cursor-pointer group' : ''}`}
                      >
                        <div className={`mt-1 p-2 rounded-full h-fit flex-shrink-0 ${note.bgColor} ${note.color}`}>
                          <note.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className={`text-sm font-semibold ${note.type === 'critical' ? 'text-red-600' : 'text-gray-900'}`}>{note.title}</p>
                            {note.time && <span className="text-xs text-gray-400">{note.time}</span>}
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5 leading-snug">{note.message}</p>

                          {note.actionLabel && (
                            <button className="mt-3 text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded shadow-sm transition-colors group-hover:shadow-md">
                              {note.actionLabel}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-center">
                <button className="text-xs font-medium text-gray-500 hover:text-gray-900">Mark all as read</button>
              </div>
            </div>
          )}
        </div>


        <div className="h-8 w-px bg-gray-200 mx-1"></div>

        <Link to={ROUTES.PROFILE} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none group-hover:text-indigo-600 transition-colors">Store Manager</p>
            <p className="text-xs text-gray-500 mt-1">admin@couture.com</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-indigo-200 group-hover:ring-2 group-hover:ring-indigo-500 group-hover:ring-offset-2 transition-all">
            SM
          </div>
        </Link>
      </div>
    </header>
  )
}