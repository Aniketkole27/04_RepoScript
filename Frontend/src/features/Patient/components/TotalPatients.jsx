import React, { useMemo } from 'react'
import { User, Bed, Stethoscope, CalendarDays, Phone } from 'lucide-react'

// Mock patient data — replace with API/Redux data later
const MOCK_PATIENTS = [
    { id: 'P001', name: 'Ravi Sharma',      age: 42, gender: 'Male',   ward: 'general',    doctor: 'Dr. Mehta',   phone: '9876543210', admittedOn: '2026-04-08', status: 'admitted' },
    { id: 'P002', name: 'Sunita Patil',     age: 35, gender: 'Female', ward: 'maternity',  doctor: 'Dr. Joshi',   phone: '9123456780', admittedOn: '2026-04-09', status: 'admitted' },
    { id: 'P003', name: 'Arjun Desai',      age: 67, gender: 'Male',   ward: 'icu',        doctor: 'Dr. Kulkarni',phone: '9001234567', admittedOn: '2026-04-07', status: 'critical' },
    { id: 'P004', name: 'Priya Nair',       age: 28, gender: 'Female', ward: 'pediatrics', doctor: 'Dr. Reddy',   phone: '9988776655', admittedOn: '2026-04-06', status: 'discharged' },
    { id: 'P005', name: 'Mohammed Khan',    age: 55, gender: 'Male',   ward: 'general',    doctor: 'Dr. Mehta',   phone: '9871234560', admittedOn: '2026-04-10', status: 'observation' },
    { id: 'P006', name: 'Kavya Iyer',       age: 19, gender: 'Female', ward: 'emergency',  doctor: 'Dr. Singh',   phone: '9765432100', admittedOn: '2026-04-11', status: 'critical' },
    { id: 'P007', name: 'Deepak Verma',     age: 48, gender: 'Male',   ward: 'general',    doctor: 'Dr. Joshi',   phone: '9654321000', admittedOn: '2026-04-05', status: 'discharged' },
]

const statusStyles = {
    admitted:    { bg: 'bg-blue-50',   text: 'text-blue-700',   label: 'Admitted'     },
    discharged:  { bg: 'bg-green-50',  text: 'text-green-700',  label: 'Discharged'   },
    critical:    { bg: 'bg-red-50',    text: 'text-red-700',    label: 'Critical'     },
    observation: { bg: 'bg-amber-50',  text: 'text-amber-700',  label: 'Observation'  },
}

const TotalPatients = ({ search = '', status = 'all', ward = 'all' }) => {
    const filtered = useMemo(() => {
        return MOCK_PATIENTS.filter((p) => {
            const matchesSearch =
                !search ||
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.id.toLowerCase().includes(search.toLowerCase())
            const matchesStatus = status === 'all' || p.status === status
            const matchesWard   = ward   === 'all' || p.ward   === ward
            return matchesSearch && matchesStatus && matchesWard
        })
    }, [search, status, ward])

    return (
        <div className='border rounded border-stone-300 mx-4 mt-2 mb-4 overflow-hidden shadow-sm'>
            {/* Table Header */}
            <div className='grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_1fr_1fr] items-center px-4 py-2.5 bg-stone-50 border-b border-stone-200 text-xs font-semibold text-stone-500 uppercase tracking-wide'>
                <span className='flex items-center gap-1.5'><User size={12} /> Patient</span>
                <span>Age / Gender</span>
                <span className='flex items-center gap-1.5'><Bed size={12} /> Ward</span>
                <span className='flex items-center gap-1.5'><Stethoscope size={12} /> Doctor</span>
                <span className='flex items-center gap-1.5'><Phone size={12} /> Phone</span>
                <span className='flex items-center gap-1.5'><CalendarDays size={12} /> Admitted</span>
                <span>Status</span>
            </div>

            {/* Rows */}
            {filtered.length > 0 ? (
                filtered.map((patient, idx) => {
                    const s = statusStyles[patient.status] ?? { bg: 'bg-stone-100', text: 'text-stone-700', label: patient.status }
                    return (
                        <div
                            key={patient.id}
                            className={`grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_1fr_1fr] items-center px-4 py-3 text-sm border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'}`}
                        >
                            {/* Patient Name + ID */}
                            <div>
                                <p className='font-medium text-stone-800'>{patient.name}</p>
                                <p className='text-xs text-stone-400 mt-0.5'>{patient.id}</p>
                            </div>

                            {/* Age/Gender */}
                            <span className='text-stone-600'>{patient.age} / {patient.gender}</span>

                            {/* Ward */}
                            <span className='capitalize text-stone-600'>{patient.ward}</span>

                            {/* Doctor */}
                            <span className='text-stone-600'>{patient.doctor}</span>

                            {/* Phone */}
                            <span className='text-stone-500 text-xs'>{patient.phone}</span>

                            {/* Admitted On */}
                            <span className='text-stone-500 text-xs'>{patient.admittedOn}</span>

                            {/* Status Badge */}
                            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full w-fit ${s.bg} ${s.text}`}>
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