import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from './features/Sidebar/Sidebar'
import Pages from './layout/Pages';
import LogIn from './auth/LogIn';

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  if (loading) return null

  return (
    <Routes>
      <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
      <Route 
        path="/*" 
        element={
          user ? (
            <div className='max-w-screen-2xl mx-auto 2xl:8px'>
              <main className='grid gap-4 p-4 grid-cols-[200px_1fr] h-screen box-border bg-blue-100'>
                <Sidebar user={user} />
                <Pages user={user} />
              </main>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
    </Routes>
  )
}

export default App
