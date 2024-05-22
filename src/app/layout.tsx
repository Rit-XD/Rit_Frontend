import {UserProvider} from '@/lib/user/useUser'
import '@/styles/globals.scss'
import {GeistSans} from 'geist/font/sans'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Rit | Dashboard',
  description: 'Revolution in transport'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
      <NextUIProvider locale='nl-BE'>
        <UserProvider>
          {children}
        </UserProvider>
      </NextUIProvider>
      </body>
    </html>
  )
}
