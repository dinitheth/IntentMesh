
'use client'
import { useEffect, useState } from 'react'
import type { Intent } from '../../types'

export default function Explore() {
  const [intents, setIntents] = useState<Intent[]>([])

  useEffect(() => {
    const stored: Intent[] = JSON.parse(localStorage.getItem('intents') || '[]')
    setIntents(stored)
  }, [])

  const fulfillIntent = (id: string) => {
    const updated: Intent[] = intents.map((intent) =>
      intent.id === id ? { ...intent, status: 'fulfilled' } : intent
    )
    setIntents(updated)
    localStorage.setItem('intents', JSON.stringify(updated))
  }

  const matchAndAutoFulfill = () => {
    const updated = intents.map((intent) => ({ ...intent }))
    for (let i = 0; i < updated.length; i++) {
      for (let j = i + 1; j < updated.length; j++) {
        const a = updated[i]
        const b = updated[j]
        if (
          a.status === 'pending' &&
          b.status === 'pending' &&
          a.from === b.to &&
          a.to === b.from &&
          a.amount === b.amount
        ) {
          a.status = 'fulfilled'
          b.status = 'fulfilled'
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