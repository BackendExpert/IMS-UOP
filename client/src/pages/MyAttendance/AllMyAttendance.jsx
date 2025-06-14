import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DateInput from '../../components/Form/DateInput'

const AllMyAttendance = () => {
    const token = localStorage.getItem('login')
    const [getmyAttendance, setgetmyAttendance] = useState([])
    const [filteredDate, setFilteredDate] = useState('')
    const [minDate, setMinDate] = useState('')
    const [maxDate, setMaxDate] = useState('')

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/attendance/get-my-attendance', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                const data = res.data.Result || []
                setgetmyAttendance(data)

                if (data.length > 0) {
                    const dates = data.map(item => new Date(item.attendanceDate))
                    const oldest = new Date(Math.min(...dates))
                    const today = new Date()

                    setMinDate(oldest.toISOString().split('T')[0])
                    setMaxDate(today.toISOString().split('T')[0])
                }
            })
            .catch(err => console.log(err))
    }, [])

    const filteredData = filteredDate
        ? getmyAttendance.filter(data =>
            new Date(data.attendanceDate).toISOString().split('T')[0] === filteredDate
        )
        : getmyAttendance

    return (
        <div>
            <div className="mb-4 max-w-xs">
                <DateInput
                    label="Filter by Date"
                    name="filterDate"
                    value={filteredDate}
                    onChange={(e) => setFilteredDate(e.target.value)}
                    min={minDate}
                    max={maxDate}
                />
            </div>

            <div className="mt-4">
                <div className="overflow-x-auto rounded-2xl shadow-lg">
                    <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                        <thead className="text-xs uppercase bg-emerald-100 text-emerald-700">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wider">#</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">In Time</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Out Time</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Mode</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredData.length > 0 ? (
                                filteredData.map((data, index) => (
                                    <tr className="hover:bg-emerald-50 transition-all duration-150" key={index}>
                                        <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{new Date(data.attendanceDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{data.startAt}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">{data.leaveAt}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {
                                                data.mode == 'onsite' ?
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
                            ) : (
                                <tr>
                                    <td className="px-6 py-4 text-gray-500" colSpan={6}>
                                        No attendance records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllMyAttendance
