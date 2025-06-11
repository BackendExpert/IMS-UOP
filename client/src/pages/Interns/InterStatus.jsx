import React, { useEffect, useState } from 'react'
import { Users, UserCheck, History } from 'lucide-react'
import axios from 'axios'

const InterStatus = () => {
    const [getallinterns, setgetallinterns] = useState([])
    const [activeCount, setActiveCount] = useState(0)
    const [pastCount, setPastCount] = useState(0)
    const token = localStorage.getItem('login')

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/intern/get-all-interns', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                const interns = res.data.Result || []
                setgetallinterns(interns)

                const active = interns.filter(intern => intern.isOneIntern === true).length
                const past = interns.filter(intern => intern.isOneIntern === false).length

                setActiveCount(active)
                setPastCount(past)
            })
            .catch(err => console.log(err))
    }, [])

    const interndata = [
        {
            id: 1,
            name: 'Total Interns',
            value: getallinterns.length,
            icon: Users,
            bgColor: 'bg-emerald-500',
        },
        {
            id: 2,
            name: 'Active Interns',
            value: activeCount,
            icon: UserCheck,
            bgColor: 'bg-teal-500',
        },
        {
            id: 3,
            name: 'Past Interns',
            value: pastCount,
            icon: History,
            bgColor: 'bg-cyan-500',
        },
    ]

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                {
                    interndata.map((intern, index) => {
                        const Icon = intern.icon
                        return (
                            <div className={`relative ${intern.bgColor} text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300`} key={index}>
                                <div className="absolute right-4 top-4 opacity-20 text-white text-6xl">
                                    <Icon className="h-14 w-14" />
                                </div>

                                <div className="relative z-10">
                                    <div className="text-sm font-medium uppercase tracking-wide text-emerald-100">
                                        {intern.name}
                                    </div>
                                    <div className="mt-2 text-3xl font-bold">{intern.value}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default InterStatus
