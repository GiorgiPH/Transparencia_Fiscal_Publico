"use client";

import { PortalLayout } from "@/components/portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Search, FileText, Clock, HelpCircle, Shield } from "lucide-react"
import { SectionTitle } from "@/components/patterns/SectionTitle"

export default function MecanismosAccesoPage() {
  return (
    <PortalLayout activeSection="mecanismos">
      <div className="p-6 lg:p-12 max-w-6xl mx-auto">
        <SectionTitle
          title="Conoce tu portal"
          subtitle="El Portal de Transparencia Fiscal del Estado de Morelos es una herramienta fundamental para garantizar el acceso a la información financiera pública."
          className="mb-8"
          titleClassName="text-3xl lg:text-4xl"
        />

        <div className="prose max-w-none mb-8">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                ¿Por qué existe este portal?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Este portal existe para cumplir con las obligaciones constitucionales y legales de transparencia fiscal
                del Estado de Morelos. Proporciona acceso público a información sobre cómo se recaudan, administran y
                gastan los recursos públicos, promoviendo la rendición de cuentas y la participación ciudadana en el
                control de las finanzas estatales.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Search className="h-5 w-5" />
                  Búsqueda de Información
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Utiliza el buscador en la sección de Finanzas Públicas para encontrar rápidamente documentos, reportes
                  y datos específicos sobre presupuestos, ingresos, egresos y más.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5" />
                  Documentos Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Accede a leyes, reglamentos, estados financieros, presupuestos, informes de auditoría y todos los
                  documentos oficiales en formato descargable para tu análisis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5" />
                  Actualización Continua
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  La información se actualiza periódicamente conforme a los calendarios establecidos por ley. Los
                  estados financieros se publican trimestralmente y la Cuenta Pública anualmente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="h-5 w-5" />
                  Solicitudes de Información
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Si no encuentras la información que buscas, puedes contactar a la Unidad de Transparencia Fiscal para
                  hacer solicitudes específicas conforme a la Ley de Transparencia.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Compromiso con la Transparencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                El Gobierno del Estado de Morelos está comprometido con los más altos estándares de transparencia
                fiscal. Este portal es parte del Modelo Hacendario Estatal para la Cohesión Social (MHECS), respaldado
                por la Unión Europea, y cumple con el Modelo Temático de Transparencia Fiscal (MTTF).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro objetivo es que cada ciudadano pueda ejercer su derecho de acceso a la información pública
                gubernamental de manera sencilla, rápida y efectiva.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  )
}
