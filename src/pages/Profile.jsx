import { Calendar, Building2, Users, TrendingUp } from 'lucide-react'

// Sub-components
import IdentityCard from '@/components/profile/IdentityCard'
import TeamWidget from '@/components/profile/TeamWidget'
import MonthlyTargets from '@/components/profile/MonthlyTargets'
import ExperienceTimeline from '@/components/profile/ExperienceTimeline'
import StatsGrid from '@/components/profile/StatsGrid'
import ActivityFeed from '@/components/profile/ActivityFeed'

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
            { label: "Shrinkage Rate", current: 15, target: 100, color: "bg-rose-500", inverse: true }
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

                {/* LEFT COLUMN (3 cols) - Identity, Shift, Team */}
                <div className="lg:col-span-4 xl:col-span-3 space-y-6">
                    <IdentityCard profile={profile} />
                    <TeamWidget team={profile.teamOnline} />
                </div>

                {/* CENTER COLUMN (6 cols) - Performance, Bio, Timeline */}
                <div className="lg:col-span-8 xl:col-span-6 space-y-6">
                    <MonthlyTargets targets={profile.monthlyTargets} />

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

                    <ExperienceTimeline experience={profile.experience} />
                </div>

                {/* RIGHT COLUMN (3 cols) - Activity & Stats */}
                <div className="lg:col-span-12 xl:col-span-3 space-y-6">
                    <StatsGrid stats={profile.stats} />
                    <ActivityFeed activities={profile.recentActivity} />
                </div>
            </div>
        </div>
    )
}
