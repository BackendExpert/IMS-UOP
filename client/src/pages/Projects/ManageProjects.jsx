import React from 'react'
import ProjectStatus from './ProjectStatus'
import AllProjects from './AllProjects'

const ManageProjects = () => {
    return (
        <div>
            <h1 className="font-bold text-emerald-600 text-xl">Projects</h1>

            <ProjectStatus />

            <div className="">
                <AllProjects />
            </div>
        </div>
    )
}

export default ManageProjects