import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewOneProject = () => {
    const { id } = useParams()
    const token = localStorage.getItem('login')

    const [projectdata, setprojectdata] = useState([])

    useState(() => {
        axios.get(import.meta.env.VITE_APP_API + '/project/get-one-project/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setprojectdata(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1 className="xl:text-3xl font-bold text-emerald-600 mb-4">
                Project: <span className="">{projectdata?.pname}</span>
            </h1>

            <div className="max-w-3xl mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-xl font-semibold text-emerald-700 mb-4">Project Details</h2>

                    <div className="space-y-3">
                        <div className="">
                            <p className="w-40 font-medium text-gray-600">Project Name:</p>
                            <p className="text-emerald-800">{projectdata?.pname}</p>
                        </div>
                        <div className="">
                            <p className="w-40 font-medium text-gray-600">Project Description:</p>
                            <p className="text-emerald-800">{projectdata?.pdescription}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ViewOneProject