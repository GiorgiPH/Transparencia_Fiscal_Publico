import { PortalLayout } from "@/components/portal-layout"
import { FinanzasPublicas } from "@/components/sections/finanzas-publicas"

export default function PortalOperativoPage() {
  return (
    <PortalLayout activeSection="finanzas">
      <FinanzasPublicas />
    </PortalLayout>
  )
}
