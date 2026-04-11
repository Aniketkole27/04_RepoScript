import React, { useState, useEffect } from 'react'
import WardData from './components/WardData'
import WardFilter from './components/WardFilter'
import WardList from './components/WardList'
import WardDetailModal from './components/WardDetailModal'
import ManageWardModal from './components/ManageWardModal'
import { Loader2 } from 'lucide-react'

const Wards = () => {
    const [wards, setWards] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [open, setOpen] = useState(false)
    const [selectedWard, setSelectedWard] = useState(null)

    useEffect(() => {
        const fetchWards = async () => {
            try {
                setLoading(true)
                const response = await fetch('http://localhost:5000/api/wards')
                const data = await response.json()
                if (data.success) {
                    setWards(data.data)
                }
            } catch (error) {
                console.error("Ward fetch failed:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchWards()
    }, [])

    const filteredWards = wards.filter(ward => {
        const matchesSearch = ward.name.toLowerCase().includes(search.toLowerCase()) ||
            ward.location.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'all' || ward.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className='bg-white text-black rounded-lg pb-3 shadow h-full overflow-y-auto'>

            <WardData wards={wards} loading={loading} />

            <WardFilter
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                setOpen={setOpen}
            />

            {loading ? (
                <div className='flex flex-col items-center justify-center py-20 text-stone-400'>
                    <Loader2 className='animate-spin mb-2' size={32} />
                    <p className='text-xs font-bold uppercase tracking-widest'>Syncing Care Facilities...</p>
                </div>
            ) : (
                <WardList
                    wards={filteredWards}
                    onWardClick={setSelectedWard}
                />
            )}

            {/* Modals */}
            {selectedWard && (
                <WardDetailModal
                    wardId={selectedWard._id}
                    onClose={() => setSelectedWard(null)}
                />
            )}

            {open && (
                <ManageWardModal
                    onClose={() => setOpen(false)}
                    onSuccess={() => {
                        // Re-fetch wards after creation
                        setLoading(true)
                        fetch('http://localhost:5000/api/wards')
                            .then(res => res.json())
                            .then(data => { if (data.success) setWards(data.data) })
                            .finally(() => setLoading(false))
                    }}
                />
            )}
        </div>
    )
}

export default Wards
