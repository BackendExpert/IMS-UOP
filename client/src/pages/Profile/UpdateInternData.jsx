import axios from 'axios';
import React, { useState } from 'react'
import DefaultInput from '../../components/Form/DefaultInput';
import TextAreaInput from '../../components/Form/TextAreaInput';
import FileInput from '../../components/Form/FileInput';
import DateInput from '../../components/Form/DateInput';
import DefaultBtn from '../../components/Button/DefaultBtn';

const UpdateInternData = () => {
    const token = localStorage.getItem('login')

    const [updatedata, setupdatedata] = useState({
        address: '',
        cv: null,
        dob: '',
        github: '',
        linkedin: '',
        campus: '',
        course: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setupdatedata((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        setupdatedata((prevData) => ({
            ...prevData,
            [name]: file,
        }));
    };

    const headleCreateInternInformation = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('address', updatedata.address);
            formData.append('cv', updatedata.cv);
            formData.append('dob', updatedata.dob);
            formData.append('github', updatedata.github);
            formData.append('linkedin', updatedata.linkedin);
            formData.append('campus', updatedata.campus);
            formData.append('course', updatedata.course);

            const res = await axios.post(
                import.meta.env.VITE_APP_API + '/intern/create-intern-infor',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            if (res.data.Status === "Success") {
                alert(res.data.Message);
                window.location.reload();
            } else {
                alert(res.data.Error);
            }
        } catch (err) {
            console.log(err);
        }
    };




    return (
        <div>
            <h1 className="text-xl font-bold text-emerald-600 mb-8 mt-2">Create My Information</h1>

            <form onSubmit={headleCreateInternInformation} method="post">
                <TextAreaInput
                    label={'Enter Address'}
                    name={'address'}
                    value={updatedata.address}
                    required
                    placeholder='Address'
                    onChange={handleInputChange}
                />

                <FileInput
                    label={"Enter Your CV (in PDF)"}
                    name={'cv'}
                    onChange={handleFileChange}
                    required
                />

                <DateInput
                    label={'Enter Date of Birth'}
                    name={'dob'}
                    value={updatedata.dob}
                    required
                    onChange={handleInputChange}
                />

                <DefaultInput
                    label={'Enter Github Username'}
                    name={'github'}
                    value={updatedata.github}
                    placeholder={'github.com/username'}
                    required
                    onChange={handleInputChange}
                />

                <DefaultInput
                    label={'Enter Linkedin Username'}
                    name={'linkedin'}
                    value={updatedata.linkedin}
                    placeholder={'linkedin.com/username'}
                    required
                    onChange={handleInputChange}
                />

                <DefaultInput
                    label={'Enter Institute'}
                    name={'campus'}
                    value={updatedata.campus}
                    placeholder={'Institute'}
                    required
                    onChange={handleInputChange}
                />

                <DefaultInput
                    label={'Enter Course'}
                    name={'course'}
                    value={updatedata.course}
                    placeholder={'BSc IT, HND, Diploma'}
                    required
                    onChange={handleInputChange}
                />

                <div className="-mt-2">
                    <DefaultBtn
                        type='submit'
                        label='Create Intern Information'
                    />
                </div>
            </form>
        </div>
    )
}

export default UpdateInternData