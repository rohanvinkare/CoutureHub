import { Activity, MoreHorizontal } from 'lucide-react'

export default function ActivityFeed({ activities }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex-1">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-bold text-gray-900 text-sm">Recent Activity</h3>
                </div>
                <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
            <div className="relative border-l border-gray-200 ml-2 space-y-6">
                {activities.map((act, i) => (
                    <div key={i} className="relative pl-6">
                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-indigo-400"></div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-gray-900">{act.action}</p>
                                <p className="text-xs text-gray-500">{act.item}</p>
                            </div>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap">{act.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 pt-3 border-t border-gray-100 text-center">
                <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">View Full Log</button>
            </div>
        </div>
    )
}
