"use client"

import { ReactNode } from "react"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface QuickAccessCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  backgroundImage?: string
  iconBackgroundColor?: string
  className?: string
  ariaLabel?: string
}

// Variantes de animación para el card (las mismas que InstitutionalCard)
const quickAccessCardVariants = {
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

export function QuickAccessCard({
  title,
  description,
  icon,
  href,
  backgroundImage = "/images/Green Texture.png",
  iconBackgroundColor = "bg-secondary/90",
  className,
  ariaLabel,
}: QuickAccessCardProps) {
  return (
    <motion.div
      className={cn("h-full", className)}
      variants={quickAccessCardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      style={{ cursor: "pointer" }}
    >
      <Link href={href} aria-label={ariaLabel || title}>
        <Card className={cn(
          "h-full p-0 border-2 overflow-hidden relative",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-secondary/5",
          "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
        )}>
          <div className="flex flex-col md:flex-row h-full items-stretch">
            {/* Contenedor de Imagen */}
            <motion.div 
              className="relative md:w-1/2 min-h-[200px] w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
              >
                <div className="absolute inset-0 bg-secondary/20"></div>
              </div>
              
              {/* Icono centrado con animación */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring" as const,
                  stiffness: 150,
                  damping: 12,
                  delay: 0.2,
                  duration: 0.5
                }}
              >
                <motion.div 
                  className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg"
                  style={{ backgroundColor: iconBackgroundColor }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 200, damping: 10 }
                  }}
                >
                  {icon}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Lado derecho - Contenido */}
            <div className="md:w-1/2 p-6 lg:p-8 flex flex-col justify-between bg-white">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <CardTitle className="text-2xl font-bold text-foreground mb-3">
                    {title}
                  </CardTitle>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <CardDescription className="text-base text-muted-foreground mb-4">
                    {description}
                  </CardDescription>
                </motion.div>
              </div>
              
              {/* Botón con animación */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto"
              >
                <Button 
                  variant="outline" 
                  className="w-full justify-between group-hover:bg-secondary/10 group-hover:text-secondary border-secondary/30"
                >
                  Ir al módulo
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}