import React, { useState } from 'react'
import Greeting from '../../shared/Greeting'
import PatientData from './components/PatientData'
import FilterSection from './components/FilterSection'
import TotalPatients from './components/TotalPatients'

const Patients = () => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')
    const [ward, setWard] = useState('all')

    return (
        <div className='bg-white text-black rounded-lg pb-3 shadow h-full overflow-y-auto'>
            <Greeting />
            <PatientData />
            <FilterSection
                setOpen={setOpen}
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                ward={ward}
                setWard={setWard}
            />
            <TotalPatients search={search} status={status} ward={ward} />
            {/* {open ? <CreatePatient open={open} setOpen={setOpen} /> : null} */}
        </div>
    )
}

export default Patients
