'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Intent } from '../../types'

export default function CreateIntent() {
  const [from, setFrom] = useState('USDC')
  const [to, setTo] = useState('ETH')
  const [amount, setAmount] = useState('')
  const [minRate, setMinRate] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newIntent: Intent = {
      id: Date.now().toString(),
      type: 'swap',
      from,
      to,
      amount: Number(amount),
      minRate: Number(minRate),
      privacy,
      status: 'pending',
      createdBy: 'user123',
    }
    const stored: Intent[] = JSON.parse(localStorage.getItem('intents') || '[]')
    stored.push(newIntent)
    localStorage.setItem('intents', JSON.stringify(stored))
    router.push('/explore')
  }

  return (
    <main className="min-h-screen p-10 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Create Swap Intent</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div><label>From:</label><input value={from} onChange={e => setFrom(e.target.value)} className="w-full p-2 text-black" /></div>
        <div><label>To:</label><input value={to} onChange={e => setTo(e.target.value)} className="w-full p-2 text-black" /></div>
        <div><label>Amount:</label><input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2 text-black" /></div>
        <div><label>Min Rate:</label><input type="number" value={minRate} onChange={e => setMinRate(e.target.value)} className="w-full p-2 text-black" /></div>
        <div><label><input type="checkbox" checked={privacy} onChange={() => setPrivacy(!privacy)} /> Private Intent</label></div>
        <button type="submit" className="bg-green-600 px-4 py-2">Submit</button>
      </form>
    </main>
  )
}