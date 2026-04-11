import React from 'react'
import { X, Stethoscope, Bed, Clock, CalendarDays, User } from 'lucide-react'
import VitalsPanel from './VitalsPanel'
import MedicationPanel from './MedicationPanel'
import PendingActions from './PendingActions'

const statusConfig = {
    'Stable':   { badge: 'bg-green-100 text-green-700',  dot: 'bg-green-400',  label: 'Stable',   bar: 'bg-green-400' },
    'Warning':  { badge: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-400',  label: 'Warning',  bar: 'bg-amber-400' },
    'Critical': { badge: 'bg-red-100 text-red-700',      dot: 'bg-red-500',    label: 'Critical', bar: 'bg-red-500'   },
}

const HandoffDetailPanel = ({ card, onClose }) => {
    const show = !!card
    const s = card ? (statusConfig[card.condition] ?? statusConfig['Stable']) : null

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/30 z-30 transition-opacity duration-200
                    ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Centered Modal */}
            <div
                className={`fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none transition-all duration-200
                    ${show ? 'opacity-100' : 'opacity-0'}`}
            >
                <div
                    className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col pointer-events-auto transition-transform duration-200
                        ${show ? 'scale-100' : 'scale-95'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {card && (
                        <>
                            {/* Colored top bar */}
                            <div className={`h-1.5 w-full rounded-t-xl ${s.bar}`} />

                            {/* Header */}
                            <div className='flex items-start justify-between gap-3 px-6 py-4 border-b border-stone-100'>
                                <div>
                                    <div className='flex items-center gap-2 flex-wrap'>
                                        <h2 className='text-base font-bold text-stone-800'>{card.patientId?.name || 'Details'}</h2>
                                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${s.badge}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full inline-block ${s.dot}`} />
                                            {s.label}
                                        </span>
                                    </div>
                                    <p className='text-xs text-stone-400 mt-0.5'>Clinical Record &middot; ID {card.patientId?.patientId || 'N/A'}</p>
                                </div>
                                <div className='flex items-center gap-2 shrink-0'>
                                    <button
                                        onClick={onClose}
                                        className='p-1.5 rounded-lg hover:bg-stone-100 transition-colors text-stone-400 hover:text-stone-700 cursor-pointer'
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Scrollable Body */}
                            <div className='flex-1 overflow-y-auto px-6 py-4 space-y-4'>

                                {/* Shift Details */}
                                <div className='bg-stone-50 border border-stone-200 rounded-lg px-4 py-3'>
                                    <p className='text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3'>Clinical Context</p>
                                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3'>
                                        <InfoRow icon={<Stethoscope size={12} />} label='From'   value={`Dr. ${card.fromDoctor?.name || 'N/A'}`} />
                                        <InfoRow icon={<User size={12} />}        label='To'     value={`Dr. ${card.toDoctor?.name || 'N/A'}`} />
                                        <InfoRow icon={<Clock size={12} />}       label='Shift'    value={`${card.shift || 'N/A'} · ${card.shiftTime || ''}`} />
                                        <InfoRow icon={<CalendarDays size={12} />}label='Date'     value={card.shiftDate ? new Date(card.shiftDate).toLocaleDateString() : 'N/A'} />
                                        <InfoRow icon={<Bed size={12} />}         label='Ward'     value={card.ward?.name || 'Unassigned'} />
                                    </div>
                                </div>

                                <VitalsPanel vitals={card.vitalsAtHandoff} />
                                <MedicationPanel medications={card.medicationSnapshot} />
                                <PendingActions actions={card.pendingActions} />

                                {/* Clinician Notes */}
                                {card.notes && (
                                    <div>
                                        <p className='text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5'>Observations & Notes</p>
                                        <p className='text-xs text-stone-600 bg-blue-50/30 border border-blue-100 rounded-lg px-3 py-2.5 leading-relaxed italic'>
                                            "{card.notes}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

const InfoRow = ({ icon, label, value }) => (
    <div className='flex items-start gap-1.5'>
        <span className='text-stone-300 mt-0.5 shrink-0'>{icon}</span>
        <div>
            <p className='text-[9px] font-bold text-stone-400 leading-none uppercase tracking-tighter'>{label}</p>
            <p className='text-[11px] font-bold text-stone-700 mt-0.5 capitalize'>{value}</p>
        </div>
    </div>
)

export default HandoffDetailPanel
