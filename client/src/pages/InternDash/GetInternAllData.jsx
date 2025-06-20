import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetInternAllData = () => {
    const token = localStorage.getItem('login');
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/github/get-username-data', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setUser(res.data.Result))
            .catch(err => console.log(err));
    }, []);

    if (!user) return <div className="text-center py-10 text-gray-500">Loading user data...</div>;

    return (
        <div className="mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="md:flex items-center gap-6">
                <img src={user.avatar_url} alt={user.login} className="w-28 h-28 rounded-full border-4 border-emerald-400 shadow-md" />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user.name} <span className="text-gray-500">(@{user.login})</span></h2>
                    <p className="text-sm text-gray-500">{user.bio}</p>
                    <a href={user.html_url} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline text-sm mt-1 inline-block">
                        View GitHub Profile
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
                <div><span className="font-medium">Company:</span> {user.company || '—'}</div>
                <div><span className="font-medium">Location:</span> {user.location || '—'}</div>
                <div><span className="font-medium">Public Repos:</span> {user.public_repos}</div>
                <div><span className="font-medium">Followers:</span> {user.followers}</div>
                <div><span className="font-medium">Following:</span> {user.following}</div>
                <div><span className="font-medium">Joined:</span> {new Date(user.created_at).toLocaleDateString()}</div>
            </div>

            {user.blog && (
                <div className="mt-4 text-sm">
                    <span className="font-medium text-gray-700">Portfolio:</span>{' '}
                    <a href={user.blog} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        {user.blog}
                    </a>
                </div>
            )}
        </div>
    );
};

export default GetInternAllData;
