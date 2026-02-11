import { PortalLayout } from "@/components/portal-layout"
import { CategoryDetail } from "@/components/category-detail"

const subsections = [
  {
    title: "Estados Financieros Básicos",
    icon: "FileText",
    items: [
      "Estado de Actividades (resultados)",
      "Estado de Situación Financiera (balance general)",
      "Estado de Variación de la Hacienda Pública",
      "Estado de Cambios en la Situación Financiera",
      "Estado de Flujos de Efectivo",
    ],
  },
  {
    title: "Informes Complementarios",
    icon: "AlertCircle",
    items: [
      "Informes sobre pasivos contingentes",
      "Notas a los estados financieros",
      "Revelaciones contables relevantes",
      "Políticas contables aplicadas",
    ],
  },
  {
    title: "Estados Analíticos",
    icon: "PieChart",
    items: [
      "Estado Analítico del Activo",
      "Estado Analítico de la Deuda y Otros Pasivos",
      "Conciliación contable-presupuestaria",
      "Información financiera por segmentos",
    ],
  },
  {
    title: "Dictaminación y Auditoría",
    icon: "Shield",
    items: [
      "Dictaminación de los estados financieros",
      "Opinión de auditores externos",
      "Hallazgos y recomendaciones",
      "Plan de solventación de observaciones",
    ],
  },
  {
    title: "Estudios Actuariales",
    icon: "Users",
    items: [
      "Estudios actuariales de pensiones y jubilaciones",
      "Valuación de obligaciones laborales",
      "Proyecciones financieras de largo plazo",
      "Reservas técnicas requeridas",
    ],
  },
  {
    title: "Gestión de Activos Públicos",
    icon: "Briefcase",
    items: [
      "Inventario de bienes muebles e inmuebles",
      "Valuación del patrimonio público",
      "Programa de desincorporación de activos",
      "Políticas de administración patrimonial",
    ],
  },
]

export default function InformacionContablePage() {
  return (
    <PortalLayout activeSection="finanzas">
      <CategoryDetail
        title="Información Contable"
        description="Estados financieros completos del Estado de Morelos conforme a la Ley General de Contabilidad Gubernamental, incluyendo notas, dictaminaciones y estudios actuariales."
        subsections={subsections}
        breadcrumb={[
          { label: "Finanzas Públicas", href: "/" },
          { label: "Información Contable", href: "/finanzas/informacion-contable" },
        ]}
      />
    </PortalLayout>
  )
}
