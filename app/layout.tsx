import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'IntentMesh',
  description: 'Local intent-centric simulation',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}
