import React from 'react'
import { useParams } from 'react-router-dom'

const ViewOneProject = () => {
    const { id } = useParams()
    return (
        <div>ViewOneProject {id}</div>
    )
}

export default ViewOneProject