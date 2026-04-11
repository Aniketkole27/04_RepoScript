import React from 'react'
import { Users, UserCheck, UserMinus, Activity } from 'lucide-react'

const DoctorData = () => {
    const doctorStats = {
        total: 48,
        available: 32,
        onDuty: 12,
        onLeave: 4,
    }

    return (
        <div className='px-4 grid gap-3 grid-cols-4 mb-4'>
            <LabelData color="bg-stone-100 text-stone-700" label={"Total Doctors"} icon={<Users size={16} />} value={doctorStats.total} />
            <LabelData color="bg-green-50 text-green-600" label={"Available"} icon={<UserCheck size={16} />} value={doctorStats.available} />
            <LabelData color="bg-blue-50 text-blue-600" label={"On Duty"} icon={<Activity size={16} />} value={doctorStats.onDuty} />
            <LabelData color="bg-red-50 text-red-600" label={"On Leave"} icon={<UserMinus size={16} />} value={doctorStats.onLeave} />
        </div>
    )
}

export default DoctorData

const LabelData = ({ label, value, icon, color = "bg-white" }) => {
    return (
        <div className='p-4 border rounded border-stone-300 shadow bg-white'>
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
