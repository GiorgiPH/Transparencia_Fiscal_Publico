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
import { NewsCard } from "@/components/patterns/NewsCard"
import { SectionTitle } from "@/components/patterns/SectionTitle"
import { InstitutionalCard } from "@/components/patterns/InstitutionalCard"
import { CoverflowCarousel } from "@/components/patterns/CoverflowCarousel"
import { QuickAccessCard } from "@/components/patterns/QuickAccessCard"
import { CircularButton, CircularButtonWithSideLabel } from "@/components/patterns/CircularButton"
import { LinksCarousel } from "@/components/patterns/LinksCarousel"
import { NewsCarousel } from "@/components/patterns/NewsCarousel"
import { motion } from "framer-motion"
import { useNoticiasCarouselMapped } from "@/hooks/estrategias-comunicacion"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function HomeContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Usar el hook para obtener noticias del carrusel desde la API
  const { noticias, loading, error } = useNoticiasCarouselMapped(5)

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Home Header */}
      <HomeHeader onMenuClick={handleMenuClick} />

      {/* Sidebar (only shown when hamburger is clicked) */}
      <PortalSidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative  min-h-[40vh] bg-cover bg-center bg-no-repeat border-b" style={{ backgroundImage: "url('/images/hero-background.png')" }}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="max-w-none mx-auto px-4 lg:px-24 py-12 lg:py-20 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-10">
              <motion.h1 
                className="text-4xl lg:text-5xl font-bold text-white mb-4 text-balance"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2
                }}
              >
                Portal de Transparencia Fiscal
              </motion.h1>
              <motion.p 
                className="text-lg lg:text-xl text-white/90 text-pretty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.4
                }}
              >
                Accede a información clara y oportuna sobre el manejo de recursos públicos del Estado de Morelos. Conoce
                cómo se administra el presupuesto y participa en la construcción de un gobierno transparente.
              </motion.p>
            </div>

          </div>
        </section>


        {/* Two Column Section - Estatua Morelos + Vertical Cards */}
        <section className="py-12 lg:py-16">
          <div className="max-w-none mx-auto px-4 lg:px-24">
            <div className="grid lg:grid-cols-4 gap-16 items-start">
              {/* Left Column - Estatua Morelos Image with Title and Search (3/4) */}
              <div className="lg:col-span-3 relative">
                <div className="sticky top-24">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/estatua-morelos.png"
                      alt="Estatua de Morelos - Símbolo de transparencia fiscal"
                      width={1200}
                      height={1500}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-3xl font-bold mb-3 text-white">¿Qué buscaremos el día de hoy?</h3>
                      <p className="text-white/90 text-lg mb-6">
                        Encuentra información fiscal, documentos públicos y datos abiertos del Estado de Morelos
                      </p>
                      
                      {/* Search Bar - Wider and Transparent */}
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Search className="h-6 w-6 text-white/80" />
                        </div>
                        <input
                          type="text"
                          placeholder="Buscar información, documentos o datos..."
                          className="w-full pl-12 pr-32 py-5 text-lg rounded-xl border-2 border-white/30 focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300 bg-white/20 backdrop-blur-sm shadow-lg text-white placeholder-white/70"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement;
                              const searchText = input.value.trim();
                              if (searchText.length >= 2) {
                                // Redirigir a la sección de finanzas (catálogos) con el texto de búsqueda
                                window.location.href = `/finanzas?buscar=${encodeURIComponent(searchText)}`;
                              }
                            }
                          }}
                        />
                        <button 
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 font-medium hover:scale-105"
                          onClick={() => {
                            const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                            const searchText = input?.value.trim();
                            if (searchText && searchText.length >= 2) {
                              // Redirigir a la sección de finanzas (catálogos) con el texto de búsqueda
                              window.location.href = `/finanzas?buscar=${encodeURIComponent(searchText)}`;
                            }
                          }}
                        >
                          Buscar
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Popular Searches Below Image - Larger and Aligned with Original Star Design */}
                  <div className="mt-12">
                    <h3 className="text-3xl font-bold text-center mb-8 text-foreground">
                      Búsquedas más realizadas
                    </h3>
                    <div className="flex flex-wrap justify-center gap-8">
                      {[
                        { label: "Presupuesto", count: "1,234" },
                        { label: "Deuda Pública", count: "987" },
                        { label: "Rendición de Cuentas", count: "856" }
                      ].map((search, index) => (
                        <button
                          key={index}
                          className="group flex items-center gap-4 px-8 py-6 bg-white border-2 border-primary/10 rounded-2xl hover:border-primary/30 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div className="relative">
                            <div className="text-3xl text-gray-300 group-hover:text-yellow-400 transition-colors">
                              ★
                            </div>
                            <div className="absolute inset-0 text-3xl text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              ★
                            </div>
                          </div>
                          <div className="text-left">
                            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors block">
                              {search.label}
                            </span>
                            <span className="text-lg text-muted-foreground font-medium">
                              {search.count} búsquedas
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Vertical Cards (1/4) */}
              <div className="lg:col-span-1 space-y-4">
                {[
                  {
                    title: "Conoce tu Portal",
                    subtitle: "Navega y Explora",
                    description: "Descubre las secciones, funcionalidades y contenidos disponibles para consultar información de manera clara y organizada.",
                    color: "tertiary",
                    href: "/mecanismos-acceso"
                  },
                  {
                    title: "Participa y Opina",
                    subtitle: "Tu Voz Importa",
                    description: "Participa en el envio de comentarios y contribuye al presupuesto participativo.",
                    color: "tertiary",
                    href: "/participacion-ciudadana"
                  },
                  {
                    title: "Estrategias de Comunicación",
                    subtitle: "Mantente Informado",
                    description: "Mantente informado a través de nuestros canales oficiales, redes sociales y campañas de comunicación.",
                    color: "tertiary",
                    href: "/estrategias-comunicacion"
                  },
                  {
                    title: "Política de Datos Abiertos",
                    subtitle: "Datos para Análisis",
                    description: "Accede y reutiliza conjuntos de datos públicos en formatos abiertos para análisis e investigación.",
                    color: "tertiary",
                    href: "/datos-abiertos"
                  },
                  {
                    title: "Conoce las Leyes",
                    subtitle: "Fundamentos Legales",
                    description: "Consulta las leyes, reglamentos y normativas que fundamentan la transparencia fiscal en Morelos.",
                    color: "tertiary",
                    href: "/marco-normativo"
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="border-2 hover:border-tertiary/30 hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-[1.02] min-h-[120px]">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-tertiary group-hover:text-tertiary/80 transition-colors leading-tight">
                                  {card.title}
                                </h3>
                                {card.subtitle && (
                                  <p className="text-lg font-medium text-muted-foreground mt-1">
                                    {card.subtitle}
                                  </p>
                                )}
                              </div>
                              <CircularButton
                                href={card.href}
                                size="sm"
                                color="tertiary"
                                label=""
                                description=""
                                className="scale-75 -mt-1 -mr-1"
                                showPing={false}
                              />
                            </div>
                            <p className="text-md text-muted-foreground leading-relaxed line-clamp-2">
                              {card.description}
                            </p>
                            <div className="mt-2">
                              
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Block */}
        <section className="py-12 lg:py-16">
          <div className="max-w-none mx-auto px-4 lg:px-24">
            <SectionTitle
              title="Accede a tu Información"
              subtitle="Acceso directo a las herramientas de fiscalización y datos abiertos."
              titleClassName="text-3xl lg:text-4xl"

            />

            <div className="grid gap-8 md:grid-cols-2 max-w-none mx-auto">
              {/* Public Finance Card */}
              <QuickAccessCard
                title="Infórmate"
                description="Consulta información detallada sobre ingresos, egresos, deuda pública, rendición de cuentas y más."
                icon={<BarChart3 className="h-10 w-10" />}
                href="/finanzas"
                backgroundImage="/images/Green Texture.png"
                iconBackgroundColor="bg-secondary/90"
                ariaLabel="Ir al módulo de información de finanzas públicas"
              />

              {/* Data Search Card */}
              <QuickAccessCard
                title="Explora los Datos"
                description="Encuentra documentos fiscales, informes y datos específicos de manera rápida y eficiente."
                icon={<Search className="h-10 w-10" />}
                href="/busqueda-documentos"
                backgroundImage="/images/Green Texture.png"
                iconBackgroundColor="bg-secondary/90"
                ariaLabel="Ir al módulo de búsqueda de datos y documentos"
              />
            </div>
          </div>
        </section>

        {/* Citizen Participation Section */}
        <section className="py-12 lg:py-16 bg-tertiary/5">
          <div className="max-w-none mx-auto px-4 lg:px-24">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Chica Image (más pequeña) */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative rounded-2xl overflow-hidden shadow-xl"
                >
                  <Image
                    src="/images/chica.jpeg"
                    alt="Ciudadana participando en transparencia fiscal"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover max-h-[500px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-base font-medium">Tu participación construye un gobierno más transparente</p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="space-y-6"
              >
                <SectionTitle
                  title="Participación Ciudadana"
                  titleClassName="text-3xl lg:text-4xl text-tertiary"
                />
                <div>
                  <p className="text-base text-foreground mb-4">
                    Tu voz es fundamental para construir un gobierno más transparente y cercano a la ciudadanía. 
                    En el Portal de Transparencia Fiscal, creemos que la participación activa de la comunidad 
                    es clave para mejorar la gestión pública y fortalecer la confianza en las instituciones.
                  </p>
                  <p className="text-base text-foreground">
                    Únete a la conversación, comparte tus ideas, propuestas y comentarios sobre el manejo de 
                    recursos públicos. Juntos podemos crear un Estado de Morelos más justo, eficiente y 
                    comprometido con el bienestar de todos sus habitantes.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <CircularButtonWithSideLabel
                    href="/participacion-ciudadana"
                    size="md"
                    color="tertiary"
                    label="Haz clic para participar"
                    description="Tu contribución marca la diferencia"
                    className="flex-shrink-0"
                  />

                  <div className="flex-1">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-tertiary/20">
                      <h4 className="font-semibold text-foreground mb-2">¿Cómo puedes participar?</h4>
                      <ul className="space-y-2 text-sm text-foreground">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                          Envía comentarios y sugerencias
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-tertiary/70"></div>
                          Participa en consultas públicas
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-tertiary/40"></div>
                          Contribuye al presupuesto participativo
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* News Section - NewsCarousel consume noticias desde estrategias-comunicacion API */}
        {loading && (
          <section className="py-12 lg:py-16">
            <div className="max-w-none mx-auto px-4 lg:px-24">
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-5 w-96 mb-8" />
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[320px] rounded-xl" />
                ))}
              </div>
            </div>
          </section>
        )}

        {error && (
          <section className="py-12 lg:py-16">
            <div className="max-w-none mx-auto px-4 lg:px-24">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          </section>
        )}

        {!loading && !error && (
          <NewsCarousel
            title="Noticias y Anuncios"
            subtitle="Mantente al día con las últimas novedades y eventos"
            news={noticias}
            itemsToShow={3}
            autoPlay={true}
            autoPlayInterval={5000}
            showNavigation={true}
            className=""
          />
        )}

        {/* Links of Interest Section */}
        <LinksCarousel
          title="Ligas de Interés"
          subtitle="Portales y recursos relacionados con transparencia fiscal y gobierno digital"
          itemsToShow={5}
          autoPlay={true}
          autoPlayInterval={6000}
          showNavigation={true}
          className=" to-background"
        />
      </main>

      <PortalFooter />
    </div>
  )
}