import React, { useEffect, useState } from 'react'
import { Users, UserX } from 'lucide-react'
import axios from 'axios'

const MyInternsStatus = () => {
    const token = localStorage.getItem('login')
    const [myallintern, setmyallintern] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/supervisor/supervisor-get-interns', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setmyallintern(res.data.Result)
            })
            .catch(err => console.log(err))
    }, [])

    // Filter logic
    const today = new Date()
    const currentInterns = []
    const pastInterns = []

    myallintern.forEach(project => {
        project.intern.forEach(intern => {
            const endDate = new Date(intern.InternshipEndAt)
            if (!intern.InternshipEndAt) return
            if (endDate >= today) {
                currentInterns.push(intern)
            } else {
                pastInterns.push(intern)
            }
        })
    })

    const myinters = [
        {
            id: 1,
            name: 'My Current Interns',
            value: currentInterns.length,
            icon: Users,
            bgColor: 'bg-emerald-500',
        },
        {
            id: 2,
            name: 'My Past Interns',
            value: pastInterns.length,
            icon: UserX,
            bgColor: 'bg-teal-500',
        },
    ]

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                {myinters.map((intern, index) => {
                    const Icon = intern.icon
                    return (
                        <div
                            key={index}
                            className={`relative ${intern.bgColor} text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300`}
                        >
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
                })}
            </div>
        </div>
    )
}

export default MyInternsStatus
