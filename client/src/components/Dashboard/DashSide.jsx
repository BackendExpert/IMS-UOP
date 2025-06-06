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

    const filteredMenu = dashsidedata.filter(item => {
        if (roleNames.includes('admin') || roleNames.includes('director')) return ![3, 5, 7, 11, 12].includes(item.id);
        if (roleNames.includes('warden')) return ![2, 4, 6, 9, 10, 11, 12].includes(item.id);
        if (roleNames.includes('student')) return ![2, 3, 4, 5, 6, 7, 9, 10].includes(item.id);
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
        <div className="p-6 bg-white shadow-lg border-r border-gray-200 min-h-screen flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-400 hover:scrollbar-thumb-emerald-500 transition-all">
            <div className="flex justify-center mb-6">
                <img src={uoplogo} alt="Logo" className="h-14" />
            </div>
            <h2 className="text-center text-sm font-extrabold text-emerald-600 tracking-widest mb-6 select-none">
                HOSTEL MANAGEMENT SYSTEM
            </h2>
            <div className="flex items-center gap-4 bg-emerald-100 text-emerald-700 rounded-2xl p-4 shadow-inner mb-8">
                <img src={DashUser} alt="avatar" className="h-12 w-12 rounded-full border-2 border-emerald-400 shadow" />
                <div>
                    <h3 className="font-semibold uppercase tracking-wide">{username}</h3>
                    <p className="text-xs uppercase font-medium tracking-wider">{roleNames.join(', ')}</p>
                </div>
            </div>
            <nav className="flex flex-col gap-2">
                {filteredMenu.map(({ id, icon: Icon, name, link }) => (
                    <Link
                        key={id}
                        to={link}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition
                            ${activeMenu === id ? 'bg-emerald-500 text-white shadow-lg' : 'text-emerald-700 hover:bg-emerald-200 hover:text-emerald-700'}`}
                        onClick={() => {
                            setActiveMenu(id);
                            localStorage.setItem('dashmenuID', id);
                        }}
                    >
                        <Icon className="text-lg" />
                        <span>{name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default DashSide;
