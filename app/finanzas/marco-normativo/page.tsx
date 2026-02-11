import { PortalLayout } from "@/components/portal-layout"
import { CategoryDetail } from "@/components/category-detail"

const subsections = [
  {
    title: "Leyes Aplicables",
    icon: "Scale",
    items: [
      "Ley de Presupuesto, Contabilidad y Gasto Público del Estado de Morelos",
      "Ley de Disciplina Financiera de las Entidades Federativas",
      "Ley General de Contabilidad Gubernamental",
      "Ley de Transparencia y Acceso a la Información del Estado",
      "Código Fiscal del Estado de Morelos",
    ],
  },
  {
    title: "Reglamentos",
    icon: "FileText",
    items: [
      "Reglamento Interior de la Secretaría de Administración y Finanzas",
      "Reglamento de la Ley de Presupuesto y Gasto Público",
      "Reglamento de Adquisiciones, Arrendamientos y Servicios",
      "Reglamento de Obra Pública del Estado",
      "Reglamento del Sistema Estatal de Información Estadística y Geográfica",
    ],
  },
  {
    title: "Manuales",
    icon: "BookOpen",
    items: [
      "Manual de Contabilidad Gubernamental",
      "Manual de Normas Presupuestarias",
      "Manual de Procedimientos de la Tesorería",
      "Manual de Auditoría Interna",
      "Manual de Organización de la SAF",
    ],
  },
  {
    title: "Lineamientos Técnicos",
    icon: "ScrollText",
    items: [
      "Lineamientos para el ejercicio del presupuesto",
      "Lineamientos de programación y presupuestación",
      "Lineamientos de evaluación del desempeño",
      "Lineamientos de transparencia fiscal",
      "Criterios de armonización contable",
    ],
  },
  {
    title: "Acuerdos y Decretos",
    icon: "FileSignature",
    items: [
      "Acuerdos administrativos vigentes",
      "Decretos presupuestales del ejercicio",
      "Acuerdos de austeridad y racionalidad",
      "Decretos de modificación presupuestal",
      "Convenios de coordinación fiscal",
    ],
  },
]

export default function MarcoNormativoPage() {
  return (
    <PortalLayout activeSection="finanzas">
      <CategoryDetail
        title="Conoce las Leyes"
        description="Compilación completa del marco jurídico que regula las finanzas públicas del Estado de Morelos, incluyendo leyes, reglamentos, manuales y lineamientos técnicos."
        subsections={subsections}
        breadcrumb={[
          { label: "Finanzas Públicas", href: "/" },
          { label: "Conoce las Leyes", href: "/finanzas/marco-normativo" },
        ]}
      />
    </PortalLayout>
  )
}
