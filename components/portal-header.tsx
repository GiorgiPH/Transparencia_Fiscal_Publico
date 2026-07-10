"use client"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigationSections } from "@/components/portal-sidebar"

interface PortalHeaderProps {
  onMenuClick: () => void
}

export function PortalHeader({ onMenuClick }: PortalHeaderProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
      <div className="flex h-20 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} aria-label="Abrir menú" className="lg:hidden">
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

  {/*       <div className="absolute left-1/2 -translate-x-1/2 text-center hidden md:block">
          <h1 className="text-lg font-semibold text-primary leading-tight">Portal de Transparencia Fiscal</h1>
          <p className="text-xs text-muted-foreground">Estado de Morelos</p>
        </div> */}

        <nav className="hidden lg:flex items-center gap-6">
          {navigationSections.map((section) => {
            const isActive = pathname === section.href || pathname.startsWith(`${section.href}/`)

            return (
              <Link
                key={section.id}
                href={section.href}
                className={cn(
                  "group relative px-1 py-2 text-md font-medium transition-all duration-300",
                  isActive
                    ? "text-[#b8860b]"
                    : "text-muted-foreground hover:text-[#b8860b]",
                )}
              >
                <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(184,134,11,0.35)]">
                  {section.label}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
