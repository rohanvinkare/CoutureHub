import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function IdentityCard({ profile }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
            <div className="h-20 bg-indigo-50"></div>
            <div className="px-6 pb-6 text-center -mt-10 relative">
                <div className="w-20 h-20 mx-auto bg-white rounded-full p-1 shadow-md mb-3">
                    <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-2xl font-bold">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
                <p className="text-indigo-600 font-medium text-xs mb-4">{profile.role}</p>

                <div className="flex gap-2">
                    <button className="flex-1 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition">Edit</button>
                    <button className="flex-1 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100 transition">Settings</button>
                </div>
            </div>

            {/* Shift Status Widget */}
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/30">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700">Current Shift</span>
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                </div>
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-2">
                    <div className="p-1.5 bg-emerald-100 rounded text-emerald-600">
                        <Clock className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Clocked In</p>
                        <p className="text-sm font-bold text-gray-900">04h 32m</p>
                    </div>
                </div>
            </div>

            {/* Contact Info List */}
            <div className="border-t border-gray-100 px-6 py-4 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{profile.location}</span>
                </div>
            </div>
        </div>
    )
}
