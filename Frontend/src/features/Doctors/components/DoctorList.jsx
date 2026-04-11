import React, { useMemo } from 'react'
import { User, Briefcase, Phone, Mail, Award, Clock } from 'lucide-react'

const MOCK_DOCTORS = [
    { id: 'D001', name: 'Dr. Rahul Mehta', specialty: 'Cardiologist', department: 'cardiology', phone: '9876543201', email: 'rahul.mehta@hospital.com', availability: 'Available', shift: 'Morning' },
    { id: 'D002', name: 'Dr. Sneha Joshi', specialty: 'Pediatrician', department: 'pediatrics', phone: '9876543202', email: 'sneha.joshi@hospital.com', availability: 'On Duty', shift: 'Morning' },
    { id: 'D003', name: 'Dr. Amit Kulkarni', specialty: 'Neurologist', department: 'neurology', phone: '9876543203', email: 'amit.kulkarni@hospital.com', availability: 'Available', shift: 'Evening' },
    { id: 'D004', name: 'Dr. Priya Reddy', specialty: 'Orthopedic', department: 'orthopedics', phone: '9876543204', email: 'priya.reddy@hospital.com', availability: 'On Leave', shift: 'Morning' },
    { id: 'D005', name: 'Dr. Vikram Singh', specialty: 'ER Specialist', department: 'emergency', phone: '9876543205', email: 'vikram.singh@hospital.com', availability: 'On Duty', shift: 'Night' },
]

const availabilityStyles = {
    'Available': { bg: 'bg-green-50', text: 'text-green-700' },
    'On Duty': { bg: 'bg-blue-50', text: 'text-blue-700' },
    'On Leave': { bg: 'bg-red-50', text: 'text-red-700' },
}

const DoctorList = ({ search = '', department = 'all' }) => {
    const filtered = useMemo(() => {
        return MOCK_DOCTORS.filter((d) => {
            const q = search.toLowerCase()
            const matchSearch = !search || d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.id.toLowerCase().includes(q)
            const matchDept = department === 'all' || d.department === department
            return matchSearch && matchDept
        })
    }, [search, department])

    return (
        <div className='border rounded border-stone-300 mx-4 mt-2 mb-4 overflow-hidden shadow-sm'>
            <div className='grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_1fr] items-center px-4 py-2.5 bg-stone-50 border-b border-stone-200 text-xs font-semibold text-stone-500 uppercase tracking-wide'>
                <span className='flex items-center gap-1.5'><User size={12} /> Doctor</span>
                <span className='flex items-center gap-1.5'><Award size={12} /> Specialty</span>
                <span className='flex items-center gap-1.5'><Phone size={12} /> Contact</span>
                <span className='flex items-center gap-1.5'><Mail size={12} /> Email</span>
                <span className='flex items-center gap-1.5'><Clock size={12} /> Shift</span>
                <span>Status</span>
            </div>

            {filtered.length > 0 ? (
                filtered.map((doctor, idx) => {
                    const s = availabilityStyles[doctor.availability] || { bg: 'bg-stone-100', text: 'text-stone-700' }
                    return (
                        <div
                            key={doctor.id}
                            className={`grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr_1fr] items-center px-4 py-3 text-sm border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/40'}`}
                        >
                            <div>
                                <p className='font-medium text-stone-800'>{doctor.name}</p>
                                <p className='text-xs text-stone-400 mt-0.5'>{doctor.id}</p>
                            </div>
                            <span className='text-stone-600'>{doctor.specialty}</span>
                            <span className='text-stone-500 text-xs'>{doctor.phone}</span>
                            <span className='text-stone-500 text-xs truncate mr-2'>{doctor.email}</span>
                            <span className='text-stone-600'>{doctor.shift}</span>
                            <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full w-fit ${s.bg} ${s.text}`}>
                                {doctor.availability}
                            </span>
                        </div>
                    )
                })
            ) : (
                <div className='py-12 text-center text-sm text-stone-400'>
                    No doctors found matching your filters.
                </div>
            )}
        </div>
    )
}

export default DoctorList
