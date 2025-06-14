import React from 'react'
import { useState } from 'react'

const ReqeustLetter = ({ internID }) => {
    const [letter, setletter] = useState({
        intern: '',
        supervisor: '',
        project: '',
        duration: '',
        salary: '',
        startData: '',
        endData: '',
        letter: null,
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

    return (
        <div>ReqeustLetter {internID}</div>
    )
}

export default ReqeustLetter