"use client"

import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CoverflowCarouselProps {
  items: {
    id: number | string
    content: ReactNode
  }[]
  currentIndex: number
  onNext: () => void
  onPrev: () => void
  onSelect: (index: number) => void
  className?: string
  showNavigation?: boolean
  showDots?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function CoverflowCarousel({
  items,
  currentIndex,
  onNext,
  onPrev,
  onSelect,
  className,
  showNavigation = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000
}: CoverflowCarouselProps) {
  // Calcular índices para los slides visibles
  const getSlidePosition = (index: number) => {
    const distance = index - currentIndex
    const totalItems = items.length
    
    // Ajustar distancia para manejar el wrap-around
    let adjustedDistance = distance
    if (distance > totalItems / 2) adjustedDistance = distance - totalItems
    if (distance < -totalItems / 2) adjustedDistance = distance + totalItems
    
    return adjustedDistance
  }

  // Estilos para cada slide basado en su posición
  const getSlideStyle = (distance: number) => {
    const absDistance = Math.abs(distance)
    
    if (absDistance === 0) {
      // Slide central
      return {
        zIndex: 30,
        scale: 1,
        x: 0,
        opacity: 1,
        rotateY: 0,
        filter: "brightness(1)",
      }
    } else if (absDistance === 1) {
      // Slides adyacentes
      const direction = distance > 0 ? 1 : -1
      return {
        zIndex: 20,
        scale: 0.85,
        x: direction * 180,
        opacity: 0.8,
        rotateY: direction * -25,
        filter: "brightness(0.85)",
      }
    } else if (absDistance === 2) {
      // Slides más lejanos
      const direction = distance > 0 ? 1 : -1
      return {
        zIndex: 10,
        scale: 0.7,
        x: direction * 320,
        opacity: 0.6,
        rotateY: direction * -40,
        filter: "brightness(0.7)",
      }
    } else {
      // Slides ocultos
      return {
        zIndex: 0,
        scale: 0.5,
        x: distance > 0 ? 500 : -500,
        opacity: 0,
        rotateY: distance > 0 ? -60 : 60,
        filter: "brightness(0.5)",
      }
    }
  }

  return (
    <div className={cn("relative w-full h-[550px] overflow-hidden", className)}>
      {/* Contenedor del carrusel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {items.map((item, index) => {
            const distance = getSlidePosition(index)
            const style = getSlideStyle(distance)
            
            return (
              <motion.div
                key={item.id}
                className="absolute w-full max-w-5xl h-[500px] cursor-pointer"
                initial={style}
                animate={style}
                exit={style}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  duration: 0.5
                }}
                onClick={() => onSelect(index)}
                style={{
                  perspective: "1000px",
                }}
              >
                <motion.div
                  className="w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    scale: distance === 0 ? 1.02 : style.scale * 1.05,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                >
                  {item.content}
                </motion.div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Navegación - Estilo similar al carrusel de ligas */}
      {showNavigation && items.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 lg:-left-12 top-1/2 -translate-y-1/2 z-40 bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-white hover:border-primary/40 text-primary"
            onClick={onPrev}
            aria-label="Noticia anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 z-40 bg-white/80 backdrop-blur-sm border-primary/20 hover:bg-white hover:border-primary/40 text-primary"
            onClick={onNext}
            aria-label="Siguiente noticia"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Indicadores de puntos - Estilo similar al carrusel de ligas */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-primary/30 hover:bg-primary/50"
              )}
              aria-label={`Ir a noticia ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Overlay de gradiente para efecto de profundidad */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-background/50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-background/50 to-transparent" />
      </div>
    </div>
  )
}

// Componente wrapper para usar con NewsCard
interface NewsCoverflowCarouselProps {
  items: {
    id: number | string
    title: string
    date: string
    excerpt: string
    image: string
    imageAlt: string
  }[]
  currentIndex: number
  onNext: () => void
  onPrev: () => void
  onSelect: (index: number) => void
  className?: string
}

export function NewsCoverflowCarousel({
  items,
  currentIndex,
  onNext,
  onPrev,
  onSelect,
  className,
}: NewsCoverflowCarouselProps) {
  return (
    <CoverflowCarousel
      items={items.map((item) => ({
        id: item.id,
        content: (
          <div className="w-full h-full">
            {/* Aquí se renderizaría el NewsCard, pero lo haremos en home-content.tsx */}
            <div className="w-full h-full p-4">
              <div className="w-full h-full bg-tertiary rounded-xl overflow-hidden shadow-2xl">
                {/* Contenido será reemplazado por NewsCard real */}
                <div className="w-full h-full flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-48 md:h-full bg-gray-800 relative">
                    {/* Imagen placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-tertiary/80 to-tertiary" />
                  </div>
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <div className="text-sm text-white/80 mb-2">{item.date}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.excerpt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }))}
      currentIndex={currentIndex}
      onNext={onNext}
      onPrev={onPrev}
      onSelect={onSelect}
      className={className}
    />
  )
}