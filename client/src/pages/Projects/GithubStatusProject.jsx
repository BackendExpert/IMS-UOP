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
            .then(res => {
                setgetallproject(res.data.result)
                console.log(res.data.result)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="md:flex">
                <div className="w-full">
                    <div className="bg-white p-6 rounded-md shadow-md bg-gray-100/50 border border-gray-100">
                        <h1 className="text-xl font-semibold text-emerald-600">Project : {getallproject?.repoData?.name} </h1>
                        <p className="text-gray-500 pt-2">{getallproject?.repoData?.description}</p>
                    </div>

                    <div className="mt-4 bg-white p-6 rounded-md shadow-md bg-gray-100/50 border border-gray-100">
                        <h1 className="text-xl font-semibold text-emerald-600">Project : {getallproject?.repoData?.name} </h1>
                        <p className="text-gray-500 pt-2">{getallproject?.repoData?.description}</p>
                    </div>

                </div>
                <div className="w-full md:ml-4">
                    <div className="bg-white p-6 rounded-md shadow-md bg-gray-100/50 border border-gray-100">
                        <div className="flex justify-around">
                            <div className="">
                                <h1 className="text-lg text-emerald-600 font-semibold">Create at</h1>
                                <p className="text-gray-500">{new Date(getallproject?.repoData?.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="">
                                <h1 className="text-lg text-emerald-600 font-semibold">Project Size</h1>
                                <p className="text-gray-500">{getallproject?.repoData?.size}</p>
                            </div>
                            <div className="">
                                <h1 className="text-lg text-emerald-600 font-semibold">Last Update</h1>
                                <p className="text-gray-500">{new Date(getallproject?.repoData?.updated_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default GithubStatusProject