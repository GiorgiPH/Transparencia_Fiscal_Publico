import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Si es true, usa max-w-none en vez de max-w-7xl.
   * Útil para carousels y secciones que necesitan ocupar todo el ancho.
   */
  fullWidth?: boolean
}

/**
 * Container reutilizable que centraliza max-width + padding lateral responsive.
 *
 * Uso normal (max-w-7xl + px-4 lg:px-8):
 *   <Container>...</Container>
 *
 * Uso full-width (para carousels):
 *   <Container fullWidth>...</Container>
 *
 * Sigue las convenciones de shadcn/ui: cn(), forwardRef.
 */
const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, fullWidth = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 lg:px-15",
          fullWidth ? "max-w-none" : "max-w-7xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Container.displayName = "Container"

export { Container }
