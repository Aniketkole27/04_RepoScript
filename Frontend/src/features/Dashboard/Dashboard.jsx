import React from 'react'
import Greeting from '../../shared/Greeting'
import Grid from "./components/Grid"
import WardsOverview from './components/WardsOverview'
import RecentAlerts from './components/RecentAlerts'

const Dashboard = () => {
  return (
    <div className='bg-[#FFFFFF] text-black rounded-lg pb-3 shadow h-full overflow-y-auto'>
      <Greeting />
      <Grid />

      <div className='px-4 grid gap-4 grid-cols-1 md:grid-cols-2'>
        <WardsOverview />
        <RecentAlerts />
      </div>
    </div>
  )
}

export default Dashboard
