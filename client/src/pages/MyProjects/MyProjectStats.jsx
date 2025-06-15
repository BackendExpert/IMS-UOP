import React from 'react'
import { FolderKanban, Hammer, CheckCircle2 } from 'lucide-react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const MyProjectStats = () => {
    const token = localStorage.getItem('login')

    const [myallprojects, setmyallprojects] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/project/my-all-projects', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setmyallprojects(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    const ongoingProjects = myallprojects.filter(p => p.status === 'ongoing').length
    const completedProjects = myallprojects.filter(p => p.status === 'completed').length

    const myprojects = [
        {
            id: 1,
            name: 'My Total Projects',
            value: myallprojects.length,
            icon: FolderKanban,
            bgColor: 'bg-emerald-500',
        },
        {
            id: 2,
            name: 'Ongoing Projects',
            value: ongoingProjects,
            icon: Hammer,
            bgColor: 'bg-teal-500',
        },
        {
            id: 3,
            name: 'Completed Projects',
            value: completedProjects,
            icon: CheckCircle2,
            bgColor: 'bg-cyan-500',
        },
    ]
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                {
                    myprojects.map((project, index) => {
                        const Icon = project.icon
                        return (
                            <div className={`relative ${project.bgColor} text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300`} key={index}>
                                <div className="absolute right-4 top-4 opacity-20 text-white text-6xl">
                                    <Icon className="h-14 w-14" />
                                </div>

                                <div className="relative z-10">
                                    <div className="text-sm font-medium uppercase tracking-wide text-emerald-100">
                                        {project.name}
                                    </div>
                                    <div className="mt-2 text-3xl font-bold">{project.value}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyProjectStats