import {UserProvider} from '@/lib/user/useUser'
import '@/styles/globals.scss'
import {GeistSans} from 'geist/font/sans'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { Metadata } from 'next'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Rit | Dashboard",
  description: "Revolution in transport",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Bram Colleman" },
    { name: "Senne Christiaens" },
    { name: "Tibo Vermeire" },
    
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" },
    { rel: "icon", url: "/icons/icon-192x192.png" },
  ],
};


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
