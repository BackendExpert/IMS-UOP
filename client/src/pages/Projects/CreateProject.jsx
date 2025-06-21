import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import DefaultInput from '../../components/Form/DefaultInput';
import TextAreaInput from '../../components/Form/TextAreaInput';
import DateInput from '../../components/Form/DateInput';
import DefaultBtn from '../../components/Button/DefaultBtn';

const CreateProject = () => {
    const token = localStorage.getItem('login')
    const navigate = useNavigate()
    const [projectdata, setprojectdata] = useState({
        pname: '',
        pdescription: '',
        giturl: '',
        estimatedEndDate: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setprojectdata((prev) => ({ ...prev, [name]: value }));
    };

    const headleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/project/create-new-project', projectdata, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            if (res.data.Status === "Success") {
                alert(res.data.Message)
                navigate('/Dashboard/Projects', { replace: true })
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
            <h1 className="font-bold text-emerald-600 text-xl">Create New Project</h1>
            <div className="-mt-4">
                <Link to={'/Dashboard/Projects'}>
                    <DefaultBtn
                        type='button'
                        label='Back'
                    />
                </Link>
            </div>

            <div className="">
                <form onSubmit={headleCreateProject} method="post" className='mt-8'>
                    <DefaultInput
                        label={"Enter Project Title"}
                        name={'pname'}
                        value={projectdata.pname}
                        placeholder={"Project Title"}
                        required
                        onChange={handleInputChange}
                    />

                    <TextAreaInput
                        label={"Enter Project Description"}
                        name={'pdescription'}
                        value={projectdata.pdescription}
                        placeholder={"Project Description"}
                        required
                        onChange={handleInputChange}
                    />

                    <DefaultInput
                        label={"Enter Github Repository Name"}
                        type={'url'}
                        name={'giturl'}
                        value={projectdata.giturl}
                        required
                        placeholder={"Github Repository Name"}
                        onChange={handleInputChange}
                    />

                    <DateInput
                        label={"Enter Estimated End Date"}
                        name={'estimatedEndDate'}
                        value={projectdata.estimatedEndDate}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="-mt-4">
                        <DefaultBtn
                            type='submit'
                            label='Create New Project'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProject