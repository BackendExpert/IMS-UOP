import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserInfoFromToken } from '../../utils/auth';
import { dashsidedata } from './DashSideData';
import uoplogo from '../../assets/uoplogo.png';
import DashUser from '../../assets/DashUser.png';

const DashSide = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const { username, roles } = getUserInfoFromToken() || {};
    const roleNames = Array.isArray(roles)
        ? roles.map(r => (typeof r === 'string' ? r : r.name))
        : [typeof roles === 'string' ? roles : roles?.name];

    // Role-based filtering for menu items, updated for clarity and easier config
    const filteredMenu = dashsidedata.filter(item => {
        if (roleNames.includes('admin') || roleNames.includes('director')) {
            return ![3, 5, 7, 11, 12].includes(item.id);
        }
        if (roleNames.includes('warden')) {
            return ![2, 4, 6, 9, 10, 11, 12].includes(item.id);
        }
        if (roleNames.includes('student')) {
            return ![2, 3, 4, 5, 6, 7, 9, 10].includes(item.id);
        }
        return false;
    });

    useEffect(() => {
        const currentItem = dashsidedata.find(item => item.link === location.pathname);
        if (currentItem) {
            const allowedIds = filteredMenu.map(item => item.id);
            if (!allowedIds.includes(currentItem.id)) {
                localStorage.clear();
                navigate('/');
                return;
            }
            setActiveMenu(currentItem.id);
            localStorage.setItem('dashmenuID', currentItem.id);
        } else {
            const savedId = localStorage.getItem('dashmenuID');
            const savedIdNum = Number(savedId);
            if (filteredMenu.some(item => item.id === savedIdNum)) {
                setActiveMenu(savedIdNum);
            } else {
                localStorage.clear();
                navigate('/');
            }
        }
    }, [location, filteredMenu, navigate]);

    return (
        <div className="p-6 bg-white shadow-lg border-r border-gray-200 min-h-screen flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-400 hover:scrollbar-thumb-emerald-600 rounded-tr-3xl rounded-br-3xl transition-all">
            <div className="flex justify-center mb-8">
                <img src={uoplogo} alt="University Logo" className="h-16 w-auto drop-shadow-md" />
            </div>
            <h2 className="text-center text-sm font-extrabold text-emerald-600 tracking-widest mb-8 select-none uppercase drop-shadow-sm">
                Hostel Management System
            </h2>
            <div className="flex items-center gap-4 bg-emerald-100 text-emerald-700 rounded-3xl p-5 shadow-inner mb-10 border border-emerald-200">
                <img src={DashUser} alt="avatar" className="h-14 w-14 rounded-full border-2 border-emerald-400 shadow-lg" />
                <div>
                    <h3 className="font-semibold uppercase tracking-wide">{username}</h3>
                    <p className="text-xs uppercase font-semibold tracking-wider text-emerald-700">{roleNames.join(', ')}</p>
                </div>
            </div>
            <nav className="flex flex-col gap-3">
                {filteredMenu.map(({ id, icon: Icon, name, link }) => (
                    <Link
                        key={id}
                        to={link}
                        className={`flex items-center gap-4 px-6 py-3 rounded-2xl font-semibold transition shadow-sm
                            ${activeMenu === id
                                ? 'bg-emerald-600 text-white shadow-lg hover:shadow-2xl'
                                : 'text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800'
                            }`}
                        onClick={() => {
                            setActiveMenu(id);
                            localStorage.setItem('dashmenuID', id);
                        }}
                    >
                        <Icon className="text-xl" />
                        <span>{name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default DashSide;
