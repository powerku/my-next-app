import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/components/providers/query-provider'
import AuthSession from '@/components/providers/session-provider'
import LoginButton from '@/components/login-button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthSession>
      <QueryProvider>
          <div className="h-[48px] bg-black flex items-center">
              <h1 className="text-white">powerku</h1>
              <ul className="ml-auto mr-5">
                   <li><LoginButton></LoginButton></li>
              </ul>
          </div>
        {children}
      </QueryProvider>
      </AuthSession>

      </body>
    </html>
  )
}
