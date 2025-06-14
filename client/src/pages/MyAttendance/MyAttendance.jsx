import React from 'react'
import CreateAttendance from './CreateAttendance'

const MyAttendance = () => {
    return (
        <div>
            <h1 className="font-bold text-emerald-600 mb-4">
                My Attendance
            </h1>

            <div className="">
                <CreateAttendance />
            </div>
        </div>
    )
}

export default MyAttendance