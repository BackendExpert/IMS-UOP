import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


const AllSupervisors = () => {
    const token = localStorage.getItem('login')
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

    return (
        <div>
            <div className="mt-8">
                <div className="overflow-x-auto rounded-2xl shadow-lg">
                    <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                        <thead className="text-xs uppercase bg-emerald-100 text-emerald-700">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">#</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Supervisor</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Join at</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Supervised Projects</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Projects</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {allSupervisor.map((entry, index) => (
                                <tr key={index} className="hover:bg-emerald-50 transition-all duration-150">
                                    <td className="px-6 py-4 text-gray-800 font-medium">{index + 1}</td>
                                    <td className="px-6 py-4 text-gray-800">{entry.supervisor.username}</td>
                                    <td className="px-6 py-4 text-gray-800">{entry.supervisor.email}</td>
                                    <td className="px-6 py-4 text-gray-800">{new Date(entry.supervisor.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-gray-800">{entry.projects.length}</td>
                                    <td className="px-6 py-4 text-gray-800">
                                        {entry.projects.map((p, i) => (
                                            <div key={i}>{p.project?.pname || "Untitled"}</div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default AllSupervisors