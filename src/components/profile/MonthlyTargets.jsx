import { Target } from 'lucide-react'

export default function MonthlyTargets({ targets }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
                <Target className="w-5 h-5 text-indigo-600" />
                <div>
                    <h3 className="text-base font-bold text-gray-900">Monthly Targets</h3>
                    <p className="text-xs text-gray-500">Progress towards January goals</p>
                </div>
            </div>
            <div className="space-y-5">
                {targets.map((goal, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-xs mb-1.5 font-medium">
                            <span className="text-gray-700">{goal.label}</span>
                            <span className="text-gray-900">{goal.current}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div className={`h-full rounded-full ${goal.color}`} style={{ width: `${goal.current}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
