"use client"

import { PortalLayout } from "@/components/portal-layout"
import { FiltrosBusqueda, TablaResultados } from "@/components/busqueda-documentos"
import { Suspense } from "react"
import { useBusquedaDocumentos } from "@/hooks/busqueda-documentos"
import { SectionTitle } from "@/components/patterns/SectionTitle"

function BusquedaContent() {
  // Hook a nivel del componente padre para compartir estado
  const busquedaState = useBusquedaDocumentos();

  return (
    <PortalLayout activeSection="busqueda-documentos">
      <div className="p-6 lg:p-12 max-w-[1600px] mx-auto">
        <SectionTitle
          title="Explora los Datos"
          subtitle="Encuentra documentos fiscales, informes y datos específicos utilizando filtros avanzados."
          className="mb-8"
          titleClassName="text-3xl lg:text-4xl"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Left Side - Filters */}
          <div className="space-y-4">
            <FiltrosBusqueda {...busquedaState} />
          </div>

          {/* Right Side - Table */}
          <div className="space-y-4">
            <TablaResultados {...busquedaState} />
          </div>
        </div>
      </div>
    </PortalLayout>
  )
}

export default function BusquedaDocumentosPage() {
  return (
    <Suspense fallback={null}>
      <BusquedaContent />
    </Suspense>
  )
}
