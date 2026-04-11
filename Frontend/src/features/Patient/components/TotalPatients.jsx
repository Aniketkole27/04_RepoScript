import React, { useMemo, useState, useEffect } from 'react'
import { User, Bed, Stethoscope, CalendarDays, Phone, Loader2 } from 'lucide-react'

const conditionStyles = {
    'Stable': { bg: 'bg-green-50', text: 'text-green-700', label: 'Stable' },
    'Recovering': { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Recovering' },
    'Critical': { bg: 'bg-red-50', text: 'text-red-700', label: 'Critical' },
    'Warning': { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Warning' },
}

const TotalPatients = ({ search = '', status = 'all', ward = 'all' }) => {
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/patients')
                const data = await response.json()
                if (data.success) {
                    setPatients(data.data)
                }
            } catch (error) {
                console.error("Failed to fetch patients:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPatients()
    }, [])

    const filtered = useMemo(() => {
        return patients.filter((p) => {
            const matchesSearch =
                !search ||
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.patientId.toLowerCase().includes(search.toLowerCase())
            
            // Note: UI uses 'status', backend uses 'condition'
            const matchesStatus = status === 'all' || p.condition.toLowerCase() === status.toLowerCase()
            
            // Check ward name or ID
            const matchesWard = ward === 'all' || 
                              (p.currentWard?.name?.toLowerCase() === ward.toLowerCase()) ||
                              (p.currentWard?._id === ward)
            
            return matchesSearch && matchesStatus && matchesWard
        })
    }, [patients, search, status, ward])

    if (loading) {
        return (
            <div className='py-20 flex flex-col items-center justify-center text-stone-400'>
                <Loader2 className='animate-spin mb-2' size={24} />
                <p className='text-xs font-semibold uppercase tracking-widest'>Syncing Patient Records...</p>
            </div>
        )
    }

    return (
        <div className='border rounded border-stone-300 mx-4 mt-2 mb-4 overflow-hidden shadow-sm'>
            {/* Table Header */}
            <div className='grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr_1fr] items-center px-4 py-2.5 bg-stone-50 border-b border-stone-200 text-xs font-semibold text-stone-500 uppercase tracking-wide'>
                <span className='flex items-center gap-1.5'><User size={12} /> Patient</span>
                <span>Age / Gender</span>
                <span className='flex items-center gap-1.5'><Bed size={12} /> Ward</span>
                <span className='flex items-center gap-1.5'><Stethoscope size={12} /> Doctor</span>
                <span className='flex items-center gap-1.5'><CalendarDays size={12} /> Admitted</span>
                <span>Condition</span>
            </div>

            {/* Rows */}
            {filtered.length > 0 ? (
                filtered.map((patient, idx) => {
                    const s = conditionStyles[patient.condition] ?? { bg: 'bg-stone-100', text: 'text-stone-700', label: patient.condition }
                    return (
                        <div
                            key={patient._id}
                            className={`grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1fr_1fr] items-center px-4 py-3 text-sm border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'}`}
                        >
                            {/* Patient Name + ID */}
                            <div>
                                <p className='font-medium text-stone-800'>{patient.name}</p>
                                <p className='text-[10px] text-stone-400 font-bold uppercase tracking-tight mt-0.5'>{patient.patientId} &middot; {patient.bedNumber}</p>
                            </div>

                            {/* Age/Gender */}
                            <span className='text-stone-600'>{patient.age} / {patient.gender}</span>

                            {/* Ward */}
                            <span className='text-stone-600 font-medium'>{patient.currentWard?.name || 'Unassigned'}</span>

                            {/* Doctor */}
                            <span className='text-stone-600'>{patient.primaryDoctor?.name || 'N/A'}</span>

                            {/* Admitted On */}
                            <span className='text-stone-500 text-xs'>
                                {new Date(patient.admissionDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                            </span>

                            {/* Status Badge */}
                            <span className={`inline-flex items-center justify-center text-[10px] font-bold uppercase tracking-tighter px-3 py-1 rounded-lg w-fit ${s.bg} ${s.text} border border-current opacity-80`}>
                                {s.label}
                            </span>
                        </div>
                    )
                })
            ) : (
                <div className='py-12 text-center text-sm text-stone-400'>
                    No patients found matching your filters.
                </div>
            )}
        </div>
    )
}

export default TotalPatients