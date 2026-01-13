import { Bar } from 'react-chartjs-2'
import { defaultOptions } from '../chartConfig'

export default function InventoryValueByCategoryChart({ products }) {
    const values = {}

    products.forEach(p => {
        if (p.category) {
            const val = p.price * p.stock
            values[p.category] = (values[p.category] || 0) + val
        }
    })

    const sorted = Object.entries(values)
        .sort((a, b) => b[1] - a[1]) // Sort highest value first
        .slice(0, 8)

    const data = {
        labels: sorted.map(([cat]) => cat.charAt(0).toUpperCase() + cat.slice(1)),
        datasets: [
            {
                label: 'Inventory Value ($)',
                data: sorted.map(([, val]) => val),
                backgroundColor: '#10b981', // Emerald-500
                borderRadius: 4,
                barThickness: 20
            }
        ]
    }

    const options = {
        ...defaultOptions,
        indexAxis: 'y',
        scales: {
            x: {
                ...defaultOptions.scales.x,
                ticks: {
                    callback: (value) => '$' + value // Format as currency
                }
            }
        }
    }

    return (
        <div className="h-80">
            <Bar data={data} options={options} />
        </div>
    )
}
