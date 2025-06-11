import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllInterns = () => {
    const [getallinterns, setgetallinterns] = useState([])
    const token = localStorage.getItem('login')

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/intern/get-all-interns', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setgetallinterns(res.data.Result))
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
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Intern Email</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Github Username</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Join At</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Internship End Date</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {
                                getallinterns.map((intern, index) => {
                                    return (
                                        <tr className='hover:bg-emerald-50 transition-all duration-150' key={index}>
                                            <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                                            <td className="px-6 py-4">{intern.userID.username}</td>
                                            <td className="px-6 py-4">
                                                <a href={intern.github} target='_blank' className='text-blue-600 hover:underline'>
                                                    {intern.userID.username}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4">{new Date(intern.joinAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                {intern.InternshipEndAt ? new Date(intern.InternshipEndAt).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    intern.isOneIntern ?
                                                        <div className="">
                                                            <span
                                                                key={index}
                                                                className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full"
                                                            >
                                                                Active Intern
                                                            </span>
                                                        </div>
                                                        :
                                                        <div className="">
                                                            <span
                                                                key={index}
                                                                className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full"
                                                            >
                                                                Completed
                                                            </span>
                                                        </div>
                                                }
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllInterns