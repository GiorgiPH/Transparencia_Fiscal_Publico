"use client"

import { useState } from "react"
import { HomeHeader } from "@/components/home-header"
import { PortalSidebar } from "@/components/portal-sidebar"
import { PortalFooter } from "@/components/portal-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  BarChart3,
  Lock,
  Users,
  Megaphone,
  Database,
  Scale,
  ChevronRight,
  ChevronLeft,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// News data
const newsItems = [
  {
    id: 1,
    title: "Jornada de Empoderamiento y Participación Ciudadana",
    date: "Diciembre 2024",
    excerpt:
      "Evento comunitario organizado por el Gobierno de Morelos para promover la participación ciudadana en la transparencia fiscal y el desarrollo social.",
    image: "/images/capturanoticias2.png",
  },
  {
    id: 2,
    title: "Firma de Acuerdos de Transparencia Fiscal",
    date: "Noviembre 2024",
    excerpt:
      "La Secretaría de Administración y Finanzas firma acuerdos para fortalecer la transparencia en el manejo de recursos públicos del Estado de Morelos.",
    image: "/images/capturanoticias1.png",
  },
  {
    id: 3,
    title: "Presentación del Programa de Cultura Fiscal",
    date: "Octubre 2024",
    excerpt:
      "Funcionarios estatales presentan nuevas iniciativas para promover la cultura fiscal y educación financiera entre la ciudadanía morelense.",
    image: "/images/capturanoticias3.png",
  },
]

export function HomeContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)

  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length)
  }

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length)
  }

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Home Header */}
      <HomeHeader onMenuClick={handleMenuClick} />

      {/* Sidebar (only shown when hamburger is clicked) */}
      <PortalSidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                Portal de Transparencia Fiscal
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground text-pretty">
                Accede a información clara y oportuna sobre el manejo de recursos públicos del Estado de Morelos. Conoce
                cómo se administra el presupuesto y participa en la construcción de un gobierno transparente.
              </p>
            </div>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/busqueda-documentos">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12">
                  <Search className="mr-2 h-5 w-5" />
                  Buscar documentos
                </Button>
              </Link>
              <Link href="/finanzas">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-12 bg-transparent">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Consultar finanzas públicas
                </Button>
              </Link>
              <Link href="/participacion-ciudadana">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-12 bg-transparent">
                  <Users className="mr-2 h-5 w-5" />
                  Participación ciudadana
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Access Block */}
        <section className="py-12 lg:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Acceso Rápido</h2>
              <p className="text-muted-foreground">Accede directamente a los módulos operativos del portal</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Public Finance Card */}
              <Link href="/finanzas">
                <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer group border-2">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-white">
                        <BarChart3 className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-2xl">Información de Finanzas Públicas</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      Consulta información detallada sobre ingresos, egresos, deuda pública, rendición de cuentas y más.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-muted">
                      Ir al módulo
                      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              {/* Data Search Card */}
              <Link href="/busqueda-datos">
                <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer group border-2">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent text-white">
                        <Search className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-2xl">Búsqueda de Datos y Documentos</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      Encuentra documentos fiscales, informes y datos específicos de manera rápida y eficiente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-muted">
                      Ir al módulo
                      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Informational Block */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Información y Recursos</h2>
              <p className="text-muted-foreground">Conoce más sobre transparencia fiscal y cómo participar</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Access Mechanisms */}
              <Card className="transition-all hover:shadow-lg group">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3 transition-transform group-hover:scale-110">
                    <Lock className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Mecanismos de Acceso</CardTitle>
                  <CardDescription>
                    Conoce los procedimientos para solicitar información pública y ejercer tu derecho de acceso a la
                    información.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/mecanismos-acceso">
                    <Button variant="link" className="p-0 h-auto font-semibold">
                      Conocer más <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Citizen Participation */}
              <Card className="transition-all hover:shadow-lg group">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3 transition-transform group-hover:scale-110">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Participación Ciudadana</CardTitle>
                  <CardDescription>
                    Tu voz importa. Participa en consultas públicas, envía comentarios y contribuye al presupuesto
                    participativo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/participacion-ciudadana">
                    <Button variant="link" className="p-0 h-auto font-semibold">
                      Enviar mensaje <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Communication Strategies */}
              <Card className="transition-all hover:shadow-lg group">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary mb-3 transition-transform group-hover:scale-110">
                    <Megaphone className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Estrategias de Comunicación</CardTitle>
                  <CardDescription>
                    Mantente informado a través de nuestros canales oficiales, redes sociales y campañas de
                    comunicación.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/estrategias-comunicacion">
                    <Button variant="link" className="p-0 h-auto font-semibold">
                      Ver canales de contacto <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Open Data Policy */}
              <Card className="transition-all hover:shadow-lg group">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3 transition-transform group-hover:scale-110">
                    <Database className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Política de Datos Abiertos</CardTitle>
                  <CardDescription>
                    Accede y reutiliza conjuntos de datos públicos en formatos abiertos para análisis e investigación.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/datos-abiertos">
                    <Button variant="link" className="p-0 h-auto font-semibold">
                      Ver política <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Regulatory Framework */}
              <Card className="transition-all hover:shadow-lg group sm:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3 transition-transform group-hover:scale-110">
                    <Scale className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">Marco Normativo</CardTitle>
                  <CardDescription>
                    Consulta las leyes, reglamentos y normativas que fundamentan la transparencia fiscal en Morelos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/marco-normativo">
                    <Button variant="link" className="p-0 h-auto font-semibold">
                      Consultar marco normativo <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-12 lg:py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Noticias y Anuncios</h2>
              <p className="text-muted-foreground">Mantente al día con las últimas novedades y eventos</p>
            </div>

            {/* Carousel */}
            <div className="relative max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative md:w-1/2 h-64 md:h-auto">
                    <Image
                      src={newsItems[currentNewsIndex].image || "/placeholder.svg"}
                      alt={newsItems[currentNewsIndex].title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{newsItems[currentNewsIndex].date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 text-balance">
                      {newsItems[currentNewsIndex].title}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-pretty">{newsItems[currentNewsIndex].excerpt}</p>
                    <Button variant="outline" className="w-fit bg-transparent">
                      Ver noticia completa
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={prevNews}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={nextNews}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {newsItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNewsIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentNewsIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to news ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <PortalFooter />
    </div>
  )
}
