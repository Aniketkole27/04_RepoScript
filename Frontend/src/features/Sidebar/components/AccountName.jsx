import React from 'react'

const AccountName = () => {
    // const profile = useSelector(state => state.currentUser.profile);
    return (
        <div className='py-2'>
            <button className='flex p-0.5 hover:bg-stone-200 rounded-lg transition-colors relative gap-3 w-full px-1 items-center cursor-pointer'>
                <div className='size-9 rounded-lg shrink-0 bg-blue-600 shadow-sm flex items-center justify-center text-white font-bold text-sm'>
                    A
                </div>
                <div className='text-start'>
                    <span className='text-sm font-bold block text-stone-800 tracking-tight'>Aniket Kole</span>
                    <span className='text-[10px] text-stone-400 block font-medium'>aniketkole818@gmail.com</span>
                </div>
            </button>
        </div>
    )
}

export default AccountName
