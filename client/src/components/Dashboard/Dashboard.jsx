import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserInfoFromToken } from '../../utils/auth';
import DashSide from './DashSide';
import DashNav from './DashNav';
import DashFooter from './DashFooter';
import secureLocalStorage from 'react-secure-storage';

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
            <div className="min-h-screen flex items-center justify-center text-gray-600 font-medium">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50">
            <div className="xl:flex">
                {/* Sidebar */}
                <aside
                    className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 w-72 transition-transform duration-300 ease-in-out
                        xl:translate-x-0 ${sideOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <DashSide />
                </aside>

                {/* Sidebar Toggle Button */}
                <button
                    onClick={toggleSide}
                    className="fixed top-5 left-4 z-50 p-2 rounded-lg bg-emerald-600 text-white xl:hidden shadow-lg hover:bg-emerald-700 transition"
                    aria-label={sideOpen ? 'Close sidebar' : 'Open sidebar'}
                >
                    {sideOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                {/* Main Content */}
                <main className="flex-1 xl:ml-72 min-h-screen flex flex-col">
                    {/* Top Navigation */}
                    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-md">
                        <DashNav />
                    </header>

                    {/* Page Route Info */}
                    <div className="p-3 bg-white text-gray-400 border-b text-sm font-mono tracking-wide">
                        <code>{location.pathname}</code>
                    </div>

                    {/* Page Body */}
                    <section className="flex-grow p-6 bg-gray-50 overflow-y-auto">
                        <Outlet />
                    </section>

                    {/* Footer */}
                    <footer className="bg-white border-t">
                        <DashFooter />
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
