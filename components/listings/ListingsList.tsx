'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ListingCard from './ListingCard'

type Listing = {
  id: string
  title: string
  description: string
  price: number
  category: string
  listing_type: string
}

export default function ListingsList() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  async function loadListings() {
    setLoading(true)

    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })

    console.log('Supabase data:', data)
    console.log('Supabase error:', error)

    if (error) {
      setLoading(false)
      return
    }

    setListings(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    loadListings()
  }, [])

  if (loading) {
    return (
      <p className="text-gray-400">
        Loading listings...
      </p>
    )
  }

  if (listings.length === 0) {
    return (
      <p className="text-gray-400">
        No listings available.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
        />
      ))}
    </div>
  )
}
