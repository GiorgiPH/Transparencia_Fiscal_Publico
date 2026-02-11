"use client";

import { PortalLayout } from "@/components/portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, FileText, Users } from "lucide-react"
import { FormularioParticipacion } from "@/components/participacion-ciudadana/formulario-participacion"
import { SectionTitle } from "@/components/patterns/SectionTitle"

import Image from "next/image"

export default function ParticipacionCiudadanaPage() {
  return (
    <PortalLayout activeSection="participacion">
      <div className="p-6 lg:p-12 max-w-6xl mx-auto">
        <SectionTitle
          title="Participa y Opina"
          subtitle="Tu opinión es importante. Este espacio está abierto para conocer comentarios y propuestas que contribuyan a mejorar el portal de transparencia fiscal y facilitar el acceso a la información pública."
          className="mb-8"
          titleClassName="text-3xl lg:text-4xl"
        />

        {/* Sección superior: Imagen + Formulario - Estructura tipo NewsCard */}
        <Card className="overflow-hidden border-primary/20 mb-8 p-0">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Imagen hand - Lado izquierdo */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <Image
                src="/images/hand.jpeg"
                alt="Participación ciudadana - Tu voz cuenta"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Overlay para mejor legibilidad del texto si es necesario */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent md:hidden" />
            </div>

            {/* Formulario - Lado derecho */}
            <div className="w-full md:w-1/2 p-6 lg:p-8">
              <FormularioParticipacion />
            </div>
          </div>
        </Card>

        {/* Mecanismos de Participación - Debajo */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Mecanismos de Participación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">Buzón de sugerencias y comentarios sobre el portal</p>
            </div>
          {/*   <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">Solicitudes de acceso a información pública</p>
            </div>
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">Consultas públicas y foros ciudadanos</p>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  )
}
