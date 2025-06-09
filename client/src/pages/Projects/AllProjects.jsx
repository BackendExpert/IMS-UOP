import React from 'react'
import DefaultBtn from '../../components/Button/DefaultBtn'
import { Link } from 'react-router-dom'

const AllProjects = () => {
    return (
        <div>
            <div className="-mt-4">
                <Link to={'/Dashboard/Create-project'}>
                    <DefaultBtn
                        type='button'
                        label='Create New Project'
                    />
                </Link>
            </div>
        </div>
    )
}

export default AllProjects