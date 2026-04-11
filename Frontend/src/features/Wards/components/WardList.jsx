import React, { useMemo } from 'react'
import { Layout, Users, MoreHorizontal, ArrowRight } from 'lucide-react'

const MOCK_WARDS = [
    { id: 'W01', name: 'General Ward A', category: 'general', totalBeds: 50, occupied: 42, supervisor: 'Dr. Mehta', location: 'Floor 1, Wing A' },
    { id: 'W02', name: 'ICU Unit 1', category: 'critical', totalBeds: 20, occupied: 18, supervisor: 'Dr. Kulkarni', location: 'Floor 2, Wing C' },
    { id: 'W03', name: 'Pediatrics Wing', category: 'pediatrics', totalBeds: 30, occupied: 15, supervisor: 'Dr. Joshi', location: 'Floor 1, Wing B' },
    { id: 'W04', name: 'Maternity Ward', category: 'maternity', totalBeds: 40, occupied: 35, supervisor: 'Dr. Patil', location: 'Floor 3, Wing A' },
    { id: 'W05', name: 'Emergency Room', category: 'emergency', totalBeds: 25, occupied: 22, supervisor: 'Dr. Singh', location: 'Ground Floor' },
]

const WardList = ({ search = '', category = 'all', onWardClick }) => {
    const filtered = useMemo(() => {
        return MOCK_WARDS.filter((w) => {
            const q = search.toLowerCase()
            const matchSearch = !search || w.name.toLowerCase().includes(q) || w.id.toLowerCase().includes(q)
            const matchCat = category === 'all' || w.category === category
            return matchSearch && matchCat
        })
    }, [search, category])

    return (
        <div className='border rounded border-stone-300 mx-4 mt-2 mb-4 overflow-hidden shadow-sm'>
            <div className='grid grid-cols-[1.5fr_1fr_1.5fr_1.5fr_1.5fr_0.5fr] items-center px-4 py-2.5 bg-stone-50 border-b border-stone-200 text-xs font-semibold text-stone-500 uppercase tracking-wide'>
                <span className='flex items-center gap-1.5'><Layout size={12} /> Ward Name</span>
                <span>Capacity</span>
                <span>Occupancy</span>
                <span className='flex items-center gap-1.5'><Users size={12} /> Supervisor</span>
                <span>Location</span>
                <span>Details</span>
            </div>

            {filtered.length > 0 ? (
                filtered.map((ward, idx) => {
                    const percentage = Math.round((ward.occupied / ward.totalBeds) * 100)
                    const barColor = percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-orange-400' : 'bg-green-500'
                    
                    return (
                        <div
                            key={ward.id}
                            onClick={() => onWardClick(ward)}
                            className={`grid grid-cols-[1.5fr_1fr_1.5fr_1.5fr_1.5fr_0.5fr] items-center px-4 py-4 text-sm border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'}`}
                        >
                            <div>
                                <p className='font-medium text-stone-800'>{ward.name}</p>
                                <p className='text-xs text-stone-400 mt-0.5'>{ward.id} · <span className='capitalize'>{ward.category}</span></p>
                            </div>
                            
                            <span className='text-stone-700 font-medium'>{ward.occupied} / {ward.totalBeds} Beds</span>
                            
                            <div className='flex items-center gap-3 pr-4'>
                                <div className='flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden'>
                                    <div className={`h-full ${barColor}`} style={{ width: `${percentage}%` }} />
                                </div>
                                <span className='text-xs text-stone-500 w-8'>{percentage}%</span>
                            </div>

                            <span className='text-stone-600'>{ward.supervisor}</span>
                            <span className='text-stone-500 text-xs'>{ward.location}</span>
                            
                            <button className='text-stone-400 hover:text-blue-600 transition-colors text-right pr-2'>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    )
                })
            ) : (
                <div className='py-12 text-center text-sm text-stone-400'>
                    No wards found matching your filters.
                </div>
            )}
        </div>
    )
}

export default WardList
