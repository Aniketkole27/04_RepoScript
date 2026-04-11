import React from 'react'
import { Activity, Thermometer, Wind, Heart, Droplets, Gauge } from 'lucide-react'

const VitalsPanel = ({ vitals }) => {
    // If vitals is missing, don't crash the panel
    if (!vitals) return null;

    const items = [
        { icon: <Gauge size={14} />,    label: 'Blood Pressure',     value: vitals.bloodPressure || 'N/A',     color: 'text-blue-600',   bg: 'bg-blue-50' },
        { icon: <Heart size={14} />,    label: 'Heart Rate',         value: vitals.heartRate || 'N/A',         color: 'text-red-500',    bg: 'bg-red-50' },
        { icon: <Thermometer size={14} />, label: 'Temperature',     value: vitals.temperature || 'N/A',       color: 'text-orange-500', bg: 'bg-orange-50' },
        { icon: <Wind size={14} />,     label: 'Respiratory Rate',   value: vitals.respiratoryRate || 'N/A',   color: 'text-teal-600',   bg: 'bg-teal-50' },
        { icon: <Activity size={14} />, label: 'O₂ Saturation',      value: vitals.oxygenSaturation ? `${vitals.oxygenSaturation}%` : 'N/A',  color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { icon: <Droplets size={14} />, label: 'Sugar Level',        value: vitals.sugarLevel || 'N/A',        color: 'text-pink-600',   bg: 'bg-pink-50' },
    ]

    return (
        <div className='mt-3'>
            <p className='text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2'>Physiological Vitals</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-1.5'>
                {items.map((item) => (
                    <div key={item.label} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 ${item.bg}`}>
                        <span className={`shrink-0 ${item.color}`}>{item.icon}</span>
                        <div>
                            <p className='text-[9px] text-stone-500 leading-none uppercase tracking-tighter'>{item.label}</p>
                            <p className={`text-xs font-bold mt-0.5 ${item.color}`}>{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VitalsPanel
