import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nghia Pham Dai - Frontend Developer',
  description: 'Portfolio of Nghia Pham Dai - Frontend Developer with 4 years of experience in React.js, Next.js and modern web technologies',
  keywords: 'Nghia Pham Dai, nghiapd, Frontend Developer, React.js, Next.js, TypeScript, Web Development, Portfolio',
  authors: [{ name: 'Nghia Pham Dai' }],
  openGraph: {
    title: 'Nghia Pham Dai - Frontend Developer',
    description: 'Portfolio of Nghia Pham Dai - Frontend Developer with 4 years of experience',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}