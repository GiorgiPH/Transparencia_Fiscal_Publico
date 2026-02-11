"use client"
import { Menu, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface PortalHeaderProps {
  onMenuClick: () => void
}

export function PortalHeader({ onMenuClick }: PortalHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} aria-label="Abrir menú">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-20finanzas.png"
              alt="Secretaría de Administración y Finanzas - Estado de Morelos"
              width={160}
              height={42}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 text-center hidden md:block">
          <h1 className="text-lg font-semibold text-primary leading-tight">Portal de Transparencia Fiscal</h1>
          <p className="text-xs text-muted-foreground">Estado de Morelos</p>
        </div>

      
      </div>
    </header>
  )
}
