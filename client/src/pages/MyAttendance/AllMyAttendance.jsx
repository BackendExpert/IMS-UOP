import React from 'react'

const AllMyAttendance = () => {
    return (
        <div>
            <div className="mt-8">
                <div className="overflow-x-auto rounded-2xl shadow-lg">
                    <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                        <thead className="text-xs uppercase bg-emerald-100 text-emerald-700">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">#</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">In Time</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Out Time</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Mode</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllMyAttendance