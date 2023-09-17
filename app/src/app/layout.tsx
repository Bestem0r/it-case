import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from "@/app/components/navbar/navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CocktailCove',
  description: 'CocktailCove',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <main className={inter.className}>
        <body>{children}</body>
      </main>
  )
}
