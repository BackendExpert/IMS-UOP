import React from 'react';

const DashFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 text-gray-500 text-sm">
            <p>
                <span className="font-semibold text-gray-700">© {currentYear}</span> All rights reserved. |
                Engineered by{' '}
                <a
                    href="https://blackalphalabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 font-medium hover:underline"
                >
                    BLACK ALPHA LABS
                </a>
            </p>
            <p className="mt-2 md:mt-0 font-mono tracking-wide text-gray-400">version 1.0</p>
        </div>
    );
};

export default DashFooter;
