import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calander = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="max-w-xs mx-auto p-2 bg-white rounded-xl shadow">
            <h2 className="text-sm font-semibold text-center mb-2">Select Date</h2>
            <Calendar
                onChange={setDate}
                value={date}
                className="custom-calendar small-calendar"
            />
        </div>
    );
};

export default Calander;
