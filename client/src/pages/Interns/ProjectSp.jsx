import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DropDown from '../../components/Form/Dropdown'
import DefaultBtn from '../../components/Button/DefaultBtn'

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

    const [projectassingn, setprojectassingn] = useState({
        project: '',
    })

    const handleInputChange = (e) => {
        setprojectassingn({ project: e.target.value });
    };

    const headleProjectAssign = async (e) => {
        e.preventDefault();
        try {
            // console.log(projectassingn)

            const res = await axios.post(import.meta.env.VITE_APP_API + '/project/intern-assign-project/' + internID, projectassingn, {
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

    const [spassingn, setspassingn] = useState({
        supervisor: '',
    })

    const handleInputChangeSP = (e) => {
        setspassingn({ supervisor: e.target.value });
    };

    const headleSPAssign = (e) => {
        try {

        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            <div className="md:flex">
                <div className="w-full mr-2">
                    <h1 className="font-bold text-emerald-600">Assign to Supervisor</h1>
                    <form onSubmit={headleSPAssign} method="post">
                        <DropDown
                            label={"Select Supervisor"}
                            name="supervisor"
                            onChange={handleInputChangeSP}
                            options={assignSp.map((data) => ({
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
                <div className="w-full ml-2">
                    <h1 className="font-bold text-emerald-600">Assign to Projects</h1>

                    <form onSubmit={headleProjectAssign} method="post">
                        <DropDown
                            label={"Select Project"}
                            name="project"
                            onChange={handleInputChange}
                            options={projects.map((data) => ({
                                value: data._id,
                                label: data.pname
                            }))}
                        />

                        <div className="-mt-4">
                            <DefaultBtn
                                type='submit'
                                label='Assign Project'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProjectSp