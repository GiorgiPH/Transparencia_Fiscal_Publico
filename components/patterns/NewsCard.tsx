import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NewsCardProps {
  title: string
  date: string
  excerpt: string
  image: string
  imageAlt: string
  className?: string
  url: string
}

export function NewsCard({
  title,
  date,
  excerpt,
  image,
  imageAlt,
  className,
  url,
}: NewsCardProps) {
  return (
    <div className={cn("h-full", className)}>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <Card className="border-2 border-primary/10 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30 h-full group">
          <div className="flex flex-col h-full">
            {/* Contenedor de Imagen con fecha en la parte superior */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Fecha en la parte superior izquierda */}
              <div className="absolute top-3 left-3">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Calendar className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium text-foreground">{date}</span>
                </div>
              </div>
              
              {/* Etiqueta "Noticia" en la parte superior derecha */}
              <div className="absolute top-3 right-3">
                <div className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Noticia
                </div>
              </div>
            </div>
      
            {/* Contenedor de Texto - Exactamente igual al de ligas de interés */}
            <div className="p-4 flex flex-col flex-1">
              <div className="mb-2">
                <h3 className="text-center font-semibold text-foreground text-sm lg:text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {title}
                </h3>
              </div>
              
              <p className="text-center text-sm text-muted-foreground line-clamp-3">
                {excerpt}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}
