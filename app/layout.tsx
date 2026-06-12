import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Founders Desk | Ideas. Builders. Opportunities.',
  description: 'A content platform focused on business ideas, startups, and making money in Africa.',
  keywords: 'startups, business ideas, entrepreneurship, Africa, side hustles',
  openGraph: {
    title: 'Founders Desk',
    description: 'Ideas. Builders. Opportunities.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
