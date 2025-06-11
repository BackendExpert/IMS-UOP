import React from 'react'
import { Users, UserCheck, History } from 'lucide-react' // Valid icons

const InterStatus = () => {
    const interndata = [
        {
            id: 1,
            name: 'Total Interns',
            value: 44,
            icon: Users, // Group of people
            bgColor: 'bg-emerald-500',
        },
        {
            id: 2,
            name: 'Active Interns',
            value: 4,
            icon: UserCheck, // Active status
            bgColor: 'bg-teal-500',
        },
        {
            id: 3,
            name: 'Past Interns',
            value: 4,
            icon: History, // Indicates history/past
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
