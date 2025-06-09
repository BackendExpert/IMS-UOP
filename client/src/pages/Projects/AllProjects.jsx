import React, { useEffect, useState } from 'react'
import DefaultBtn from '../../components/Button/DefaultBtn'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AllProjects = () => {
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

    return (
        <div>
            <div className="-mt-4">
                <Link to={'/Dashboard/Create-project'}>
                    <DefaultBtn
                        type='button'
                        label='Create New Project'
                    />
                </Link>
            </div>

            <div className="mt-8">
                <div className="overflow-x-auto rounded-2xl shadow-lg">
                    <table className="min-w-full text-sm text-left text-gray-600 bg-white">
                        <thead className="text-xs uppercase bg-emerald-100 text-emerald-700">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">#</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Project Title</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Github</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Start Date</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Estimated End Date</th>
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {
                                getallproject.map((project, index) => {
                                    return (
                                        <tr className='hover:bg-emerald-50 transition-all duration-150' key={index}>
                                            <td className="px-6 py-4 font-medium text-gray-800">{index + 1}</td>
                                            <td className="px-6 py-4 font-medium text-gray-800">{project.pname}</td>
                                            <td className="px-6 py-4 font-medium text-gray-800">
                                                <a href={project.giturl} target='_blank'>
                                                    <p className="text-blue-500 hover:underline">View on Github</p>
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-800">{project.pstartdate}</td>
                                            <td className="px-6 py-4 font-medium text-gray-800">{project.estimatedEndDate}</td>
                                            <td className="px-6 py-4">
                                                <Link to={``} className="text-emerald-600 font-medium hover:underline">
                                                    View
                                                </Link>
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

export default AllProjects