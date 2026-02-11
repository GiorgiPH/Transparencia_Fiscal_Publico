"use client";

import { PortalLayout } from "@/components/portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Download, Code, FileJson, Shield, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/patterns/SectionTitle"

export default function DatosAbiertosPage() {
  return (
    <PortalLayout activeSection="datos-abiertos">
      <div className="p-6 lg:p-12 max-w-6xl mx-auto">
        <SectionTitle
          title="Política de Datos Abiertos"
          subtitle="Acceso libre y reutilización de datos fiscales del Estado de Morelos en formatos abiertos y estándares internacionales."
          className="mb-8"
          titleClassName="text-3xl lg:text-4xl"
        />

        {/* What are Open Data */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              ¿Qué son los Datos Abiertos?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Los datos abiertos son información pública disponible en formatos digitales que permiten su uso,
              reutilización y redistribución libre por cualquier persona, sin restricciones de derechos de autor,
              patentes u otros mecanismos de control.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">Accesibles</h4>
                <p className="text-sm text-muted-foreground">Disponibles para todos sin discriminación</p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">Reutilizables</h4>
                <p className="text-sm text-muted-foreground">Sin restricciones de uso</p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-semibold mb-2">Procesables</h4>
                <p className="text-sm text-muted-foreground">En formatos estándar legibles por máquinas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open Data Licenses */}
        {/* <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Licencias de Datos Abiertos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Los conjuntos de datos publicados en este portal están disponibles bajo licencias Creative Commons que
              permiten su uso, modificación y distribución.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <Badge variant="outline" className="shrink-0">
                  CC BY 4.0
                </Badge>
                <div>
                  <p className="font-medium mb-1">Atribución</p>
                  <p className="text-sm text-muted-foreground">
                    Puedes usar, copiar, modificar y distribuir los datos, solo debes dar crédito al Gobierno del Estado
                    de Morelos.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <Badge variant="outline" className="shrink-0">
                  CC0 1.0
                </Badge>
                <div>
                  <p className="font-medium mb-1">Dominio Público</p>
                  <p className="text-sm text-muted-foreground">
                    Algunos datasets están liberados completamente al dominio público sin ninguna restricción.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Consulta los términos de uso específicos en cada conjunto de datos.
            </p>
          </CardContent>
        </Card> */}

        {/* Integration in Portal */}
        {/* <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Integración en el Portal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Este portal de transparencia fiscal integra datos abiertos en múltiples formatos para facilitar su
              análisis y aprovechamiento.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileJson className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Formatos Disponibles</h4>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• CSV (valores separados por comas)</li>
                  <li>• JSON (notación de objetos JavaScript)</li>
                  <li>• XML (lenguaje de marcado extensible)</li>
                  <li>• Excel (.xlsx) para análisis</li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Catálogo de Datasets</h4>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Presupuesto de egresos</li>
                  <li>• Estados financieros</li>
                  <li>• Deuda pública</li>
                  <li>• Cuenta pública</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-semibold mb-2">API para Desarrolladores</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Accede programáticamente a los datos mediante nuestra API RESTful.
              </p>
              <div className="bg-background rounded p-3 font-mono text-xs overflow-x-auto">
                <code>GET https://api.transparencia.morelos.gob.mx/v1/finanzas/presupuesto</code>
              </div>
              <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                Ver Documentación de API
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* Commitment to Openness */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Compromiso con la Apertura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              El Gobierno del Estado de Morelos se compromete a mantener y ampliar su política de datos abiertos,
              publicando información de calidad de manera oportuna y accesible.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p className="text-muted-foreground">
                  <strong>Actualización:</strong> Los datos se actualizan conforme a calendarios legales establecidos
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p className="text-muted-foreground">
                  <strong>Calidad:</strong> Verificación y validación de datos antes de su publicación
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p className="text-muted-foreground">
                  <strong>Estándares:</strong> Cumplimiento de estándares internacionales de datos abiertos
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <p className="text-muted-foreground">
                  <strong>Retroalimentación:</strong> Canal abierto para sugerencias de nuevos datasets
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  )
}
