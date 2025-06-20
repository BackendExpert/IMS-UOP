import axios from 'axios'
import React, { useEffect, useState } from 'react'
import GetInternAllData from './GetInternAllData'
import OrgMembers from './OrgMembers'
import OnlyOrg from './OnlyOrg'
import InternDashStatus from './InternDashStatus'
import PieCalander from './PieCalander'

const InternDash = () => {
    return (
        <div>
            <div className="md:grid grid-cols-2 gap-4">
                <div className="">
                    <GetInternAllData />
                </div>
                <div className="">
                    <OnlyOrg />
                </div>
                <div className="">
                    <InternDashStatus />
                </div>
                <div className="">
                    <PieCalander />
                </div>

            </div>
            <div className="">
                <OrgMembers />
            </div>
        </div>
    )
}

export default InternDash