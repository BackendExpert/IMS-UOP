import React from 'react'
import GetOrgData from '../CommonDash/GetOrgData'
import DIrDashStatus from './DIrDashStatus'

const DirDash = () => {
    return (
        <div>
            <div className="md:flex">
                <div className="w-full">
                    <GetOrgData />
                </div>
                <div className="w-full md:ml-2">
                    <DIrDashStatus />
                </div>
            </div>
        </div>
    )
}

export default DirDash