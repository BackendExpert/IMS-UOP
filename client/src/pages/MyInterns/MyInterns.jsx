import React from 'react'
import MyInternsStatus from './MyInternsStatus'
import MyAllInterns from './MyAllInterns'

const MyInterns = () => {
    return (
        <div>
            <h1 className="font-bold text-emerald-600 text-xl">My Interns</h1>
            <div className="">
                <MyInternsStatus />
            </div>
            <div className="">
                <MyAllInterns />
            </div>
        </div>
    )
}

export default MyInterns