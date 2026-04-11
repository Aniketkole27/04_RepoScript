import React, { useState } from 'react'
import { X, Plus, Trash2, Loader2 } from 'lucide-react'

const EMPTY_MED = { name: '', nextDose: '', missedDose: false }
const EMPTY_ACTION = { action: '', priority: 'Medium', isCompleted: false }

const INITIAL_FORM = {
    toDoctor: '', // ObjectID
    shift: 'Morning',
    shiftTime: '8:00 AM – 4:00 PM',
    shiftDate: new Date().toISOString().split('T')[0],
    condition: 'Stable',
    vitalsAtHandoff: {
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        respiratoryRate: '',
        oxygenSaturation: '',
        sugarLevel: '',
    },
    medicationSnapshot: [{ ...EMPTY_MED }],
    pendingActions: [{ ...EMPTY_ACTION }],
    notes: '',
}

const CreateHandoffCard = ({ open, onClose, onSubmit, initialData }) => {
    // 1. Hooks (MUST BE AT THE TOP)
    const [form, setForm] = useState(INITIAL_FORM)
    const [doctors, setDoctors] = useState([])
    const [loadingDoctors, setLoadingDoctors] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    React.useEffect(() => {
        if (open) {
            setLoadingDoctors(true)
            fetch('http://localhost:5000/api/doctors')
                .then(res => res.json())
                .then(data => {
                    if (data.success) setDoctors(data.data)
                })
                .finally(() => setLoadingDoctors(false))
            
            setForm(prev => ({
                ...INITIAL_FORM,
                ...initialData,
                shiftDate: initialData?.shiftDate || new Date().toISOString().split('T')[0]
            }))
        }
    }, [open, initialData])

    // 2. Conditional Return
    if (!open) return null

    // 3. Helper Functions
    const set = (field, value) => setForm(f => ({ ...f, [field]: value }))
    const setVital = (field, value) => setForm(f => ({ ...f, vitalsAtHandoff: { ...f.vitalsAtHandoff, [field]: value } }))

    const updateMed = (idx, field, value) =>
        setForm(f => {
            const meds = [...f.medicationSnapshot]
            meds[idx] = { ...meds[idx], [field]: value }
            return { ...f, medicationSnapshot: meds }
        })
    const addMed = () => setForm(f => ({ ...f, medicationSnapshot: [...f.medicationSnapshot, { ...EMPTY_MED }] }))
    const removeMed = (idx) => setForm(f => ({ ...f, medicationSnapshot: f.medicationSnapshot.filter((_, i) => i !== idx) }))

    const updateAction = (idx, field, value) =>
        setForm(f => {
            const actions = [...f.pendingActions]
            actions[idx] = { ...actions[idx], [field]: value }
            return { ...f, pendingActions: actions }
        })
    const addAction = () => setForm(f => ({ ...f, pendingActions: [...f.pendingActions, { ...EMPTY_ACTION }] }))
    const removeAction = (idx) => setForm(f => ({ ...f, pendingActions: f.pendingActions.filter((_, i) => i !== idx) }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        try {
            const vitals = {};
            const rawVitals = form.vitalsAtHandoff || {};
            
            Object.keys(rawVitals).forEach(key => {
                const val = rawVitals[key];
                if (val !== '' && val !== null && val !== undefined) {
                    if (key === 'bloodPressure') {
                        vitals[key] = val;
                    } else {
                        const parsed = parseFloat(val);
                        if (!isNaN(parsed)) vitals[key] = parsed;
                    }
                }
            });

            const user = JSON.parse(localStorage.getItem('user'));
            const fromDoctor = user?._id || user?.id;

            // Strip metadata fields that shouldn't go to the Handoff model
            const { patientName, patientId: pId, bed, condition, ...cleanForm } = form;

            const result = {
                ...cleanForm,
                vitalsAtHandoff: vitals,
                fromDoctor: fromDoctor,
                medicationSnapshot: (form.medicationSnapshot || []).filter(m => m.name.trim()),
                pendingActions: (form.pendingActions || []).filter(a => a.action?.trim()),
            }
            
            await onSubmit(result)
        } catch (error) {
            console.error("Submission error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div onClick={onClose} className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-all' />

            <div className='fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none'>
                <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden'>
                    
                    <div className='bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center justify-between'>
                        <div>
                            <h2 className='text-sm font-bold text-stone-800 uppercase tracking-widest font-sans'>Clinical Handoff Entry</h2>
                            <p className='text-[10px] text-stone-400 font-bold uppercase tracking-tight mt-1'>Patient: {initialData?.patientName} ({initialData?.patientId})</p>
                        </div>
                        <button onClick={onClose} className='p-2 hover:bg-stone-200 rounded-full transition-colors'>
                            <X size={18} className='text-stone-500' />
                        </button>
                    </div>

                    <form id='handoff-form' onSubmit={handleSubmit} className='flex-1 overflow-y-auto px-6 py-5 space-y-6'>
                        
                        <Section title='Care Transfer'>
                            <div className='grid grid-cols-2 gap-4'>
                                <Field label='Receiving Clinician (To) *'>
                                    {loadingDoctors ? (
                                        <div className='flex items-center gap-2 text-[10px] text-stone-400 font-bold italic py-2'>
                                            <Loader2 size={12} className='animate-spin' /> Loading Staff Roster...
                                        </div>
                                    ) : (
                                        <select required value={form.toDoctor} onChange={e => set('toDoctor', e.target.value)} className={input}>
                                            <option value="">Select Doctor...</option>
                                            {doctors.map(doc => (
                                                <option key={doc._id} value={doc._id}>{doc.name} ({doc.specialization})</option>
                                            ))}
                                        </select>
                                    )}
                                </Field>
                                <Field label='Shift Configuration'>
                                    <div className='flex gap-2'>
                                        <select value={form.shift} onChange={e => set('shift', e.target.value)} className={input}>
                                            <option value='Morning'>Morning</option>
                                            <option value='Evening'>Evening</option>
                                            <option value='Night'>Night</option>
                                        </select>
                                        <input type='date' value={form.shiftDate} onChange={e => set('shiftDate', e.target.value)} className={input} />
                                    </div>
                                </Field>
                            </div>
                        </Section>

                        <Section title='Physiological Vitals'>
                            <div className='grid grid-cols-3 gap-3'>
                                {[
                                    ['bloodPressure', 'BP (mmHg)', '120/80'],
                                    ['heartRate', 'Pulse (bpm)', '72'],
                                    ['temperature', 'Temp (°F)', '98.6'],
                                    ['respiratoryRate', 'Resp (bpm)', '16'],
                                    ['oxygenSaturation', 'SpO2 (%)', '98'],
                                    ['sugarLevel', 'Sugar (mg/dL)', '100'],
                                ].map(([key, label, ph]) => (
                                    <Field key={key} label={label}>
                                        <input value={form.vitalsAtHandoff[key]} onChange={e => setVital(key, e.target.value)}
                                            placeholder={ph} className={input} />
                                    </Field>
                                ))}
                            </div>
                        </Section>

                        <Section title='Medication Snapshot'>
                            <div className='space-y-3'>
                                {form.medicationSnapshot.map((med, idx) => (
                                    <div key={idx} className='flex items-end gap-3 bg-stone-50 p-3 rounded-xl border border-stone-100 group hover:border-blue-200 transition-colors'>
                                        <div className='flex-1 grid grid-cols-2 gap-2'>
                                            <Field label='Drug Name'>
                                                <input value={med.name} onChange={e => updateMed(idx, 'name', e.target.value)}
                                                    placeholder='e.g. Aspirin' className={input} />
                                            </Field>
                                            <Field label='Next Dose'>
                                                <input value={med.nextDose} onChange={e => updateMed(idx, 'nextDose', e.target.value)}
                                                    placeholder='e.g. 10:00 PM' className={input} />
                                            </Field>
                                        </div>
                                        <div className='pb-2'>
                                            <label className='flex items-center gap-2 cursor-pointer'>
                                                <input type='checkbox' checked={med.missedDose} onChange={e => updateMed(idx, 'missedDose', e.target.checked)}
                                                    className='w-4 h-4 accent-red-500' />
                                                <span className='text-[10px] font-bold text-stone-500 uppercase'>Missed</span>
                                            </label>
                                        </div>
                                        {form.medicationSnapshot.length > 1 && (
                                            <button type='button' onClick={() => removeMed(idx)} className='pb-2 text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100'>
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type='button' onClick={addMed} className='flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors'>
                                    <Plus size={14} /> Add Another Medication
                                </button>
                            </div>
                        </Section>

                        <Section title='Clinical Observations'>
                            <textarea required
                                value={form.notes}
                                onChange={e => set('notes', e.target.value)}
                                rows={3}
                                placeholder='Describe patient progress, concerns, or specific instructions...'
                                className={`${input} resize-none`}
                            />
                        </Section>
                    </form>

                    <div className='bg-stone-50 px-6 py-4 border-t border-stone-200 flex items-center justify-end gap-3'>
                        <button type='button' onClick={onClose} 
                            disabled={isSubmitting}
                            className='px-4 py-2 text-xs font-bold text-stone-400 uppercase tracking-widest hover:bg-stone-100 rounded-lg transition-colors disabled:opacity-50'>
                            Discard
                        </button>
                        <button type='submit' form='handoff-form' 
                            disabled={isSubmitting}
                            className='px-8 py-2.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:bg-stone-200 disabled:shadow-none flex items-center gap-2'>
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={14} className='animate-spin' /> Securing Records...
                                </>
                            ) : (
                                'Authorize Shift Handover'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

const input = 'w-full text-[11px] font-bold border border-stone-300 rounded-xl px-4 py-2.5 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all bg-white text-stone-800 placeholder:text-stone-300'
const Section = ({ title, children }) => (
    <div className='space-y-3'>
        <p className='text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] border-b border-stone-100 pb-2'>{title}</p>
        {children}
    </div>
)
const Field = ({ label, children }) => (
    <div className='flex flex-col gap-1.5'>
        <label className='text-[10px] font-bold text-stone-500 uppercase tracking-tight ml-1'>{label}</label>
        {children}
    </div>
)

export default CreateHandoffCard
