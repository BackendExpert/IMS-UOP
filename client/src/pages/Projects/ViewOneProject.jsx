import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AssignSp from './AssignSp'
import DefaultBtn from '../../components/Button/DefaultBtn'

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

    const [spassign, setspassign] = useState(false)

    const headleAssingSp = () => {
        setspassign(!spassign)
    }

    return (
        <div>
            <h1 className="xl:text-3xl font-bold text-emerald-600 mb-4">
                Project: <span className="">{projectdata?.pname}</span>
            </h1>

            <div className="max-w-5xl mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-xl font-semibold text-emerald-700 mb-4">Project Details</h2>

                    <div className="space-y-3">
                        <div className="md:flex justify-between">
                            <div className="">
                                <p className="w-40 font-medium text-gray-600">Project Name:</p>
                                <p className="text-emerald-800 font-bold">{projectdata?.getproject?.pname}</p>
                            </div>
                            <div className="">
                                <p className="w-40 font-medium text-gray-600">Project Start Date:</p>
                                <p className="text-emerald-800 font-bold">{new Date(projectdata?.getproject?.pstartdate).toLocaleDateString()}</p>
                            </div>
                            <div className="">
                                <p className="w-40 font-medium text-gray-600">Project Estimated End Date:</p>
                                <p className="text-emerald-800 font-bold">{new Date(projectdata?.getproject?.estimatedEndDate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="">
                            <p className="w-40 font-medium text-gray-600">Project Description:</p>
                            <p className="text-emerald-800">{projectdata?.getproject?.pdescription}</p>
                        </div>

                        <hr className='mt-4 border border-gray-200' />

                        <div className="">
                            <p className="w-40 font-medium text-gray-600">Project Supervisor:</p>
                            <p className="text-emerald-800">{projectdata?.getprojectassigns?.suprvisor?.username}</p>
                        </div>

                        <div className="">
                            <p className="w-40 font-medium text-gray-600">Project Members:</p>
                            <div className="">
                                <div className="text-emerald-800 space-y-1">
                                    {projectdata?.getprojectassigns?.intern?.length > 0 ? (
                                        projectdata.getprojectassigns.intern.map((intern, index) => (
                                            <p key={intern._id || index}>
                                                {intern.userID ? (
                                                    intern.userID.username || 'No username'
                                                ) : (
                                                    'User not populated'
                                                )}
                                            </p>
                                        ))
                                    ) : (
                                        <p>No project members assigned.</p>
                                    )}
                                </div>

                            </div>

                        </div>


                        <div className="">
                            <DefaultBtn
                                type='button'
                                label='Assign Supervisor'
                                onClick={headleAssingSp}
                            />
                        </div>
                    </div>
                </div>

                {
                    spassign ?
                        <div className="">
                            <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                <AssignSp projectID={id} />
                            </div>
                        </div>
                        :
                        <div className=""></div>
                }

            </div>



        </div>
    )
}

export default ViewOneProject