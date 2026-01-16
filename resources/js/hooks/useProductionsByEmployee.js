import { useEffect, useState } from 'react'

export function useProductionsByEmployee(employeeId) {
    const [productions, setProductions] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!employeeId) {
            setProductions([])
            return
        }

        let cancelled = false
        setLoading(true)

        fetch(route('productions.employee', employeeId), {
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(res => res.json())
            .then(res => {
                if (!cancelled) {
                    setProductions(res.productions)
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setProductions([])
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [employeeId])

    return { productions, loading }
}
