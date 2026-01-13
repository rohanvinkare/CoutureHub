import { Pie } from 'react-chartjs-2'
import { defaultOptions } from '../chartConfig'

export default function StockStatusChart({ products }) {
    let inStock = 0
    let lowStock = 0
    let outOfStock = 0

    products.forEach(p => {
        if (p.stock === 0) outOfStock++
        else if (p.stock < 10) lowStock++
        else inStock++
    })

    const data = {
        labels: ['Healthy Stock', 'Low Stock', 'Out of Stock'],
        datasets: [
            {
                data: [inStock, lowStock, outOfStock],
                backgroundColor: [
                    '#10b981', // Emerald-500
                    '#f59e0b', // Amber-500
                    '#ef4444', // Red-500
                ],
                borderWidth: 0,
            },
        ],
    }

    const options = {
        ...defaultOptions,
        scales: {
            x: { display: false },
            y: { display: false }
        },
        plugins: {
            ...defaultOptions.plugins,
            legend: {
                position: 'right',
                labels: { ...defaultOptions.plugins.legend.labels, padding: 10 }
            }
        }
    }

    return (
        <div className="h-48">
            <Pie data={data} options={options} />
        </div>
    )
}
