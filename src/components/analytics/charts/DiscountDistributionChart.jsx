import { Bar } from 'react-chartjs-2'
import { defaultOptions } from '../chartConfig'

export default function DiscountDistributionChart({ products }) {
    const buckets = { 'No Discount': 0, '1-10%': 0, '10-20%': 0, '20%+': 0 }

    products.forEach(p => {
        const d = p.discountPercentage || 0
        if (d <= 0) buckets['No Discount']++
        else if (d <= 10) buckets['1-10%']++
        else if (d <= 20) buckets['10-20%']++
        else buckets['20%+']++
    })

    const data = {
        labels: Object.keys(buckets),
        datasets: [
            {
                label: 'Products',
                data: Object.values(buckets),
                backgroundColor: '#fb7185', // Rose-400
                borderRadius: 4,
                barThickness: 30
            }
        ]
    }

    return (
        <div className="h-48">
            <Bar data={data} options={defaultOptions} />
        </div>
    )
}
