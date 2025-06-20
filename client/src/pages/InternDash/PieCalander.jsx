import React from 'react'
import PieChart from '../../components/Chats/PieChart'
import Calander from '../../components/Others/Calander'

const PieCalander = () => {
    return (
        <div>
            <div className="md:flex">
                <div className="w-full">
                    <PieChart />
                </div>
                <div className="w-full">
                    <Calander />
                </div>
            </div>
        </div>
    )
}

export default PieCalander