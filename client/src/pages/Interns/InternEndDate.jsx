import axios from 'axios'
import React, { useState } from 'react'
import DefaultInput from '../../components/Form/DefaultInput'
import DateInput from '../../components/Form/DateInput'
import DefaultBtn from '../../components/Button/DefaultBtn'

const InternEndDate = ({ InternID }) => {
    const token = localStorage.getItem('login')

    const [interndata, setinterndata] = useState({
        enddata: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setinterndata((prev) => ({ ...prev, [name]: value }));
    };

    const headleSetInternEnd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/intern/set-internship-end/' + InternID, interndata, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            if (res.data.Status === "Success") {
                alert(res.data.Message)
                window.location.reload()
            } else {
                alert(res.data.Error)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Date range: from 3 months to 6 months from today
    const today = new Date();

    const minDate = new Date(today);
    minDate.setMonth(today.getMonth() + 3);

    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 6);

    const formatDate = (date) => date.toISOString().split('T')[0];

    return (
        <div>
            <h1 className="font-bold text-emerald-600">Set Internship End Date</h1>
            <p className="text-gray-600 text-sm">This can only select date between after 3months from today and max is 6 month</p>
            <div>
                <form onSubmit={headleSetInternEnd} method="post">
                    <DateInput
                        label={"Internship End Date: "}
                        name={'enddata'}
                        value={interndata.enddata}
                        required
                        onChange={handleInputChange}
                        min={formatDate(minDate)}
                        max={formatDate(maxDate)}
                    />

                    <div className="-mt-4">
                        <DefaultBtn
                            label='Set Internship End Date'
                            type='submit'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InternEndDate;
