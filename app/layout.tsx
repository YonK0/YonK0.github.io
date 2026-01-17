import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Omar Kthiri - Portfolio',
  description: 'Embedded software engineer & Cyber security enthusiast',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
