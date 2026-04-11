import React from 'react'
import { Stethoscope, Bed, Clock, CalendarDays, AlertTriangle } from 'lucide-react'

const statusConfig = {
    'Stable': { border: 'border-green-400', badge: 'bg-green-100 text-green-700', dot: 'bg-green-400', label: 'Stable' },
    'Warning': { border: 'border-amber-400', badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400', label: 'Warning' },
    'Critical': { border: 'border-red-400', badge: 'bg-red-100 text-red-700', dot: 'bg-red-500', label: 'Critical' },
}

const HandoffCard = ({ card, onClick, isSelected }) => {
    // Backend uses patient.condition, but historical cards might have their own vitals state
    // For now, let's map to a default if not found
    const s = statusConfig[card.condition] ?? statusConfig['Stable']
    
    // Use medicationSnapshot from backend model
    const hasMissedDose = card.medicationSnapshot?.some(m => m.missedDose) || false
    const hasPending = card.pendingActions?.length > 0 || false

    return (
        <div
            onClick={() => onClick(card)}
            className={`bg-white border-l-4 ${s.border} border border-stone-200 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md
                ${isSelected ? 'ring-2 ring-blue-300 shadow-md' : 'shadow-sm'}`}
        >
            {/* Top row: Shift + Status badge */}
            <div className='flex items-start justify-between gap-2 mb-3'>
                <div>
                    <h3 className='text-sm font-bold text-stone-800'>{card.shift} Shift</h3>
                    <p className='text-[10px] font-bold text-stone-400 uppercase tracking-tight mt-0.5'>{card.shiftTime}</p>
                </div>
                <span className={`shrink-0 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter px-2.5 py-1 rounded-full ${s.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                </span>
            </div>

            {/* Basic info */}
            <div className='space-y-1.5 text-[11px] text-stone-500 font-medium'>
                <div className='flex items-center gap-2'>
                    <Stethoscope size={11} className='text-stone-300 shrink-0' />
                    <span>Dr. {card.fromDoctor?.name || 'Unknown'} &rarr; Dr. {card.toDoctor?.name || 'Unknown'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <CalendarDays size={11} className='text-stone-300 shrink-0' />
                    <span>{card.shiftDate ? new Date(card.shiftDate).toLocaleDateString() : 'N/A'}</span>
                </div>
            </div>

            {/* Notes Preview */}
            <p className='mt-3 text-[11px] text-stone-400 line-clamp-2 leading-relaxed italic'>
                "{card.notes || 'No notes for this shift.'}"
            </p>

            {/* Alert row */}
            {(hasMissedDose || hasPending) && (
                <div className='mt-3 flex flex-wrap gap-1.5'>
                    {hasMissedDose && (
                        <span className='flex items-center gap-1 text-[9px] font-bold uppercase bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded'>
                            <AlertTriangle size={8} /> Missed Dose
                        </span>
                    )}
                    {hasPending && (
                        <span className='flex items-center gap-1 text-[9px] font-bold uppercase bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded'>
                            <AlertTriangle size={8} /> {card.pendingActions.length} Pending
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default HandoffCard
