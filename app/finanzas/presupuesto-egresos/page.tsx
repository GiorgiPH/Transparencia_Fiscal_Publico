import { PortalLayout } from "@/components/portal-layout"
import { CategoryDetail } from "@/components/category-detail"

const subsections = [
  {
    title: "Documentos Presupuestales",
    icon: "FileText",
    items: [
      "Documento preliminar del presupuesto",
      "Proyecto de Presupuesto de Egresos",
      "Presupuesto de Egresos aprobado",
      "Clasificaciones presupuestales (administrativa, funcional, económica)",
    ],
  },
  {
    title: "Balance y Ejercicio Presupuestario",
    icon: "Scale",
    items: [
      "Balance presupuestario del ejercicio",
      "Ejercicio presupuestario mensual y acumulado",
      "Modificaciones al presupuesto autorizado",
      "Presupuesto en lenguaje ciudadano",
    ],
  },
  {
    title: "Evaluación del Desempeño",
    icon: "Activity",
    items: [
      "Indicadores de desempeño por programa",
      "Evaluaciones externas de programas presupuestarios",
      "Matriz de indicadores para resultados (MIR)",
      "Avance en el cumplimiento de metas",
    ],
  },
  {
    title: "Recursos Transferidos",
    icon: "Building",
    items: [
      "Recursos transferidos a organismos descentralizados",
      "Transferencias a municipios del estado",
      "Convenios de colaboración y recursos asociados",
      "Subsidios y aportaciones",
    ],
  },
  {
    title: "Servicios Personales",
    icon: "Users",
    items: [
      "Presupuesto destinado a servicios personales",
      "Estructura ocupacional y remuneraciones",
      "Tabulador de sueldos y salarios",
      "Prestaciones y beneficios al personal",
    ],
  },
  {
    title: "Obra Pública",
    icon: "Hammer",
    items: [
      "Programa anual de obra pública",
      "Proyectos de infraestructura en ejecución",
      "Avance físico y financiero de obras",
      "Contratistas y montos adjudicados",
    ],
  },
  {
    title: "Programas de Subsidios",
    icon: "Gift",
    items: [
      "Padrón de beneficiarios de programas sociales",
      "Reglas de operación de programas",
      "Montos entregados por programa",
      "Evaluaciones de impacto social",
    ],
  },
  {
    title: "Procedimientos de Adquisiciones",
    icon: "ShoppingCart",
    items: [
      "Plan anual de adquisiciones",
      "Licitaciones públicas realizadas",
      "Adjudicaciones directas y excepciones",
      "Contratos vigentes con proveedores",
    ],
  },
  {
    title: "Comunicación Social y Publicidad",
    icon: "Megaphone",
    items: [
      "Presupuesto destinado a comunicación social",
      "Contratos con medios de comunicación",
      "Campañas gubernamentales realizadas",
      "Impacto y alcance de difusión",
    ],
  },
]

export default function PresupuestoEgresosPage() {
  return (
    <PortalLayout activeSection="finanzas">
      <CategoryDetail
        title="Presupuesto de Egresos"
        description="Información detallada sobre el presupuesto de egresos del Estado de Morelos, incluyendo documentos oficiales, ejercicio presupuestario, evaluaciones, transferencias y programas específicos."
        subsections={subsections}
        breadcrumb={[
          { label: "Finanzas Públicas", href: "/" },
          { label: "Presupuesto de Egresos", href: "/finanzas/presupuesto-egresos" },
        ]}
      />
    </PortalLayout>
  )
}
