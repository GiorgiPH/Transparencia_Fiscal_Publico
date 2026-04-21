"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface HeroVideoPortalProps {
  /**
   * Ruta del archivo de video
   */
  videoSrc: string
  /**
   * Ruta de la imagen poster (primer frame optimizado)
   */
  posterSrc?: string
  /**
   * Texto opcional para mostrar sobre el video
   */
  title?: string
  /**
   * Subtítulo opcional
   */
  subtitle?: string
  /**
   * Clases CSS adicionales para el contenedor
   */
  className?: string
  /**
   * Altura del componente
   */
  height?: string
  /**
   * Ancho del componente
   */
  width?: string
  /**
   * Radio de las esquinas (coincide con UI del proyecto)
   */
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  /**
   * Mostrar overlay de gradiente
   */
  showOverlay?: boolean
  /**
   * Prioridad de carga (para Next.js Image/Video)
   */
  priority?: boolean
}

export function HeroVideoPortal({
  videoSrc,
  posterSrc,
  title,
  subtitle,
  className = "",
  height = "100%",
  width = "100%",
  rounded = "xl",
  showOverlay = true,
  priority = true,
}: HeroVideoPortalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Mapeo de clases de radio
  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  }

  // Efecto para manejar la carga del video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoaded(true)
      // Intentar reproducir automáticamente (solo si ya está cargado)
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log("Auto-play prevented:", error)
            // En caso de que el auto-play sea bloqueado, al menos mostrar el video cargado
          })
      }
    }

    const handlePlaying = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("playing", handlePlaying)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("playing", handlePlaying)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  return (
    <div
      className={`relative overflow-hidden ${roundedClasses[rounded]} ${className}`}
      style={{ height, width }}
    >
      {/* Contenedor del video */}
      <div className="relative w-full h-full">
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          poster={posterSrc}
          aria-label={title || "Video de fondo del portal"}
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback para navegadores que no soportan video */}
          <div className="absolute inset-0 bg-background flex items-center justify-center">
            <p className="text-foreground">Tu navegador no soporta la reproducción de video.</p>
          </div>
        </video>

        {/* Overlay de gradiente institucional */}
        {showOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        )}

        {/* Indicador de carga */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-background flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
              <p className="text-foreground text-sm">Cargando video...</p>
            </div>
          </div>
        )}

        {/* Contenido sobre el video (título y subtítulo) */}
        {(title || subtitle) && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title && (
              <h2 className="text-2xl lg:text-3xl font-bold mb-2 drop-shadow-lg">{title}</h2>
            )}
            {subtitle && (
              <p className="text-lg lg:text-xl text-white/90 drop-shadow-md">{subtitle}</p>
            )}
          </motion.div>
        )}

        {/* Indicador de reproducción (solo para debugging/visual) */}
        {process.env.NODE_ENV === "development" && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-20">
            {isPlaying ? "▶ Reproduciendo" : "⏸ Pausado"}
          </div>
        )}
      </div>

      {/* Estilos para mejorar la experiencia de carga */}
      <style jsx>{`
        video {
          background-color: #000; /* Fondo negro mientras carga */
        }
        
        @media (prefers-reduced-motion: reduce) {
          video {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}