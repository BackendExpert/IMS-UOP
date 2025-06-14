import React from 'react'
import { FaChalkboardTeacher } from "react-icons/fa";
import AllSupervisors from './AllSupervisors';


const ManageSupervisors = () => {
    return (
        <div>
            <h1 className="font-bold text-emerald-600 text-xl">Manage Supervisors</h1>

            <div className="my-4 md:grid grid-cols-4 gap-4">
                <div className={`relative bg-emerald-500 text-white p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300`}>
                    <div className="absolute right-4 top-4 opacity-20 text-white text-6xl">
                        <FaChalkboardTeacher className="h-14 w-14" />
                    </div>

                    <div className="relative z-10">
                        <div className="text-sm font-medium uppercase tracking-wide text-emerald-100">
                            Supervisors
                        </div>
                        <div className="mt-2 text-3xl font-bold">5</div>
                    </div>
                </div>
            </div>

            <div className="">
                <AllSupervisors />
            </div>

        </div>
    )
}

export default ManageSupervisors