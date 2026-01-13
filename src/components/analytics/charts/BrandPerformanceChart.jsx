import { Bar } from 'react-chartjs-2'
import { defaultOptions } from '../chartConfig'

export default function BrandPerformanceChart({ brands }) {
    const topBrands = Object.entries(brands)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8) // Top 8 Brands

    const data = {
        labels: topBrands.map(([name]) => name),
        datasets: [
            {
                label: 'Product Count',
                data: topBrands.map(([, count]) => count),
                backgroundColor: '#3b82f6', // Blue-500
                borderRadius: 4,
                barThickness: 20
            },
        ],
    }

    const options = {
        ...defaultOptions,
        indexAxis: 'y', // Horizontal Bar Chart
        scales: {
            x: {
                ...defaultOptions.scales.x,
                grid: { display: true, color: '#f3f4f6', borderDash: [4, 4] }
            },
            y: {
                ...defaultOptions.scales.y,
                grid: { display: false }
            }
        }
    }

    return (
        <div className="h-80">
            <Bar data={data} options={options} />
        </div>
    )
}
