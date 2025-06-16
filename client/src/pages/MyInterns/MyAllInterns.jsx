import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultInput from '../../components/Form/DefaultInput'
import Dropdown from '../../components/Form/Dropdown'

const MyAllInterns = () => {
    const token = localStorage.getItem('login')

    const [myallintern, setmyallintern] = useState([])
    const [filtered, setFiltered] = useState([])

    const [filters, setFilters] = useState({
        username: '',
        status: '',
    })

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/supervisor/supervisor-get-interns', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setmyallintern(res.data.Result)
                setFiltered(res.data.Result)
            })
            .catch(err => console.log(err))
    }, [])

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        const updatedFilters = { ...filters, [name]: value }
        setFilters(updatedFilters)

        const today = new Date()

        const filteredData = myallintern.filter(item =>
            item.intern.some(i => {
                const matchesUsername = i.userID?.username.toLowerCase().includes(updatedFilters.username.toLowerCase())
                const isCompleted = new Date(i.InternshipEndAt) < today
                const matchesStatus =
                    updatedFilters.status === '' ||
                    (updatedFilters.status === 'completed' && isCompleted) ||
                    (updatedFilters.status === 'ongoing' && !isCompleted)

                return matchesUsername && matchesStatus
            })
        )

        setFiltered(filteredData)
    }

    const getStatus = (endDate) => {
        if (!endDate) return 'N/A'
        return new Date(endDate) < new Date() ? 'Completed' : 'Ongoing'
    }

    return (
        <div>
            <div className="flex gap-4 mt-4">
                <DefaultInput
                    label="Search by Username"
                    name="username"
                    value={filters.username}
                    onChange={handleFilterChange}
                    placeholder="Enter username"
                />
                <Dropdown
                    label="Filter by Status"
                    name="status"
                    onChange={handleFilterChange}
                    options={[
                        { label: 'Ongoing', value: 'ongoing' },
                        { label: 'Completed', value: 'completed' },
                    ]}
                />
            </div>

            <div className="mt-4">
                <div className="overflow-x-auto rounded-2xl shadow-lg">
                    <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                        <thead className="text-xs uppercase bg-emerald-100 text-emerald-700">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wider">#</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Project Title</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Github</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Start Date</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Internship End Date</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {
                                filtered.map((data, index) => (
                                    <tr className="hover:bg-emerald-50 transition-all duration-150" key={index}>
                                        <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {data.intern.map((i, idx) => (
                                                <div key={idx}>{i.userID?.username || 'N/A'}</div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {data.intern.map((i, idx) => (
                                                <div key={idx}>
                                                    <a className='text-blue-600 font-semibold hover:underline' href={i.github} target='_blank' rel='noopener noreferrer'>
                                                        {i.github || 'N/A'}
                                                    </a>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {data.intern.map((i, idx) => (
                                                <div key={idx}>{i.joinAt || 'N/A'}</div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {data.intern.map((i, idx) => (
                                                <div key={idx}>{i.InternshipEndAt || 'N/A'}</div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {data.intern.map((i, idx) => (
                                                <div key={idx}>{getStatus(i.InternshipEndAt)}</div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link className="text-emerald-600 font-medium hover:underline">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyAllInterns
