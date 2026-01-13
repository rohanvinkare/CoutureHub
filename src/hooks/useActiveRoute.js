import { useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function useActiveRoute() {
    const { pathname } = useLocation()

    const isActive = (to) => {
        if (to === ROUTES.HOME) return pathname === to
        return pathname.startsWith(to)
    }

    return { isActive, pathname }
}
