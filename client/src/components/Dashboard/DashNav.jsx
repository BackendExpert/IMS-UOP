import React, { useEffect, useRef, useState } from 'react';
import { FaUserCog } from 'react-icons/fa';
import { FaGear, FaPowerOff } from 'react-icons/fa6';
import { getUserInfoFromToken } from '../../utils/auth';
import DashUser from '../../assets/DashUser.png';

const DashNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const { username, roles } = getUserInfoFromToken();
    const role = roles[0]?.name || '';

    const toggleMenu = () => setMenuOpen(prev => !prev);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        const handleEscape = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white">
            <h1 className="text-2xl font-extrabold text-emerald-600 tracking-tight">Dashboard</h1>

            <div className="relative">
                <button
                    onClick={toggleMenu}
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    className="flex items-center gap-3 focus:outline-none"
                >
                    <img src={DashUser} alt="user" className="h-11 w-11 rounded-full border-2 border-emerald-500 shadow-sm" />
                    <span className="hidden sm:inline font-semibold uppercase text-gray-700">{username}</span>
                    <span className="absolute bottom-1 right-0 h-3 w-3 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
                </button>

                <div
                    ref={menuRef}
                    className={`absolute right-0 mt-3 w-72 origin-top-right bg-white border border-gray-100 shadow-lg rounded-3xl overflow-hidden transition transform 
                        ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                >
                    <div className="p-5 border-b text-center">
                        <img src={DashUser} alt="user" className="h-20 w-20 rounded-full mx-auto border shadow" />
                        <h2 className="pt-2 text-lg font-bold text-gray-800">{username}</h2>
                        <p className="text-xs text-gray-500 uppercase font-medium">{role}</p>
                    </div>
                    <div className="p-3 space-y-1">
                        <a href="/Dashboard/Profile" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-100 text-amber-700 transition">
                            <FaUserCog /> Profile
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-100 text-amber-700 transition">
                            <FaGear /> Settings
                        </a>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                        >
                            <FaPowerOff /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashNav;
