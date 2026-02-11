
"use client"
import { PortalLayout } from "@/components/portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, FileText, ExternalLink } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/patterns/SectionTitle"

const federalLaws = [
  {
    title: "Constitución Política de los Estados Unidos Mexicanos",
    articles: ["Artículo 6 - Derecho de acceso a la información", "Artículo 134 - Manejo de recursos públicos"],
    description:
      "Marco constitucional que establece el derecho fundamental de acceso a la información pública y los principios de manejo de recursos.",
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf"
  },
  {
    title: "Ley General de Transparencia y Acceso a la Información Pública",
    description:
      "Establece los principios, bases generales y procedimientos para garantizar el derecho de acceso a la información pública.",
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGTAIP.pdf"
  },
  {
    title: "Ley General de Contabilidad Gubernamental",
    description:
      "Norma la contabilidad gubernamental y la emisión de información financiera de los entes públicos, incluyendo estados y municipios.",
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGCG.pdf"
  },
  {
    title: "Ley de Disciplina Financiera de las Entidades Federativas y los Municipios",
    description:
      "Regula la disciplina financiera de las entidades federativas estableciendo reglas de responsabilidad hacendaria y financiera.",
    url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LDFEFM.pdf"
  },
  {
    title: "Ley Federal de Presupuesto y Responsabilidad Hacendaria",
    description:
      "Reglamenta la programación, presupuestación, ejercicio, control y evaluación del ingreso y gasto público federal.",
    url: "https://www.diputados.gob.mx/LeyesBiblio/ref/lfprh.htm"
  },
]

const localLaws = [
  {
    title: "Ley de Transparencia y Acceso a la Información Pública del Estado de Morelos",
    description:
      "Regula el derecho de acceso a la información pública y los procedimientos de transparencia en el Estado de Morelos.",
    url: "http://marcojuridico.morelos.gob.mx/archivos/leyes/pdf/LTRANSPARENCIAMO.pdf"
  },
  {
    title: "Ley de Presupuesto, Contabilidad y Gasto Público del Estado de Morelos",
    description:
      "Establece las normas para la programación, presupuestación, ejercicio, control y evaluación del gasto público estatal.",
    url: "http://marcojuridico.morelos.gob.mx/archivos/leyes/pdf/LPGASTOPEM.pdf"
  },
]

export default function MarcoNormativoPage() {
  return (
    <PortalLayout activeSection="marco-normativo">
      <div className="p-6 lg:p-12 max-w-6xl mx-auto">
        <SectionTitle
          title="Conoce las Leyes"
          subtitle="El Portal de Transparencia Fiscal del Estado de Morelos se fundamenta en un robusto marco jurídico federal y estatal que obliga a transparentar la información relacionada con las finanzas públicas."
          className="mb-8"
          titleClassName="text-3xl lg:text-4xl"
        />

        {/* Introduction */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">
              La publicación de información fiscal en este portal no es opcional, es una obligación legal derivada de
              diversos ordenamientos jurídicos que garantizan el derecho ciudadano de conocer cómo se administran los
              recursos públicos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A continuación se presenta el conjunto de leyes federales y estatales que sustentan la obligación de
              transparencia fiscal del Estado de Morelos.
            </p>
          </CardContent>
        </Card>

        {/* Federal Legislation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            Legislación Federal
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {federalLaws.map((law, index) => (
              <AccordionItem
                key={index}
                value={`federal-${index}`}
                className="border rounded-lg overflow-hidden bg-card"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                  <div className="text-left">
                    <h3 className="font-semibold">{law.title}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground mb-4">{law.description}</p>
                  {law.articles && (
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium">Artículos relevantes:</p>
                      {law.articles.map((article, i) => (
                        <div key={i} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/30">
                          {article}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      asChild
                    >
                      <a href={law.url} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver texto completo
                      </a>
                    </Button>
                    {/* Comentado temporalmente - Botón de Última reforma
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Última reforma
                    </Button>
                    */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Local Legislation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Scale className="h-6 w-6 text-accent" />
            Legislación Estatal
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {localLaws.map((law, index) => (
              <AccordionItem key={index} value={`local-${index}`} className="border rounded-lg overflow-hidden bg-card">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                  <div className="text-left">
                    <h3 className="font-semibold">{law.title}</h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground mb-4">{law.description}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      asChild
                    >
                      <a href={law.url} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver texto completo
                      </a>
                    </Button>
                    {/* Comentado temporalmente - Botón de Última reforma
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Última reforma
                    </Button>
                    */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Summary Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Compromiso Legal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              El Gobierno del Estado de Morelos está comprometido con el cumplimiento estricto de todas las obligaciones
              legales en materia de transparencia fiscal. Este portal es una herramienta para dar cumplimiento a dichas
              obligaciones y fortalecer la confianza ciudadana en la gestión de recursos públicos.
            </p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  )
}
