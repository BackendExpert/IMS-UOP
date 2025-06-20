import React from 'react';
import { getUserInfoFromToken } from '../../utils/auth'; // Adjust path accordingly
import DirDash from '../DirDash/DirDash';
import InternDash from '../InternDash/InternDash';

const DashHome = () => {
    const userInfo = getUserInfoFromToken();

    if (!userInfo) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-emerald-50 p-4">
                <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-3">
                        User Not Logged In
                    </h1>
                    <p className="text-gray-700">
                        Please log in to access the dashboard.
                    </p>
                </div>
            </div>
        );
    }

    const roleRaw = userInfo.roles[0];
    const role = typeof roleRaw === 'string' ? roleRaw.toLowerCase() : roleRaw?.name?.toLowerCase();

    if (role === 'director') {
        return <DirDash />;
    }
    if (role === 'intern') {
        return <InternDash />;
    }

    let dashboardText = 'Dashboard';
    if (role === 'admin') dashboardText = 'Admin Dashboard';
    else if (role === 'warden') dashboardText = 'Warden Dashboard';

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-md p-10 max-w-md w-full">
                <h1 className="text-3xl font-extrabold text-emerald-700 mb-5 text-center">
                    {dashboardText}
                </h1>
                <p className="text-center text-emerald-800 text-lg">
                    Welcome <span className="font-semibold">{userInfo.username}</span>! This is your{' '}
                    <span className="font-semibold">{dashboardText.toLowerCase()}</span> for the Internship Monitoring System.
                </p>
            </div>
        </div>
    );
};

export default DashHome;
