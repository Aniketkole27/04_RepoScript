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

    const initialTime = 6 * 60 * 60; // 6 hours in seconds
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowAlert(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTimeLeft = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

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
                        <span className={`text-sm font-semibold tracking-wider ${timeLeft <= 3600 ? 'text-red-600' : 'text-stone-700'}`}>
                            {formatTimeLeft(timeLeft)}
                        </span>
                    </div>
                    {/* Notification icon */}
                    <button className='p-2 rounded-full hover:bg-stone-200 transition-colors text-stone-600'>
                        <Bell size={18} />
                    </button>
                </div>
            </div>

            {/* Shift End Alert Modal */}
            {showAlert && (
                <div className='fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm'>
                    <div className='bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center animate-in fade-in zoom-in-95 duration-200'>
                        <div className='mx-auto w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4 ring-4 ring-red-50'>
                            <Bell size={26} className='text-red-500 animate-bounce' />
                        </div>
                        <h3 className='text-lg font-bold text-stone-800 mb-2'>Shift Ended</h3>
                        <p className='text-sm text-stone-600 mb-6 leading-relaxed'>
                            Your schedule shift has concluded. Please finalize any pending notes and handoffs for patients.
                        </p>
                        <button
                            onClick={() => setShowAlert(false)}
                            className='w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer shadow-sm'
                        >
                            Acknowledge
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Greeting


