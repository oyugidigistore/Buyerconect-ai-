'use client'

import ChatBox from '@/components/chat/ChatBox'

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          BuyerConnect Chat
        </h1>

        <ChatBox />
      </div>
    </main>
  )
}
