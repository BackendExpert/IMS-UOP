import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserInfoFromToken } from '../../utils/auth';
import DashSide from './DashSide';
import DashNav from './DashNav';
import DashFooter from './DashFooter';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [sideOpen, setSideOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const userInfo = getUserInfoFromToken();
        if (!userInfo) {
            localStorage.clear();
            navigate('/');
        } else {
            setUser(userInfo);
        }
    }, [navigate]);

    const toggleSide = () => setSideOpen(prev => !prev);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 font-semibold bg-gradient-to-br from-gray-50 via-white to-emerald-100 animate-pulse">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-emerald-50 via-white to-emerald-100 text-gray-900 font-sans selection:bg-emerald-400 selection:text-white">
            <div className="xl:flex">
                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-40 w-84 transform transition-transform duration-300 ease-in-out xl:translate-x-0
                    ${sideOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <DashSide user={user} />
                </aside>

                {/* Sidebar Toggle Button */}
                <button
                    onClick={toggleSide}
                    className="fixed top-5 left-4 z-50 p-3 rounded-full bg-emerald-600 text-white xl:hidden shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                    aria-label={sideOpen ? 'Close sidebar' : 'Open sidebar'}
                >
                    {sideOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Main Content */}
                <main className="flex-1 xl:ml-84 min-h-screen flex flex-col bg-white shadow-inner rounded-tl-3xl rounded-bl-3xl overflow-hidden">
                    {/* Top Navigation */}
                    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
                        <DashNav user={user} />
                    </header>

                    {/* Page Route Info */}
                    <div className="p-3 bg-emerald-50 text-emerald-700 border-b border-emerald-200 text-xs font-mono tracking-widest shadow-inner select-none">
                        <code>{location.pathname}</code>
                    </div>

                    {/* Page Body */}
                    <section className="flex-grow p-6 bg-gradient-to-tr from-gray-50 to-white overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-400 hover:scrollbar-thumb-emerald-600 transition-all rounded-b-3xl">
                        <Outlet />
                    </section>

                    {/* Footer */}
                    <footer className="bg-white border-t border-gray-200 shadow-inner rounded-br-3xl rounded-tr-3xl">
                        <DashFooter />
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
