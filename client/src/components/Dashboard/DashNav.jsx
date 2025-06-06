import React, { useEffect, useRef, useState } from 'react';
import { FaUserCog } from 'react-icons/fa';
import { FaGear, FaPowerOff } from 'react-icons/fa6';
import { getUserInfoFromToken } from '../../utils/auth';
import DashUser from '../../assets/DashUser.png';

const DashNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const { username, roles } = getUserInfoFromToken() || {};
    const role = roles?.[0]?.name || '';

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
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-b-3xl">
            <h1 className="text-3xl font-extrabold text-emerald-600 tracking-wide select-none drop-shadow-sm">Dashboard</h1>

            <div className="relative">
                <button
                    onClick={toggleMenu}
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    className="flex items-center gap-3 focus:outline-none group"
                >
                    <img
                        src={DashUser}
                        alt="user"
                        className="h-12 w-12 rounded-full border-2 border-emerald-500 shadow-md transition-transform group-hover:scale-105"
                    />
                    <span className="hidden sm:inline font-semibold uppercase text-gray-700 tracking-wide">{username}</span>
                    <span className="absolute bottom-1 right-0 h-3 w-3 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
                </button>

                <div
                    ref={menuRef}
                    className={`absolute right-0 mt-3 w-72 origin-top-right bg-white border border-gray-200 shadow-lg rounded-3xl overflow-hidden transition-transform duration-200
                        ${menuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                >
                    <div className="p-5 border-b border-emerald-200 text-center bg-emerald-50">
                        <img src={DashUser} alt="user" className="h-20 w-20 rounded-full mx-auto border border-emerald-200 shadow-lg" />
                        <h2 className="pt-2 text-lg font-bold text-gray-900">{username}</h2>
                        <p className="text-xs text-emerald-600 uppercase font-semibold tracking-wide">{role}</p>
                    </div>
                    <div className="p-3 space-y-2">
                        <a
                            href="/Dashboard/Profile"
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-emerald-100 text-emerald-700 transition font-semibold"
                        >
                            <FaUserCog className="text-lg" /> Profile
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-emerald-100 text-emerald-700 transition font-semibold"
                        >
                            <FaGear className="text-lg" /> Settings
                        </a>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 font-semibold transition"
                        >
                            <FaPowerOff className="text-lg" /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashNav;
