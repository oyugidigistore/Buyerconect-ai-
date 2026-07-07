'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function ProfilePage() {
  const { user, supabase } = useAuth()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setFullName(data.full_name || '')
        setPhone(data.phone || '')
        setLocation(data.location || '')
        setBio(data.bio || '')
      }

      if (error && error.code !== 'PGRST116') {
        console.error(error)
      }
    }

    loadProfile()
  }, [user, supabase])

  const saveProfile = async () => {
    if (!user) return

    setLoading(true)

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: fullName,
        phone,
        location,
        bio,
      })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert('Profile saved successfully!')
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-xl mx-auto bg-slate-900 rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">
          My Profile
        </h1>

        <div className="space-y-4">
          <input
            className="w-full p-3 rounded-xl bg-slate-800"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-xl bg-slate-800"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-xl bg-slate-800"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <textarea
            className="w-full p-3 rounded-xl bg-slate-800"
            rows={4}
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button
            onClick={saveProfile}
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold hover:bg-cyan-600"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </main>
  )
}
