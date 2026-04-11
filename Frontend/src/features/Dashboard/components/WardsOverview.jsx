import React from 'react'
import { Activity, Bed } from 'lucide-react'

const WardsOverview = ({ wards, loading }) => {
    if (loading) return <div className='border rounded-lg border-stone-300 p-8 text-center text-stone-400'>Loading Wards...</div>


    return (
        <div className='border rounded-lg border-stone-300 p-4 bg-white'>
            <h3 className='font-semibold mb-4 text-stone-800 flex items-center gap-2'>
                <Activity size={18} className="text-blue-500" /> Wards Overview
            </h3>
            <div className='space-y-4'>
                {wards.map((ward) => (
                    <div key={ward._id} className='flex justify-between items-center pb-3 border-b border-stone-100 last:border-0 last:pb-0'>
                        <div className='flex items-center gap-3'>
                            <div className='p-2 bg-blue-50 text-blue-600 rounded-lg'>
                                <Bed size={16} />
                            </div>
                            <div>
                                <p className='font-medium text-sm text-stone-800'>{ward.name}</p>
                                <p className='text-xs text-stone-500 uppercase tracking-widest font-bold translate-y-[-1px]' style={{fontSize: '8px'}}>{ward.category}</p>
                            </div>
                        </div>
                        <div className='text-right'>
                            <p className='text-sm font-semibold text-stone-800'>
                                {ward.occupiedBeds} <span className="text-stone-400 font-normal">/ {ward.totalBeds}</span>
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
