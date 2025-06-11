import axios from 'axios'
import React, { useState } from 'react'
import DefaultBtn from '../../components/Button/DefaultBtn'
import UpdateInternData from './UpdateInternData'

const InterUpdate = () => {
    const token = localStorage.getItem('login')
    const [interninfor, setinterninfor] = useState([])


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
                        <DefaultBtn
                            type='button'
                            label={isEdit ? 'Close' : 'Create My Information'}
                            onClick={headleEdit}
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-4 ">
                        <p className="text-red-500 uppercase font-bold text-xl">important</p>
                        <p className="text-gray-600 font-semibold">You can only update Fist time, please be true to update your real data in First Time please</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <InternInfor
                            title="Intern Name"
                            value="Kamal"
                        />
                        <InternInfor
                            title="Intern Email"
                            value="Kamal"
                        />
                        <InternInfor
                            title="Intern Join At"
                            value="Kamal"
                        />
                        <InternInfor
                            title="Address"
                            value="Kamal"
                        />
                        <InternInfor
                            title="CV"
                            value="Kamal"
                        />
                        <InternInfor
                            title="Date of Birth"
                            value="Kamal"
                        />
                        <InternInfor
                            title="Github Username"
                            value="Kamal"
                        />
                        <InternInfor
                            title="LinkedIn Username"
                            value="Kamal"
                        />
                        <InternInfor
                            title="Campus"
                            value="Kamal"
                        />
                        <InternInfor
                            title="Course"
                            value="Kamal"
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
