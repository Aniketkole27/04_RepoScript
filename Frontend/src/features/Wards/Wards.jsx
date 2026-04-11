import React, { useState } from 'react'
import Greeting from '../../shared/Greeting'
import WardData from './components/WardData'
import WardFilter from './components/WardFilter'
import WardList from './components/WardList'
import WardDetailModal from './components/WardDetailModal'
import ManageWardModal from './components/ManageWardModal'

const Wards = () => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [open, setOpen] = useState(false)
    const [selectedWard, setSelectedWard] = useState(null)

    return (
        <div className='bg-white text-black rounded-lg pb-3 shadow h-full overflow-y-auto'>
            <Greeting />
            <WardData />
            <WardFilter
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                setOpen={setOpen}
            />
            <WardList 
                search={search} 
                category={category} 
                onWardClick={setSelectedWard}
            />

            {/* Modals */}
            {selectedWard && (
                <WardDetailModal 
                    ward={selectedWard} 
                    onClose={() => setSelectedWard(null)} 
                />
            )}

            {open && (
                <ManageWardModal 
                    onClose={() => setOpen(false)} 
                />
            )}
        </div>
    )
}

export default Wards
