'use client';

import { useCallback } from 'react';
import { catalogos } from '@/services';

export const useDocumentos = () => {
  // Descargar documento
  const descargarDocumento = useCallback((documentoId: number, nombreDocumento: string, extension: string) => {
    const url = catalogos.catalogoService.getDocumentoDescargaUrl(documentoId);
    
    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nombreDocumento}.${extension}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Simular click para iniciar descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // Visualizar documento en nueva pestaña
  const visualizarDocumento = useCallback((documentoId: number) => {
    const url = catalogos.catalogoService.getDocumentoVisualizacionUrl(documentoId);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Obtener icono para tipo de documento
  const getIconoDocumento = useCallback((tipoDocumentoId: number): string => {
    return catalogos.catalogoService.getIconoPorTipoDocumento(tipoDocumentoId);
  }, []);

  // Obtener clases CSS para tipo de documento
  const getClasesDocumento = useCallback((tipoDocumentoId: number): string => {
    return catalogos.catalogoService.getColorPorTipoDocumento(tipoDocumentoId);
  }, []);

  // Verificar si un documento está disponible para acción
  const documentoDisponible = useCallback((disponible: boolean): boolean => {
    return disponible;
  }, []);

  return {
    descargarDocumento,
    visualizarDocumento,
    getIconoDocumento,
    getClasesDocumento,
    documentoDisponible,
  };
};
