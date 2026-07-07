'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    // Auto redirect after signup
    alert('Account created! Please login.')
    router.push('/login')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 text-white">

        <h1 className="text-3xl font-bold text-center text-cyan-400">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-300">
          Join BuyerConnect AI
        </p>

        <form className="mt-8 space-y-5" onSubmit={signup}>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-700 p-3 bg-slate-800 text-white"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm">Password</label>
            <input
              type="password"
              placeholder="Create password"
              className="w-full rounded-xl border border-slate-700 p-3 bg-slate-800 text-white"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold hover:bg-cyan-600"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Login
          </a>
        </p>

      </div>
    </main>
  )
}
