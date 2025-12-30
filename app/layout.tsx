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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
