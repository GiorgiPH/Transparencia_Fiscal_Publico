"use client";

import { PortalLayout } from "@/components/portal-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileText, Database, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/patterns/SectionTitle"

export default function BusquedaDatosPage() {
  return (
    <PortalLayout activeSection="finanzas">
      <div className="p-6 lg:p-12 max-w-7xl mx-auto">
        <SectionTitle
          title="Búsqueda de Datos y Documentos"
          subtitle="Encuentra documentos fiscales, informes y datos específicos de manera rápida y eficiente."
          className="mb-8"
          titleClassName="text-3xl lg:text-4xl"
        />

        {/* Search Bar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscador de Documentos
            </CardTitle>
            <CardDescription>
              Ingresa palabras clave, fechas o categorías para encontrar la información que necesitas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre de documento, categoría, fecha..."
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="px-8">
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Under Construction Message */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Módulo en Construcción
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Este módulo está actualmente en desarrollo. Pronto podrás realizar búsquedas avanzadas de documentos y
              datos fiscales.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Búsqueda por categorías fiscales
              </p>
              <p className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros avanzados por fecha y tipo de documento
              </p>
              <p className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Descarga de datos en formatos abiertos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  )
}
