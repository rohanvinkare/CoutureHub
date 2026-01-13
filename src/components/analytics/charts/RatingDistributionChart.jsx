import { Bar } from 'react-chartjs-2'
import { defaultOptions } from '../chartConfig'

export default function RatingDistributionChart({ products }) {
    const buckets = { '5★': 0, '4★': 0, '3★': 0, '2★': 0, '1★': 0 }

    products.forEach(p => {
        const rating = Math.round(p.rating || 0)
        if (rating >= 5) buckets['5★']++
        else if (rating === 4) buckets['4★']++
        else if (rating === 3) buckets['3★']++
        else if (rating === 2) buckets['2★']++
        else buckets['1★']++
    })

    const data = {
        labels: Object.keys(buckets),
        datasets: [
            {
                label: 'Products',
                data: Object.values(buckets),
                backgroundColor: '#facc15', // Yellow-400
                borderRadius: 4,
                barThickness: 30
            }
        ]
    }

    const options = {
        ...defaultOptions,
        scales: {
            x: {
                ...defaultOptions.scales.x,
                grid: { display: false }
            },
            y: {
                ...defaultOptions.scales.y,
                display: false // Hide Y axis for cleaner look (bar labels enough)
            }
        }
    }

    return (
        <div className="h-48">
            <Bar data={data} options={options} />
        </div>
    )
}
