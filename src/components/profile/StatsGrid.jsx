export default function StatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="flex items-center gap-3 relative z-10">
                        <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-gray-900 leading-none">{stat.value}</p>
                            <p className="text-[10px] text-gray-500 font-medium uppercase mt-1">{stat.label}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
