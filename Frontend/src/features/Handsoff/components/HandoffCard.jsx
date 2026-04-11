import React from 'react'
import { Stethoscope, Bed, Clock, CalendarDays, AlertTriangle } from 'lucide-react'

const statusConfig = {
    green:  { border: 'border-green-400',  badge: 'bg-green-100 text-green-700',  dot: 'bg-green-400',  label: 'Stable'   },
    yellow: { border: 'border-amber-400',  badge: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-400',  label: 'Warning'  },
    red:    { border: 'border-red-400',    badge: 'bg-red-100 text-red-700',      dot: 'bg-red-500',    label: 'Critical' },
}

const HandoffCard = ({ card, onClick, isSelected }) => {
    const s = statusConfig[card.colorStatus] ?? statusConfig.green
    const hasMissedDose = card.medications.some(m => m.missedDose)
    const hasPending = card.pendingActions?.length > 0

    return (
        <div
            onClick={() => onClick(card)}
            className={`bg-white border-l-4 ${s.border} border border-stone-200 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md
                ${isSelected ? 'ring-2 ring-blue-300 shadow-md' : 'shadow-sm'}`}
        >
            {/* Top row: Name + Status badge */}
            <div className='flex items-start justify-between gap-2 mb-3'>
                <div>
                    <h3 className='text-sm font-bold text-stone-800'>{card.patientName}</h3>
                    <p className='text-xs text-stone-400 mt-0.5'>{card.patientId}</p>
                </div>
                <span className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                </span>
            </div>

            {/* Basic info */}
            <div className='space-y-1.5 text-xs text-stone-500'>
                <div className='flex items-center gap-2'>
                    <Bed size={12} className='text-stone-400 shrink-0' />
                    <span>{card.ward} · {card.bed}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <Stethoscope size={12} className='text-stone-400 shrink-0' />
                    <span>{card.doctorName} · {card.nurseName}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <Clock size={12} className='text-stone-400 shrink-0' />
                    <span>{card.shift} · {card.shiftTime}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <CalendarDays size={12} className='text-stone-400 shrink-0' />
                    <span>{card.shiftDate}</span>
                </div>
            </div>

            {/* Alert row */}
            {(hasMissedDose || hasPending) && (
                <div className='mt-3 flex flex-wrap gap-1.5'>
                    {hasMissedDose && (
                        <span className='flex items-center gap-1 text-[10px] font-semibold bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full'>
                            <AlertTriangle size={9} /> Missed dose
                        </span>
                    )}
                    {hasPending && (
                        <span className='flex items-center gap-1 text-[10px] font-semibold bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full'>
                            <AlertTriangle size={9} /> {card.pendingActions.length} pending
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default HandoffCard
