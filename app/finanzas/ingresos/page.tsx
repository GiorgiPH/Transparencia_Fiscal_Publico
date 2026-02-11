import { PortalLayout } from "@/components/portal-layout"
import { CategoryDetail } from "@/components/category-detail"

const subsections = [
  {
    title: "Proyección de Ingresos en el Paquete Económico",
    icon: "Target", // Changed from component reference to string
    items: [
      "Iniciativa de Ley de Ingresos",
      "Estimación de los ingresos de acuerdo al Clasificador por Rubro de Ingresos (CRI)",
      "Proyecciones de ingresos para el ejercicio fiscal",
      "Calendario de estimación mensual",
    ],
  },
  {
    title: "Ingresos Conforme a la Ley de Ingresos Aprobada",
    icon: "FileText", // Changed from component reference to string
    items: [
      "Ley de Ingresos aprobada por el Congreso del Estado",
      "Modificaciones y ajustes autorizados",
      "Clasificación por tipo y fuente de ingreso",
    ],
  },
  {
    title: "Resultados de los Ingresos",
    icon: "BarChart", // Changed from component reference to string
    items: [
      "Estado analítico de los ingresos detallado",
      "Resultado de los ingresos por periodo",
      "Calendario de ingresos reales con base mensual y CRI",
      "Información sobre ingresos extraordinarios recibidos",
      "Comparativo presupuesto vs ejercido",
    ],
  },
  {
    title: "Ingresos y Destino",
    icon: "DollarSign", // Changed from component reference to string
    items: [
      "Desglose por sector de destino: educación, salud, infraestructura",
      "Clasificación por tipo de gasto: corriente, capital, inversiones",
      "Transferencias federales y su aplicación",
      "Recursos propios y su distribución",
    ],
  },
]

export default function IngresosPage() {
  return (
    <PortalLayout activeSection="finanzas">
      <CategoryDetail
        title="Ingresos"
        description="Información completa sobre los ingresos del Estado de Morelos, incluyendo proyecciones, leyes aprobadas, resultados fiscales y el destino de los recursos públicos."
        subsections={subsections}
        breadcrumb={[
          { label: "Finanzas Públicas", href: "/" },
          { label: "Ingresos", href: "/finanzas/ingresos" },
        ]}
      />
    </PortalLayout>
  )
}
