'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { busquedaDocumentosService } from '@/services/busqueda-documentos';
import { Documento, FiltrosBusqueda, Paginacion, OpcionesFiltros } from '@/services/busqueda-documentos/types';

// ... (PAGINACION_POR_DEFECTO y FILTROS_POR_DEFECTO se mantienen igual)

interface UseBusquedaDocumentosReturn {
  // Estado
  documentos: Documento[];
  paginacion: Paginacion;
  loading: boolean;
  error: string | null;
  filtros: FiltrosBusqueda;
  opcionesFiltros: OpcionesFiltros;
  
  // Funciones
  buscarDocumentos: (nuevosFiltros?: Partial<FiltrosBusqueda>) => Promise<void>;
  actualizarFiltro: <K extends keyof FiltrosBusqueda>(campo: K, valor: FiltrosBusqueda[K]) => void;
  limpiarFiltros: () => void;
  cambiarPagina: (pagina: number) => void;
  cambiarOrdenamiento: (campo: string, direccion: 'asc' | 'desc') => void;
  descargarDocumento: (id: number, nombreArchivo?: string) => void;
  
  // Utilidades
  totalDocumentos: number;
  hayResultados: boolean ;
  esDocumentoDescargable: (documento: Documento) => boolean;
}

const PAGINACION_POR_DEFECTO: Paginacion = {
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

const FILTROS_POR_DEFECTO: FiltrosBusqueda = {
  page: 1,
  pageSize: 10,
  orderBy: 'fecha_publicacion',
  order: 'desc',
};
export function useBusquedaDocumentos(filtrosIniciales: Partial<FiltrosBusqueda> = {}): UseBusquedaDocumentosReturn {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [paginacion, setPaginacion] = useState<Paginacion>(PAGINACION_POR_DEFECTO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 1. Los filtros son la "Fuente de Verdad"
  const [filtros, setFiltros] = useState<FiltrosBusqueda>({
    ...FILTROS_POR_DEFECTO,
    ...filtrosIniciales,
  });

  // Referencia para evitar colisiones en peticiones asíncronas (Race Conditions)
  const abortControllerRef = useRef<AbortController | null>(null);

  const opcionesFiltros = useMemo(() => busquedaDocumentosService.getOpcionesFiltros(), []);

  // 2. Función de carga centralizada
  // No recibe parámetros, usa directamente el estado 'filtros'
  const ejecutarBusqueda = useCallback(async () => {
    // Cancelar petición anterior si aún está en curso
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const resultado = await busquedaDocumentosService.buscarDocumentos(filtros);
      
      // IMPORTANTE: Si el servicio no trae documentos, garantizamos un array vacío
      setDocumentos(resultado.documentos || []);
      setPaginacion(resultado.paginacion || PAGINACION_POR_DEFECTO);
      
    } catch (err: any) {
      if (err.name === 'AbortError') return; // Ignorar si fue cancelada manualmente
      
      console.error('Error al buscar documentos:', err);
      setError(err?.message || 'Error al buscar documentos.');
      setDocumentos([]); // Limpiar tabla en caso de error
      setPaginacion(PAGINACION_POR_DEFECTO);
    } finally {
      setLoading(false);
    }
  }, [filtros]); // Se recrea cada vez que 'filtros' cambia

  // 3. Efecto reactivo: Cualquier cambio en filtros dispara la búsqueda
  useEffect(() => {
    ejecutarBusqueda();
    
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [ejecutarBusqueda]);

  // 4. Helpers para actualizar el estado de filtros
  const actualizarFiltro = useCallback(<K extends keyof FiltrosBusqueda>(
    campo: K, 
    valor: FiltrosBusqueda[K]
  ) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor,
      page: 1, // Siempre reseteamos a página 1 al filtrar
    }));
  }, []);

  const buscarDocumentos = useCallback(async (nuevosFiltros?: Partial<FiltrosBusqueda>) => {
    if (nuevosFiltros) {
      setFiltros(prev => ({ ...prev, ...nuevosFiltros, page: 1 }));
    } else {
      // Si se llama sin argumentos (ej. botón refrescar), forzamos ejecución
      ejecutarBusqueda();
    }
  }, [ejecutarBusqueda]);

  const limpiarFiltros = useCallback(() => {
    setFiltros({
      ...FILTROS_POR_DEFECTO,
      ...filtrosIniciales,
    });
  }, [filtrosIniciales]);

  const cambiarPagina = useCallback((pagina: number) => {
    setFiltros(prev => ({ ...prev, page: pagina }));
  }, []);

  const cambiarOrdenamiento = useCallback((campo: string, direccion: 'asc' | 'desc') => {
    setFiltros(prev => ({ 
      ...prev, 
      orderBy: campo, 
      order: direccion,
      page: 1 
    }));
  }, []);

  const descargarDocumento = useCallback((id: number, nombreArchivo?: string) => {
    busquedaDocumentosService.descargarDocumento(id, nombreArchivo);
  }, []);

  const esDocumentoDescargable = useCallback((documento: Documento): boolean => {
    return busquedaDocumentosService.esDocumentoDescargable(documento);
  }, []);

  return {
    documentos,
    paginacion,
    loading,
    error,
    filtros,
    opcionesFiltros,
    buscarDocumentos,
    actualizarFiltro,
    limpiarFiltros,
    cambiarPagina,
    cambiarOrdenamiento,
    descargarDocumento,
    totalDocumentos: paginacion.total,
    hayResultados: documentos.length > 0,
    esDocumentoDescargable,
  };
}