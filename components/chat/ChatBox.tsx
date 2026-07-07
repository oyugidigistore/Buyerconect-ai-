'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Message = {
  id: string
  message: string
  created_at: string
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')

  async function loadMessages() {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })

    if (data) {
      setMessages(data)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  async function sendMessage() {
    if (!text.trim()) return

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      alert('Please log in first.')
      return
    }

    const { error } = await supabase.from('messages').insert({
      sender_id: session.user.id,
      receiver_id: session.user.id,
      listing_id: null,
      message: text,
    })

    if (error) {
      alert(error.message)
      return
    }

    setText('')
    loadMessages()
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <div className="h-80 overflow-y-auto border border-slate-700 rounded p-4 mb-4">
        {messages.length === 0 ? (
          <p className="text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="mb-3 p-3 bg-slate-800 rounded"
            >
              {msg.message}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-3 rounded bg-slate-800"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 rounded font-bold"
        >
          Send
        </button>
      </div>
    </div>
  )
}
