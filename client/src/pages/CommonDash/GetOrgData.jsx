import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetOrgData = () => {
    const [getorgdata, setgetorgdata] = useState([])

    const token = localStorage.getItem('login')

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/github/org', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setgetorgdata(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="bg-white rounded-md p-8 shadow-md border border-gray-200">
                <h1 className="font-bold text-emerald-600 mb-4">
                    Github Organization Information
                </h1>

                <div className="">
                    <h1 className="text-xl font-semibold text-gray-600">
                        {getorgdata.login}
                    </h1>

                    <p>
                        <a href={`https://github.com/${getorgdata.login}`} target='_black' className='text-emerald-600 hover:underline'>View on Github</a>
                    </p>

                    <table>
                        <tr>
                            <td>Repos</td>
                            <td>{getorgdata.public_repos}</td>
                        </tr>
                         <tr>
                            <td>Started At</td>
                            <td>{new Date(getorgdata.created_at).toLocaleDateString()}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GetOrgData