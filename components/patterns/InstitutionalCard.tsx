import { ReactNode, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronRight, FileText, Folder } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { usePeriodicidad } from "@/hooks/periodicidad"
import { ANIOS_DISPONIBLES } from "@/lib/constants"
import { TipoDocumentoDisponibilidad } from "@/services/catalogos"
import { TiposDocumento } from "../catalogos/tipos-documento"




// Generic card component for catalogs and documents (not currently used)
export interface GenericCatalogCardProps {
  title: string
  description: string
  level: number
  order: number
  isFolder?: boolean
  onClick?: () => void
  className?: string
  children?: ReactNode
  icono?: string,
  // New props for periodicity selectors
  catalogoId: number
  showPeriodicitySelectors?: boolean
  onYearChange?: (year: number | null) => void
  onPeriodChange?: (period: number | null, isAnnual: boolean) => void
  onLoadDocuments?: (catalogoId: number, year: number, period: number | null, isAnnual: boolean) => void

}

export function GenericCatalogCard({
  title,
  description,
  level,
  order,
  isFolder = true,
  onClick,
  className = "",
  children,
  icono,

  // New props for periodicity selectors
  catalogoId,
  showPeriodicitySelectors = false,

 
  
}: GenericCatalogCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation()
      onClick()
    }
  }

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>( null);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  
  const {
    periodos,
    disponibilidad,
    loading,
    obtenerPeriodicidad,
    obtenerDisponibilidad,
    limpiarPeriodicidad,
    limpiarDisponibilidad,
  } = usePeriodicidad();

 

  // Fetch periodicity when year changes
  useEffect(() => {
    
    if (!selectedYear || !catalogoId) {
      limpiarPeriodicidad();
      limpiarDisponibilidad();
      return;
    }

    const fetchPeriodicity = async () => {
      await obtenerPeriodicidad(catalogoId, selectedYear);
    };

    fetchPeriodicity();
  }, [selectedYear, catalogoId]);

  const handleYearChange = (value: string) => {
    const year = value ? parseInt(value) : null;
    
 
    setSelectedYear(year);
    setSelectedPeriod(null);
    setIsAnnual(false);
  
  };

  const handlePeriodChange = (value: string) => {
    const period = value ? parseInt(value) : null;
    const isAnnualPeriod = period === 0;
    limpiarDisponibilidad();
    setSelectedPeriod(period);
    setIsAnnual(isAnnualPeriod);
    
    
    if (selectedYear && period !== null && catalogoId) {
      void obtenerDisponibilidad(
        catalogoId,
        selectedYear,
        isAnnualPeriod ? undefined : period
      );
    }
  };

  const tiposDocumentoPeriodo = useMemo<TipoDocumentoDisponibilidad[]>(() => {
    const disponibilidadSafe = Array.isArray(disponibilidad) ? disponibilidad : [];

    return disponibilidadSafe.map((d) => ({
        tipoDocumentoId: d.tipoDocumentoId,
        nombre: d.tipoDocumentoNombre || d.nombre || "",
        disponible: d.disponible,
        extension: d.extension || "file",
        documentoId: d.documentoId !== undefined ? String(d.documentoId) : "",
      }));
  }, [disponibilidad]);

 

  const nivelYAccion = (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm text-muted-foreground">
        Nivel {level}
      </div>

      {!isFolder ? (
        <Badge variant="secondary" className="ml-2 shrink-0">
          Documentos
        </Badge>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="group-hover:bg-muted shrink-0"
          onClick={handleClick}
        >
          Abrir
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      )}
    </div>
  )

  const periodicityTiposYChildren = (
    <>
      {!isFolder && catalogoId && (
        <div className="mt-4 border-t pt-4">
          <h4 className="mb-2 text-sm font-medium">Seleccionar período:</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="year-selector" className="text-xs">
                Año
              </Label>
              <Select value={selectedYear?.toString() || ""} onValueChange={handleYearChange}>
                <SelectTrigger id="year-selector" className="h-8 text-sm">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  {ANIOS_DISPONIBLES.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="text-sm">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="period-selector" className="text-xs">
                Periodo
              </Label>
              <Select
                value={selectedPeriod?.toString() || ""}
                onValueChange={handlePeriodChange}
                disabled={!selectedYear || loading || periodos.length === 0}
              >
                <SelectTrigger id="period-selector" className="h-8 text-sm">
                  <SelectValue placeholder={loading ? "Cargando..." : "Periodo"} />
                </SelectTrigger>
                <SelectContent>
                  {periodos.map((period: { value: number; label: string }) => (
                    <SelectItem key={period.value} value={period.value.toString()} className="text-sm">
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {!selectedYear && (
            <p className="mt-1 text-xs text-muted-foreground">
              Seleccione un año primero para ver los periodos disponibles
            </p>
          )}
        </div>
      )}

      {children}

      {!isFolder && selectedYear && selectedPeriod !== null && (
        <div className="mt-4 border-t pt-4">
          <TiposDocumento
            tiposDocumento={tiposDocumentoPeriodo}
            catalogoId={catalogoId}
            catalogoNombre={""}
          />
        </div>
      )}
    </>
  )

  if(icono) {
    return (
      <Card
      className={cn(
        "group h-full cursor-pointer overflow-hidden transition-all hover:shadow-lg",
        className
      )}
      onClick={() => !isFolder && onClick?.()}
    >
      <div className="flex h-full min-h-0 flex-col sm:flex-row">
    
        {/* CONTENEDOR IMAGEN - ocupa todo el espacio sin fondo blanco */}
        <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[42%] md:w-[40%]">
          <div className="absolute inset-0 bg-[#2f3e3a]" />
          
          <Image
            src={'/images/iconos/' + icono}
            alt={title}
            fill
            className="object-contain p-6"
          />
    
          {/* Gradiente de transición hacia el contenido */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/5" />
        </div>
    
        {/* CONTENIDO */}
        <div className="flex min-w-0 flex-1 flex-col">
          <CardHeader className="space-y-2 pb-2 pt-5 sm:py-6">
            <CardTitle className="text-balance text-xl font-bold transition-colors group-hover:text-primary">
              {title}
            </CardTitle>
            <CardDescription className="text-pretty line-clamp-3 sm:line-clamp-4">
              {description}
            </CardDescription>
          </CardHeader>
    
          <CardContent className="flex flex-1 flex-col gap-0 pt-0">
            {nivelYAccion}
            {periodicityTiposYChildren}
          </CardContent>
        </div>
    
      </div>
    </Card>
    )
  }

  return (
    <Card
      className={cn("group h-full cursor-pointer transition-all hover:shadow-lg", className)}
      onClick={() => !isFolder && onClick?.()}
    >
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
          {isFolder ? <Folder className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
        </div>
        <CardTitle className="text-balance text-xl font-bold transition-colors group-hover:text-primary">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-pretty">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {nivelYAccion}
        {periodicityTiposYChildren}
      </CardContent>
    </Card>
  )
}

export { GenericCatalogCard as InstitutionalCard }
