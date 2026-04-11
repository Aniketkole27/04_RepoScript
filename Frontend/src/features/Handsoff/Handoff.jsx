import React, { useMemo, useState } from 'react'
import Greeting from '../../shared/Greeting'
import HandoffFilter from './components/HandoffFilter'
import HandoffCard from './components/HandoffCard'
import HandoffDetailPanel from './components/HandoffDetailPanel'
import CreateHandoffCard from './components/CreateHandoffCard'
import { MOCK_HANDOFF_CARDS } from './handoffData'

const statusSummary = [
    { label: 'Critical', color: 'bg-red-100 text-red-700',     key: 'red'    },
    { label: 'Warning',  color: 'bg-amber-100 text-amber-700', key: 'yellow' },
    { label: 'Stable',   color: 'bg-green-100 text-green-700', key: 'green'  },
]

const Handoff = () => {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [selectedCard, setSelectedCard] = useState(null)

    const filtered = useMemo(() => {
        return MOCK_HANDOFF_CARDS.filter((card) => {
            const q = search.toLowerCase()
            const matchSearch =
                !search ||
                card.patientName.toLowerCase().includes(q) ||
                card.doctorName.toLowerCase().includes(q) ||
                card.ward.toLowerCase().includes(q)
            const matchStatus = statusFilter === 'all' || card.colorStatus === statusFilter
            return matchSearch && matchStatus
        })
    }, [search, statusFilter])

    const counts = useMemo(() => ({
        red:    MOCK_HANDOFF_CARDS.filter(c => c.colorStatus === 'red').length,
        yellow: MOCK_HANDOFF_CARDS.filter(c => c.colorStatus === 'yellow').length,
        green:  MOCK_HANDOFF_CARDS.filter(c => c.colorStatus === 'green').length,
    }), [])

    return (
        <div className='bg-white text-black rounded-lg pb-4 shadow h-full overflow-y-auto'>
            <Greeting />

            {/* Summary strip */}
            <div className='px-4 mb-1 flex flex-wrap gap-2'>
                {statusSummary.map(s => (
                    <span key={s.key} className={`text-xs font-semibold px-3 py-1 rounded-full ${s.color}`}>
                        {s.label}: {counts[s.key]}
                    </span>
                ))}
                <span className='text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-600'>
                    Total: {MOCK_HANDOFF_CARDS.length}
                </span>
            </div>

            <HandoffFilter
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                onCreateCard={() => alert('Create Card — modal coming soon!')}
            />

            {/* Cards Grid */}
            {filtered.length > 0 ? (
                <div className='px-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {filtered.map(card => (
                        <HandoffCard
                            key={card.id}
                            card={card}
                            onClick={setSelectedCard}
                            isSelected={selectedCard?.id === card.id}
                        />
                    ))}
                </div>
            ) : (
                <div className='py-16 text-center text-sm text-stone-400'>
                    No handoff cards match your filters.
                </div>
            )}

            {/* Right-side Detail Panel */}
            <HandoffDetailPanel
                card={selectedCard}
                onClose={() => setSelectedCard(null)}
            />
        </div>
    )
}

export default Handoff
