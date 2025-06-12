import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProjectSp = ({ internID }) => {
    const token = localStorage.getItem('login')
    
    const [assignSp, setassignSp] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/supervisor/get-supervisor-to-assign', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setassignSp(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    const [projects, setprojects] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/project/get-projects-to-assign', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setprojects(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className="md:flex">
                <div className="w-full mr-2">
                    <h1 className="font-bold text-emerald-600">Assign to Supervisor</h1>
                </div>
                <div className="w-full ml-2">
                    <h1 className="font-bold text-emerald-600">Assign to Projects</h1>
                </div>
            </div>
        </div>
    )
}

export default ProjectSp