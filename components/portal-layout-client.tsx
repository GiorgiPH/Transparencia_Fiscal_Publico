"use client"

import { type ReactNode, useState } from "react"
import { PortalHeader } from "@/components/portal-header"
import { PortalSidebar } from "@/components/portal-sidebar"
import { PortalFooter } from "@/components/portal-footer"

interface PortalLayoutClientProps {
  children: ReactNode
  activeSection?: string
}

export function PortalLayoutClient({ children, activeSection }: PortalLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <PortalHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <PortalSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeSection={activeSection} />

        <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)]">
          <main className="flex-1">{children}</main>
          <PortalFooter />
        </div>
      </div>
    </div>
  )
}
