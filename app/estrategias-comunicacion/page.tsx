"use client";

import { PortalLayout } from "@/components/portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { RedesSocialesDinamicas } from "@/components/estrategias-comunicacion/redes-sociales-dinamicas"
import { SectionTitle } from "@/components/patterns/SectionTitle"
import { NewsCard } from "@/components/patterns/NewsCard"
import { useNoticiasCarouselMapped } from "@/hooks/estrategias-comunicacion"

export default function EstrategiasComunicacionPage() {
  const { noticias, loading, error } = useNoticiasCarouselMapped(5)

  return (
    <PortalLayout activeSection="comunicacion">
      <div className="p-6 lg:p-12 max-w-6xl mx-auto">
        <SectionTitle
          title="¡Así te informamos!"
          subtitle="Mantente informado sobre transparencia fiscal a través de nuestros canales oficiales de comunicación y redes sociales."
          className="mb-8"
          titleClassName="text-3xl lg:text-4xl"
        />

        {/* News Section - Dinámica desde la API */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Noticias y Eventos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-video w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!loading && !error && noticias.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No hay noticias disponibles en este momento.</p>
              </div>
            )}

            {!loading && !error && noticias.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {noticias.slice(0, 3).map((noticia) => (
                  <NewsCard
                    key={noticia.id}
                    title={noticia.title}
                    date={noticia.date}
                    excerpt={noticia.excerpt}
                    image={noticia.image}
                    imageAlt={noticia.imageAlt}
                    url={noticia.url}
                  />
                ))}
              </div>
            )}
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
        {/* <div className="grid gap-6 lg:grid-cols-2 mb-8">
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
        </div> */}

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
