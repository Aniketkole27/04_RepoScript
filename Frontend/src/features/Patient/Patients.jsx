import PatientData from './components/PatientData'
import FilterSection from './components/FilterSection'
import TotalPatients from './components/TotalPatients'
import { useState, useEffect } from "react"

const Patients = () => {
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')
    const [ward, setWard] = useState('all')

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

    return (
        <div className='bg-white text-black rounded-lg pb-3 shadow h-full overflow-y-auto'>
            <PatientData patients={patients} loading={loading} />
            <FilterSection
                setOpen={setOpen}
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                ward={ward}
                setWard={setWard}
            />
            <TotalPatients
                patients={patients}
                loading={loading}
                search={search}
                status={status}
                ward={ward}
            />
            {/* {open ? <CreatePatient open={open} setOpen={setOpen} /> : null} */}
        </div>
    )
}

export default Patients
