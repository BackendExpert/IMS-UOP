import React from 'react'
import { Users, UserX } from 'lucide-react'

const MyInternsStatus = () => {
    const myinters = [
        {
            id: 1,
            name: 'My Current Inters',
            value: 5,
            icon: Users,
            bgColor: 'bg-emerald-500',
        },
        {
            id: 2,
            name: 'My Past Inters',
            value: 5,
            icon: UserX,
            bgColor: 'bg-teal-500',
        },
    ]
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                {
                    myinters.map((intern, index) => {
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

export default MyInternsStatus