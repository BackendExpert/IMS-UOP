import React from 'react'
import InterStatus from './InterStatus'
import AllInterns from './AllInterns'

const ManageInterns = () => {
    return (
        <div>
            <h1 className="font-bold text-emerald-600 text-xl">Manage Interns</h1>

            <div className="">
                <InterStatus />
            </div>

            <div className="">
                <AllInterns />
            </div>

        </div>
    )
}

export default ManageInterns