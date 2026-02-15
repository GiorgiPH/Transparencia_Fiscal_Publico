import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CircularButtonProps {
  href: string
  size?: "sm" | "md" | "lg"
  color?: "primary" | "accent" | "secondary" | "tertiary"
  label?: string
  description?: string
  className?: string
  icon?: React.ReactNode
  showPing?: boolean
}

export function CircularButton({
  href,
  size = "md",
  color = "primary",
  label = "Haz clic",
  description = "Para continuar",
  className,
  icon,
  showPing = true
}: CircularButtonProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24"
  }

  const colorClasses = {
    primary: "bg-primary hover:bg-primary/90",
    accent: "bg-accent hover:bg-accent/90",
    secondary: "bg-secondary hover:bg-secondary/90",
    tertiary: "bg-tertiary hover:bg-tertiary/90"
  }

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  }

  const defaultIcon = <ChevronRight className={cn("text-white transform group-hover:translate-x-1 transition-transform", iconSizes[size])} />

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("relative inline-flex flex-col items-center", className)}
    >
      <Link href={href} className="group">
        <button className={cn(
          "rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center",
          sizeClasses[size],
          colorClasses[color]
        )}>
          {icon || defaultIcon}
          {showPing && (
            <div className="absolute inset-0 rounded-full border-2 border-current opacity-30 group-hover:opacity-50 animate-ping"></div>
          )}
        </button>
      </Link>
      
      {(label || description) && (
        <div className="mt-3 text-center">
          {label && (
            <p className="text-sm font-medium text-foreground">{label}</p>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
    </motion.div>
  )
}

// Variante con etiqueta a la derecha (como en participación ciudadana)
export function CircularButtonWithSideLabel({
  href,
  size = "md",
  color = "primary",
  label = "Haz clic para participar",
  description = "Tu contribución marca la diferencia",
  className,
  icon,
  showPing = true
}: CircularButtonProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24"
  }

  const colorClasses = {
    primary: "bg-primary hover:bg-primary/90",
    accent: "bg-accent hover:bg-accent/90",
    secondary: "bg-secondary hover:bg-secondary/90",
    tertiary: "bg-tertiary hover:bg-tertiary/90"
  }

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  }

  const defaultIcon = <ChevronRight className={cn("text-white transform group-hover:translate-x-1 transition-transform", iconSizes[size])} />

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("flex flex-col sm:flex-row gap-4 items-center", className)}
    >
      <Link href={href} className="group">
        <button className={cn(
          "rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center",
          sizeClasses[size],
          colorClasses[color]
        )}>
          {icon || defaultIcon}
          
        </button>
      </Link>
      
      <div className="text-left">
        {label && (
          <p className="text-sm font-medium text-foreground">{label}</p>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </motion.div>
  )
}