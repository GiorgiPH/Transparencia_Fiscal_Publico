import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// <CHANGE> Using Inter font for better readability in governmental context
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portal de Transparencia Fiscal - Estado de Morelos",
  description: "Portal oficial de Transparencia Fiscal del Gobierno del Estado de Morelos",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon.ico',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" >
      <body className={`${inter.className} antialiased relative`}>
        {/* Fondo con marca de agua */}
        <div 
          className="fixed inset-0 z-[-1] "
          style={{
            backgroundImage: "url('/images/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="relative z-10 backdrop-blur-sm">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
