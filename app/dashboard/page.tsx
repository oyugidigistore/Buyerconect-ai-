'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const { user, supabase } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">
            BuyerConnect AI Dashboard
          </h1>

          <button
            onClick={logout}
            className="rounded-xl bg-red-600 px-4 py-2 hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome!
          </h2>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p className="mt-4 text-gray-400">
            Your BuyerConnect dashboard is ready. We'll now begin adding buyers,
            sellers, AI matching, messaging, and other marketplace features.
          </p>
        </div>
      </div>
    </main>
  )
}
