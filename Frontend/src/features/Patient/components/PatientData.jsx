import React from 'react'
import { CheckCheck, Users, Activity, AlertCircle } from 'lucide-react'

const PatientData = ({ patients, loading }) => {
    const stats = {
        total: loading ? '...' : patients.length,
        stable: loading ? '...' : patients.filter(p => p.condition === 'Stable').length,
        recovering: loading ? '...' : patients.filter(p => p.condition === 'Recovering').length,
        critical: loading ? '...' : patients.filter(p => p.condition === 'Critical').length,
    }

    return (
        <div className='px-4 grid gap-3 grid-cols-4 mb-4'>
            <LabelData color="bg-stone-100 text-stone-700" label={"Total Patients"} icon={<Users size={16} />} value={stats.total} />
            <LabelData color="bg-green-50 text-green-600" label={"Stable Cases"} icon={<Activity size={16} />} value={stats.stable} />
            <LabelData color="bg-blue-100 text-blue-600" label={"Recovering"} icon={<CheckCheck size={16} />} value={stats.recovering} />
            <LabelData color="bg-red-100 text-red-600" label={"Critical Care"} icon={<AlertCircle size={16} />} value={stats.critical} />
        </div>
    )
}

export default PatientData

const LabelData = ({ label, value, icon, color = "bg-white" }) => {
    return (
        <div className='p-4 border rounded border-stone-300 shadow bg-[#FFFFFF]'>
            <div className='flex mb-3 gap-2 items-start '>
                <div className='grid gap-2'>
                    <span className={`text-xs font-medium p-2 rounded-lg ${color}`}>
                        {icon}
                    </span>
                    <p className='text-2xl font-semibold text-black'>{value}</p>
                </div>
                <h3 className='text-stone-500 mb-2 text-sm mt-1'>{label}</h3>
            </div>
        </div>
    )
}
