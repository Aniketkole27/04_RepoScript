import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HandoffFilter from './components/HandoffFilter'
import PatientList from './components/PatientList'
import PatientDetailView from './components/PatientDetailView'
import HandoffDetailPanel from './components/HandoffDetailPanel'
import CreateHandoffCard from './components/CreateHandoffCard'
import { Loader2 } from 'lucide-react'

const Handoff = () => {
    const location = useLocation()
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedPatientData, setSelectedPatientData] = useState(null)
    
    const [search, setSearch] = useState('')
    const [wardFilter, setWardFilter] = useState('all')
    const [selectedPatientId, setSelectedPatientId] = useState(location.state?.autoSelectId || null)
    
    const [selectedCard, setSelectedCard] = useState(null)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [cardTemplate, setCardTemplate] = useState(null)

    // 1. Fetch Overview Patient List
    useEffect(() => {
        const fetchOverview = async () => {
            try {
                setLoading(true)
                const response = await fetch('http://localhost:5000/api/patients')
                const data = await response.json()
                if (data.success) {
                    setPatients(data.data)
                }
            } catch (error) {
                console.error("Handoff overview fetch failed:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchOverview()
    }, [])

    // 2. Fetch Detailed History when patient selected
    useEffect(() => {
        if (!selectedPatientId) {
            setSelectedPatientData(null)
            return
        }

        const fetchHistory = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/patients/${selectedPatientId}/history`)
                const data = await response.json()
                if (data.success) {
                    setSelectedPatientData(data.data)
                }
            } catch (error) {
                console.error("History fetch failed:", error)
            }
        }
        fetchHistory()
    }, [selectedPatientId])

    // Filtering Logic
    const filteredPatients = patients.filter(p => {
        const q = search.toLowerCase()
        const matchSearch = !search || p.name.toLowerCase().includes(q) || p.patientId.toLowerCase().includes(q)
        const matchWard = wardFilter === 'all' || 
                          p.currentWard?.name?.toLowerCase().includes(wardFilter.toLowerCase())
        return matchSearch && matchWard
    })

    const handleCreateCard = async (newCardData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/patients/${selectedPatientId}/handoff`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCardData)
            })
            const data = await response.json()
            
            if (data.success) {
                // Refresh history
                const resHistory = await fetch(`http://localhost:5000/api/patients/${selectedPatientId}/history`)
                const historyData = await resHistory.json()
                if (historyData.success) setSelectedPatientData(historyData.data)
                
                setIsCreateOpen(false)
                setSelectedCard(null)
            } else {
                console.error("Handoff validation failed:", data.message)
                alert(`Error: ${data.message || 'Validation failed'}`)
            }
        } catch (error) {
            console.error("Network or catch-all failure:", error)
        }
    }

    return (
        <div className='bg-white text-black rounded-lg pb-4 shadow h-full overflow-y-auto flex flex-col'>
            {loading ? (
                <div className='flex-1 flex flex-col items-center justify-center text-stone-400 py-20'>
                    <Loader2 className='animate-spin mb-2' size={32} />
                    <p className='text-xs font-bold uppercase tracking-widest'>Syncing Handoff Registry...</p>
                </div>
            ) : selectedPatientId ? (
                <PatientDetailView 
                    patient={selectedPatientData}
                    onBack={() => setSelectedPatientId(null)}
                    onCreateTask={() => {
                        setCardTemplate({
                            patientName: selectedPatientData?.name || '',
                            patientId: selectedPatientData?.patientId,
                            ward: selectedPatientData?.currentWard?._id,
                            bed: selectedPatientData?.bedNumber,
                        })
                        setIsCreateOpen(true)
                    }}
                    onSelectCard={setSelectedCard}
                    selectedCardId={selectedCard?._id}
                />
            ) : (
                <>
                    <HandoffFilter
                        search={search}
                        setSearch={setSearch}
                        wardFilter={wardFilter}
                        setWardFilter={setWardFilter}
                    />
                    <PatientList 
                        patients={filteredPatients} 
                        onSelectPatient={setSelectedPatientId} 
                    />
                </>
            )}

            <HandoffDetailPanel
                card={selectedCard}
                onClose={() => setSelectedCard(null)}
            />

            <CreateHandoffCard
                open={isCreateOpen}
                onClose={() => {
                    setIsCreateOpen(false)
                    setCardTemplate(null)
                }}
                initialData={cardTemplate}
                onSubmit={handleCreateCard}
            />
        </div>
    )
}

export default Handoff
