import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Greeting from '../shared/Greeting';
import Dashboard from '../features/Dashboard/Dashboard';
import Patients from '../features/Patient/Patients';
import Doctors from '../features/Doctors/Doctors';
import Handoff from '../features/Handoff/Handoff';
import Wards from '../features/Wards/Wards'

const Settings = () => <div className='bg-[#FFFFFF] p-6 shadow rounded-lg h-full'><h1>Settings Configuration</h1></div>;

const Pages = ({ user }) => {
    return (
        <div className="w-full h-[calc(100vh-32px)] overflow-hidden flex flex-col bg-white rounded-lg">
            <Greeting user={user} />
            <div className="flex-1 overflow-y-auto">
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
        </div>
    )
}

export default Pages
