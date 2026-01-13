import { Briefcase, Building2 } from 'lucide-react'

export default function ExperienceTimeline({ experience }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-gray-400" />
                <h3 className="text-base font-bold text-gray-900">Career History</h3>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {experience.map((job, i) => (
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
    )
}
