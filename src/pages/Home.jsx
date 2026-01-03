import { Link } from 'react-router-dom'
import {
  ArrowRight,
  LayoutDashboard,
  Boxes,
  ScanLine,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'

export default function Home() {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-50/50 to-white -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 space-y-32">

        {/* ================= HERO SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="flex flex-col text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center self-center lg:self-start gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              CoutureHub V2.0 Live
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6">
              Streamline Your <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Retail Operations
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              A powerful, real-time inventory management dashboard designed for modern store managers. Track stock, analyze trends, and manage catalogs efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/inventory"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                View Inventory <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/categories"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <Boxes className="w-4 h-4 text-gray-500" />
                Browse Catalog
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-gray-400 grayscale opacity-70">
              {/* Dummy Logos for social proof feeling */}
              <div className="font-bold text-xl">STORE<span className="font-light">MAX</span></div>
              <div className="font-bold text-xl tracking-tighter">RETAIL<span className="text-indigo-300">OS</span></div>
              <div className="font-serif italic font-bold text-xl">FashionHub</div>
            </div>
          </div>

          {/* Right Visual (Abstract UI Preview) */}
          <div className="relative lg:h-[600px] flex items-center justify-center perspective-1000">
            {/* Decorative Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-100/50 blur-3xl rounded-full -z-10 animate-pulse-slow" />

            {/* The "Card Stack" Effect */}
            <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6 transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out">
              {/* Mock Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="h-2 w-20 bg-gray-200 rounded-full" />
              </div>

              {/* Mock Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-indigo-50 rounded-xl">
                  <div className="h-2 w-12 bg-indigo-200 rounded mb-2" />
                  <div className="h-6 w-20 bg-indigo-600 rounded" />
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="h-2 w-12 bg-orange-200 rounded mb-2" />
                  <div className="h-6 w-16 bg-orange-500 rounded" />
                </div>
              </div>

              {/* Mock List */}
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2.5 w-3/4 bg-gray-200 rounded" />
                      <div className="h-2 w-1/2 bg-gray-100 rounded" />
                    </div>
                    <div className="w-8 h-4 bg-emerald-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= FEATURES GRID ================= */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Control Center</h2>
            <p className="text-gray-600">
              Everything a store manager needs to maintain efficiency, from high-level analytics to granular product details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={LayoutDashboard}
              title="Inventory Overview"
              desc="Comprehensive scanning of all products with price, brand, and stock status. Search instantly."
            />
            <FeatureCard
              icon={Boxes}
              title="Catalog Management"
              desc="Visual drill-down into categories. Manage hierarchies and explore product groupings effortlessly."
            />
            <FeatureCard
              icon={ScanLine}
              title="Product Details"
              desc="Deep dive into SKU-level data, high-res imagery, discounts, and related item recommendations."
            />
          </div>
        </div>

        {/* ================= RESPONSIVE BANNER ================= */}
        <div className="bg-gray-900 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

          <div className="relative px-8 py-16 md:py-20 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Designed for Every Device</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Whether you're on the warehouse floor with an iPad or at the back office desk, StoreAdmin adapts perfectly.
            </p>

            <div className="flex justify-center gap-12 text-gray-500">
              <DeviceIcon icon={Monitor} label="Desktop" />
              <DeviceIcon icon={Tablet} label="Tablet" />
              <DeviceIcon icon={Smartphone} label="Mobile" />
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-12 { transform: rotateY(-12deg) rotateX(5deg); }
        .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  )
}

/* ---------------- Helper Components ---------------- */

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300">
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  )
}

function DeviceIcon({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center gap-3 group">
      <div className="p-4 bg-gray-800 rounded-2xl group-hover:bg-indigo-600 transition-colors duration-300">
        <Icon className="w-8 h-8 text-gray-300 group-hover:text-white" />
      </div>
      <span className="text-sm font-medium text-gray-400 group-hover:text-white">{label}</span>
    </div>
  )
}



// --------------- TO show the error state 

// export default function Home() {
//   // 🔴 TEMP: Add this line to simulate a crash
//   throw new Error("Test Crash: Error Boundary Verification") 

//   return (
//     <div className="relative bg-white overflow-hidden">
//       {/* ... rest of your code ... */}
//     </div>
//   )
// }