import React from 'react'
import { Users, UserCheck, ClipboardList, BarChart4, ShieldCheck, Settings2 } from 'lucide-react';

const DIrDashStatus = () => {
    const dirdashdata = [
        {
            id: 1,
            name: 'Total Projects',
            value: 5,
            icon: ClipboardList,
            bgColor: 'bg-emerald-500',
        },
        {
            id: 2,
            name: 'Completed Projects',
            value: 5,
            icon: BarChart4,
            bgColor: 'bg-green-500',
        },
        {
            id: 3,
            name: 'Total Interns',
            value: 5,
            icon: Users,
            bgColor: 'bg-teal-500',
        },
        {
            id: 4,
            name: 'Active Interns',
            value: 5,
            icon: UserCheck,
            bgColor: 'bg-cyan-500',
        },
        {
            id: 5,
            name: 'Supervisors',
            value: 5,
            icon: ShieldCheck,
            bgColor: 'bg-blue-500',
        },
        {
            id: 6,
            name: 'Active User Roles',
            value: 5,
            icon: Settings2,
            bgColor: 'bg-indigo-500',
        },
    ];

    return (
        <div>
            <h1 className="text-indigo-500 font-bold text-xl uppercase">System Status</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 my-6">
                {dirdashdata.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className={`relative ${item.bgColor} text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300`}
                        >
                            <div className="absolute right-4 top-4 opacity-20">
                                <Icon className="h-16 w-16" />
                            </div>
                            <div className="relative z-10">
                                <div className="text-sm font-medium uppercase tracking-wide text-white/90">
                                    {item.name}
                                </div>
                                <div className="mt-2 text-4xl font-bold">{item.value}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DIrDashStatus;
