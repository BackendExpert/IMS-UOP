import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrgMembers = () => {
    const token = localStorage.getItem('login');
    const [orgData, setOrgData] = useState(null);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/github/org', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => {
                setOrgData(res.data.Result.data);
                setMembers(res.data.Result.memberData);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="">
            <div>
                <h3 className="text-xl text-teal-500 font-semibold mb-3">Organization Members:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {members.map((member) => (
                        <li key={member.id} className="p-4 border border-emerald-500 rounded shadow-sm">
                            <div className="flex items-center gap-4">
                                <img
                                    src={member.avatar_url}
                                    alt={member.login}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-medium">{member.login}</p>
                                    <a
                                        href={member.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600"
                                    >
                                        GitHub Profile
                                    </a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrgMembers;
