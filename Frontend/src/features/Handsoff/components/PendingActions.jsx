import React from 'react'
import { AlertTriangle } from 'lucide-react'

const PendingActions = ({ actions }) => {
    if (!actions || actions.length === 0) return null

    return (
        <div className='mt-3'>
            <p className='text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2'>Pending Actions</p>
            <div className='space-y-1.5'>
                {actions.map((action, idx) => (
                    <div key={idx} className='flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2'>
                        <AlertTriangle size={12} className='text-amber-500 mt-0.5 shrink-0' />
                        <p className='text-xs text-amber-800 font-medium'>{action}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PendingActions
