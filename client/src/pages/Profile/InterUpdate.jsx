import axios from 'axios'
import React, { useState } from 'react'
import DefaultBtn from '../../components/Button/DefaultBtn'
import UpdateInternData from './UpdateInternData'

const InterUpdate = () => {
    const token = localStorage.getItem('login')
    const [interninfor, setinterninfor] = useState({})

    useState(() => {
        axios.get(import.meta.env.VITE_APP_API + '/intern/get-intern-infor', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setinterninfor(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    const [isEdit, setisEdit] = useState(false)

    const headleEdit = () => {
        setisEdit(!isEdit)
    }


    return (
        <div>
            <div className="max-w-4xl bg-white mx-auto p-4 rounded-lg shadow-xl">
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold text-emerald-600 mb-8 mt-2">My Profile Update</h1>
                    <div className="-mt-4">
                        {
                            !interninfor.dob ?
                                <div className="">
                                    <DefaultBtn
                                        type='button'
                                        label={isEdit ? 'Close' : 'Create My Information'}
                                        onClick={headleEdit}
                                    />
                                </div>
                                :
                                <div className=""></div>
                        }

                    </div>
                </div>

                <div>
                    <div className="mb-4 ">
                        <p className="text-red-500 uppercase font-bold text-xl">important</p>
                        <p className="text-gray-600 font-semibold">You can only update Fist time, please be true to update your real data in First Time please</p>
                    </div>
                    <div className="md:grid grid-cols-3 gap-3">
                        <InternInfor
                            title="Intern Name"
                            value={interninfor?.userID?.username || 'N/A'}
                        />
                        <InternInfor
                            title="Intern Email"
                            value={interninfor?.userID?.email || 'N/A'}
                        />
                        <InternInfor
                            title="Intern Join At"
                            value={new Date(interninfor?.joinAt).toLocaleDateString() || 'N/A'}
                        />
                        <InternInfor
                            title="Address"
                            value={interninfor?.address}
                        />
                        <InternInfor
                            title="CV"
                            value={<div>
                                <a href={`${import.meta.env.VITE_APP_API}/uploads/${interninfor?.cv}`} target='_blank'>
                                    <p className="text-blue-500 hover:underline">View CV</p>
                                </a>
                            </div>}
                        />
                        <InternInfor
                            title="Date of Birth"
                            value={new Date(interninfor?.dob).toLocaleDateString() || 'N/A'}
                        />
                        <InternInfor
                            title="Github Username"
                            value={<div>
                                <a href={`https://github.com/${interninfor?.github}`} target='_blank'>
                                    <p className="text-blue-500 hover:underline">{interninfor?.github}</p>
                                </a>
                            </div>}
                        />
                        <InternInfor
                            title="LinkedIn Username"
                            value={<div>
                                <a href={`${interninfor?.linkedin}`} target='_blank'>
                                    <p className="text-blue-500 hover:underline">{interninfor?.linkedin}</p>
                                </a>
                            </div>}
                        />
                        <InternInfor
                            title="Campus"
                            value={interninfor?.camups}
                        />
                        <InternInfor
                            title="Course"
                            value={interninfor?.course}
                        />
                    </div>

                </div>


            </div>

            <div className="">
                {
                    isEdit === true ?
                        <div className="max-w-4xl bg-white mx-auto p-4 rounded-lg shadow-xl mt-4">
                            <UpdateInternData />
                        </div>
                        :
                        <div className="">
                        </div>
                }
            </div>
        </div>
    )
}


const InternInfor = ({ title, value }) => {
    return (
        <div className="mb-4">
            <h1 className="text-lg font-bold text-emerald-600">{title}</h1>
            <p className="text-gray-700">{value}</p>
        </div>
    )
}

export default InterUpdate
