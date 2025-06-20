import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OnlyOrg = () => {
    const token = localStorage.getItem('login');
    const [org, setOrg] = useState(null);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/github/org', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(res => setOrg(res.data.Result.data)) // Access only organization data
        .catch(err => console.log(err));
    }, []);

    if (!org) return <div>Loading...</div>;

    return (
        <div className="mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="md:flex items-center gap-6">
                <img
                    src={org.avatar_url}
                    alt={org.login}
                    className="w-28 h-28 rounded-full border-4 border-emerald-400 shadow-md"
                />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {org.name || 'Unnamed Org'}{' '}
                        <span className="text-gray-500">(@{org.login})</span>
                    </h2>
                    <p className="text-sm text-gray-500">{org.description || 'No description'}</p>
                    <a
                        href={org.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 hover:underline text-sm mt-1 inline-block"
                    >
                        View GitHub Profile
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
                <div><span className="font-medium">Company:</span> {org.company || '—'}</div>
                <div><span className="font-medium">Location:</span> {org.location || '—'}</div>
                <div><span className="font-medium">Public Repos:</span> {org.public_repos}</div>
                <div><span className="font-medium">Followers:</span> {org.followers}</div>
                <div><span className="font-medium">Following:</span> {org.following}</div>
                <div><span className="font-medium">Joined:</span> {new Date(org.created_at).toLocaleDateString()}</div>
            </div>

            {org.blog && (
                <div className="mt-4 text-sm">
                    <span className="font-medium text-gray-700">Portfolio:</span>{' '}
                    <a
                        href={org.blog}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        {org.blog}
                    </a>
                </div>
            )}
        </div>
    );
};

export default OnlyOrg;
