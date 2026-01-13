import { Mail } from 'lucide-react'

export default function TeamWidget({ team }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Team Activity</h3>
                <span className="text-xs font-medium text-indigo-600 cursor-pointer">View All</span>
            </div>
            <div className="space-y-3">
                {team.map((member, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="relative">
                            <img src={member.img} alt={member.name} className="w-8 h-8 rounded-full border border-gray-100" />
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">{member.name}</p>
                            <p className="text-[10px] text-gray-500 truncate">{member.role}</p>
                        </div>
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
