import React from 'react'
import { useParams } from 'react-router-dom'

const ViewOneProject = () => {
    const { id } = useParams()
    
    return (
        <div>
            <h1 className="xl:text-3xl font-bold text-emerald-600 mb-4">
                Project: <span className=""></span>
            </h1>
        </div>
    )
}

export default ViewOneProject