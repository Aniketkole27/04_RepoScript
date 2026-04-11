import React, { useState } from 'react'
import { X, Save, Warehouse, MapPin, Hash, Loader2 } from 'lucide-react'

const INITIAL_FORM = {
    name: '',
    category: 'general',
    location: '',
    totalBeds: 20
}

const ManageWardModal = ({ onClose, onSuccess }) => {
    const [form, setForm] = useState(INITIAL_FORM)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const response = await fetch('http://localhost:5000/api/wards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            const data = await response.json()
            if (data.success) {
                onSuccess()
                onClose()
            } else {
                setError(data.message || 'Failed to create ward')
            }
        } catch (err) {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
            <div className='bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden' onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className='px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Warehouse size={18} className='text-blue-600'/>
                        <h2 className='text-sm font-bold text-stone-800 uppercase tracking-widest'>Register New Ward</h2>
                    </div>
                    <button onClick={onClose} className='p-1.5 hover:bg-stone-200 rounded-full transition-colors'>
                        <X size={18} className='text-stone-400' />
                    </button>
                </div>

                {/* Form Body */}
                <form className='p-6 space-y-5' onSubmit={handleSubmit}>
                    {error && (
                        <div className='p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-bold'>
                            {error}
                        </div>
                    )}

                    <div className='space-y-1.5'>
                        <label className='text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1'>Ward Identity</label>
                        <div className='flex items-center gap-2 border border-stone-200 rounded-xl px-4 py-2.5 focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-500 transition-all'>
                            <Warehouse size={16} className='text-stone-300'/>
                            <input 
                                required
                                type='text' 
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                                placeholder='e.g. Critical Care Unit (CCU)' 
                                className='flex-1 outline-none text-sm text-stone-700 font-bold placeholder:text-stone-300' 
                            />
                        </div>
                    </div>

                    <div className='space-y-1.5'>
                        <label className='text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1'>Physical Location</label>
                        <div className='flex items-center gap-2 border border-stone-200 rounded-xl px-4 py-2.5 focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-500 transition-all'>
                            <MapPin size={16} className='text-stone-300'/>
                            <input 
                                required
                                type='text' 
                                value={form.location}
                                onChange={e => setForm({...form, location: e.target.value})}
                                placeholder='e.g. Floor 2, Wing B' 
                                className='flex-1 outline-none text-sm text-stone-700 font-bold placeholder:text-stone-300' 
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-1.5'>
                            <label className='text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1'>Bed Capacity</label>
                            <div className='flex items-center gap-2 border border-stone-200 rounded-xl px-4 py-2.5'>
                                <Hash size={16} className='text-stone-300'/>
                                <input 
                                    required
                                    type='number' 
                                    min="1"
                                    value={form.totalBeds}
                                    onChange={e => setForm({...form, totalBeds: parseInt(e.target.value)})}
                                    className='flex-1 outline-none text-sm text-stone-700 font-bold' 
                                />
                            </div>
                        </div>
                        <div className='space-y-1.5'>
                            <label className='text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1'>Ward Category</label>
                            <select 
                                value={form.category}
                                onChange={e => setForm({...form, category: e.target.value})}
                                className='w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-700 font-bold outline-none cursor-pointer bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500'
                            >
                                <option value='general'>General</option>
                                <option value='icu'>ICU / Critical</option>
                                <option value='pediatrics'>Pediatrics</option>
                                <option value='maternity'>Maternity</option>
                                <option value='emergency'>Emergency</option>
                                <option value='cardiology'>Cardiology</option>
                            </select>
                        </div>
                    </div>

                    <div className='pt-4'>
                        <button 
                            disabled={loading}
                            type='submit' 
                            className='w-full bg-blue-600 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:bg-stone-200 disabled:shadow-none'
                        >
                            {loading ? (
                                <Loader2 size={18} className='animate-spin' />
                            ) : (
                                <>
                                    <Save size={18} /> Initialize Ward
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ManageWardModal
