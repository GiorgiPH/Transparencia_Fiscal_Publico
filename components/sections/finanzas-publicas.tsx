"use client"

import { useState } from "react"
import {
  Search,
  FileText,
  DollarSign,
  TrendingUp,
  Calculator,
  BarChart,
  Shield,
  BookOpen,
  FolderTree,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SectionTitle } from "../patterns/SectionTitle"

const categories = [
  {
    id: "ped",
    title: "Plan Estatal de Desarrollo",
    description: "Planes, objetivos, indicadores y programas derivados del PED",
    icon: FileText,
    color: "bg-primary",
    href: "/finanzas/plan-estatal",
  },
  {
    id: "ingresos",
    title: "Ingresos",
    description: "Proyecciones, leyes de ingresos y resultados fiscales",
    icon: DollarSign,
    color: "bg-accent",
    href: "/finanzas/ingresos",
  },
  {
    id: "deuda",
    title: "Deuda Pública",
    description: "Informes analíticos, obligaciones y financiamientos",
    icon: TrendingUp,
    color: "bg-secondary",
    href: "/finanzas/deuda-publica",
  },
  {
    id: "egresos",
    title: "Presupuesto de Egresos",
    description: "Presupuestos, balance, ejercicio y recursos transferidos",
    icon: Calculator,
    color: "bg-primary",
    href: "/finanzas/presupuesto-egresos",
  },
  {
    id: "contable",
    title: "Información Contable",
    description: "Estados financieros, notas y dictaminaciones",
    icon: BarChart,
    color: "bg-accent",
    href: "/finanzas/informacion-contable",
  },
  {
    id: "rendicion",
    title: "Rendición de Cuentas",
    description: "Auditorías, revisiones y cuenta pública",
    icon: Shield,
    color: "bg-secondary",
    href: "/finanzas/rendicion-cuentas",
  },
  {
    id: "marco",
    title: "Conoce las Leyes",
    description: "Leyes, reglamentos y manuales aplicables",
    icon: BookOpen,
    color: "bg-primary",
    href: "/finanzas/marco-normativo",
  },
]

export function FinanzasPublicas() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
      <SectionTitle
          title="Infórmate"
          subtitle=" Accede a información detallada sobre la gestión fiscal del Estado de Morelos, organizada en siete categorías
          temáticas principales."
          className="mb-8"
          titleClassName="text-3xl lg:text-4xl"
        />
       
      </div>

      {/* Search Bar */}
      <div className="mb-10">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar información fiscal (ej: presupuesto, ingresos, auditorías)..."
            className="pl-10 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-muted-foreground">
            {filteredCategories.length} {filteredCategories.length === 1 ? "resultado" : "resultados"} encontrados
          </p>
        )}
      </div>

      {/* Category Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => {
          const Icon = category.icon

          return (
            <Link key={category.id} href={category.href}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer group">
                <CardHeader>
                  <div
                    className={`${category.color} mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-white transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-balance group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-pretty">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-muted">
                    Ver información
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
          <p className="text-muted-foreground">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  )
}
