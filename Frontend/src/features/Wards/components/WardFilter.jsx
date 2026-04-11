import React from 'react'
import { Search, Filter, Warehouse } from 'lucide-react'

const WardFilter = ({ search, setSearch, category, setCategory, setOpen }) => {
    return (
        <div className='px-4 mt-4 mb-3 flex flex-wrap items-center gap-3'>

            {/* Search Bar */}
            <div className='flex-1 min-w-[180px] flex items-center gap-2 border border-stone-300 rounded px-3 py-2 shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-200 transition-all'>
                <Search size={15} className='text-stone-400 shrink-0' />
                <input
                    type='text'
                    placeholder='Search wards by name or location...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full text-sm outline-none bg-transparent placeholder:text-stone-400 text-stone-800'
                />
            </div>

            {/* Category Filter */}
            <div className='flex items-center gap-2 border border-stone-300 rounded px-3 py-2 shadow-sm bg-white'>
                <Filter size={14} className='text-stone-400 shrink-0' />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='text-sm outline-none bg-transparent text-stone-700 cursor-pointer'
                >
                    <option value="all">All Categories</option>
                    <option value="general">General</option>
                    <option value="critical">Critical Care</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="maternity">Maternity</option>
                    <option value="emergency">Emergency</option>
                </select>
            </div>

            {/* Add Ward Button */}
            <button
                type='button'
                onClick={() => setOpen(true)}
                className='flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-sm cursor-pointer transition-colors'
            >
                <Warehouse size={15} />
                Manage Wards
            </button>

        </div>
    )
}

export default WardFilter
