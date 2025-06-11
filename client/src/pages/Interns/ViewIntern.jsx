import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DefaultBtn from '../../components/Button/DefaultBtn'

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
                </div>
            </div>
        </div>
    )
}

export default ViewIntern