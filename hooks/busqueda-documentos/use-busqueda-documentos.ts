'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { busquedaDocumentosService } from '@/services/busqueda-documentos';
import { Documento, FiltrosBusqueda, Paginacion, OpcionesFiltros } from '@/services/busqueda-documentos/types';

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
  const [filtros, setFiltros] = useState<FiltrosBusqueda>({
    ...FILTROS_POR_DEFECTO,
    ...filtrosIniciales,
  });

  const opcionesFiltros = useMemo(() => busquedaDocumentosService.getOpcionesFiltros(), []);

  const buscarDocumentos = useCallback(async (nuevosFiltros?: Partial<FiltrosBusqueda>) => {
    try {
      // Forzar un nuevo array de referencia para asegurar re-renderizado
      setDocumentos(() => []);
      setLoading(true);
      setError(null);

      // Combinar filtros actuales con nuevos
      const filtrosActualizados = nuevosFiltros 
        ? { ...filtros, ...nuevosFiltros, page: 1 } // Resetear a página 1 cuando cambian filtros
        : filtros;

      setFiltros(filtrosActualizados);

      const resultado = await busquedaDocumentosService.buscarDocumentos(filtrosActualizados);
      console.log('Resultado de búsqueda:', resultado);
      
      // Siempre establecer documentos, incluso si está vacío, para forzar re-renderizado
      setDocumentos(resultado.documentos);
      setPaginacion(resultado.paginacion);
    } catch (err: any) {
      console.error('Error al buscar documentos:', err);
      setError(err?.message || 'Error al buscar documentos. Por favor, intenta nuevamente.');
      // Forzar un nuevo array vacío
      setDocumentos(() => []);
      setPaginacion(PAGINACION_POR_DEFECTO);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  const actualizarFiltro = useCallback(<K extends keyof FiltrosBusqueda>(
    campo: K, 
    valor: FiltrosBusqueda[K]
  ) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor,
    }));
  }, []);

  const limpiarFiltros = useCallback(() => {
    const filtrosLimpios: FiltrosBusqueda = {
      ...FILTROS_POR_DEFECTO,
      ...filtrosIniciales,
    };
    
    setFiltros(filtrosLimpios);
    buscarDocumentos(filtrosLimpios);
  }, [buscarDocumentos, filtrosIniciales]);

  const cambiarPagina = useCallback((pagina: number) => {
    buscarDocumentos({ page: pagina });
  }, [buscarDocumentos]);

  const cambiarOrdenamiento = useCallback((campo: string, direccion: 'asc' | 'desc') => {
    buscarDocumentos({ 
      orderBy: campo, 
      order: direccion,
      page: 1, // Resetear a primera página
    });
  }, [buscarDocumentos]);

  const descargarDocumento = useCallback((id: number, nombreArchivo?: string) => {
    busquedaDocumentosService.descargarDocumento(id, nombreArchivo);
  }, []);

  const esDocumentoDescargable = useCallback((documento: Documento): boolean => {
    return busquedaDocumentosService.esDocumentoDescargable(documento);
  }, []);

  // Buscar documentos al montar el componente
  useEffect(() => {
    buscarDocumentos();
  }, []);

  const totalDocumentos = paginacion.total;
  const hayResultados = documentos.length > 0;
  console.log("valor hayResultados: " + hayResultados, "documentos.length: " + documentos.length);

  // Usar useMemo para evitar recrear el objeto de retorno innecesariamente,
  // pero asegurarse de que cambie cuando documentos cambie
  const resultado = useMemo(() => ({
    // Estado
    documentos,
    paginacion,
    loading,
    error,
    filtros,
    opcionesFiltros,
    
    // Funciones
    buscarDocumentos,
    actualizarFiltro,
    limpiarFiltros,
    cambiarPagina,
    cambiarOrdenamiento,
    descargarDocumento,
    
    // Utilidades
    totalDocumentos,
    hayResultados,
    esDocumentoDescargable,
  }), [
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
    totalDocumentos,
    hayResultados,
    esDocumentoDescargable,
  ]);

  return resultado;
}
