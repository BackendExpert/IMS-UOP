import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const token = localStorage.getItem('login');
    const [myAllProjects, setMyAllProjects] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/project/my-all-projects', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setMyAllProjects(res.data.Result))
            .catch(err => console.error(err));
    }, []);

    const ongoingProjects = myAllProjects.filter(p => p.status === 'ongoing').length;
    const completedProjects = myAllProjects.filter(p => p.status === 'completed').length;

    const data = {
        labels: ['Ongoing Projects', 'Completed Projects'],
        datasets: [
            {
                data: [ongoingProjects, completedProjects],
                backgroundColor: ['#0EA5E9', '#8B5CF6'], // sky-500, violet-500
                borderColor: ['#0EA5E9', '#8B5CF6'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-center mb-4">Project Status</h2>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
