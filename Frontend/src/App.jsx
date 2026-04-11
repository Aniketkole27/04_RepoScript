import { useState } from 'react'
import Dashboard from './features/Dashboard/Dashboard'
import Sidebar from './features/Sidebar/Sidebar'

function App() {

  return (
    <>
      <div className='max-w-screen-2xl mx-auto 2xl:8px'>
        <main className='grid gap-4 p-4 grid-cols-[200px_1fr]' >
          <Sidebar />
          <Dashboard />
        </main >
      </div>
    </>
  )
}

export default App
