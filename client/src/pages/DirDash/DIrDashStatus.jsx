import React, { useEffect, useState } from 'react'
import { Users, UserCheck, ClipboardList, BarChart4, ShieldCheck, Settings2 } from 'lucide-react';
import axios from 'axios';

const DIrDashStatus = () => {
    const token = localStorage.getItem('login')
    const [getallproject, setgetallproject] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/project/get-all-projects', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setgetallproject(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    const completedProjects = getallproject.filter(p => {
        return new Date(p.estimatedEndDate) < new Date();
    }).length;


    const [getallinterns, setgetallinterns] = useState([])
    const [activeCount, setActiveCount] = useState(0)
    const [pastCount, setPastCount] = useState(0)

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

    const [allSupervisor, setallSupervisor] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/supervisor/get-all-supervisors', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setallSupervisor(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    const [getreols, setgetroles] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/auth/view-all-role', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setgetroles(res.data.Result))
            .catch(err => console.log(err))
    }, [])


    const dirdashdata = [
        {
            id: 1,
            name: 'Total Projects',
            value: getallproject.length,
            icon: ClipboardList,
            bgColor: 'bg-emerald-500',
        },
        {
            id: 2,
            name: 'Completed Projects',
            value: completedProjects,
            icon: BarChart4,
            bgColor: 'bg-green-500',
        },
        {
            id: 3,
            name: 'Total Interns',
            value: getallinterns.length,
            icon: Users,
            bgColor: 'bg-teal-500',
        },
        {
            id: 4,
            name: 'Active Interns',
            value: activeCount,
            icon: UserCheck,
            bgColor: 'bg-cyan-500',
        },
        {
            id: 5,
            name: 'Supervisors',
            value: allSupervisor.length,
            icon: ShieldCheck,
            bgColor: 'bg-blue-500',
        },
        {
            id: 6,
            name: 'Active User Roles',
            value: getreols.length,
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
