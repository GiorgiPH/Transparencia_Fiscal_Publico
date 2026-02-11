import { Mail, Phone, MapPin, Facebook, Twitter, Youtube } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


export function PortalFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground mt-16">
      {/* Pleca superior */}
  <div className="w-full">
    <Image
      src="/images/pleca.png" // ← aquí pon tu URL
      alt="Pleca decorativa"
      width={1920}
      height={120}
      className="w-full h-10 object-cover"
      priority
    />
  </div>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* About Section */}
          <div>
            {/* Logo de Gobierno - El usuario agregará la URL después */}
            <div className="mb-4">
            <Image
              src="/images/LOGO_MORELOS_H2.png"
              alt="Secretaría de Administración y Finanzas - Estado de Morelos"
              width={1920}
              height={200}
              className="h-20 w-auto object-contain"
              priority
            />


            
            </div>
            <h3 className="font-bold text-lg text-primary-foreground mb-4">Secretaría de Administración y Finanzas</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">
              Dependencia del Gobierno del Estado de Morelos responsable de la administración de los recursos públicos,
              la transparencia fiscal y la rendición de cuentas a la ciudadanía.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          {/* <div>
            <h3 className="font-bold text-lg text-primary-foreground mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-foreground/80 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-foreground/80">
                  <p className="font-medium text-primary-foreground mb-1">Dirección</p>
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
                <Phone className="h-5 w-5 text-primary-foreground/80 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-foreground/80">
                  <p className="font-medium text-primary-foreground mb-1">Teléfono</p>
                  <p>+52 (777) 329 7000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/80 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-foreground/80">
                  <p className="font-medium text-primary-foreground mb-1">Correo Electrónico</p>
                  <a href="mailto:utfiscal@morelos.gob.mx" className="text-primary-foreground hover:underline hover:text-primary-foreground/90">
                    utfiscal@morelos.gob.mx
                  </a>
                </div>
              </div>
            </div>
          </div> */}

          {/* Hours Section */}
          {/* <div>
            <h3 className="font-bold text-lg text-primary-foreground mb-4">Horario de Atención</h3>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div>
                <p className="font-medium text-primary-foreground mb-1">Lunes a Viernes</p>
                <p>9:00 AM - 5:00 PM</p>
              </div>
              <div className="mt-6 pt-6 border-t border-primary-foreground/20">
                <h4 className="font-medium text-primary-foreground mb-2">Enlaces de Interés</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-primary-foreground hover:underline hover:text-primary-foreground/90">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/finanzas/plan-estatal" className="text-primary-foreground hover:underline hover:text-primary-foreground/90">
                      Finanzas Públicas
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://morelos.gob.mx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-foreground hover:underline hover:text-primary-foreground/90"
                    >
                      Gobierno de Morelos
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
            <p>© {new Date().getFullYear()} Gobierno del Estado de Morelos. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Aviso de Privacidad
              </Link>
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
