
import { useState, useEffect, useCallback } from 'react';
import { catalogos } from '@/services';
import { CatalogoBase, CatalogoConDocumentos, BreadcrumbItem, CatalogoState } from '@/services/catalogos/types';

export const useCatalogos = () => {
  const [catalogoRaiz, setCatalogoRaiz] = useState<CatalogoBase[]>([]);
  const [catalogoHijos, setCatalogoHijos] = useState<CatalogoConDocumentos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [catalogoState, setCatalogoState] = useState<CatalogoState>({
    currentCatalogoId: null,
    currentCatalogoNombre: 'Catálogo Raíz',
    currentCatalogoDescripcion: null,
    breadcrumbs: [],
    nivelActual: 0,
  });

  // Cargar catálogo raíz
  const cargarCatalogoRaiz = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await catalogos.catalogoService.getCatalogoRaiz();
      setCatalogoRaiz(data);
      setCatalogoHijos([]);
      setCatalogoState({
        currentCatalogoId: null,
        currentCatalogoNombre: 'Catálogo Raíz',
        currentCatalogoDescripcion: null,
        breadcrumbs: [],
        nivelActual: 0,
      });
    } catch (err: any) {
      setError(err.message || 'Error al cargar el catálogo raíz');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar hijos de un catálogo
  const cargarCatalogoHijos = useCallback(async (catalogoId: number, catalogoNombre: string, catalogoDescripcion: string | null, nivel: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await catalogos.catalogoService.getCatalogoHijos(catalogoId);
      setCatalogoHijos(data);
      
      // Actualizar breadcrumbs
      const nuevoBreadcrumb: BreadcrumbItem = { id: catalogoId, nombre: catalogoNombre, nivel };
      
      // Mantener solo los breadcrumbs hasta el nivel actual
      const nuevosBreadcrumbs = catalogoState.breadcrumbs
        .filter(b => b.nivel < nivel)
        .concat(nuevoBreadcrumb);
      
      setCatalogoState({
        currentCatalogoId: catalogoId,
        currentCatalogoNombre: catalogoNombre,
        currentCatalogoDescripcion: catalogoDescripcion,
        breadcrumbs: nuevosBreadcrumbs,
        nivelActual: nivel,
      });
    } catch (err: any) {
      setError(err.message || 'Error al cargar los catálogos hijos');
    } finally {
      setLoading(false);
    }
  }, [catalogoState.breadcrumbs]);

  // Navegar a un breadcrumb específico
  const navegarABreadcrumb = useCallback(async (breadcrumb: BreadcrumbItem) => {
    if (breadcrumb.nivel === 0) {
      await cargarCatalogoRaiz();
    } else {
      // Para breadcrumbs, no tenemos la descripción, así que pasamos null
      await cargarCatalogoHijos(breadcrumb.id, breadcrumb.nombre, null, breadcrumb.nivel);
    }
  }, [cargarCatalogoRaiz, cargarCatalogoHijos]);

  // Navegar hacia atrás
  const navegarAtras = useCallback(async () => {
    if (catalogoState.breadcrumbs.length === 0) {
      await cargarCatalogoRaiz();
      return;
    }

    // Obtener el breadcrumb anterior
    const breadcrumbsAnteriores = catalogoState.breadcrumbs.slice(0, -1);
    
    if (breadcrumbsAnteriores.length === 0) {
      await cargarCatalogoRaiz();
    } else {
      const ultimoBreadcrumb = breadcrumbsAnteriores[breadcrumbsAnteriores.length - 1];
      // Para navegación hacia atrás, no tenemos la descripción, así que pasamos null
      await cargarCatalogoHijos(ultimoBreadcrumb.id, ultimoBreadcrumb.nombre, null, ultimoBreadcrumb.nivel);
    }
  }, [catalogoState.breadcrumbs, cargarCatalogoRaiz, cargarCatalogoHijos]);

  // Cargar catálogo raíz al montar el componente
  useEffect(() => {
    cargarCatalogoRaiz();
  }, [cargarCatalogoRaiz]);

  return {
    // Estado
    catalogoRaiz,
    catalogoHijos,
    loading,
    error,
    catalogoState,
    
    // Acciones
    cargarCatalogoRaiz,
    cargarCatalogoHijos,
    navegarABreadcrumb,
    navegarAtras,
    
    // Helpers
    tieneHijos: catalogoHijos.length > 0,
    esNivelRaiz: catalogoState.nivelActual === 0,
    puedeNavegarAtras: catalogoState.breadcrumbs.length > 0,
  };
};
