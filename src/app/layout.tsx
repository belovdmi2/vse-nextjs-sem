import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Menu from '@/components/Menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Velocity',
  description: 'Car goes brrrrr....',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-14 bg-gradient-to-r from-purple-800 to-pink-800 text-white p-6`}
      >
        <Menu />
        {children}
      </body>
    </html>
  )
}
