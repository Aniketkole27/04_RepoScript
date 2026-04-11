import React from 'react'
import { Pill, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

const MedicationPanel = ({ medications, startDate }) => {
    return (
        <div className='mt-3'>
            <p className='text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2'>Medications</p>
            <div className='space-y-1.5'>
                {medications.map((med, idx) => (
                    <div
                        key={idx}
                        className={`flex items-start justify-between rounded-lg px-3 py-2 border ${med.missedDose ? 'border-red-200 bg-red-50' : 'border-stone-200 bg-stone-50'}`}
                    >
                        <div className='flex items-start gap-2'>
                            <Pill size={13} className={`mt-0.5 shrink-0 ${med.missedDose ? 'text-red-500' : 'text-stone-400'}`} />
                            <div>
                                <p className='text-xs font-semibold text-stone-800'>{med.name}</p>
                                <div className='flex items-center gap-1 mt-0.5 text-[10px] text-stone-500'>
                                    <Clock size={10} />
                                    <span>Next dose: {med.nextDose}</span>
                                </div>
                            </div>
                        </div>
                        <div className='shrink-0 ml-2'>
                            {med.missedDose ? (
                                <span className='flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full'>
                                    <AlertTriangle size={10} /> Missed
                                </span>
                            ) : (
                                <span className='flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full'>
                                    <CheckCircle size={10} /> On track
                                </span>
                            )}
                        </div>
                    </div>
                ))}
                <p className='text-[10px] text-stone-400 mt-1'>Started: {startDate}</p>
            </div>
        </div>
    )
}

export default MedicationPanel
