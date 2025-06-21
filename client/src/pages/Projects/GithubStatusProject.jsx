import React from 'react'
import { useParams } from 'react-router-dom'

const GithubStatusProject = () => {
    const {name} = useParams()
    return (
        <div>GithubStatusProject : {name}</div>
    )
}

export default GithubStatusProject