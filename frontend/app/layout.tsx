import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Business of Cinema — Prediction Markets',
  description: "India's first decentralized prediction market for Bollywood box office.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ background: '#0a0a0a' }}>
      <body className={`${inter.className} antialiased`} style={{ background: '#0a0a0a' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
