import React from 'react'
import { AlertCircle, AlertTriangle, Info, Clock } from 'lucide-react'

const RecentAlerts = ({ patients }) => {
    const criticalPatients = patients?.filter(p => p.condition === 'Critical') || []
    
    const alerts = [
        ...criticalPatients.map(p => ({
            id: p._id,
            type: 'critical',
            title: `Critical Status: Patient ${p.name} in ${p.bedNumber}`,
            time: 'Just now',
            icon: AlertCircle,
            color: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-red-100'
        })),
        { id: 'handoff', type: 'warning', title: 'Doctor shift handoff pending for Ward B', time: '45 mins ago', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
        { id: 'maint', type: 'info', title: 'Routine maintenance completed in Pediatrics', time: '2 hours ago', icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    ].slice(0, 5) // Limit to top 5 alerts


    return (
        <div className='border rounded-lg border-stone-300 p-4 bg-white'>
            <h3 className='font-semibold mb-4 text-stone-800 flex items-center gap-2'>
                <AlertCircle size={18} className="text-red-500" /> Recent Alerts
            </h3>
            <div className='space-y-3'>
                {alerts.map((alert) => {
                    const Icon = alert.icon;
                    return (
                        <div key={alert.id} className={`flex gap-3 p-3 rounded-lg border ${alert.bg} ${alert.border} items-start`}>
                            <div className={`p-1.5 rounded-md shrink-0 bg-white shadow-sm ${alert.color}`}>
                                <Icon size={16} />
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-medium text-stone-800 leading-tight'>{alert.title}</p>
                                <div className='flex items-center gap-1 mt-1.5 text-xs text-stone-500'>
                                    <Clock size={12} />
                                    <span>{alert.time}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecentAlerts
