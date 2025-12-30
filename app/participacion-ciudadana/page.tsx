import { PortalLayout } from "@/components/portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, MessageSquare, FileText, Users } from "lucide-react"
import { FormularioParticipacion } from "@/components/participacion-ciudadana/formulario-participacion"

export default function ParticipacionCiudadanaPage() {
  return (
    <PortalLayout activeSection="participacion">
      <div className="p-6 lg:p-12 max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 text-balance">Participación Ciudadana</h1>
        <p className="text-lg text-muted-foreground mb-8 text-pretty">
          Tu opinión es importante. Contáctanos para solicitar información, presentar sugerencias o participar en el
          fortalecimiento de la transparencia fiscal.
        </p>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Unidad de Transparencia Fiscal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Correo Electrónico</p>
                    <a href="mailto:utfiscal@morelos.gob.mx" className="text-primary hover:underline">
                      utfiscal@morelos.gob.mx
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Teléfono</p>
                    <a href="tel:+527773291700" className="text-muted-foreground hover:text-primary">
                      (777) 329-1700 ext. 1234
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Dirección</p>
                    <p className="text-muted-foreground text-sm">
                      Av. Morelos Sur No. 187
                      <br />
                      Col. Las Palmas
                      <br />
                      C.P. 62050, Cuernavaca, Morelos
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Horario de Atención</p>
                    <p className="text-muted-foreground text-sm">
                      Lunes a Viernes
                      <br />
                      9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Mecanismos de Participación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Buzón de sugerencias y comentarios sobre el portal</p>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Solicitudes de acceso a información pública</p>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Consultas públicas y foros ciudadanos</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form - Dinámico */}
          <FormularioParticipacion />
        </div>
      </div>
    </PortalLayout>
  )
}
