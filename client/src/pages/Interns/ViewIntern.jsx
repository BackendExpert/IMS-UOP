import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewIntern = () => {
    const { id } = useParams()
    const token = localStorage.getItem('login')

    const [getoneintern, setgetoneintern] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/intern/view-one-intern/' + id, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(res => setgetoneintern(res.data.Result))
        .catch(err => console.log(err))
    }, [])

    
    return (
        <div>ViewIntern {id} </div>
    )
}

export default ViewIntern