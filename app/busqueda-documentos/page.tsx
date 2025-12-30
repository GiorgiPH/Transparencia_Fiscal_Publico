"use client"

import { PortalLayout } from "@/components/portal-layout"
import { FiltrosBusqueda, TablaResultados } from "@/components/busqueda-documentos"
import { Suspense } from "react"

function BusquedaContent() {
  return (
    <PortalLayout activeSection="busqueda-documentos">
      <div className="p-6 lg:p-12 max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 text-balance">
            Búsqueda de Datos y Documentos
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Encuentra documentos fiscales, informes y datos específicos utilizando filtros avanzados.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          {/* Left Side - Filters */}
          <div className="space-y-4">
            <FiltrosBusqueda />
          </div>

          {/* Right Side - Table */}
          <div className="space-y-4">
            <TablaResultados />
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
