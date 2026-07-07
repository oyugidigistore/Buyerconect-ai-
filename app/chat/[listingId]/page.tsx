'use client'

import { use } from 'react'

type PageProps = {
  params: Promise<{
    listingId: string
  }>
}

export default function ListingChatPage({ params }: PageProps) {
  const { listingId } = use(params)

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-cyan-400 mb-2">
          BuyerConnect Chat
        </h1>

        <p className="text-gray-400 mb-8">
          Listing ID: {listingId}
        </p>

        <div className="bg-slate-900 rounded-xl p-6">
          <div className="h-96 border border-slate-700 rounded-lg p-4 overflow-y-auto mb-4">
            <p className="text-gray-400">
              Private conversation for this listing will appear here.
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 rounded-lg bg-slate-800"
            />

            <button className="bg-cyan-500 hover:bg-cyan-600 px-6 rounded-lg font-bold">
              Send
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}
