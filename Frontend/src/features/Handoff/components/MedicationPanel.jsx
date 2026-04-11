import React from 'react'
import { Pill, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

const MedicationPanel = ({ medications }) => {
    // medications corresponds to 'medicationSnapshot' from backend
    const meds = medications || []

    return (
        <div className='mt-3'>
            <p className='text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2'>Active Medication Snapshot</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {meds.length > 0 ? (
                    meds.map((med, idx) => (
                        <div
                            key={idx}
                            className={`flex items-start justify-between rounded-lg px-3 py-2 border ${med.missedDose ? 'border-red-200 bg-red-50' : 'border-stone-200 bg-stone-50'}`}
                        >
                            <div className='flex items-start gap-2'>
                                <Pill size={12} className={`mt-0.5 shrink-0 ${med.missedDose ? 'text-red-500' : 'text-stone-400'}`} />
                                <div>
                                    <p className='text-[11px] font-bold text-stone-800 capitalize leading-tight'>{med.name || 'Unknown Medication'}</p>
                                    <div className='flex items-center gap-1 mt-1 text-[9px] font-bold text-stone-400 uppercase tracking-tight'>
                                        <Clock size={10} />
                                        <span>Next: {med.nextDose || 'TBD'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='shrink-0 ml-2'>
                                {med.missedDose ? (
                                    <span className='flex items-center gap-1 text-[9px] font-bold uppercase text-red-600 bg-red-100 px-2 py-0.5 rounded'>
                                        <AlertTriangle size={8} /> Missed
                                    </span>
                                ) : (
                                    <span className='flex items-center gap-1 text-[9px] font-bold uppercase text-green-600 bg-green-100 px-2 py-0.5 rounded'>
                                        <CheckCircle size={8} /> On Track
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='col-span-full py-4 text-center border-2 border-dashed border-stone-100 rounded-xl'>
                        <p className='text-[10px] text-stone-400 font-bold uppercase tracking-widest'>No Medications Logged</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MedicationPanel
