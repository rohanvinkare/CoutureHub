import { Doughnut } from 'react-chartjs-2'
import { defaultOptions } from '../chartConfig'

export default function CategoryDistributionChart({ categories }) {
    // Sort by count and take top 5 + "Others"
    const sorted = Object.entries(categories).sort((a, b) => b[1] - a[1])
    const topCategories = sorted.slice(0, 5)
    const othersCount = sorted.slice(5).reduce((sum, [, count]) => sum + count, 0)

    if (othersCount > 0) {
        topCategories.push(['Others', othersCount])
    }

    const data = {
        labels: topCategories.map(([name]) => name.charAt(0).toUpperCase() + name.slice(1)), // Capitalize
        datasets: [
            {
                data: topCategories.map(([, count]) => count),
                backgroundColor: [
                    '#4f46e5', // Indigo-600
                    '#8b5cf6', // Violet-500
                    '#ec4899', // Pink-500
                    '#06b6d4', // Cyan-500
                    '#10b981', // Emerald-500
                    '#94a3b8', // Slate-400 (Others)
                ],
                borderWidth: 0,
                hoverOffset: 4
            },
        ],
    }

    const options = {
        ...defaultOptions,
        cutout: '75%', // Thinner ring for modern look
        scales: {
            x: { display: false },
            y: { display: false }
        }
    }

    return (
        <div className="h-64 relative">
            <Doughnut data={data} options={options} />
            {/* Center Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-gray-900">{Object.keys(categories).length}</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Categories</span>
            </div>
        </div>
    )
}
