import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetOrgData = () => {
    const [getorgdata, setgetorgdata] = useState([])

    const token = localStorage.getItem('login')
    
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/github/org', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(res => setgetorgdata(res.data.Result))
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            {getorgdata?.login}
        </div>
    )
}

export default GetOrgData