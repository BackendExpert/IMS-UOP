import axios from 'axios';
import React, { useState } from 'react';
import Dropdown from '../../components/Form/Dropdown';
import DefaultBtn from '../../components/Button/DefaultBtn';

const CreateAttendance = () => {
    const token = localStorage.getItem('login');
    const [attendance, setattendance] = useState({
        intime: '',
        leaveat: '',
        mode: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setattendance((prev) => ({ ...prev, [name]: value }));
    };

    const isValidTimeRange = () => {
        const { intime, leaveat } = attendance;
        return (
            intime >= '07:15' && intime <= '11:30' &&
            leaveat >= '13:30' && leaveat <= '16:30'
        );
    };

    const headleCreateAttendance = async (e) => {
        e.preventDefault();

        if (!isValidTimeRange()) {
            alert("Invalid time:\n• 'intime' must be between 07:15 - 11:30\n• 'leaveat' must be between 13:30 - 16:30");
            return;
        }

        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/attendance/create-attendance', attendance, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.data.Status === "Success") {
                alert(res.data.Message);
                window.location.reload();
            } else {
                alert(res.data.Error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form onSubmit={headleCreateAttendance} method="post">
                <div className="flex">
                    <div className="w-full mr-2">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            In Time
                        </label>
                        <input
                            type="time"
                            name="intime"
                            value={attendance.intime}
                            onChange={handleInputChange}
                            min="07:15"
                            max="11:30"
                            required
                            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div className="w-full mr-2">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Out Time
                        </label>
                        <input
                            type="time"
                            name="leaveat"
                            value={attendance.leaveat}
                            onChange={handleInputChange}
                            min="13:30"
                            max="16:30"
                            required
                            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <div className="w-full mr-2">
                        <Dropdown
                            label={"Select Mode"}
                            options={[
                                { value: 'online', label: 'Online' },
                                { value: 'onsite', label: 'OnSite' }
                            ]}
                            name={'mode'}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="w-full mr-2">
                        <DefaultBtn
                            type='submit'
                            label='Create Today Attendance'
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateAttendance;
