"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/patterns/SectionTitle"
import { NewsCard } from "@/components/patterns/NewsCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export interface NewsItem {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  imageAlt: string
  url: string
}

interface NewsCarouselProps {
  title?: string
  subtitle?: string
  news?: NewsItem[]
  itemsToShow?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showNavigation?: boolean
  className?: string
}

export function NewsCarousel({
  title = "Noticias y Anuncios",
  subtitle = "Mantente al día con las últimas novedades y eventos",
  news = [],
  itemsToShow = 3,
  autoPlay = false,
  autoPlayInterval = 5000,
  showNavigation = true,
  className = ""
}: NewsCarouselProps) {
  const [api, setApi] = useState<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Configurar autoplay
  useEffect(() => {
    if (!autoPlay || !api) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [api, autoPlay, autoPlayInterval])

  // Actualizar índice actual
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  // Si no hay noticias, mostrar placeholder
  if (news.length === 0) {
    news = [
      {
        id: "1",
        title: "Portal de Transparencia Fiscal lanza nueva plataforma",
        date: "15 Feb 2026",
        excerpt: "El Gobierno del Estado de Morelos presenta una plataforma renovada para mejorar el acceso a la información pública.",
        image: "/images/noticia1.jpeg",
        imageAlt: "Lanzamiento de nueva plataforma",
        url: "#"
      },
      {
        id: "2",
        title: "Más de 1,000 documentos públicos disponibles en línea",
        date: "10 Feb 2026",
        excerpt: "La Secretaría de Finanzas ha digitalizado y publicado más de 1,000 documentos fiscales para consulta ciudadana.",
        image: "/images/noticia2.jpeg",
        imageAlt: "Documentos públicos digitalizados",
        url: "#"
      },
      {
        id: "3",
        title: "Foro de Participación Ciudadana en transparencia fiscal",
        date: "5 Feb 2026",
        excerpt: "Se realizará un foro abierto para recibir propuestas ciudadanas sobre mejora en la transparencia fiscal.",
        image: "/images/noticia3.jpg",
        imageAlt: "Foro de participación ciudadana",
        url: "#"
      }
    ]
  }

  // Calcular el tamaño de cada item basado en itemsToShow
  const itemWidth = `${100 / itemsToShow}%`

  return (
    <section className={`py-12 lg:py-16 ${className}`}>
      <div className="max-w-none mx-auto px-4 lg:px-24">
        <SectionTitle
          title={title}
          subtitle={subtitle}
          titleClassName="text-3xl lg:text-4xl"
        />

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
              containScroll: "trimSnaps",
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {news.map((item, index) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4"
                  style={{ flexBasis: itemWidth }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NewsCard
                      title={item.title}
                      date={item.date}
                      excerpt={item.excerpt}
                      image={item.image}
                      imageAlt={item.imageAlt}
                      url={item.url}
                      className="h-full"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {showNavigation && news.length > itemsToShow && (
              <>
                <CarouselPrevious className="left-0 lg:-left-12 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-white hover:border-primary/40 text-primary" />
                <CarouselNext className="right-0 lg:-right-12 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-white hover:border-primary/40 text-primary" />
              </>
            )}
          </Carousel>

          {/* Indicadores de posición */}
          {news.length > itemsToShow && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => api?.scrollPrev()}
                disabled={!api?.canScrollPrev()}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.ceil(news.length / itemsToShow) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i * itemsToShow)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      Math.floor(currentIndex / itemsToShow) === i
                        ? "w-8 bg-primary"
                        : "w-2 bg-primary/30 hover:bg-primary/50"
                    }`}
                    aria-label={`Ir al grupo ${i + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => api?.scrollNext()}
                disabled={!api?.canScrollNext()}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Desplaza el carrusel para ver más noticias. Haz clic en cualquier noticia para leerla completa.
          </p>
        </div>
      </div>
    </section>
  )
}

// Componente simplificado para uso rápido
export function SimpleNewsCarousel({ news }: { news: NewsItem[] }) {
  return <NewsCarousel news={news} />
}