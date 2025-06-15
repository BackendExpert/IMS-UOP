import React from 'react'
import MyProjectStats from './MyProjectStats'
import MyAllProjects from './MyAllProjects'

const MyProjects = () => {
    return (
        <div>
            <h1 className="font-bold text-emerald-600 text-xl">My Projects</h1>
            <div className="">
                <MyProjectStats />
            </div>
            <div className="">
                <MyAllProjects />
            </div>
        </div>
    )
}

export default MyProjects