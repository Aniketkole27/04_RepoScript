import React, { useMemo, useState } from 'react'
import Greeting from '../../shared/Greeting'
import HandoffFilter from './components/HandoffFilter'
import PatientList from './components/PatientList'
import PatientDetailView from './components/PatientDetailView'
import HandoffDetailPanel from './components/HandoffDetailPanel'
import CreateHandoffCard from './components/CreateHandoffCard'
import { MOCK_HANDOFF_CARDS } from './handoffData'

const Handoff = () => {
  const [cards, setCards] = useState(MOCK_HANDOFF_CARDS)
  const [search, setSearch] = useState('')
  const [wardFilter, setWardFilter] = useState('all')
  const [selectedPatientId, setSelectedPatientId] = useState(null)
  
  const [selectedCard, setSelectedCard] = useState(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [cardTemplate, setCardTemplate] = useState(null)

  // Derive unique patients and their latest status
  const patientList = useMemo(() => {
    const patientsMap = {}
    
    // Sort cards to find the latest info for Each patient
    const sortedCards = [...cards].sort((a, b) => new Date(b.shiftDate) - new Date(a.shiftDate))
    
    sortedCards.forEach(card => {
        if (!patientsMap[card.patientId]) {
            patientsMap[card.patientId] = {
                patientId: card.patientId,
                patientName: card.patientName,
                lastWard: card.ward,
                lastBed: card.bed,
                latestStatus: card.colorStatus,
                latestDate: card.shiftDate
            }
        }
    })

    return Object.values(patientsMap).filter(p => {
        const q = search.toLowerCase()
        const matchSearch = !search || p.patientName.toLowerCase().includes(q) || p.patientId.toLowerCase().includes(q)
        const matchWard = wardFilter === 'all' || p.lastWard.toLowerCase().includes(wardFilter.toLowerCase())
        return matchSearch && matchWard
    })
  }, [cards, search, wardFilter])

  const handleCreateCard = (newCard) => {
    setCards(prev => [newCard, ...prev])
    setIsCreateOpen(false)
    setCardTemplate(null)
  }

  return (
    <div className='bg-white text-black rounded-lg pb-4 shadow h-full overflow-y-auto flex flex-col'>
      <Greeting />

      {selectedPatientId ? (
        <PatientDetailView 
          patientId={selectedPatientId}
          cards={cards}
          onBack={() => setSelectedPatientId(null)}
          onCreateTask={() => {
              const latestInfo = cards.find(c => c.patientId === selectedPatientId)
              setCardTemplate({
                  patientName: latestInfo?.patientName || '',
                  patientId: selectedPatientId,
                  ward: latestInfo?.ward || '',
                  bed: latestInfo?.bed || '',
                  shiftDate: new Date().toISOString().split('T')[0] // Default to today
              })
              setIsCreateOpen(true)
          }}
          onSelectCard={setSelectedCard}
          selectedCardId={selectedCard?.id}
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
                patients={patientList} 
                onSelectPatient={setSelectedPatientId} 
            />
        </>
      )}

      {/* Detail Panel */}
      <HandoffDetailPanel
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
      />

      {/* Create Modal */}
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
