import React from 'react'
import MyProjectStats from './MyProjectStats'

const MyProjects = () => {
    return (
        <div>
            <h1 className="font-bold text-emerald-600 text-xl">My Projects</h1>
            <div className="">
                <MyProjectStats />
            </div>
        </div>
    )
}

export default MyProjects