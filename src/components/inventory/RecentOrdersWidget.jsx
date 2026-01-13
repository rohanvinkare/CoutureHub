import { ShoppingBag, Clock } from 'lucide-react'

export default function RecentOrdersWidget() {
    const orders = [
        { id: "#ORD-7829", customer: "Sarah Jenkins", quantity: 2, time: "10m ago", status: "New" },
        { id: "#ORD-7811", customer: "Mike Ross", quantity: 1, time: "45m ago", status: "Processing" },
        { id: "#ORD-7750", customer: "Jessica Pearson", quantity: 5, time: "2h ago", status: "Completed" },
    ]

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-indigo-600" />
                    Recent Orders
                </h3>
            </div>

            <div className="space-y-4">
                {orders.map((order, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                {order.customer.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-900">{order.customer}</p>
                                <p className="text-[10px] text-gray-500">{order.id} • {order.quantity} items</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 justify-end text-[10px] text-gray-400 mb-0.5">
                                <Clock className="w-3 h-3" />
                                {order.time}
                            </div>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${order.status === 'New' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                View All Orders
            </button>
        </div>
    )
}
