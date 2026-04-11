import React, { useState } from 'react'
import { Search, Filter, Plus } from 'lucide-react'

const HandoffFilter = ({ search, setSearch, wardFilter, setWardFilter }) => {
    return (
        <div className='px-4 mt-4 mb-4 flex flex-wrap items-center gap-3'>
            {/* Search */}
            <div className='flex-1 min-w-45 flex items-center gap-2 border border-stone-300 rounded px-3 py-2 shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-400 transition-all'>
                <Search size={15} className='text-stone-400 shrink-0' />
                <input
                    type='text'
                    placeholder='Search by patient name, doctor, or ward...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full text-sm outline-none bg-transparent placeholder:text-stone-400 text-stone-800'
                />
            </div>

            {/* Ward Filter */}
            <div className='flex items-center gap-2 border border-stone-300 rounded px-3 py-2 shadow-sm bg-white'>
                <Filter size={14} className='text-stone-400 shrink-0' />
                <select
                    value={wardFilter}
                    onChange={(e) => setWardFilter(e.target.value)}
                    className='text-sm outline-none bg-transparent text-stone-700 cursor-pointer'
                >
                    <option value='all'>All Wards</option>
                    <option value='general'>General Ward</option>
                    <option value='icu'>ICU</option>
                    <option value='pediatrics'>Pediatrics</option>
                    <option value='maternity'>Maternity</option>
                    <option value='emergency'>Emergency</option>
                </select>
            </div>
        </div>
    )
}

export default HandoffFilter
