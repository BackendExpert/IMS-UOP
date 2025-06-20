import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const totalProjects = 20;
    const ongoingProjects = 7;
    const completedProjects = totalProjects - ongoingProjects;

    const data = {
        labels: ['Ongoing Projects', 'Completed Projects'],
        datasets: [
            {
                data: [ongoingProjects, completedProjects],
                backgroundColor: ['#0EA5E9', '#8B5CF6'], // sky-500, violet-500
                borderColor: ['#10B981', '#14B8A6'],
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
