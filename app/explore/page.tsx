'use client'
import { useEffect, useState } from 'react'

export default function Explore() {
  const [intents, setIntents] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('intents') || '[]')
    setIntents(stored)
  }, [])

  const fulfillIntent = (id: string) => {
    const updated = intents.map(intent =>
      intent.id === id ? { ...intent, status: 'fulfilled' } : intent
    )
    setIntents(updated)
    localStorage.setItem('intents', JSON.stringify(updated))
  }

  const matchAndAutoFulfill = () => {
    const updated = [...intents]
    const pending = updated.filter(i => i.status === 'pending')
    for (let i = 0; i < pending.length; i++) {
      for (let j = i + 1; j < pending.length; j++) {
        if (
          pending[i].from === pending[j].to &&
          pending[i].to === pending[j].from &&
          pending[i].amount === pending[j].amount &&
          pending[i].status === 'pending' &&
          pending[j].status === 'pending'
        ) {
          pending[i].status = 'fulfilled'
          pending[j].status = 'fulfilled'
          break
        }
      }
    }
    setIntents(updated)
    localStorage.setItem('intents', JSON.stringify(updated))
  }

  return (
    <main className="min-h-screen p-10 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Explore Intents</h2>
      <button onClick={matchAndAutoFulfill} className="mb-4 px-4 py-2 bg-blue-600">Run Auto-Matcher</button>
      <div className="space-y-4">
        {intents.length === 0 && <p>No intents yet.</p>}
        {intents.map((intent) => (
          <div key={intent.id} className="p-4 border rounded bg-gray-800">
            <p><strong>{intent.createdBy}</strong> wants to swap <strong>{intent.amount} {intent.from}</strong> for <strong>{intent.to}</strong></p>
            <p>Status: {intent.status}</p>
            {intent.status === 'pending' && (
              <button onClick={() => fulfillIntent(intent.id)} className="mt-2 px-3 py-1 bg-green-700">Fulfill</button>
            )}
            {intent.privacy && <p className="text-sm text-gray-400">[Private Intent]</p>}
          </div>
        ))}
      </div>
    </main>
  )
}