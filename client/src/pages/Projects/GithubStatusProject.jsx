import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const GithubStatusProject = () => {
    const { name } = useParams()
    const token = localStorage.getItem('login')

    const [getallproject, setgetallproject] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/github/get-project-repo/' + name, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setgetallproject(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="md:flex">
                <div className="w-full">
                    <div className="bg-white p-6 rounded-md shadow-md bg-gray-100/50 border border-gray-100">
                        <h1 className="text-xl font-semibold text-emerald-600">Project : {getallproject?.name} </h1>
                        <p className="text-gray-500 pt-2">{getallproject?.description}</p>
                    </div>
                </div>
                <div className="w-full"></div>
            </div>

        </div>
    )
}

export default GithubStatusProject