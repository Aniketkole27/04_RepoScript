import React from 'react'
import StatusCard from './StatusCard'

const Grid = ({ patientsCount, doctorsCount, wardsCount, loading }) => {
    return (
        <div className='px-4 grid gap-3 grid-cols-3 mb-4'>
            <StatusCard
                totalWards={loading ? '...' : wardsCount}
                totalPatients={loading ? '...' : patientsCount}
                totalDoctors={loading ? '...' : doctorsCount}
            />
        </div>
    )
}

export default Grid
