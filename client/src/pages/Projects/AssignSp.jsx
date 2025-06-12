import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DefaultBtn from '../../components/Button/DefaultBtn'
import Dropdown from '../../components/Form/Dropdown'

const AssignSp = ({ projectID }) => {
    const token = localStorage.getItem('login')

    const [getsupervisor, setgetsupervisor] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/supervisor/get-supervisor-to-assign', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setgetsupervisor(res.data.Result))
            .catch(err => console.log(err))
    }, [])


    const [spassign, setspassign] = useState({
        supervisor: '',
    })

    const handleInputChange = (e) => {
        setspassign({ supervisor: e.target.value });
    };

    const headleProjectAssignSP = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post(import.meta.env.VITE_APP_API + '/supervisor/assign-supervisor-project/' + projectID, spassign, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            if (res.data.Status === "Success") {
                alert(res.data.Message)
                window.location.reload()
            }
            else {
                alert(res.data.Error)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="">
                <h1 className="font-bold text-emerald-600 mb-4">
                    Assign Supervisor to Project
                </h1>

                <form onSubmit={headleProjectAssignSP} method="post">
                    <Dropdown
                        label={"Select Supervisor"}
                        name="supervisor"
                        onChange={handleInputChange}
                        options={getsupervisor.map((data) => ({
                            value: data._id,
                            label: data.username
                        }))}
                    />

                    <div className="-mt-4">
                        <DefaultBtn
                            type='submit'
                            label='Assign Supervisor'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AssignSp