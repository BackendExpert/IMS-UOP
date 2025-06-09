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
        </div>
    )
}

export default ViewOneProject