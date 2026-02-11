import { PortalLayout } from "@/components/portal-layout"
import { CategoryDetail } from "@/components/category-detail"

const subsections = [
  {
    title: "Auditorías",
    icon: "Search",
    items: [
      "Auditorías realizadas por el Órgano Superior de Fiscalización",
      "Auditorías internas de control",
      "Auditorías financieras y de cumplimiento",
      "Auditorías de desempeño y forenses",
      "Seguimiento a observaciones y recomendaciones",
    ],
  },
  {
    title: "Informe de Revisión de Cuenta Pública",
    icon: "FileCheck",
    items: [
      "Informe de Resultados de la Fiscalización Superior",
      "Hallazgos y observaciones detectadas",
      "Pliegos de observaciones",
      "Recuperaciones y sanciones aplicadas",
      "Recomendaciones de mejora",
    ],
  },
  {
    title: "Padrón de Beneficiarios",
    icon: "Users",
    items: [
      "Padrón de beneficiarios de condonaciones de créditos fiscales",
      "Montos condonados y justificación legal",
      "Contribuyentes con condonación total o parcial",
      "Publicación trimestral de condonaciones",
    ],
  },
  {
    title: "Evaluaciones de Responsabilidad Hacendaria",
    icon: "CheckCircle",
    items: [
      "Evaluaciones de cumplimiento de obligaciones de responsabilidad hacendaria",
      "Indicadores de postura fiscal",
      "Sistema de Alertas de Disciplina Financiera",
      "Cumplimiento de la Ley de Disciplina Financiera",
    ],
  },
  {
    title: "Cuenta Pública",
    icon: "BookOpen",
    items: [
      "Cuenta Pública anual del ejercicio fiscal",
      "Cuenta pública en lenguaje ciudadano",
      "Informes trimestrales sobre el estado de la hacienda pública",
      "Información financiera consolidada",
      "Anexos y documentación soporte",
    ],
  },
]

export default function RendicionCuentasPage() {
  return (
    <PortalLayout activeSection="finanzas">
      <CategoryDetail
        title="Rendición de Cuentas"
        description="Información sobre auditorías, revisiones, cuenta pública y evaluaciones que garantizan la rendición de cuentas y el uso transparente de los recursos públicos en Morelos."
        subsections={subsections}
        breadcrumb={[
          { label: "Finanzas Públicas", href: "/" },
          { label: "Rendición de Cuentas", href: "/finanzas/rendicion-cuentas" },
        ]}
      />
    </PortalLayout>
  )
}
