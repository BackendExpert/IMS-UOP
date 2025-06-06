import React from 'react';

const DashFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 text-gray-500 text-sm select-none">
            <p className="mb-2 md:mb-0">
                <span className="font-semibold text-gray-700">© {currentYear}</span> All rights reserved. | Engineered by{' '}
                <a
                    href="https://blackalphalabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 font-semibold hover:underline transition-colors"
                >
                    BLACK ALPHA LABS
                </a>
            </p>
            <p className="font-mono tracking-wide text-gray-400">version 1.0</p>
        </div>
    );
};

export default DashFooter;
