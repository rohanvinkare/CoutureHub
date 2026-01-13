import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
} from 'chart.js'

// Register ChartJS components globally
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale
)

// Default Chart Options for Professional Look
export const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    family: "'Inter', sans-serif",
                    size: 11
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#1f2937', // gray-900
            bodyColor: '#4b5563', // gray-600
            borderColor: '#e5e7eb', // gray-200
            borderWidth: 1,
            padding: 12,
            boxPadding: 4,
            usePointStyle: true,
            titleFont: {
                family: "'Inter', sans-serif",
                size: 13,
                weight: 'bold'
            },
            bodyFont: {
                family: "'Inter', sans-serif",
                size: 12
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false,
                drawBorder: false
            },
            ticks: {
                font: {
                    family: "'Inter', sans-serif",
                    size: 10
                },
                color: '#9ca3af' // gray-400
            }
        },
        y: {
            grid: {
                color: '#f3f4f6', // gray-100
                borderDash: [4, 4],
                drawBorder: false
            },
            ticks: {
                font: {
                    family: "'Inter', sans-serif",
                    size: 10
                },
                color: '#9ca3af', // gray-400
                padding: 10
            }
        }
    }
}
