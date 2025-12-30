import { PortalLayout } from "@/components/portal-layout"
import { CatalogoHierarchy } from "@/components/catalogos"

export default function FinanzasPage() {
  return (
    <PortalLayout activeSection="finanzas">
      <div className="p-6 lg:p-12 max-w-7xl mx-auto">
        <CatalogoHierarchy />
      </div>
    </PortalLayout>
  )
}
