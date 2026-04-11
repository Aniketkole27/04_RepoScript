import React from 'react'

const AccountName = () => {
    // const profile = useSelector(state => state.currentUser.profile);
    return (
        <div className='border-b mb-4 mt-2 pb-4 border-stone-300'>
            <button className='flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full px-1 items-center cursor-pointer'>
                <img src="/icons.svg" alt="" className='size-8 rounded  shrink-0 bg-gray-700 shadow' />
                <div className='text-start'>
                    <span className='text-sm font-bold block'>Aniket Kole</span>
                    <span className='text-xs text-stone-500 block'>aniketkole818@gmail.com</span>
                </div>
            </button>
        </div>
    )
}

export default AccountName
