
import { Link } from 'react-router-dom'
import { useActiveRoute } from '@/hooks/useActiveRoute'

export function NavLink({ to, icon: Icon, label, variant = 'desktop' }) {
    const { isActive } = useActiveRoute()
    const active = isActive(to)

    const variantStyles = {
        desktop: {
            base: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            active: "bg-indigo-50 text-indigo-700",
            inactive: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        },
        mobile: {
            base: "flex flex-col items-center justify-center min-w-[72px] py-2 rounded-lg gap-1 transition-colors",
            active: "text-indigo-600 bg-indigo-50",
            inactive: "text-gray-500 hover:bg-gray-50"
        }
    }

    const styles = variantStyles[variant]

    // Icon styling
    const iconClass = variant === 'desktop'
        ? `w-4 h-4 transition-colors ${active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`
        : `w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`

    return (
        <Link
            to={to}
            className={`group ${styles.base} ${active ? styles.active : styles.inactive}`}
        >
            <Icon className={iconClass} />
            {variant === 'desktop' && <span>{label}</span>}
            {variant === 'mobile' && <span className="text-[10px] font-medium">{label}</span>}
        </Link>
    )
}
