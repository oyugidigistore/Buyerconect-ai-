'use client'

import { useState } from 'react'
import ListingForm from '@/components/listings/ListingForm'
import ListingsList from '@/components/listings/ListingsList'

export default function ListingsPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          BuyerConnect Marketplace
        </h1>

        <ListingForm
          onCreated={() => setRefreshKey((k) => k + 1)}
        />

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Latest Listings
          </h2>

          <ListingsList key={refreshKey} />
        </div>
      </div>
    </main>
  )
}
