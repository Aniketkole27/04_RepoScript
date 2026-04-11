import React from 'react'
import AccountName from './components/AccountName'
import RouteSelect from './components/RouteSelect'

const Sidebar = () => {
    return (
        <div id="sidebar" className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]'>
            <AccountName />
            <RouteSelect />
        </div>
    )
}

export default Sidebar
