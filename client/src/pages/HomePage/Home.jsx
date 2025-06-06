import React, { useState } from 'react'
import DefaultInput from '../../components/Form/DefaultInput';
import DateInput from '../../components/Form/DateInput';
import Dropdown from '../../components/Form/Dropdown';
import FileInput from '../../components/Form/FileInput';
import TextAreaInput from '../../components/Form/TextAreaInput';

const Home = () => {
    const [form, setForm] = React.useState({
        name: '',
        date: '',
        file: null,
        description: '',
        type: '',
    });

    return (
        <form className="max-w-xl mx-auto mt-10 space-y-6">
            <DefaultInput placeholder={"Name of Std"} label="Full Name" name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <DateInput label="Start Date" name="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            <Dropdown
                label="Internship Type"
                name="type"
                onChange={e => setForm({ ...form, type: e.target.value })}
                options={[{ value: 'industrial', label: 'Industrial' }, { value: 'academic', label: 'Academic' }]}
                required
            />
            <FileInput label="Upload Report" name="file" onChange={e => setForm({ ...form, file: e.target.files[0] })} accept=".pdf,.docx" />
            <TextAreaInput label="Description" name="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <button type="submit" className="rounded-xl bg-primary-600 px-6 py-2 text-white hover:bg-primary-700 transition">
                Submit
            </button>
        </form>
    );
};

export default Home