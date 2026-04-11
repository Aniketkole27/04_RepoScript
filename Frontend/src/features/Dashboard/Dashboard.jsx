import Grid from "./components/Grid"
import WardsOverview from './components/WardsOverview'
import RecentAlerts from './components/RecentAlerts'
import { useState, useEffect } from "react"

const Dashboard = () => {
  const [data, setData] = useState({
    patients: [],
    doctors: [],
    wards: [],
    loading: true
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const isDoctor = user?.role === 'doctor';

        // Define dynamic patient endpoint based on role
        const patientUrl = isDoctor
          ? `http://localhost:5000/api/doctors/${user.id}/patients`
          : 'http://localhost:5000/api/patients';

        const [pRes, dRes, wRes] = await Promise.all([
          fetch(patientUrl),
          fetch('http://localhost:5000/api/doctors'),
          fetch('http://localhost:5000/api/wards')
        ])

        const [pData, dData, wData] = await Promise.all([
          pRes.json(),
          dRes.json(),
          wRes.json()
        ])

        setData({
          patients: pData.data || [],
          doctors: dData.data || [],
          wards: wData.data || [],
          loading: false
        })
      } catch (error) {
        console.error("Dashboard fetch error:", error)
        setData(prev => ({ ...prev, loading: false }))
      }
    }

    fetchData()
  }, [])

  return (
    <div className='bg-[#FFFFFF] text-black rounded-lg pb-3 shadow h-full overflow-y-auto'>

      <Grid
        patientsCount={data.patients.length}
        doctorsCount={data.doctors.length}
        wardsCount={data.wards.length}
        loading={data.loading}
      />

      <div className='px-4 grid gap-4 grid-cols-1 md:grid-cols-2'>
        <WardsOverview wards={data.wards} loading={data.loading} />
        <RecentAlerts patients={data.patients} />
      </div>
    </div>
  )
}

export default Dashboard
