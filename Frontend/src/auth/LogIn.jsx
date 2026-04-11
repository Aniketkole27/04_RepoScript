import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hospital, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'

export default function LogIn() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (apiError) setApiError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            setApiError('Please enter both email and password')
            return
        }

        setLoading(true)
        setApiError('')

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            const data = await response.json()

            if (data.success) {
                // Store user session
                localStorage.setItem('user', JSON.stringify(data.user))
                navigate('/dashboard')
                // Refresh to update App state if needed
                window.location.reload()
            } else {
                setApiError(data.message || 'Invalid credentials')
            }
        } catch (error) {
            console.error("Login failure:", error)
            setApiError('Network error. Is the backend running?')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-stone-50 font-sans p-4">
            <div className="w-full max-w-md">
                {/* Branding */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-xl shadow-blue-100 mb-4 animate-in fade-in zoom-in duration-500">
                        <Hospital size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-stone-900 tracking-tight uppercase">City General</h1>
                    <p className="text-xs text-stone-400 font-bold tracking-[0.2em] uppercase mt-1">Hospital Management</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-stone-100 p-8 md:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 -mr-16 -mt-16 bg-blue-50/50 rounded-full w-40 h-40 blur-3xl transition-all group-hover:bg-blue-100/50" />

                    <div className="relative z-10">
                        <h2 className="text-xl font-bold text-stone-800 mb-2">Welcome Back</h2>
                        <p className="text-sm text-stone-500 mb-8 font-medium italic">Enter your credentials to access the portal</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {apiError && (
                                <div className="bg-red-50 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl border border-red-100 flex items-center gap-2 animate-in slide-in-from-top-2">
                                    <div className="w-1 h-1 bg-red-600 rounded-full shrink-0" />
                                    {apiError}
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative group/field">
                                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within/field:text-blue-500 transition-colors">
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="admin@citygeneral.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all placeholder:text-stone-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative group/field">
                                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within/field:text-blue-500 transition-colors">
                                        <Lock size={16} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all placeholder:text-stone-300"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn disabled:bg-stone-300 disabled:shadow-none cursor-pointer mt-2"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-stone-400 text-xs font-medium hover:text-stone-600 transition-colors cursor-pointer"
                            >
                                Don't have an account? <span className="text-blue-600 font-bold">Register here</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-10 text-center text-stone-300 text-[10px] font-bold uppercase tracking-[0.3em]">
                    &copy; 2026 Aniket Kole &middot; Secure Health Portal
                </p>
            </div>
        </div>
    )
}
