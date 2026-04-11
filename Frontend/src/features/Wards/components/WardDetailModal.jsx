import React, { useState, useEffect, useRef } from 'react'
import { X, Bed, Users, Info, Activity, AlertCircle, User, Calendar, Heart, MapPin, Loader2, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const WardDetailModal = ({ wardId, onClose }) => {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedBed, setSelectedBed] = useState(null)
    const printRef = useRef()

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/wards/${wardId}`)
                const result = await response.json()
                if (result.success) {
                    setData(result.data)
                }
            } catch (error) {
                console.error("Failed to fetch ward details:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchDetails()
    }, [wardId])

    if (loading) {
        return (
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
                <div className='bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center'>
                    <Loader2 size={32} className='animate-spin text-blue-600 mb-2' />
                    <p className='text-xs font-bold text-stone-400 uppercase tracking-widest'>Syncing Facility Map...</p>
                </div>
            </div>
        )
    }

    if (!data || !data.ward) return null

    const { ward, patients } = data
    const totalBeds = ward.totalBeds || 0

    // Accurate Occupancy Mapping
    const occupiedBedsTarget = ward.occupiedBeds || 0;
    const patientMatches = patients || [];
    
    // 1. Identify which bed numbers have specific patient records
    const patientBedPointers = new Set(
        patientMatches.map(p => {
            const extracted = p.bedNumber?.toString().match(/\d+/);
            return extracted ? parseInt(extracted[0]) : null;
        }).filter(n => n !== null)
    );

    // 2. Calculate if we need to fill additional "Ghost" occupants to match the stat
    let extraFillsNeeded = Math.max(0, occupiedBedsTarget - patientBedPointers.size);

    const beds = Array.from({ length: totalBeds }, (_, i) => {
        const bedNum = i + 1;
        const patient = patients?.find(p => {
            const extracted = p.bedNumber?.toString().match(/\d+/);
            const num = extracted ? parseInt(extracted[0]) : null;
            return num === bedNum;
        });

        let status = 'available';

        if (patient) {
            status = 'occupied';
        } else if (extraFillsNeeded > 0) {
            // Fill this bed to meet the ward.occupiedBeds total
            status = 'occupied';
            extraFillsNeeded--;
        } else if (bedNum > (totalBeds - (ward.inmentanaceBeds || 0))) {
            status = 'maintenance';
        }

        return { 
            number: `${ward.name.substring(0,3)}-${bedNum}`, 
            index: bedNum,
            status, 
            patient: patient 
        }
    });

    const handleDownloadPDF = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true
        });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${ward.name.replace(/\s+/g, '_')}_Analytics.pdf`);
    };

    const handleViewProfile = (patientId) => {
        navigate('/handoff', { state: { autoSelectId: patientId } })
        onClose()
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
            <div className='bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col' onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div className='px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50'>
                    <div className='flex items-center gap-4'>
                        <div className='w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100'>
                            <Bed size={20} />
                        </div>
                        <div>
                            <h2 className='text-lg font-bold text-stone-800 leading-tight'>{ward.name}</h2>
                            <p className='text-[10px] text-stone-400 uppercase tracking-[0.2em] font-black mt-0.5'>{ward.category} &middot; {ward.location}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className='p-2 hover:bg-stone-200 rounded-full transition-colors'>
                        <X size={20} className='text-stone-500' />
                    </button>
                </div>

                {/* Wrap content in ref for PDF capture */}
                <div ref={printRef} className='flex-1 overflow-y-auto bg-stone-50/30 p-8'>
                    {/* Stats Strip */}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                        <DetailStat label="Total Beds" value={ward.totalBeds} icon={<Bed size={16}/>} color="text-stone-600 bg-stone-100"/>
                        <DetailStat label="Occupied" value={ward.occupiedBeds} icon={<Users size={16}/>} color="text-blue-600 bg-blue-50"/>
                        <DetailStat label="Available" value={ward.totalBeds - ward.occupiedBeds - ward.inmentanaceBeds} icon={<Activity size={16}/>} color="text-green-600 bg-green-50"/>
                        <DetailStat label="Maintenance" value={ward.inmentanaceBeds} icon={<AlertCircle size={16}/>} color="text-red-600 bg-red-50"/>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10'>
                        {/* Bed Layout Grid */}
                        <div>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className='text-xs font-black text-stone-400 uppercase tracking-widest flex items-center gap-2'>
                                    <Activity size={14} className='text-blue-500'/> Visual Bed Layout
                                </h3>
                                <div className='flex gap-3 text-[9px] font-bold uppercase'>
                                    <div className='flex items-center gap-1.5'><span className='w-2 h-2 rounded-full bg-green-500'/> Free</div>
                                    <div className='flex items-center gap-1.5'><span className='w-2 h-2 rounded-full bg-blue-600'/> Busy</div>
                                </div>
                            </div>
                            
                            <div className='grid grid-cols-5 sm:grid-cols-8 gap-3 pb-6'>
                                {beds.map((bed, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setSelectedBed(bed)}
                                        className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 shadow-sm
                                            ${selectedBed?.index === bed.index ? 'ring-2 ring-blue-400 scale-105 z-10' : 'border-white'}
                                            ${bed.status === 'occupied' ? 'bg-blue-600 border-blue-600 text-white' : 
                                              bed.status === 'maintenance' ? 'bg-red-50 border-red-100 text-red-600' : 
                                              'bg-white border-white text-green-600 hover:bg-green-50'}`}
                                    >
                                        <Bed size={16} />
                                        <span className='text-[10px] font-black mt-1'>{bed.index}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Deep Drilldown Card */}
                            <div className='mt-4 h-48'>
                                {!selectedBed ? (
                                    <div className='h-full border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center text-stone-300'>
                                        <Info size={24} className='opacity-30 mb-2' />
                                        <p className='text-[10px] font-bold uppercase tracking-widest'>Select a bed to view status</p>
                                    </div>
                                ) : selectedBed.status === 'occupied' ? (
                                    <div className='bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-100 animate-in fade-in slide-in-from-bottom-2 duration-300'>
                                        <div className='flex justify-between items-start mb-5'>
                                            <div className='flex items-center gap-4'>
                                                <div className='p-3 bg-white/20 rounded-xl'>
                                                    <User size={24} />
                                                </div>
                                                <div>
                                                    <h4 className='font-black text-xl leading-tight'>{selectedBed.patient?.name}</h4>
                                                    <p className='text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-0.5'>Bed Ref: {selectedBed.number}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => setSelectedBed(null)} className='text-blue-100 hover:text-white'>
                                                <X size={20} />
                                            </button>
                                        </div>

                                        <div className='grid grid-cols-2 gap-6'>
                                            <div className='space-y-1.5'>
                                                <p className='text-[9px] uppercase font-black text-blue-200 tracking-[0.2em] flex items-center gap-1.5'>
                                                    <Calendar size={10}/> Admitted
                                                </p>
                                                <p className='text-sm font-bold'>{new Date(selectedBed.patient?.admissionDate || Date.now()).toLocaleDateString()}</p>
                                            </div>
                                            <div className='space-y-1.5'>
                                                <p className='text-[9px] uppercase font-black text-blue-200 tracking-[0.2em] flex items-center gap-1.5'>
                                                    <Heart size={10}/> Condition
                                                </p>
                                                <p className='text-sm font-bold'>{selectedBed.patient?.condition || 'Stable'}</p>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleViewProfile(selectedBed.patient?._id)}
                                            className='mt-6 w-full py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group'
                                        >
                                            OPEN CLINICAL FILE <ExternalLink size={12} className='group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                                        </button>
                                    </div>
                                ) : (
                                    <div className='h-full bg-white border border-stone-200 rounded-2xl p-6 flex items-center justify-between shadow-sm'>
                                        <div className='flex items-center gap-5'>
                                            <div className={`p-4 rounded-2xl ${selectedBed.status === 'maintenance' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                                <Bed size={32} />
                                            </div>
                                            <div>
                                                <p className='text-sm font-black text-stone-800'>{selectedBed.status === 'maintenance' ? 'Unit Offline (Maintenance)' : 'Unit Available for Admission'}</p>
                                                <p className='text-[10px] uppercase font-bold text-stone-400 tracking-widest mt-1'>{selectedBed.number}</p>
                                            </div>
                                        </div>
                                        <button className='text-[10px] font-black text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg uppercase tracking-widest transition-all'>Assign Patient</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Management Sidebar */}
                        <div className='space-y-8'>
                            <div>
                                <h3 className='text-xs font-black text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2'>
                                    <Info size={16}/> Ward Management
                                </h3>
                                <div className='bg-white rounded-2xl p-6 border border-stone-200 space-y-4 shadow-sm'>
                                    <InfoField label="Supervisor" value="Dr. Rajesh Mehta"/>
                                    <InfoField label="Primary Staff" value={ward.category === 'ICU' ? 'ICU Specialist' : 'General Nurse'}/>
                                    <InfoField label="Contact" value="+1 (555) 0123-456"/>
                                    <InfoField label="Last Audit" value="2 Hours Ago"/>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className='text-xs font-black text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2'>
                                    <Activity size={16}/> Essential Readiness
                                </h3>
                                <div className='bg-white rounded-2xl p-6 border border-stone-200 space-y-5 shadow-sm'>
                                    <ProgressBar label="O2 Reservoir" percent={92} color="bg-blue-500" />
                                    <ProgressBar label="Ventilator Units" percent={ward.category === 'ICU' ? 20 : 60} color="bg-orange-500" />
                                    <ProgressBar label="Monitor Grid" percent={100} color="bg-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer and Print */}
                <div className='px-8 py-5 border-t border-stone-100 bg-stone-50 flex flex-col sm:flex-row justify-between items-center gap-4'>
                    <p className='text-[9px] font-bold text-stone-300 uppercase tracking-wider'>Real-Time Audit System &copy; {new Date().getFullYear()}</p>
                    <div className='flex gap-3'>
                        <button onClick={onClose} className='px-6 py-2.5 text-xs font-bold text-stone-400 hover:text-stone-600 transition-all'>
                            Close Monitor
                        </button>
                        <button 
                            onClick={handleDownloadPDF}
                            className='px-8 py-2.5 bg-stone-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-black transition-all shadow-xl flex items-center gap-2'
                        >
                            Generate Performance Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DetailStat = ({ label, value, icon, color }) => (
    <div className={`p-4 rounded-xl border border-stone-200 flex items-center gap-4 bg-white hover:shadow-md transition-shadow`}>
        <span className={`p-3 rounded-xl ${color}`}>{icon}</span>
        <div>
            <p className='text-2xl font-black text-stone-800 leading-tight'>{value}</p>
            <p className='text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-0.5'>{label}</p>
        </div>
    </div>
)

const InfoField = ({ label, value }) => (
    <div className='flex justify-between items-center py-0.5'>
        <span className='text-[10px] font-bold text-stone-400 uppercase tracking-tight'>{label}</span>
        <span className='text-xs font-black text-stone-800'>{value}</span>
    </div>
)

const ProgressBar = ({ label, percent, color }) => (
    <div className='space-y-1.5'>
        <div className='flex justify-between items-center'>
            <span className='text-[10px] font-black text-stone-500 uppercase tracking-tighter'>{label}</span>
            <span className='text-[10px] font-black text-stone-800'>{percent}%</span>
        </div>
        <div className='h-2 w-full bg-stone-100 rounded-full overflow-hidden'>
            <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${percent}%` }} />
        </div>
    </div>
)

export default WardDetailModal
