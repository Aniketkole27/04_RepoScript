import React, { useState, useRef } from 'react'
import { X, Bed, Users, Info, Activity, AlertCircle, User, Calendar, Heart } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const WardDetailModal = ({ ward, onClose }) => {
    const [selectedBed, setSelectedBed] = useState(null)
    const printRef = useRef()
    if (!ward) return null

    // Mock bed data for the grid
    const beds = Array.from({ length: ward.totalBeds }, (_, i) => ({
        number: `${ward.id}-${i + 1}`,
        status: i < ward.occupied ? 'occupied' : (i === ward.totalBeds - 1 ? 'maintenance' : 'available'),
        patient: i < ward.occupied ? `Patient ${i + 101}` : null
    }))

    const handleDownloadPDF = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true
        });
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const imgProps = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${ward.name.replace(/\s+/g, '_')}_Report.pdf`);
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
            <div className='bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col' onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className='px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50'>
                    <div>
                        <h2 className='text-lg font-bold text-stone-800'>{ward.name}</h2>
                        <p className='text-xs text-stone-500 uppercase tracking-widest font-semibold mt-0.5'>{ward.category} · {ward.location}</p>
                    </div>
                    <button onClick={onClose} className='p-2 hover:bg-stone-200 rounded-full transition-colors'>
                        <X size={20} className='text-stone-500' />
                    </button>
                </div>

                {/* Wrap content in ref for PDF capture */}
                <div ref={printRef} className='flex-1 overflow-y-auto bg-white p-6'>
                    {/* Stats Strip */}
                    <div className='grid grid-cols-4 gap-4 mb-8'>
                        <DetailStat label="Total Beds" value={ward.totalBeds} icon={<Bed size={16}/>} color="text-stone-600 bg-stone-100"/>
                        <DetailStat label="Occupied" value={ward.occupied} icon={<Users size={16}/>} color="text-blue-600 bg-blue-50"/>
                        <DetailStat label="Available" value={ward.totalBeds - ward.occupied - 1} icon={<Activity size={16}/>} color="text-green-600 bg-green-50"/>
                        <DetailStat label="Maintenance" value={1} icon={<AlertCircle size={16}/>} color="text-orange-600 bg-orange-50"/>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8'>
                        {/* Bed Layout Grid */}
                        <div>
                            <h3 className='text-sm font-bold text-stone-700 mb-4 flex items-center gap-2'>
                                <Bed size={16}/> Visual Bed Layout
                            </h3>
                            <div className='grid grid-cols-5 sm:grid-cols-8 gap-2 pb-4'>
                                {beds.map((bed, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setSelectedBed(bed)}
                                        className={`aspect-square rounded border flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-sm
                                            ${selectedBed?.number === bed.number ? 'ring-2 ring-blue-400 scale-110 z-10' : ''}
                                            ${bed.status === 'occupied' ? 'bg-blue-50 border-blue-200 text-blue-700' : 
                                              bed.status === 'maintenance' ? 'bg-orange-50 border-orange-200 text-orange-700' : 
                                              ward.category === 'pediatrics' ? 'bg-pink-50 border-pink-200 text-pink-600' :
                                              'bg-green-50 border-green-200 text-green-700'}`}
                                        title={bed.patient ? `Occupied by: ${bed.patient}` : bed.status}
                                    >
                                        <Bed size={14} />
                                        <span className='text-[10px] font-bold mt-1'>{i + 1}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Patient Detail Card (Conditionally shown) */}
                            {selectedBed && selectedBed.status === 'occupied' && (
                                <div className='mt-6 bg-blue-600 rounded-xl p-5 text-white shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300'>
                                    <div className='flex justify-between items-start mb-4'>
                                        <div className='flex items-center gap-3'>
                                            <div className='p-2 bg-white/20 rounded-lg'>
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <h4 className='font-bold text-lg leading-tight'>{selectedBed.patient}</h4>
                                                <p className='text-xs text-blue-100'>Bed Reference: {selectedBed.number}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setSelectedBed(null)} className='text-blue-100 hover:text-white'>
                                            <X size={16} />
                                        </button>
                                    </div>

                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='space-y-1'>
                                            <p className='text-[10px] uppercase font-bold text-blue-200 tracking-wider flex items-center gap-1'>
                                                <Calendar size={10}/> Admitted
                                            </p>
                                            <p className='text-sm font-semibold'>12-Apr-2024</p>
                                        </div>
                                        <div className='space-y-1'>
                                            <p className='text-[10px] uppercase font-bold text-blue-200 tracking-wider flex items-center gap-1'>
                                                <Heart size={10}/> Condition
                                            </p>
                                            <p className='text-sm font-semibold'>Stable / Recovering</p>
                                        </div>
                                    </div>
                                    
                                    <button className='mt-5 w-full py-2 bg-white text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors'>
                                        View Full Patient File
                                    </button>
                                </div>
                            )}

                            {selectedBed && selectedBed.status !== 'occupied' && (
                                <div className='mt-6 bg-stone-100 border border-stone-200 rounded-xl p-4 text-stone-600 flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <div className='p-2 bg-white rounded-lg border border-stone-200 text-stone-400'>
                                            <Bed size={20} />
                                        </div>
                                        <div>
                                            <p className='text-sm font-bold'>{selectedBed.status === 'maintenance' ? 'Under Maintenance' : 'Bed is Empty'}</p>
                                            <p className='text-[10px] uppercase font-semibold text-stone-400 tracking-wider'>{selectedBed.number}</p>
                                        </div>
                                    </div>
                                    <button className='text-xs font-bold text-blue-600 hover:underline'>Assign Patient</button>
                                </div>
                            )}
                        </div>

                        {/* Additional Info */}
                        <div className='space-y-6'>
                            <div>
                                <h3 className='text-sm font-bold text-stone-700 mb-4 flex items-center gap-2'>
                                    <Info size={16}/> Ward Management
                                </h3>
                                <div className='bg-stone-50 rounded-lg p-4 border border-stone-200 space-y-3'>
                                    <InfoField label="Supervisor" value={ward.supervisor}/>
                                    <InfoField label="Primary Staff" value="Nurse Unit Manager"/>
                                    <InfoField label="Contact" value="+91 22 4567 8901 (Ext: 405)"/>
                                    <InfoField label="Last Inspection" value="Yesterday, 4:00 PM"/>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className='text-sm font-bold text-stone-700 mb-4 flex items-center gap-2'>
                                    <Activity size={16}/> Equipment Readiness
                                </h3>
                                <div className='space-y-2'>
                                    <ProgressBar label="Oxygen Cylinders" percent={85} color="bg-blue-500" />
                                    <ProgressBar label="Ventilators" percent={40} color="bg-orange-500" />
                                    <ProgressBar label="Monitor Units" percent={100} color="bg-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className='px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end gap-3'>
                    <button onClick={onClose} className='px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-200 rounded transition-colors'>
                        Close View
                    </button>
                    <button 
                        onClick={handleDownloadPDF}
                        className='px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm transition-colors flex items-center gap-2'
                    >
                        Print Ward Map
                    </button>
                </div>
            </div>
        </div>
    )
}

const DetailStat = ({ label, value, icon, color }) => (
    <div className={`p-3 rounded-lg border border-stone-200 flex items-center gap-3 bg-white`}>
        <span className={`p-2 rounded-lg ${color}`}>{icon}</span>
        <div>
            <p className='text-xl font-bold text-stone-800 leading-tight'>{value}</p>
            <p className='text-[10px] font-semibold text-stone-400 uppercase tracking-wider'>{label}</p>
        </div>
    </div>
)

const InfoField = ({ label, value }) => (
    <div className='flex justify-between items-center text-xs'>
        <span className='text-stone-400'>{label}</span>
        <span className='font-bold text-stone-700'>{value}</span>
    </div>
)

const ProgressBar = ({ label, percent, color }) => (
    <div className='space-y-1'>
        <div className='flex justify-between items-center text-[10px] font-bold uppercase tracking-wider'>
            <span className='text-stone-500'>{label}</span>
            <span className='text-stone-700'>{percent}%</span>
        </div>
        <div className='h-1.5 w-full bg-stone-200 rounded-full overflow-hidden'>
            <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
        </div>
    </div>
)

export default WardDetailModal
