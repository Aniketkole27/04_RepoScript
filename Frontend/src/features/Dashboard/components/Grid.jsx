import React from 'react'
import StatusCard from './StatusCard'

const Grid = () => {


    return (
        <div className='px-4 grid gap-3 grid-cols-3 mb-4'>
            <StatusCard
                totalWards={10}
                totalPatients={12}
                totalDoctors={12}
            />
        </div>
    )
}

export default Grid
