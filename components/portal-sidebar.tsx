"use client"

import { X, BarChart3, Lock, Users, Megaphone, Database, Scale, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect } from "react"

const sections = [
  { id: "finanzas", label: "Infórmate", icon: BarChart3, href: "/finanzas" },
  { id: "mecanismos", label: "Conoce tu Portal", icon: Lock, href: "/mecanismos-acceso" },
  { id: "participacion", label: "Participa y Opina", icon: Users, href: "/participacion-ciudadana" },
  { id: "comunicacion", label: "Estrategias de Comunicación", icon: Megaphone, href: "/estrategias-comunicacion" },
  { id: "datos-abiertos", label: "Política de Datos Abiertos", icon: Database, href: "/datos-abiertos" },
  { id: "marco-normativo", label: "Conoce las Leyes", icon: Scale, href: "/marco-normativo" },
  { id: "busqueda-documentos", label: "Explora los Datos", icon: Search, href: "/busqueda-documentos" },
]

interface PortalSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeSection?: string
}

export function PortalSidebar({ isOpen, onClose, activeSection }: PortalSidebarProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 border-r border-sidebar-border bg-sidebar transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex justify-end p-2 border-b border-sidebar-border">
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar menú">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <p className="px-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3">
              MTTF - Etapas
            </p>
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id

              return (
                <Link
                  key={section.id}
                  href={section.href}
                  onClick={() => onClose()}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="leading-tight">{section.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
