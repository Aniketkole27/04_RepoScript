import React from 'react'
import { ArrowLeft, Plus, User, MapPin, Loader2 } from 'lucide-react'
import HandoffCard from './HandoffCard'

const PatientDetailView = ({ patient, onBack, onCreateTask, onSelectCard, selectedCardId }) => {
  if (!patient) {
     return (
        <div className='flex-1 flex flex-col items-center justify-center text-stone-400 py-20'>
            <Loader2 className='animate-spin mb-2' size={32} />
            <p className='text-xs font-bold uppercase tracking-widest'>Retrieving Clinical History...</p>
        </div>
     )
  }

  const patientCards = patient.handoffCards || []

  return (
    <div className='flex flex-col h-full'>
      {/* Detail Header */}
      <div className='px-4 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50 mb-4'>
        <div className='flex items-center gap-4'>
          <button 
            onClick={onBack}
            className='p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-600 cursor-pointer'
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-100'>
              <User size={20} />
            </div>
            <div>
              <h2 className='text-lg font-bold text-stone-800 leading-tight'>{patient.name}</h2>
              <div className='flex items-center gap-3 text-xs text-stone-500 font-medium mt-0.5'>
                <span>ID: {patient.patientId}</span>
                <span className='flex items-center gap-1'><MapPin size={10}/> {patient.currentWard?.name} · {patient.bedNumber}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onCreateTask}
          className='flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:bg-blue-800 transition-all shadow-lg shadow-blue-100 cursor-pointer'
        >
          <Plus size={18} />
          Create New Task
        </button>
      </div>

      {/* Cards Grid */}
      <div className='flex-1 px-4 overflow-y-auto pb-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-xs font-bold text-stone-400 uppercase tracking-widest'>Handoff History</h3>
          <p className='text-[10px] font-bold text-stone-300 uppercase tracking-widest'>{patientCards.length} Records Found</p>
        </div>
        
        {patientCards.length > 0 ? (
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {patientCards.map(card => (
              <HandoffCard
                key={card._id}
                card={card}
                onClick={onSelectCard}
                isSelected={selectedCardId === card._id}
              />
            ))}
          </div>
        ) : (
          <div className='py-20 text-center bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200'>
            <p className='text-stone-400 text-sm'>No records found for this patient.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientDetailView
