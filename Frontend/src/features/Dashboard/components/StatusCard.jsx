import React from 'react'
import { Bed, Users, Stethoscope } from 'lucide-react'

const StatusCard = ({ totalWards, totalPatients, totalDoctors }) => {
    return (
        <>
            <Card title={"Total Wards"} value={totalWards} icon={<Bed size={16} />} />
            <Card title={"Total Patients"} value={totalPatients} icon={<Users size={16} />} />
            <Card title={"Active Doctors"} value={totalDoctors} icon={<Stethoscope size={16} />} />
        </>
    )
}

export default StatusCard


const Card = ({ title, value, icon: icon }) => {
    return (
        <div className='p-4 border rounded border-stone-300 shadow'>
            <div className='flex mb-3 items-start justify-between'>
                <div>
                    <h3 className='text-stone-500 mb-2 text-sm'>{title}</h3>
                    <p className='text-2xl font-semibold'>{value}</p>
                </div>
                <span className='text-xs flex items-center gap-1 font-medium px-2 py-1 rounded bg-green-100'>
                    {icon}
                </span>
            </div>
        </div>
    )
}