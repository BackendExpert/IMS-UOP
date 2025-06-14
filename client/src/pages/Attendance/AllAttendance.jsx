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
    }, [usernameFilter, dateFilter, attendanceAll])

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
                            filteredAttendance.map((data, index) => (
                                <tr className='hover:bg-emerald-50 transition-all duration-150' key={index}>
                                    <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
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
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllAttendance
