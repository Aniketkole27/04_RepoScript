import React, { useState } from 'react'
import Greeting from '../../shared/Greeting'
import DoctorData from './components/DoctorData'
import DoctorFilter from './components/DoctorFilter'
import DoctorList from './components/DoctorList'

const Doctors = () => {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('all')
  const [open, setOpen] = useState(false)

  return (
    <div className='bg-white text-black rounded-lg pb-3 shadow h-full overflow-y-auto'>
      <Greeting />
      <DoctorData />
      <DoctorFilter
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        setOpen={setOpen}
      />
      <DoctorList search={search} department={department} />

      {/* {open && <CreateDoctor open={open} setOpen={setOpen} />} */}
    </div>
  )
}

export default Doctors
