import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from '../features/Dashboard/Dashboard';
import Patients from '../features//Patient/Patients';
import Doctors from '../features/Doctors/Doctors';
import Handoff from '../features/Handoff/Handoff';
import Wards from '../features/Wards/Wards'

// Placeholder components
// const Wards = () => <div className='bg-[#FFFFFF] p-6 shadow rounded-lg h-full'><h1>Wards Details</h1></div>;
const Settings = () => <div className='bg-[#FFFFFF] p-6 shadow rounded-lg h-full'><h1>Settings Configuration</h1></div>;

const Pages = () => {
    return (
        <div className="w-full h-[calc(100vh-32px)] overflow-hidden">
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="patients" element={<Patients />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="wards" element={<Wards />} />
                <Route path="handoff" element={<Handoff />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </div>
    )
}

export default Pages
