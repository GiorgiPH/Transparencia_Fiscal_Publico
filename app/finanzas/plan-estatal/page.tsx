import { PortalLayout } from "@/components/portal-layout"
import { CategoryDetail } from "@/components/category-detail"

const subsections = [
  {
    title: "Planes Estatales de Desarrollo",
    icon: "FileText",
    items: [
      "Documento que contiene el plan estatal de desarrollo",
      "Objetivos del Plan Estatal de Desarrollo",
      "Desglose de acciones y responsables de ejecutarlas",
      "Indicadores asociados a los objetivos",
      "Líneas base de indicadores",
      "Metas intermedias y de fin de periodo de los indicadores",
      "Desglose de programas prioritarios y su vinculación con el presupuesto",
    ],
  },
  {
    title: "Programas Secundarios Derivados del PED",
    icon: "Target",
    items: [
      "Documentos que contienen los programas derivados del PED",
      "Vinculación de los programas derivados del PED",
      "Establecimiento de objetivos de los programas derivados del PED",
      "Desglose de acciones y responsables de ejecutarlas",
      "Indicadores asociados a los objetivos",
      "Líneas base de indicadores",
      "Metas intermedias y de fin de periodo de los indicadores",
    ],
  },
]

export default function PlanEstatalPage() {
  return (
    <PortalLayout activeSection="finanzas">
      <CategoryDetail
        title="Plan Estatal de Desarrollo"
        description="El Plan Estatal de Desarrollo (PED) es el documento rector que establece los objetivos, estrategias y líneas de acción para el desarrollo integral del Estado de Morelos."
        subsections={subsections}
        breadcrumb={[
          { label: "Finanzas Públicas", href: "/" },
          { label: "Plan Estatal de Desarrollo", href: "/finanzas/plan-estatal" },
        ]}
      />
    </PortalLayout>
  )
}
