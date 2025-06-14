import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultInput from '../../components/Form/DefaultInput'
import DateInput from '../../components/Form/DateInput'

const AllAttendance = () => {
    const [attendanceAll, setAttendanceAll] = useState([])
    const [filteredAttendance, setFilteredAttendance] = useState([])

    const [usernameFilter, setUsernameFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 20

    const token = localStorage.getItem('login')

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/attendance/get-intern-attendance', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setAttendanceAll(res.data.Result)
                setFilteredAttendance(res.data.Result)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const filtered = attendanceAll.filter((entry) => {
            const matchesUsername = usernameFilter === '' || entry?.intern?.username?.toLowerCase().includes(usernameFilter.toLowerCase())
            const matchesDate = dateFilter === '' || new Date(entry.attendanceDate).toISOString().split('T')[0] === dateFilter
            return matchesUsername && matchesDate
        })
        setFilteredAttendance(filtered)
        setCurrentPage(1) // reset to page 1 on filter change
    }, [usernameFilter, dateFilter, attendanceAll])

    const totalPages = Math.ceil(filteredAttendance.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const currentData = filteredAttendance.slice(startIndex, startIndex + rowsPerPage)

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    return (
        <div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <DefaultInput
                    label="Filter by Username"
                    name="username"
                    value={usernameFilter}
                    onChange={(e) => setUsernameFilter(e.target.value)}
                    placeholder="Enter username"
                />
                <DateInput
                    label="Filter by Date"
                    name="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-lg">
                <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                    <thead className="text-xs uppercase bg-emerald-100 text-emerald-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold tracking-wider">#</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Username</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">In Time</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Out Time</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Mode</th>
                            <th className="px-6 py-4 font-semibold tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {
                            currentData.length > 0 ? currentData.map((data, index) => (
                                <tr className='hover:bg-emerald-50 transition-all duration-150' key={index}>
                                    <td className="px-6 py-4 font-medium text-gray-800">{startIndex + index + 1}</td>
                                    <td className="px-6 py-4">{data?.intern?.username}</td>
                                    <td className="px-6 py-4">{new Date(data.attendanceDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{data.startAt}</td>
                                    <td className="px-6 py-4">{data.leaveAt}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {
                                            data.mode === 'onsite' ?
                                                <span className="uppercase bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                                                    onsite
                                                </span>
                                                :
                                                <span className="uppercase bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                                                    online
                                                </span>
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link className="text-emerald-600 font-medium hover:underline">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No records found.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-4 py-1 rounded-xl border text-sm ${currentPage === 1 ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-emerald-600 border-emerald-400 hover:bg-emerald-50'}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {
                    Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded-xl text-sm border ${currentPage === page ? 'bg-emerald-500 text-white' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                        >
                            {page}
                        </button>
                    ))
                }
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`px-4 py-1 rounded-xl border text-sm ${currentPage === totalPages ? 'text-gray-400 border-gray-300 cursor-not-allowed' : 'text-emerald-600 border-emerald-400 hover:bg-emerald-50'}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default AllAttendance
