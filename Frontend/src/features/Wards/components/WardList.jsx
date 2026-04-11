import React from 'react'
import { Layout, MoreHorizontal, ArrowRight } from 'lucide-react'

const WardList = ({ wards = [], onWardClick }) => {
    return (
        <div className='border rounded-xl border-stone-200 mx-4 mt-2 mb-4 overflow-hidden shadow-sm'>
            <div className='grid grid-cols-[1.5fr_1fr_1.5fr_1.5fr_0.5fr] items-center px-6 py-3 bg-stone-50 border-b border-stone-200 text-[10px] font-bold text-stone-400 uppercase tracking-widest'>
                <span className='flex items-center gap-1.5'><Layout size={12} /> Facility Registry</span>
                <span>Beds</span>
                <span>Occupancy</span>
                <span>Location</span>
                <span className='text-right px-2'>Details</span>
            </div>

            {wards.length > 0 ? (
                wards.map((ward, idx) => {
                    const percentage = ward.totalBeds > 0 ? Math.round((ward.occupiedBeds / ward.totalBeds) * 100) : 0
                    const barColor = percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-orange-400' : 'bg-green-500'
                    
                    return (
                        <div
                            key={ward._id}
                            onClick={() => onWardClick(ward)}
                            className={`grid grid-cols-[1.5fr_1fr_1.5fr_1.5fr_0.5fr] items-center px-6 py-4 text-sm border-b border-stone-100 hover:bg-blue-50/30 transition-colors cursor-pointer group ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/20'}`}
                        >
                            <div>
                                <p className='font-bold text-stone-800'>{ward.name}</p>
                                <p className='text-[10px] text-stone-400 font-bold uppercase tracking-tight mt-0.5'>{ward.category} &middot; ID {ward._id.slice(-6).toUpperCase()}</p>
                            </div>
                            
                            <span className='text-stone-700 font-bold'>{ward.occupiedBeds} / {ward.totalBeds} Bds</span>
                            
                            <div className='flex items-center gap-3 pr-4'>
                                <div className='flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden'>
                                    <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${percentage}%` }} />
                                </div>
                                <span className='text-[10px] font-bold text-stone-500 w-8'>{percentage}%</span>
                            </div>

                            <span className='text-stone-500 text-xs font-medium'>{ward.location}</span>
                            
                            <div className='flex justify-end pr-2'>
                                <div className='p-1.5 rounded-lg bg-stone-50 text-stone-400 group-hover:bg-blue-600 group-hover:text-white transition-all'>
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </div>
                    )
                })
            ) : (
                <div className='py-20 text-center'>
                    <p className='text-stone-400 text-sm font-medium'>No clinical wards found matching your deployment criteria.</p>
                </div>
            )}
        </div>
    )
}

export default WardList
