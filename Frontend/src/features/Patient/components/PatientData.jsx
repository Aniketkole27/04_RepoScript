import React from 'react'
import { CheckCheck, Users, Activity, AlertCircle } from 'lucide-react'

const PatientData = () => {
    // const patientData = useSelector((state) => state.patientData.data)
    const patientInfoObject = {
        total: 124,
        admitted: 45,
        discharged: 72,
        critical: 7,
    }

    return (
        <div className='px-4 grid gap-3 grid-cols-4 mb-4'>
            <LabelData color="bg-stone-100 text-stone-700" label={"Total Patients"} icon={<Users size={16} />} value={patientInfoObject.total} />
            <LabelData color="bg-blue-50 text-blue-600" label={"Admitted Patients"} icon={<Activity size={16} />} value={patientInfoObject.admitted} />
            <LabelData color="bg-green-100 text-green-600" label={"Discharged"} icon={<CheckCheck size={16} />} value={patientInfoObject.discharged} />
            <LabelData color="bg-red-100 text-red-600" label={"Critical"} icon={<AlertCircle size={16} />} value={patientInfoObject.critical} />
        </div>
    )
}

export default PatientData

const LabelData = ({ label, value, icon, color = "bg-white" }) => {
    return (
        <div className='p-4 border rounded border-stone-300 shadow bg-[#FFFFFF]'>
            <div className='flex mb-3 gap-2 items-start '>
                <div className='grid gap-2'>
                    <span className={`text-xs font-medium p-2 rounded-lg ${color}`}>
                        {icon}
                    </span>
                    <p className='text-2xl font-semibold text-black'>{value}</p>
                </div>
                <h3 className='text-stone-500 mb-2 text-sm mt-1'>{label}</h3>
            </div>
        </div>
    )
}
