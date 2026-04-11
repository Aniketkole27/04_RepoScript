import React from 'react'
import { Hotel, Bed, CheckCircle2, AlertCircle } from 'lucide-react'

const WardData = ({ wards, loading }) => {
    const stats = {
        total: loading ? '...' : wards.reduce((acc, w) => acc + w.totalBeds, 0),
        occupied: loading ? '...' : wards.reduce((acc, w) => acc + w.occupiedBeds, 0),
        maintenance: loading ? '...' : wards.reduce((acc, w) => acc + w.inmentanaceBeds, 0),
    }
    
    const available = loading ? '...' : (stats.total - stats.occupied - stats.maintenance);

    return (
        <div className='px-4 grid gap-3 grid-cols-4 mb-4'>
            <LabelData color="bg-stone-100 text-stone-700" label={"Total Capacity"} icon={<Hotel size={16} />} value={stats.total} />
            <LabelData color="bg-blue-50 text-blue-600" label={"Occupied"} icon={<Bed size={16} />} value={stats.occupied} />
            <LabelData color="bg-green-50 text-green-600" label={"Available"} icon={<CheckCircle2 size={16} />} value={available} />
            <LabelData color="bg-orange-50 text-orange-600" label={"Maintenance"} icon={<AlertCircle size={16} />} value={stats.maintenance} />
        </div>
    )
}

export default WardData

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
