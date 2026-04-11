import React from 'react'
import { X, Save, Warehouse, MapPin, User, Hash } from 'lucide-react'

const ManageWardModal = ({ onClose }) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
            <div className='bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden' onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className='px-6 py-4 border-b border-stone-200 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Warehouse size={20} className='text-blue-600'/>
                        <h2 className='text-lg font-bold text-stone-800'>Manage Ward</h2>
                    </div>
                    <button onClick={onClose} className='p-1.5 hover:bg-stone-100 rounded-full transition-colors'>
                        <X size={18} className='text-stone-400' />
                    </button>
                </div>

                {/* Form Body */}
                <form className='p-6 space-y-4' onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                    <div className='space-y-1'>
                        <label className='text-[10px] font-bold text-stone-400 uppercase tracking-widest'>Ward Name</label>
                        <div className='flex items-center gap-2 border border-stone-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all'>
                            <Warehouse size={16} className='text-stone-400'/>
                            <input type='text' placeholder='e.g. Critical Care Unit' className='flex-1 outline-none text-sm text-stone-700 font-medium' />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-1'>
                            <label className='text-[10px] font-bold text-stone-400 uppercase tracking-widest'>Section/Wing</label>
                            <div className='flex items-center gap-2 border border-stone-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all'>
                                <MapPin size={16} className='text-stone-400'/>
                                <input type='text' placeholder='e.g. Wing B' className='flex-1 outline-none text-sm text-stone-700 font-medium' />
                            </div>
                        </div>
                        <div className='space-y-1'>
                            <label className='text-[10px] font-bold text-stone-400 uppercase tracking-widest'>Floor</label>
                            <div className='flex items-center gap-2 border border-stone-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all'>
                                <Hash size={16} className='text-stone-400'/>
                                <select className='flex-1 outline-none text-sm text-stone-700 font-medium bg-transparent cursor-pointer'>
                                    <option>Ground</option>
                                    <option>1st Floor</option>
                                    <option>2nd Floor</option>
                                    <option>3rd Floor</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='space-y-1'>
                        <label className='text-[10px] font-bold text-stone-400 uppercase tracking-widest'>Assign Supervisor</label>
                        <div className='flex items-center gap-2 border border-stone-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all'>
                            <User size={16} className='text-stone-400'/>
                            <input type='text' placeholder='Search for doctors...' className='flex-1 outline-none text-sm text-stone-700 font-medium' />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-1'>
                            <label className='text-[10px] font-bold text-stone-400 uppercase tracking-widest'>Total Beds</label>
                            <div className='flex items-center gap-2 border border-stone-200 rounded-lg px-3 py-2'>
                                <input type='number' defaultValue={30} className='flex-1 outline-none text-sm text-stone-700 font-medium' />
                            </div>
                        </div>
                        <div className='space-y-1'>
                            <label className='text-[10px] font-bold text-stone-400 uppercase tracking-widest'>Category</label>
                            <select className='w-full border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 font-medium outline-none cursor-pointer'>
                                <option>General</option>
                                <option>Critical</option>
                                <option>Pediatrics</option>
                                <option>Maternity</option>
                            </select>
                        </div>
                    </div>

                    <div className='pt-4'>
                        <button type='submit' className='w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95'>
                            <Save size={18} /> Update Ward Configuration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ManageWardModal
