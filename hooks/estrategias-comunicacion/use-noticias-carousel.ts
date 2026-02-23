"use client"

import { useState, useEffect } from 'react'
import { estrategiasComunicacionService } from '@/services/estrategias-comunicacion/estrategias-comunicacion.service'
import { NoticiaCarousel } from '@/services/estrategias-comunicacion/types'

interface UseNoticiasCarouselReturn {
  noticias: NoticiaCarousel[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

/**
 * Hook personalizado para obtener noticias optimizadas para carrusel
 * 
 * @param limit - Número máximo de noticias a obtener (máximo 5 para optimización)
 * @returns Objeto con noticias, estado de carga, error y función de refresco
 */
export function useNoticiasCarousel(limit: number = 5): UseNoticiasCarouselReturn {
  const [noticias, setNoticias] = useState<NoticiaCarousel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNoticias = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Asegurar que el límite máximo sea 5 para optimización
      const finalLimit = Math.min(limit, 5)
      const data = await estrategiasComunicacionService.getNoticiasCarousel(finalLimit)
      
      setNoticias(data)
    } catch (err) {
      console.error('Error al obtener noticias para carrusel:', err)
      setError('No se pudieron cargar las noticias. Por favor, intente nuevamente.')
      setNoticias([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNoticias()
  }, [limit])

  return {
    noticias,
    loading,
    error,
    refresh: fetchNoticias
  }
}

/**
 * Función auxiliar para convertir NoticiaCarousel a NewsItem (compatible con NewsCarousel)
 */
export function mapNoticiaCarouselToNewsItem(noticia: NoticiaCarousel) {
  const url = noticia.url || noticia.link || `/estrategias-comunicacion/noticias/${noticia.id}`
  return {
    id: noticia.id.toString(),
    title: noticia.titulo,
    date: noticia.fecha_formateada,
    excerpt: noticia.descripcion_corta,
    image: noticia.imagen_url || '/images/placeholder-news.jpg',
    imageAlt: noticia.imagen_alt,
    link: url,
    url,
  }
}

/**
 * Hook simplificado que devuelve noticias ya mapeadas para NewsCarousel
 */
export function useNoticiasCarouselMapped(limit: number = 5) {
  const { noticias, loading, error, refresh } = useNoticiasCarousel(limit)
  
  const noticiasMapeadas = noticias.map(mapNoticiaCarouselToNewsItem)
  
  return {
    noticias: noticiasMapeadas,
    loading,
    error,
    refresh
  }
}