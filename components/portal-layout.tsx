import type { ReactNode } from "react"
import { PortalLayoutClient } from "@/components/portal-layout-client"

interface PortalLayoutProps {
  children: ReactNode
  activeSection?: string
}

export function PortalLayout({ children, activeSection }: PortalLayoutProps) {
  return <PortalLayoutClient activeSection={activeSection}>{children}</PortalLayoutClient>
}
