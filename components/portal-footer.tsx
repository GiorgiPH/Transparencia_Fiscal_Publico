import { Mail, Phone, MapPin, Facebook, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export function PortalFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-16">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg text-foreground mb-4">Secretaría de Administración y Finanzas</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Dependencia del Gobierno del Estado de Morelos responsable de la administración de los recursos públicos,
              la transparencia fiscal y la rendición de cuentas a la ciudadanía.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-lg text-foreground mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Dirección</p>
                  <p className="leading-relaxed">
                    Av. Morelos Sur No. 187, Col. Las Palmas
                    <br />
                    Cuernavaca, Morelos, México
                    <br />
                    C.P. 62050
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Teléfono</p>
                  <p>+52 (777) 329 7000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Correo Electrónico</p>
                  <a href="mailto:utfiscal@morelos.gob.mx" className="text-primary hover:underline">
                    utfiscal@morelos.gob.mx
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hours Section */}
          <div>
            <h3 className="font-bold text-lg text-foreground mb-4">Horario de Atención</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">Lunes a Viernes</p>
                <p>9:00 AM - 5:00 PM</p>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium text-foreground mb-2">Enlaces de Interés</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-primary hover:underline">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/finanzas/plan-estatal" className="text-primary hover:underline">
                      Finanzas Públicas
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://morelos.gob.mx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Gobierno de Morelos
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Gobierno del Estado de Morelos. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Aviso de Privacidad
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
