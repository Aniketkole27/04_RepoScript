import React, { useEffect, useState } from 'react'
import { Bell, TimerIcon } from 'lucide-react'
// import { useSelector } from 'react-redux'

const Greeting = () => {
    const hours = new Date().getHours()
    let greet;
    let date = `${new Date().toLocaleDateString('en-US', {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric"
    })}`

    // const profile = useSelector(state => state.currentUser.profile);

    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    if (hours < 12) greet = "Good Morning"
    else if (hours < 18) greet = "Good Afternoon"
    else greet = "Good Night"

    return (
        <main className='border-b px-4 mb-4 mt-1 pb-4 border-stone-300'>
            <div className='flex p-0.5 items-center justify-between'>
                <div>
                    <span className='block text-sm font-bold'>
                        {
                            "Aniket Kole"
                        }
                    </span>
                    <span className='block text-xs text-stone-500'>{date}</span>
                </div>

                {/* Timer */}
                <div className='flex items-center gap-5' >
                    <div className='flex items-center gap-2 border border-stone-300 rounded px-3 py-2 shadow-sm bg-stone-50'>
                        <span className="text-stone-500"><TimerIcon size={16} /></span>
                        <span className="text-sm font-semibold text-stone-700 tracking-wider">
                            {currentTime.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })}
                        </span>
                    </div>
                    {/* Notification icon */}
                    <button className='p-2 rounded-full hover:bg-stone-200 transition-colors text-stone-600'>
                        <Bell size={18} />
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Greeting


