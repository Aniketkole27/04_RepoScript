import React from 'react'
import { Search, Filter, UserPlus } from 'lucide-react'

const FilterSection = ({ setOpen, search, setSearch, status, setStatus, ward, setWard }) => {
    return (
        <div className='px-4 mt-4 mb-3 flex flex-wrap items-center gap-3'>

            {/* Search Bar */}
            <div className='flex-1 min-w-45 flex items-center gap-2 border border-stone-300 rounded px-3 py-2 shadow-sm bg-white focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-400 transition-all'>
                <Search size={15} className='text-stone-400 shrink-0' />
                <input
                    type='text'
                    placeholder='Search patients by name or ID...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full text-sm outline-none bg-transparent placeholder:text-stone-400 text-stone-800'
                />
            </div>

            {/* Status Filter */}
            <div className='flex items-center gap-2 border border-stone-300 rounded px-3 py-2 shadow-sm bg-white'>
                <Filter size={14} className='text-stone-400 shrink-0' />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className='text-sm outline-none bg-transparent text-stone-700 cursor-pointer'
                >
                    <option value="all">All Status</option>
                    <option value="admitted">Admitted</option>
                    <option value="discharged">Discharged</option>
                    <option value="critical">Critical</option>
                    <option value="observation">Under Observation</option>
                </select>
            </div>

            {/* Ward Filter */}
            <div className='flex items-center gap-2 border border-stone-300 rounded px-3 py-2 shadow-sm bg-white'>
                <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className='text-sm outline-none bg-transparent text-stone-700 cursor-pointer'
                >
                    <option value="all">All Wards</option>
                    <option value="general">General Ward</option>
                    <option value="icu">ICU</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="maternity">Maternity</option>
                    <option value="emergency">Emergency</option>
                </select>
            </div>

            {/* Add Patient Button */}
            <button
                type='button'
                onClick={() => setOpen(true)}
                className='flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm cursor-pointer'
            >
                <UserPlus size={15} />
                Add Patient
            </button>

        </div>
    )
}

export default FilterSection
