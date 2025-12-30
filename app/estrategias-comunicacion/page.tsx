import { PortalLayout } from "@/components/portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MessageCircle, Calendar } from "lucide-react"
import Image from "next/image"
import { RedesSocialesDinamicas } from "@/components/estrategias-comunicacion/redes-sociales-dinamicas"

export default function EstrategiasComunicacionPage() {
  return (
    <PortalLayout activeSection="comunicacion">
      <div className="p-6 lg:p-12 max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 text-balance">
          Estrategias de Comunicación
        </h1>
        <p className="text-lg text-muted-foreground mb-8 text-pretty">
          Mantente informado sobre transparencia fiscal a través de nuestros canales oficiales de comunicación y redes
          sociales.
        </p>

        {/* News Section with government event images */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Noticias y Eventos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
              {/* News Item 1 - Women's Community Event */}
              <div className="group flex-shrink-0 w-80 space-y-3 snap-start">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
                  <Image
                    src="/images/capturanoticias2.png"
                    alt="Evento comunitario de empoderamiento femenino"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>Diciembre 2024</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary">
                    Jornada de Empoderamiento y Participación Ciudadana
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Evento comunitario organizado por el Gobierno de Morelos para promover la participación ciudadana en
                    la transparencia fiscal y el desarrollo social.
                  </p>
                </div>
              </div>

              {/* News Item 2 - Official Government Announcement */}
              <div className="group flex-shrink-0 w-80 space-y-3 snap-start">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
                  <Image
                    src="/images/capturanoticias1.png"
                    alt="Firma de convenio fiscal"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>Noviembre 2024</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary">
                    Firma de Acuerdos de Transparencia Fiscal
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    La Secretaría de Administración y Finanzas firma acuerdos para fortalecer la transparencia en el
                    manejo de recursos públicos del Estado de Morelos.
                  </p>
                </div>
              </div>

              {/* News Item 3 - Official Presentation */}
              <div className="group flex-shrink-0 w-80 space-y-3 snap-start">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
                  <Image
                    src="/images/capturanoticias3.png"
                    alt="Presentación oficial del gobierno"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>Octubre 2024</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary">
                    Presentación del Programa de Cultura Fiscal
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Funcionarios estatales presentan nuevas iniciativas para promover la cultura fiscal y educación
                    financiera entre la ciudadanía morelense.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Section - Dinámica */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Redes Sociales Oficiales</CardTitle>
          </CardHeader>
          <CardContent>
            <RedesSocialesDinamicas />
          </CardContent>
        </Card>

        {/* Contact Details */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contacto Telefónico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Línea Directa</p>
                <a href="tel:+527773291700" className="text-primary hover:underline">
                  (777) 329-1700
                </a>
              </div>
              <div>
                <p className="text-sm font-medium">Extensión Transparencia Fiscal</p>
                <p className="text-muted-foreground">Ext. 1234</p>
              </div>
              <div>
                <p className="text-sm font-medium">Horario de Atención</p>
                <p className="text-muted-foreground">Lunes a Viernes, 9:00 AM - 6:00 PM</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Correos Electrónicos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Unidad de Transparencia Fiscal</p>
                <a href="mailto:utfiscal@morelos.gob.mx" className="text-primary hover:underline">
                  utfiscal@morelos.gob.mx
                </a>
              </div>
              <div>
                <p className="text-sm font-medium">Secretaría de Administración y Finanzas</p>
                <a href="mailto:contacto@finanzas.morelos.gob.mx" className="text-primary hover:underline">
                  contacto@finanzas.morelos.gob.mx
                </a>
              </div>
              <div>
                <p className="text-sm font-medium">Atención Ciudadana</p>
                <a href="mailto:atencion@morelos.gob.mx" className="text-primary hover:underline">
                  atencion@morelos.gob.mx
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Campaigns */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Campañas de Comunicación</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              El Gobierno del Estado de Morelos desarrolla campañas periódicas de comunicación para mantener informada a
              la ciudadanía sobre la gestión de recursos públicos, nuevos programas sociales, y la importancia de la
              transparencia fiscal.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Boletines mensuales sobre finanzas públicas</p>
              <p>• Informes trimestrales de transparencia</p>
              <p>• Transmisiones en vivo de sesiones informativas</p>
              <p>• Campañas educativas sobre presupuesto participativo</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  )
}
