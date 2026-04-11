import React, { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'

const EMPTY_MED = { name: '', nextDose: '', missedDose: false }

const INITIAL_FORM = {
    patientName: '',
    patientId: '',
    ward: 'general',
    bed: '',
    doctorName: '',
    nurseName: '',
    shift: 'Morning',
    shiftTime: '',
    shiftDate: '',
    colorStatus: 'green',
    vitals: {
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        respiratoryRate: '',
        oxygenSaturation: '',
        sugarLevel: '',
    },
    medications: [{ ...EMPTY_MED }],
    medicationStartDate: '',
    pendingActions: [''],
    notes: '',
}

const CreateHandoffCard = ({ open, onClose, onSubmit, initialData }) => {
    const [form, setForm] = useState({ ...INITIAL_FORM, ...initialData })

    // Reset form when modal opens with new data or for a fresh creation
    React.useEffect(() => {
        if (open) {
            setForm({ ...INITIAL_FORM, ...initialData })
        }
    }, [open, initialData])

    if (!open) return null

    // Generic field updater
    const set = (field, value) => setForm(f => ({ ...f, [field]: value }))
    const setVital = (field, value) => setForm(f => ({ ...f, vitals: { ...f.vitals, [field]: value } }))

    // Medication helpers
    const updateMed = (idx, field, value) =>
        setForm(f => {
            const meds = [...f.medications]
            meds[idx] = { ...meds[idx], [field]: value }
            return { ...f, medications: meds }
        })
    const addMed = () => setForm(f => ({ ...f, medications: [...f.medications, { ...EMPTY_MED }] }))
    const removeMed = (idx) => setForm(f => ({ ...f, medications: f.medications.filter((_, i) => i !== idx) }))

    // Pending actions helpers
    const updateAction = (idx, value) =>
        setForm(f => {
            const actions = [...f.pendingActions]
            actions[idx] = value
            return { ...f, pendingActions: actions }
        })
    const addAction = () => setForm(f => ({ ...f, pendingActions: [...f.pendingActions, ''] }))
    const removeAction = (idx) => setForm(f => ({ ...f, pendingActions: f.pendingActions.filter((_, i) => i !== idx) }))

    const handleSubmit = (e) => {
        e.preventDefault()
        const result = {
            ...form,
            id: initialData?.id ? initialData.id : `H${Date.now()}`,
            medications: form.medications.filter(m => m.name.trim()),
            pendingActions: form.pendingActions.filter(a => a.trim()),
        }
        onSubmit(result)
        onClose()
    }

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className='fixed inset-0 bg-black/30 z-30'
            />

            {/* Modal */}
            <div className='fixed inset-0 z-40 flex items-center justify-center p-4'>
                <div
                    className='bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col'
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className='flex items-center justify-between px-6 py-4 border-b border-stone-200'>
                        <div>
                            <h2 className='text-sm font-bold text-stone-800'>{initialData ? 'Update Handoff Card' : 'Create Handoff Card'}</h2>
                            <p className='text-xs text-stone-400 mt-0.5'>Fill in the patient shift handoff details</p>
                        </div>
                        <button
                            type='button'
                            onClick={onClose}
                            className='p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer'
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Scrollable Form */}
                    <form id='handoff-form' onSubmit={handleSubmit} className='flex-1 overflow-y-auto px-6 py-5 space-y-5'>

                        {/* ─── Patient Info ─── */}
                        <Section title='Patient Information'>
                            <div className='grid grid-cols-2 gap-3'>
                                <Field label='Patient Name *'>
                                    <input required value={form.patientName} onChange={e => set('patientName', e.target.value)}
                                        placeholder='e.g. Ravi Sharma' className={input} />
                                </Field>
                                <Field label='Patient ID *'>
                                    <input required value={form.patientId} onChange={e => set('patientId', e.target.value)}
                                        placeholder='e.g. P001' className={input} />
                                </Field>
                                <Field label='Ward *'>
                                    <select required value={form.ward} onChange={e => set('ward', e.target.value)} className={input}>
                                        <option value='general'>General Ward</option>
                                        <option value='icu'>ICU</option>
                                        <option value='pediatrics'>Pediatrics</option>
                                        <option value='maternity'>Maternity</option>
                                        <option value='emergency'>Emergency</option>
                                    </select>
                                </Field>
                                <Field label='Bed Number *'>
                                    <input required value={form.bed} onChange={e => set('bed', e.target.value)}
                                        placeholder='e.g. Bed 12A' className={input} />
                                </Field>
                            </div>
                        </Section>

                        {/* ─── Shift Info ─── */}
                        <Section title='Shift Details'>
                            <div className='grid grid-cols-2 gap-3'>
                                <Field label='Doctor Name *'>
                                    <input required value={form.doctorName} onChange={e => set('doctorName', e.target.value)}
                                        placeholder='e.g. Dr. Mehta' className={input} />
                                </Field>
                                <Field label='Nurse Name *'>
                                    <input required value={form.nurseName} onChange={e => set('nurseName', e.target.value)}
                                        placeholder='e.g. Nurse Anjali' className={input} />
                                </Field>
                                <Field label='Shift *'>
                                    <select required value={form.shift} onChange={e => set('shift', e.target.value)} className={input}>
                                        <option value='Morning'>Morning</option>
                                        <option value='Evening'>Evening</option>
                                        <option value='Night'>Night</option>
                                    </select>
                                </Field>
                                <Field label='Shift Time *'>
                                    <input required value={form.shiftTime} onChange={e => set('shiftTime', e.target.value)}
                                        placeholder='e.g. 8:00 AM – 4:00 PM' className={input} />
                                </Field>
                                <Field label='Shift Date *'>
                                    <input required type='date' value={form.shiftDate} onChange={e => set('shiftDate', e.target.value)} className={input} />
                                </Field>
                                <Field label='Color Status *'>
                                    <select required value={form.colorStatus} onChange={e => set('colorStatus', e.target.value)} className={input}>
                                        <option value='green'>🟢 Stable</option>
                                        <option value='yellow'>🟡 Warning</option>
                                        <option value='red'>🔴 Critical</option>
                                    </select>
                                </Field>
                            </div>
                        </Section>

                        {/* ─── Vitals ─── */}
                        <Section title='Vitals'>
                            <div className='grid grid-cols-2 gap-3'>
                                {[
                                    ['bloodPressure', 'Blood Pressure', 'e.g. 120/80 mmHg'],
                                    ['heartRate', 'Heart Rate', 'e.g. 72 bpm'],
                                    ['temperature', 'Temperature', 'e.g. 98.6°F'],
                                    ['respiratoryRate', 'Respiratory Rate', 'e.g. 16 breaths/min'],
                                    ['oxygenSaturation', 'O₂ Saturation', 'e.g. 98%'],
                                    ['sugarLevel', 'Sugar Level', 'e.g. 90 mg/dL'],
                                ].map(([key, label, ph]) => (
                                    <Field key={key} label={label}>
                                        <input value={form.vitals[key]} onChange={e => setVital(key, e.target.value)}
                                            placeholder={ph} className={input} />
                                    </Field>
                                ))}
                            </div>
                        </Section>

                        {/* ─── Medications ─── */}
                        <Section title='Medications'>
                            <div className='space-y-2'>
                                {form.medications.map((med, idx) => (
                                    <div key={idx} className='grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-end'>
                                        <Field label={idx === 0 ? 'Medication Name' : ''}>
                                            <input value={med.name} onChange={e => updateMed(idx, 'name', e.target.value)}
                                                placeholder='e.g. Metformin 500mg' className={input} />
                                        </Field>
                                        <Field label={idx === 0 ? 'Next Dose' : ''}>
                                            <input value={med.nextDose} onChange={e => updateMed(idx, 'nextDose', e.target.value)}
                                                placeholder='e.g. 12:00 PM' className={input} />
                                        </Field>
                                        <div className={idx === 0 ? 'pt-5' : ''}>
                                            <label className='flex items-center gap-1.5 cursor-pointer'>
                                                <input type='checkbox' checked={med.missedDose} onChange={e => updateMed(idx, 'missedDose', e.target.checked)}
                                                    className='accent-red-500' />
                                                <span className='text-xs text-stone-600'>Missed</span>
                                            </label>
                                        </div>
                                        {form.medications.length > 1 && (
                                            <button type='button' onClick={() => removeMed(idx)}
                                                className={`text-red-400 hover:text-red-600 cursor-pointer ${idx === 0 ? 'pt-5' : ''}`}>
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <Field label='Medication Start Date'>
                                    <input type='date' value={form.medicationStartDate} onChange={e => set('medicationStartDate', e.target.value)} className={input} />
                                </Field>
                            </div>
                            <button type='button' onClick={addMed}
                                className='mt-2 flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer'>
                                <Plus size={13} /> Add Medication
                            </button>
                        </Section>

                        {/* ─── Pending Actions ─── */}
                        <Section title='Pending Actions'>
                            <div className='space-y-2'>
                                {form.pendingActions.map((action, idx) => (
                                    <div key={idx} className='flex items-center gap-2'>
                                        <input value={action} onChange={e => updateAction(idx, e.target.value)}
                                            placeholder='e.g. Blood culture report pending'
                                            className={`${input} flex-1`} />
                                        {form.pendingActions.length > 1 && (
                                            <button type='button' onClick={() => removeAction(idx)}
                                                className='text-red-400 hover:text-red-600 cursor-pointer'>
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button type='button' onClick={addAction}
                                className='mt-2 flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer'>
                                <Plus size={13} /> Add Action
                            </button>
                        </Section>

                        {/* ─── Notes ─── */}
                        <Section title='Clinician Notes'>
                            <textarea
                                value={form.notes}
                                onChange={e => set('notes', e.target.value)}
                                rows={3}
                                placeholder='Enter any additional notes for the incoming clinician...'
                                className={`${input} resize-none w-full`}
                            />
                        </Section>
                    </form>

                    {/* Footer */}
                    <div className='flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-200'>
                        <button type='button' onClick={onClose}
                            className='px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer'>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            form='handoff-form'
                            onClick={handleSubmit}
                            className='px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer shadow-sm'
                        >
                            {initialData ? 'Update Card' : 'Create Card'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

// Helpers
const input = 'w-full text-sm border border-stone-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all bg-white text-stone-800 placeholder:text-stone-400'

const Section = ({ title, children }) => (
    <div>
        <p className='text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3 pb-1 border-b border-stone-100'>{title}</p>
        {children}
    </div>
)

const Field = ({ label, children }) => (
    <div className='flex flex-col gap-1'>
        {label && <label className='text-xs font-medium text-stone-600'>{label}</label>}
        {children}
    </div>
)

export default CreateHandoffCard
