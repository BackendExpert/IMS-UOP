import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetOrgData = () => {
    const [getorgdata, setgetorgdata] = useState(null);
    const token = localStorage.getItem('login');

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/github/org', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setgetorgdata(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    if (!getorgdata || !getorgdata.data) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="text-gray-500 text-lg">Loading GitHub organization...</div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
                <div className="md:flex items-center gap-5 mb-8">
                    <img src={getorgdata.data.avatar_url} alt="org-logo" className="w-20 h-20 rounded-full shadow" />
                    <div>
                        <h1 className="md:text-3xl font-extrabold text-emerald-700">
                            {getorgdata.data.login}
                        </h1>
                        <a href={getorgdata.data.html_url} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline text-sm">
                            View on GitHub
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div className="bg-emerald-100 rounded-xl p-6 shadow-sm">
                        <p className="text-gray-700 text-sm">Repositories</p>
                        <p className="text-2xl font-bold text-emerald-700">{getorgdata.data.public_repos}</p>
                    </div>
                    <div className="bg-emerald-100 rounded-xl p-6 shadow-sm">
                        <p className="text-gray-700 text-sm">Created At</p>
                        <p className="text-2xl font-bold text-emerald-700">
                            {new Date(getorgdata.data.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {getorgdata.memberData && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Organization Members</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                            {getorgdata.memberData.map((member, index) => (
                                <div key={index} className="bg-white border border-emerald-400 rounded-2xl shadow p-4 md:flex items-center gap-4 hover:shadow-md transition">
                                    <img src={member.avatar_url} alt={member.login} className="w-14 h-14 rounded-full" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">{member.login}</h3>
                                        <a
                                            href={member.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-emerald-500 hover:underline"
                                        >
                                            View Profile
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GetOrgData;
