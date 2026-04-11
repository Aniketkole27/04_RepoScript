import React from 'react'
import { User, ChevronRight, Activity } from 'lucide-react'

const conditionColors = {
    'Critical': 'bg-red-500 animate-pulse',
    'Warning': 'bg-amber-400',
    'Stable': 'bg-green-500',
    'Recovering': 'bg-blue-400'
}

const PatientList = ({ patients, onSelectPatient }) => {
  return (
    <div className='px-4 overflow-hidden'>
      <div className='border rounded-xl border-stone-200 bg-white shadow-sm overflow-hidden'>
        <div className='grid grid-cols-[1.5fr_1fr_1.5fr_1fr_0.5fr] items-center px-6 py-3 bg-stone-50 border-b border-stone-200 text-[10px] font-bold text-stone-400 uppercase tracking-widest'>
          <span>Patient</span>
          <span>Patient ID</span>
          <span>Ward / Bed</span>
          <span>Status</span>
          <span className='text-right'>Action</span>
        </div>

        {patients.length > 0 ? (
          patients.map((patient, idx) => (
            <div
              key={patient._id}
              onClick={() => onSelectPatient(patient._id)}
              className={`grid grid-cols-[1.5fr_1fr_1.5fr_1fr_0.5fr] items-center px-6 py-4 text-sm border-b border-stone-100 hover:bg-blue-50/30 transition-colors cursor-pointer group ${
                idx === patients.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors'>
                  <User size={16} />
                </div>
                <span className='font-bold text-stone-800'>{patient.name}</span>
              </div>
              
              <span className='text-stone-500 font-mono text-xs'>{patient.patientId}</span>
              
              <div className='flex flex-col'>
                <span className='text-stone-700 font-medium'>{patient.currentWard?.name || 'Unassigned'}</span>
                <span className='text-[10px] text-stone-400 font-bold uppercase'>{patient.bedNumber}</span>
              </div>

              <div className='flex items-center gap-2'>
                <span className={`w-2 h-2 rounded-full ${conditionColors[patient.condition] || 'bg-stone-300'}`} />
                <span className='text-xs font-semibold capitalize text-stone-600'>{patient.condition}</span>
              </div>

              <div className='flex justify-end'>
                <div className='p-1.5 rounded-lg bg-stone-50 text-stone-400 group-hover:bg-blue-600 group-hover:text-white transition-all'>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='py-20 text-center'>
            <Activity size={40} className='mx-auto text-stone-200 mb-3' />
            <p className='text-stone-400 text-sm'>No patients found matching the criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientList
