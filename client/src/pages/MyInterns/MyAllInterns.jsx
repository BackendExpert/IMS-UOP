import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultInput from '../../components/Form/DefaultInput'
import Dropdown from '../../components/Form/Dropdown'

const MyAllInterns = () => {
    const token = localStorage.getItem('login')

    const [myallintern, setMyAllIntern] = useState([])
    const [filtered, setFiltered] = useState([])

    const [filters, setFilters] = useState({
        username: '',
        status: '',
    })

    // Utility: Convert the API data to unique interns with their projects
    const mapInternsWithProjects = (data) => {
        // Use a map: key = intern userID._id, value = intern info + projects array
        const internMap = new Map()

        data.forEach((project) => {
            project.intern.forEach((intern) => {
                const id = intern.userID._id
                const existing = internMap.get(id)

                const isCompleted = new Date(intern.InternshipEndAt) < new Date()

                if (existing) {
                    // Add this project title/id and status to the intern's projects array
                    existing.projects.push({
                        projectId: project.project,
                        status: project.status,
                        // Add more project details here if you want, e.g. project name from backend
                    })
                    // Update overall internship status if needed (optional)
                    if (!existing.isCompleted && isCompleted) {
                        existing.isCompleted = true
                    }
                } else {
                    internMap.set(id, {
                        intern,
                        projects: [
                            {
                                projectId: project.project,
                                status: project.status,
                            },
                        ],
                        isCompleted,
                    })
                }
            })
        })

        return Array.from(internMap.values())
    }

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_API + '/supervisor/supervisor-get-interns', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const uniqueInterns = mapInternsWithProjects(res.data.Result)
                setMyAllIntern(uniqueInterns)
                setFiltered(uniqueInterns)
            })
            .catch((err) => console.log(err))
    }, [])

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        const updatedFilters = { ...filters, [name]: value }
        setFilters(updatedFilters)

        const today = new Date()

        const filteredData = myallintern.filter(({ intern, isCompleted }) => {
            const matchesUsername = intern.userID?.username
                .toLowerCase()
                .includes(updatedFilters.username.toLowerCase())

            const matchesStatus =
                updatedFilters.status === '' ||
                (updatedFilters.status === 'completed' && isCompleted) ||
                (updatedFilters.status === 'ongoing' && !isCompleted)

            return matchesUsername && matchesStatus
        })

        setFiltered(filteredData)
    }

    const getStatus = (isCompleted) => {
        if (isCompleted === undefined) return 'N/A'
        return isCompleted ? 'Completed' : 'Ongoing'
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
                                <th className="px-6 py-4 font-semibold tracking-wider">Username</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Github</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Join Date</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Internship End Date</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map(({ intern, projects, isCompleted }, index) => (
                                <tr
                                    className="hover:bg-emerald-50 transition-all duration-150"
                                    key={intern._id}
                                >
                                    <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{intern.userID?.username || 'N/A'}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        <a
                                            className="text-blue-600 font-semibold hover:underline"
                                            href={intern.github || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {intern.github || 'N/A'}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {new Date(intern.joinAt).toLocaleDateString() || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {new Date(intern.InternshipEndAt).toLocaleDateString() || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{getStatus(isCompleted)}</td>
                                    <td className="px-6 py-4">
                                        <Link
                                            className="text-emerald-600 font-medium hover:underline"                                           
                                        >
                                            View
                                        </Link>
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

export default MyAllInterns
