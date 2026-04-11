import React from 'react'
import Greeting from '../../shared/Greeting'
import Grid  from "./components/Grid"

const Dashboard = () => {
  return (
    <div className='bg-[#FFFFFF] text-black rounded-lg pb-3 shadow h-full'>
        <Greeting />
        <Grid />
     </div>
  )
}

export default Dashboard
