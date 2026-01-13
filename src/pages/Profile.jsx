import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    Award,
    Building2,
    Users,
    TrendingUp,
    Globe,
    ShieldCheck,
    CheckCircle2,
    Linkedin,
    Twitter,
    Clock,
    Activity,
    Target,
    MoreHorizontal
} from 'lucide-react'

export default function Profile() {
    // Dummy Data for Store Manager
    const profile = {
        name: "Alex Sterling",
        role: "Senior Store Manager",
        email: "alex.sterling@couturehub.com",
        phone: "+1 (555) 123-4567",
        location: "New York, USA",
        joinedDate: "March 2019",
        bio: "Driving retail excellence through strategic inventory management and team empowerment. With over 8 years in the luxury sector, I specialize in transforming store operations to maximize profitability.",
        stats: [
            { label: "Years Exp", value: "8+", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Stores", value: "12", icon: Building2, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Team Size", value: "45", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Growth", value: "150%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
        ],
        skills: ["Inventory Mgmt", "Leadership", "Visual Merchandising", "Retail Analytics", "Supply Chain"],
        experience: [
            {
                company: "CoutureHub Flagship",
                role: "Senior Store Manager",
                period: "2021 - Present",
                description: "Leading the flagship location to record-breaking quarterly sales. Implemented AI-driven inventory forecasting that reduced waste by 18%."
            },
            {
                company: "Luxe Fashion Inc.",
                role: "Assistant Manager",
                period: "2018 - 2021",
                description: "Orchestrated the opening of 3 new pop-up locations. Managed staff training programs that improved customer satisfaction scores by 25%."
            }
        ],
        recentActivity: [
            { action: "Restocked", item: "Summer Collection", time: "2h ago", type: "stock" },
            { action: "Price Update", item: "Vintage Leather Jacket", time: "4h ago", type: "price" },
            { action: "Audit", item: "Accessories Section", time: "Yesterday", type: "audit" },
        ],
        monthlyTargets: [
            { label: "Monthly Sales Goal", current: 85, target: 100, color: "bg-emerald-500" },
            { label: "Inventory Accuracy", current: 98, target: 100, color: "bg-indigo-500" },
            { label: "Shrinkage Rate", current: 15, target: 100, color: "bg-rose-500", inverse: true } // Low is good, displayed as 'allowance used'
        ],
        teamOnline: [
            { name: "Sarah M.", role: "Asst. Mgr", img: "https://i.pravatar.cc/150?u=1" },
            { name: "Mike R.", role: "Stock Lead", img: "https://i.pravatar.cc/150?u=2" },
            { name: "Jessica T.", role: "Visual Merch", img: "https://i.pravatar.cc/150?u=3" },
        ]
    }

    return (
        <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-12 w-full [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>

            {/* Cover Image */}
            <div className="h-48 sm:h-56 rounded-2xl bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-900 relative shadow-sm mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white max-w-2xl">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
                    <p className="text-white/80 text-sm font-medium">Manage your professional identity, track performance targets, and view recent activity.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1920px] mx-auto">

                {/* LEFT COLUMN (3 cols) - Identity, Shift, Contact */}
                <div className="lg:col-span-4 xl:col-span-3 space-y-6">

                    {/* Identity Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
                        <div className="h-20 bg-indigo-50"></div>
                        <div className="px-6 pb-6 text-center -mt-10 relative">
                            <div className="w-20 h-20 mx-auto bg-white rounded-full p-1 shadow-md mb-3">
                                <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-2xl font-bold">AS</div>
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

                    {/* Team Online Widget */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Team Activity</h3>
                            <span className="text-xs font-medium text-indigo-600 cursor-pointer">View All</span>
                        </div>
                        <div className="space-y-3">
                            {profile.teamOnline.map((member, i) => (
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

                </div>

                {/* CENTER COLUMN (6 cols) - Performance, Bio, Timeline */}
                <div className="lg:col-span-8 xl:col-span-6 space-y-6">

                    {/* Monthly Targets Section */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Target className="w-5 h-5 text-indigo-600" />
                            <div>
                                <h3 className="text-base font-bold text-gray-900">Monthly Targets</h3>
                                <p className="text-xs text-gray-500">Progress towards January goals</p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            {profile.monthlyTargets.map((goal, i) => (
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

                    {/* About Section */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-gray-900">Professional Bio</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            {profile.bio}
                        </p>
                        {/* Core Skills Tags */}
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill, i) => (
                                <span key={i} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Experience Timeline */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Briefcase className="w-5 h-5 text-gray-400" />
                            <h3 className="text-base font-bold text-gray-900">Career History</h3>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                            {profile.experience.map((job, i) => (
                                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <Building2 className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                                            <h4 className="font-bold text-gray-900 text-sm">{job.role}</h4>
                                            <time className="text-[10px] text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{job.period}</time>
                                        </div>
                                        <p className="text-xs text-indigo-600 font-medium mb-2">{job.company}</p>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            {job.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (3 cols) - Activity & Stats */}
                <div className="lg:col-span-12 xl:col-span-3 space-y-6">

                    {/* KPI Stats Grid - compact for side column */}
                    <div className="grid grid-cols-2 xl:grid-cols-1 gap-4">
                        {profile.stats.map((stat, i) => (
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

                    {/* Recent Activity Feed */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex-1">
                        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-indigo-600" />
                                <h3 className="font-bold text-gray-900 text-sm">Recent Activity</h3>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
                        </div>
                        <div className="relative border-l border-gray-200 ml-2 space-y-6">
                            {profile.recentActivity.map((act, i) => (
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

                </div>
            </div>
        </div>
    )
}
