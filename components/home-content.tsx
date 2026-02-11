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
import { motion } from "framer-motion"
import { newsItems } from "@/lib/news-data"

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
    <div className="min-h-screen bg-transparent">
      {/* Home Header */}
      <HomeHeader onMenuClick={handleMenuClick} />

      {/* Sidebar (only shown when hamburger is clicked) */}
      <PortalSidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center border-b" style={{ backgroundImage: "url('/images/hero-background.jpg')" }}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-10">
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

        {/* Quick Access Block */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <SectionTitle
              title="Módulos de Consulta"
              subtitle="Acceso directo a las herramientas de fiscalización y datos abiertos."
              titleClassName="text-3xl lg:text-4xl"

            />

            <div className="grid gap-8 md:grid-cols-2 max-w-7xl mx-auto">
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

        {/* Informational Block */}
        <section className="py-12 lg:py-16  opacity-80">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <SectionTitle
              title="Información y Recursos"
              subtitle="Conoce más sobre transparencia fiscal y cómo participar"
              titleClassName="text-3xl lg:text-4xl"

            />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Access Mechanisms */}
              <InstitutionalCard
                title="Conoce tu Portal"
                subtitle="Navega y Explora"
                description="Descubre las secciones, funcionalidades y contenidos disponibles para consultar información de manera clara y organizada."
                icon={<Lock className="h-14 w-14 text-primary" />}
                iconBackgroundColor="bg-primary/10"
                iconRotation={3}
                actionText="Conocer más"
                actionHref="/mecanismos-acceso"
                ariaLabel="Conocer más sobre mecanismos de acceso"
              />

              {/* Citizen Participation */}
              <InstitutionalCard
                title="Participa y Opina"
                subtitle="Tu Voz Importa"
                description="Participa en el envio de comentarios y contribuye al presupuesto participativo."
                icon={<Users className="h-14 w-14 text-accent" />}
                iconBackgroundColor="bg-accent/10"
                iconRotation={-3}
                actionText="Enviar mensaje"
                actionHref="/participacion-ciudadana"
                ariaLabel="Enviar mensaje sobre participación ciudadana"
              />

              {/* Communication Strategies */}
              <InstitutionalCard
                title="Estrategias de Comunicación"
                subtitle="Mantente Informado"
                description="Mantente informado a través de nuestros canales oficiales, redes sociales y campañas de comunicación."
                icon={<Megaphone className="h-14 w-14 text-secondary" />}
                iconBackgroundColor="bg-secondary/10"
                iconRotation={6}
                actionText="Ver canales de contacto"
                actionHref="/estrategias-comunicacion"
                ariaLabel="Ver canales de contacto de comunicación"
              />

              {/* Open Data Policy */}
              <InstitutionalCard
                title="Política de Datos Abiertos"
                subtitle="Datos para Análisis"
                description="Accede y reutiliza conjuntos de datos públicos en formatos abiertos para análisis e investigación."
                icon={<Database className="h-14 w-14 text-primary" />}
                iconBackgroundColor="bg-primary/10"
                iconRotation={-6}
                actionText="Ver política"
                actionHref="/datos-abiertos"
                ariaLabel="Ver política de datos abiertos"
              />

              {/* Regulatory Framework */}
              <InstitutionalCard
                title="Conoce las Leyes"
                subtitle="Fundamentos Legales"
                description="Consulta las leyes, reglamentos y normativas que fundamentan la transparencia fiscal en Morelos."
                icon={<Scale className="h-14 w-14 text-accent" />}
                iconBackgroundColor="bg-accent/10"
                iconRotation={3}
                actionText="Consultar marco normativo"
                actionHref="/marco-normativo"
                ariaLabel="Consultar marco normativo"
                className="sm:col-span-2 lg:col-span-1"
              />
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <SectionTitle
              title="Noticias y Anuncios"
              subtitle="Mantente al día con las últimas novedades y eventos"
              titleClassName="text-3xl lg:text-4xl"

            />

            {/* Coverflow Carousel */}
            <div className="relative max-w-6xl mx-auto">
              <CoverflowCarousel
                items={newsItems.map((item, index) => ({
                  id: item.id,
                  content: (
                    <div className="w-full h-full p-2">
                      <NewsCard
                        title={item.title}
                        date={item.date}
                        excerpt={item.excerpt}
                        image={item.image}
                        imageAlt={item.title}
                        url={item.url}
                        className="h-full"
                      />
                    </div>
                  )
                }))}
                currentIndex={currentNewsIndex}
                onNext={nextNews}
                onPrev={prevNews}
                onSelect={setCurrentNewsIndex}
                showNavigation={true}
                showDots={true}
              />
            </div>
          </div>
        </section>
      </main>

      <PortalFooter />
    </div>
  )
}
