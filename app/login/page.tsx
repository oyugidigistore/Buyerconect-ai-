'use client'

import { useState, type FormEvent } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-8 text-white">
        <h1 className="text-3xl font-bold text-center text-cyan-400">
          BuyerConnect AI
        </h1>

        <p className="mt-2 text-center text-gray-300">
          Sign in to your account
        </p>

        <form className="mt-8 space-y-5" onSubmit={login}>
          <div>
            <label className="mb-2 block text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-700 p-3 bg-slate-800 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-700 p-3 bg-slate-800 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold hover:bg-cyan-600"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-cyan-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </main>
  )
}
