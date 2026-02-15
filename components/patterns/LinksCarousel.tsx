"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/patterns/SectionTitle"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export interface LinkItem {
  id: string
  title: string
  image: string
  url: string
  alt?: string
}

interface LinksCarouselProps {
  title?: string
  subtitle?: string
  links?: LinkItem[]
  itemsToShow?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  showNavigation?: boolean
  className?: string
}

export function LinksCarousel({
  title = "Ligas de Interés",
  subtitle = "Recursos y portales relacionados con transparencia fiscal",
  links = [],
  itemsToShow = 5,
  autoPlay = false,
  autoPlayInterval = 5000,
  showNavigation = true,
  className = ""
}: LinksCarouselProps) {
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

  // Si no hay links, mostrar placeholder
  if (links.length === 0) {
    links = [
      {
        id: "1",
        title: "AREGIONAL",
        image: "/images/aregional.png",
        url: "#",
        alt: "AREGIONAL"
      },
      {
        id: "2",
        title: "Portal Transparencia Nacional",
        image: "/images/portal-transparencia-nacional.png",
        url: "#",
        alt: "Portal Transparencia Nacional"
      },
      {
        id: "3",
        title: "Digital Morelos",
        image: "/images/digital-morelos.png",
        url: "#",
        alt: "Digital Morelos"
      },
      {
        id: "4",
        title: "Morelos Portal",
        image: "/images/morelos-portal.png",
        url: "#",
        alt: "Morelos Portal"
      },
      {
        id: "5",
        title: "Gobierno del Estado",
        image: "/images/gobierno-estado.png",
        url: "#",
        alt: "Gobierno del Estado"
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
              {links.map((link, index) => (
                <CarouselItem
                  key={link.id}
                  className="pl-4"
                  style={{ flexBasis: itemWidth }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative overflow-hidden rounded-xl border-2 border-primary/10 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-primary/30 h-full">
                        <div className="aspect-square relative overflow-hidden">
                          <Image
                            src={link.image}
                            alt={link.alt || link.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-center font-semibold text-foreground text-sm lg:text-base line-clamp-2 group-hover:text-primary transition-colors">
                            {link.title}
                          </h3>
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                            Visitar
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {showNavigation && links.length > itemsToShow && (
              <>
                <CarouselPrevious className="left-0 lg:-left-12 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-white hover:border-primary/40" />
                <CarouselNext className="right-0 lg:-right-12 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-white hover:border-primary/40" />
              </>
            )}
          </Carousel>

          {/* Indicadores de posición */}
          {links.length > itemsToShow && (
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
                {Array.from({ length: Math.ceil(links.length / itemsToShow) }).map((_, i) => (
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
            Desplaza el carrusel para ver más ligas de interés. Haz clic en cualquier imagen para visitar el portal.
          </p>
        </div>
      </div>
    </section>
  )
}

// Componente simplificado para uso rápido
export function SimpleLinksCarousel({ links }: { links: LinkItem[] }) {
  return <LinksCarousel links={links} />
}