import React from 'react'
import { Hospital } from 'lucide-react'

const Branding = () => {
  return (
    <div className='flex items-center gap-3 px-2 py-4 mb-2 border-b border-stone-200'>
      <div className='bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-100'>
        <Hospital size={20} />
      </div>
      <div>
        <h1 className='text-sm font-black text-stone-900 tracking-tight uppercase'>Global Hospital</h1>
        <p className='text-[10px] text-stone-400 font-bold tracking-widest uppercase leading-none'>Hospital Center</p>
      </div>
    </div>
  )
}

export default Branding
