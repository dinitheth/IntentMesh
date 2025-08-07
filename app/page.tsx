import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">IntentMesh</h1>
      <p className="mb-8">A local simulation of an intent-centric dApp using Anoma-inspired design.</p>
      <div className="space-x-4">
        <Link href="/create-intent" className="underline">Create Intent</Link>
        <Link href="/explore" className="underline">Explore Intents</Link>
      </div>
    </main>
  )
}