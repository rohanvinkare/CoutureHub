import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function SalesTrendChart() {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#111827',
                titleFont: { size: 13 },
                bodyFont: { size: 13 },
                padding: 10,
                cornerRadius: 8
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 10 }, color: '#9CA3AF' }
            },
            y: {
                grid: { color: '#F3F4F6' },
                ticks: { font: { size: 10 }, color: '#9CA3AF' },
                beginAtZero: true
            }
        }
    }

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Sales',
                data: [12, 19, 15, 25, 22, 30, 28],
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#4F46E5',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            },
        ],
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-[300px]">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-bold text-gray-900">Weekly Sales Performance</h3>
                    <p className="text-xs text-gray-500">Last 7 days unit sales</p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-extrabold text-gray-900">151</p>
                    <p className="text-xs font-bold text-emerald-600">+12.5%</p>
                </div>
            </div>
            <div className="h-[200px] w-full">
                <Line options={options} data={data} />
            </div>
        </div>
    )
}
