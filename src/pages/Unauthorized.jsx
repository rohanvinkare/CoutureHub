import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 bg-gray-50/30">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
        
        {/* Icon Container */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-full border border-red-100">
            <ShieldAlert className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Access Denied
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you are looking for doesn't exist or you don't have permission to view it. Please check the URL or return home.
        </p>

        {/* Primary Action */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Dashboard
        </Link>
        
        {/* Secondary Help Text (Optional) */}
        <p className="mt-6 text-xs text-gray-400">
          Error Code: 404 / 401
        </p>
      </div>
    </div>
  )
}