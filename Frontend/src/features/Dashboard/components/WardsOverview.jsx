import React from 'react'
import { Activity, Bed } from 'lucide-react'

const WardsOverview = () => {
    const wards = [
        { id: 1, name: 'General Ward', occupancy: 42, capacity: 50, type: 'Normal' },
        { id: 2, name: 'Intensive Care Unit (ICU)', occupancy: 18, capacity: 20, type: 'Critical' },
        { id: 3, name: 'Pediatrics', occupancy: 21, capacity: 30, type: 'Normal' },
        { id: 4, name: 'Maternity', occupancy: 15, capacity: 25, type: 'Normal' },
    ]

    return (
        <div className='border rounded-lg border-stone-300 p-4 bg-white'>
            <h3 className='font-semibold mb-4 text-stone-800 flex items-center gap-2'>
                <Activity size={18} className="text-blue-500" /> Wards Overview
            </h3>
            <div className='space-y-4'>
                {wards.map((ward) => (
                    <div key={ward.id} className='flex justify-between items-center pb-3 border-b border-stone-100 last:border-0 last:pb-0'>
                        <div className='flex items-center gap-3'>
                            <div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
                                <Bed size={16} />
                            </div>
                            <div>
                                <p className='font-medium text-sm text-stone-800'>{ward.name}</p>
                                <p className='text-xs text-stone-500'>{ward.type}</p>
                            </div>
                        </div>
                        <div className='text-right'>
                            <p className='text-sm font-semibold text-stone-800'>
                                {ward.occupancy} <span className="text-stone-400 font-normal">/ {ward.capacity}</span>
                            </p>
                            <p className='text-xs text-stone-500'>Occupied</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WardsOverview
