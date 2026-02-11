import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {  ChevronRight, FileText, Folder } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Badge } from "../ui/badge"

export interface InstitutionalCardProps {
  // Header
  title: string
  headerBackgroundImage?: string
  headerClassName?: string
  
  // Content
  icon?: ReactNode
  iconBackgroundColor?: string
  iconRotation?: number
  
  // Text content
  subtitle?: string
  description: string | ReactNode
  
  // Action
  actionText?: string
  actionHref?: string
  onClick?: () => void
  ariaLabel?: string
  
  // Layout
  className?: string
  iconSize?: "sm" | "md" | "lg"
  showActionButton?: boolean
  
  // Custom content (overrides default)
  children?: ReactNode
}

export function InstitutionalCard({
  title,
  headerBackgroundImage = "/images/Brown Texture.png",
  headerClassName = "",
  
  icon,
  iconBackgroundColor = "bg-primary/10",
  iconRotation = 3,
  
  subtitle,
  description,
  
  actionText = "Conocer más",
  actionHref,
  onClick,
  ariaLabel,
  
  className = "",
  iconSize = "md",
  showActionButton = true,
  
  children,
}: InstitutionalCardProps) {
  const iconSizeClasses = {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-16 w-16",
  }
  
  const iconContainerSize = {
    sm: "w-1/3 max-w-24",
    md: "w-1/2 max-w-36",
    lg: "w-3/5 max-w-40",
  }
  
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  
  const renderMainContent = () => (
    <>
      {/* Header Section - Full Width */}
      <motion.div 
        className={cn(
          "relative h-20 bg-cover bg-center rounded-t-xl",
          headerClassName
        )}
        style={{ backgroundImage: `url('${headerBackgroundImage}')`,      backgroundPosition: "left bottom"   }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-secondary/30 rounded-t-xl"></div>
        <div className="absolute inset-0 flex items-center justify-start px-6">
          <motion.h3 
            className="text-xl font-bold text-white drop-shadow-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {title}
          </motion.h3>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="p-6 bg-white flex flex-col flex-grow relative">
        {/* Text Content - Left Aligned */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Subtitle */}
          {subtitle && (
            <motion.h4 
              className="text-lg font-semibold text-foreground mb-2 text-left"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {subtitle}
            </motion.h4>
          )}

          {/* Description */}
          <motion.div 
            className="text-muted-foreground text-left text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {description}
          </motion.div>
        </motion.div>

        {/* Icon/Illustration - Centered and pushed down */}
        {icon && (
          <motion.div 
            className="flex-grow flex items-end justify-center pb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring" as const,
              stiffness: 150,
              damping: 12,
              delay: 0.3,
              duration: 0.5
            }}
          >
            <div className={cn("flex items-center justify-center", iconContainerSize[iconSize])}>
              <motion.div 
                className="relative w-full aspect-square flex items-center justify-center"
                style={{ transform: `rotate(${iconRotation}deg)` }}
                whileHover={{ 
                  rotate: iconRotation + 5,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 200, damping: 10 }
                }}
              >
                <div className={cn("absolute inset-0 rounded-2xl", iconBackgroundColor)}></div>
                <div className="relative z-10" style={{ transform: `rotate(-${iconRotation}deg)` }}>
                  {icon}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
  
  // Variantes de animación para el card
  const cardVariants = {
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

  const renderBanner = () => (
    <motion.div
      className={cn(
        "h-12 bg-cover bg-center relative rounded-b-xl",
        headerClassName
      )}
      style={{ backgroundImage: `url('${headerBackgroundImage}')` }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      <div className="absolute inset-0 bg-secondary/30 rounded-b-xl"></div>
      {/* Action Button positioned at bottom right of the band */}
      {showActionButton && (actionHref || onClick) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-end px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Button 
            variant="link" 
            className="p-0 h-auto font-semibold text-white hover:text-white/80 flex items-center"
            onClick={!actionHref ? handleClick : undefined}
            aria-label={ariaLabel || actionText}
            asChild={!!actionHref}
          >
            {actionHref ? (
              <Link href={actionHref} className="flex items-center">
                {actionText}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              <span className="flex items-center">
                {actionText}
                <ChevronRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )

  const cardContent = (
    <>
      {renderMainContent()}
      {children && (
        <div className="p-6 pt-0 bg-white">
          {children}
        </div>
      )}
      {renderBanner()}
    </>
  )

  return (
    <motion.div
      className={cn("h-full", className)}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      style={{ cursor: onClick || actionHref ? "pointer" : "default" }}
    >
      <Card className={cn(
        "h-full p-0 border-2 overflow-hidden relative flex flex-col rounded-xl",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-secondary/5",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
      )}>
        {cardContent}
      </Card>
    </motion.div>
  )
}

// Variant for catalog items
export function CatalogInstitutionalCard({
  title,
  description,
  icon,
  level,
  isFolder = true,
  onClick,
  className,
}: {
  title: string
  description: string
  icon: ReactNode
  level: number
  isFolder?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <InstitutionalCard
      title={title}
      description={description}
      icon={icon}
      iconSize="sm"
      iconBackgroundColor="bg-muted"
      iconRotation={0}
      headerClassName="bg-muted"
      headerBackgroundImage=""
      subtitle={`Nivel ${level}`}
      actionText={isFolder ? "Abrir" : "Ver documentos"}
      onClick={onClick}
      ariaLabel={isFolder ? `Abrir ${title}` : `Ver documentos de ${title}`}
      className={className}
    />
  )
}

// Generic card component for catalogs and documents (not currently used)
export interface GenericCatalogCardProps {
  title: string
  description: string
  level: number
  order: number
  isFolder?: boolean
  onClick?: () => void
  className?: string
  children?: ReactNode
  showDocumentTypes?: boolean
  documentTypes?: Array<{
    id: number
    nombre: string
    descripcion?: string
  }>
}

export function GenericCatalogCard({
  title,
  description,
  level,
  order,
  isFolder = true,
  onClick,
  className = "",
  children,
  showDocumentTypes = false,
  documentTypes = [],
}: GenericCatalogCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation()
      onClick()
    }
  }

  return (
    <Card
      className={cn(
        "h-full transition-all hover:shadow-lg cursor-pointer group",
        className
      )}
      onClick={() => !isFolder && onClick?.()}
    >
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
          {isFolder ? (
            <Folder className="h-6 w-6" />
          ) : (
            <FileText className="h-6 w-6" />
          )}
        </div>
        <CardTitle className="text-xl font-bold text-balance group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-pretty line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Nivel {level} 
          </div>
          
          {!isFolder ? (
            <Badge variant="secondary" className="ml-2">
              Documentos
            </Badge>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="group-hover:bg-muted"
              onClick={handleClick}
            >
              Abrir
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>

        {/* Document Types Section */}
        {showDocumentTypes && documentTypes.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Tipos de documento disponibles:</h4>
            {/* <div className="flex flex-wrap gap-2">
              {documentTypes.map((type) => (
                <span
                  key={type.id}
                  className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-primary/10 text-primary"
                >
                  {type.nombre}
                </span>
              ))}
            </div> */}
          </div>
        )}

        {/* Custom Children Content */}
        {children}
      </CardContent>
    </Card>
  )
}