import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"

interface SectionTitleProps {
  title: string
  subtitle?: string
  imageSrc?: string
  className?: string
  imageClassName?: string
  titleClassName?: string
  subtitleClassName?: string
  animationDelay?: number
  animateOnView?: boolean
}

// Variantes de animación para el contenedor principal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
}

// Variantes de animación para la imagen
const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -30 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      duration: 0.6
    }
  }
}

// Variantes de animación para el título
const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    x: -10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 12,
      duration: 0.5
    }
  }
}

// Variantes de animación para el subtítulo
const subtitleVariants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 10,
      delay: 0.2,
      duration: 0.4
    }
  }
}

export function SectionTitle({
  title,
  subtitle,
  imageSrc = "/quetzal.svg",
  className,
  imageClassName,
  titleClassName,
  subtitleClassName,
  animationDelay = 0,
  animateOnView = true
}: SectionTitleProps) {
  
  // Configuración de animación basada en props
  const animationProps = animateOnView ? {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-50px" }
  } : {
    initial: "hidden",
    animate: "visible"
  }

  return (
    <motion.div 
      className={cn("flex items-center justify-center gap-4 mb-10 w-full", className)}
      variants={containerVariants}
      {...animationProps}
      transition={{ delay: animationDelay }}
    >
      
      {/* Lado Izquierdo - Imagen del Quetzal con animación */}
      <motion.div 
        className={cn("flex-shrink-0 relative h-12 w-12", imageClassName)}
        variants={imageVariants}
      >
        <Image
          src={imageSrc}
          alt="Icono Quetzal"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Lado Derecho - Título y subtítulo con animación */}
      <div className="flex flex-col">
        <motion.h2 
          className={cn(
            "font-bold uppercase tracking-tight leading-none text-secondary border-tertiary/30",
            "text-xl sm:text-2xl md:text-3xl",
            titleClassName
          )}
          variants={titleVariants}
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p 
            className={cn(
              "text-muted-foreground mt-1 text-pretty",
              "text-sm sm:text-base md:text-lg",
              subtitleClassName
            )}
            variants={subtitleVariants}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

// Componente de animación reutilizable para títulos
export function AnimatedTitle({
  children,
  className,
  delay = 0,
  animateOnView = true
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  animateOnView?: boolean
}) {
  const animationProps = animateOnView ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  } : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className={className}
      {...animationProps}
      transition={{
        type: "spring" as const,
        stiffness: 150,
        damping: 12,
        delay,
        duration: 0.5
      }}
    >
      {children}
    </motion.div>
  )
}

// Componente de animación reutilizable para subtítulos
export function AnimatedSubtitle({
  children,
  className,
  delay = 0.2,
  animateOnView = true
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  animateOnView?: boolean
}) {
  const animationProps = animateOnView ? {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  } : {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className={className}
      {...animationProps}
      transition={{
        type: "spring" as const,
        stiffness: 120,
        damping: 10,
        delay,
        duration: 0.4
      }}
    >
      {children}
    </motion.div>
  )
}
