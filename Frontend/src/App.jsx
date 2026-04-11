import { useState } from 'react'
import Sidebar from './features/Sidebar/Sidebar'
import { Routes, Route } from "react-router-dom";
import Pages from './layout/Pages';

function App() {

  return (
    <>
      <div className='max-w-screen-2xl mx-auto 2xl:8px'>
        <main className='grid gap-4 p-4 grid-cols-[200px_1fr] h-screen box-border' >
          <Sidebar />
          <Routes>
            <Route path="/*" element={<Pages />} />
          </Routes>
        </main >
      </div>
    </>
  )
}

export default App
