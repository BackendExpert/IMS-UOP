import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DefaultBtn from '../../components/Button/DefaultBtn'
import ProjectSp from './ProjectSp'
import InternEndDate from './InternEndDate'

const ViewIntern = () => {
    const { id } = useParams()
    const token = localStorage.getItem('login')

    const [getoneintern, setgetoneintern] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/intern/view-one-intern/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setgetoneintern(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    const [openproject, setopenproject] = useState(false)

    const headleBtnClick = () => {
        setopenproject(!openproject)
    }


    const [internendat, setinternendat] = useState(false)

    const headleInternEnd = () => {
        setinternendat(!internendat)
    }




    return (
        <div>
            <div className="max-w-7xl bg-white rounded-md shadow-xl p-8 border border-gray-200">
                <h1 className="font-bold text-emerald-600 ">Intern Information: {id}</h1>

                <div className="-mt-4">
                    <Link to={'/Dashboard/ManageInterns'}>
                        <DefaultBtn
                            type='button'
                            label='back'
                        />
                    </Link>

                    <div className="mt-8">
                        <div className="md:flex">
                            {getoneintern && (
                                <table className='w-full'>
                                    <tbody>
                                        <tr className='h-12 border-b border-gray-100'>
                                            <td className='text-gray-700 font-semibold'>Intern Username</td>
                                            <td>{getoneintern?.internbyID?.userID?.username}</td>
                                        </tr>
                                        <tr className='h-12 border-b border-gray-100'>
                                            <td className='text-gray-700 font-semibold'>Intern Join At</td>
                                            <td>{new Date(getoneintern?.internbyID?.joinAt).toLocaleDateString()}</td>
                                        </tr>
                                        <tr className='h-12 border-b border-gray-100'>
                                            <td className='text-gray-700 font-semibold'>Internship End At</td>
                                            <td>
                                                {getoneintern?.internbyID?.InternshipEndAt
                                                    ? new Date(getoneintern.internbyID.InternshipEndAt).toLocaleDateString()
                                                    : '-'}
                                            </td>
                                        </tr>
                                        <tr className='h-12 border-b border-gray-100'>
                                            <td className='text-gray-700 font-semibold'>Github Account</td>
                                            <td>
                                                <a href={getoneintern?.internbyID?.github} target='_blank'>
                                                    <p className="text-blue-600 hover:underline">{getoneintern?.internbyID?.github}</p>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr className='h-12 border-b border-gray-100'>
                                            <td className='text-gray-700 font-semibold'>Linkedin Account</td>
                                            <td>
                                                <a href={getoneintern?.internbyID?.linkedin} target='_blank'>
                                                    <p className="text-blue-600 hover:underline">{getoneintern?.internbyID?.linkedin}</p>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr className='h-12 border-b border-gray-100'>
                                            <td className='text-gray-700 font-semibold'>Campus</td>
                                            <td>{getoneintern?.internbyID?.camups}</td>
                                        </tr>
                                        <tr className='h-12 border-b border-gray-100'>
                                            <td className='text-gray-700 font-semibold'>Course</td>
                                            <td>{getoneintern?.internbyID?.course}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}

                            <div className="w-full">
                                <div className="">
                                    <h1 className="font-bold text-emerald-600">Supervisor of Internship</h1>
                                    <p className="py-4">{getoneintern?.getProjectData?.[0]?.suprvisor?.username || "Not assigned"}</p>
                                </div>
                                <div className="">
                                    <h1 className="font-bold text-emerald-600">Assigned Projects</h1>
                                    {getoneintern?.getProjectData?.length > 0 ? (
                                        <ul className="py-4 list-disc list-inside">
                                            {getoneintern.getProjectData.map((item, idx) => (
                                                <li key={idx}>{item.project?.pname || 'Unnamed Project'}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="py-4">-</p>
                                    )}
                                </div>

                            </div>
                        </div>

                        <div className="">
                            <DefaultBtn
                                type='button'
                                label={!openproject ? 'Assign Supervisor and Project' : 'Close'}
                                onClick={headleBtnClick}
                            />
                        </div>

                        <div className="">
                            <DefaultBtn
                                type='button'
                                label={!internendat ? 'Add Internship End Date' : 'Close'}
                                onClick={headleInternEnd}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                {
                    openproject ?
                        <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
                            <ProjectSp internID={id} />
                        </div>
                        :
                        <div className=""></div>
                }
            </div>

            <div className="">
                {
                    internendat ?
                        <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
                            <InternEndDate InternID={id} />
                        </div>
                        :
                        <div className=""></div>
                }
            </div>
        </div>
    )
}

export default ViewIntern