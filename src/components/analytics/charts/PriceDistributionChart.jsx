import { Bar } from 'react-chartjs-2'
import { defaultOptions } from '../chartConfig'

export default function PriceDistributionChart({ products }) {
    // Determine buckets: 0-50, 50-100, 100-200, 200-500, 500+
    const buckets = {
        '0-50': 0,
        '50-100': 0,
        '100-200': 0,
        '200-500': 0,
        '500+': 0
    }

    products.forEach(p => {
        if (p.price <= 50) buckets['0-50']++
        else if (p.price <= 100) buckets['50-100']++
        else if (p.price <= 200) buckets['100-200']++
        else if (p.price <= 500) buckets['200-500']++
        else buckets['500+']++
    })

    const data = {
        labels: ['$0 - $50', '$50 - $100', '$100 - $200', '$200 - $500', '$500+'],
        datasets: [
            {
                label: 'Products in Price Range',
                data: Object.values(buckets),
                backgroundColor: 'rgba(16, 185, 129, 0.2)', // Emerald-500 (transparent)
                borderColor: '#10b981', // Emerald-500
                borderWidth: 2,
                borderRadius: 4,
                barThickness: 'flex',
                maxBarThickness: 50
            },
        ],
    }

    return (
        <div className="h-64">
            <Bar data={data} options={defaultOptions} />
        </div>
    )
}
