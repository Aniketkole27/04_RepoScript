import React from 'react'
import AccountName from './components/AccountName'
import RouteSelect from './components/RouteSelect'
import Branding from './components/Branding'

const Sidebar = ({ user }) => {
    return (
        <div id="sidebar" className='sticky top-4 h-[calc(100vh-32px-20px)] flex flex-col '>
            <Branding />

            <div className='flex-1 overflow-y-auto px-1'>
                <RouteSelect />
            </div>

            <div className='mt-auto pt-4 border-t border-stone-200'>
                <AccountName user={user} />
            </div>
        </div>
    )
}

export default Sidebar
