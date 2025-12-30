import { PortalLayout } from "@/components/portal-layout"
import { CategoryDetail } from "@/components/category-detail"

const subsections = [
  {
    title: "Informe Analítico de la Deuda",
    icon: "FileText",
    items: [
      "Informe Analítico de la Deuda y otros Pasivos (trimestral)",
      "Saldo de la deuda al cierre del periodo",
      "Estructura de la deuda por tipo de instrumento",
      "Evolución histórica de la deuda pública",
    ],
  },
  {
    title: "Obligaciones de Garantía o Pago",
    icon: "Shield",
    items: [
      "Detalle de los contratos de deuda, indicando términos y condiciones",
      "Información sobre avales otorgados por la entidad federativa",
      "Garantías y compromisos adquiridos",
      "Obligaciones contingentes",
    ],
  },
  {
    title: "Endeudamiento Neto",
    icon: "TrendingUp",
    items: [
      "Comparativo del saldo inicial y saldo final de la deuda pública",
      "Nuevos financiamientos contratados en el periodo",
      "Amortizaciones y pagos realizados",
      "Deuda neta consolidada al cierre del periodo",
    ],
  },
  {
    title: "Intereses de la Deuda",
    icon: "Percent",
    items: [
      "Detalle de los intereses devengados durante el ejercicio fiscal",
      "Intereses pagados por tipo de instrumento",
      "Tasa de interés promedio ponderada",
      "Proyecciones de servicio de la deuda",
    ],
  },
  {
    title: "Instrumentos de Contratación de Financiamientos",
    icon: "FileSignature",
    items: [
      "Descripción de los contratos financieros: bonos, créditos y garantías",
      "Instituciones financieras acreedoras",
      "Plazos y condiciones de los financiamientos",
      "Destino de los recursos contratados",
    ],
  },
]

export default function DeudaPublicaPage() {
  return (
    <PortalLayout activeSection="finanzas">
      <CategoryDetail
        title="Deuda Pública"
        description="Transparencia total sobre la deuda pública del Estado de Morelos, incluyendo informes analíticos, obligaciones, endeudamiento neto, intereses y contratos de financiamiento."
        subsections={subsections}
        breadcrumb={[
          { label: "Finanzas Públicas", href: "/" },
          { label: "Deuda Pública", href: "/finanzas/deuda-publica" },
        ]}
      />
    </PortalLayout>
  )
}
