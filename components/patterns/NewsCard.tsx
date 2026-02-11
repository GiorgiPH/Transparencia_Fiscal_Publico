import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface NewsCardProps {
  title: string
  date: string
  excerpt: string
  image: string
  imageAlt: string
  className?: string
  showButton?: boolean
  buttonText?: string
  url:string
}

// Variantes de animación para el card de noticias
const newsCardVariants = {
  initial: {
    y: 20,
    opacity: 0,
    scale: 0.95,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      duration: 0.5
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
      duration: 0.3
    }
  },
  tap: {
    y: -4,
    scale: 0.98,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 20,
      duration: 0.2
    }
  }
}

export function NewsCard({
  title,
  date,
  excerpt,
  image,
  imageAlt,
  className,
  showButton = true,
  url,
  buttonText = "Ver noticia completa"
}: NewsCardProps) {
  return (
    <motion.div
      className={cn("h-full", className)}
      variants={newsCardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <Card className={cn(
        "overflow-hidden border-tertiary/30 text-white p-0 h-full bg-tertiary",
        "relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-white/5",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
      )}>
        {/* items-stretch es CLAVE para que ambas columnas midan lo mismo */}
        <div className="flex flex-col md:flex-row items-stretch h-full">
          
          {/* Contenedor de Imagen con animación */}
          <motion.div 
            className="relative w-full md:w-2/5 h-64 md:h-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            {/* Overlay opcional para móvil */}
            <div className="absolute inset-0 bg-gradient-to-r from-tertiary/20 to-transparent md:hidden" />
          </motion.div>
    
          {/* Contenedor de Texto con animaciones - Más ancho */}
          <div className="w-full md:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
            <motion.div 
              className="flex items-center gap-2 text-sm text-white/80 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </motion.div>
            
            <motion.h3 
              className="text-2xl lg:text-3xl font-bold text-white mb-4 text-balance leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {title}
            </motion.h3>
            
            <motion.p 
              className="text-white/90 mb-6 text-pretty text-sm lg:text-base leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {excerpt}
            </motion.p>
            
            {showButton && url && (
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all h-9 px-4 py-2 border bg-white text-foreground border-white/30 hover:bg-white/90 shadow-lg relative z-10"

                onClick={(e) => e.stopPropagation()}
              >
                {buttonText}
                <ChevronRight className="ml-2 h-4 w-4" />
              </motion.a>
            )}

          </div>
        </div>
      </Card>
    </motion.div>
  )
}
