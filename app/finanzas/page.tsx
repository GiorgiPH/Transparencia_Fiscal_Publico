import { PortalLayout } from "@/components/portal-layout"
import { CatalogoHierarchySearch } from "@/components/catalogos/catalogo-hierarchy-search"

export default function FinanzasPage() {
  return (
    <PortalLayout activeSection="finanzas">
      <div className="p-6 lg:p-12 max-w-7xl mx-auto">
        <CatalogoHierarchySearch />
      </div>
    </PortalLayout>
  )
}
