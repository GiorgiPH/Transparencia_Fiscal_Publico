import { useState, useEffect, useCallback } from 'react';
import { catalogos } from '@/services';
import { CatalogoBase, CatalogoConDocumentos, BreadcrumbItem, CatalogoState } from '@/services/catalogos/types';
import { BuscarCatalogosResponse } from '@/services/catalogos/catalogo.service';

export interface SearchState {
  isSearching: boolean;
  searchText: string;
  searchResults: BuscarCatalogosResponse[];
  searchLoading: boolean;
  searchError: string | null;
}

export const useCatalogosSearch = () => {
  // Estados para navegación normal
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

  // Estados para búsqueda
  const [searchState, setSearchState] = useState<SearchState>({
    isSearching: false,
    searchText: '',
    searchResults: [],
    searchLoading: false,
    searchError: null,
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

  // Buscar catálogos
  const buscarCatalogos = useCallback(async (texto: string) => {
    if (!texto || texto.trim().length < 2) {
      setSearchState(prev => ({
        ...prev,
        isSearching: false,
        searchText: '',
        searchResults: [],
        searchError: null,
      }));
      return;
    }

    setSearchState(prev => ({
      ...prev,
      isSearching: true,
      searchText: texto.trim(),
      searchLoading: true,
      searchError: null,
    }));

    try {
      const resultados = await catalogos.catalogoService.buscarCatalogos(texto);
      setSearchState(prev => ({
        ...prev,
        searchResults: resultados,
        searchLoading: false,
      }));
    } catch (err: any) {
      setSearchState(prev => ({
        ...prev,
        searchError: err.message || 'Error al buscar catálogos',
        searchLoading: false,
      }));
    }
  }, []);

  // Limpiar búsqueda y volver a navegación normal
  const limpiarBusqueda = useCallback(async () => {
    setSearchState({
      isSearching: false,
      searchText: '',
      searchResults: [],
      searchLoading: false,
      searchError: null,
    });
    
    // Volver a cargar el catálogo raíz
    await cargarCatalogoRaiz();
  }, [cargarCatalogoRaiz]);

  // Navegar a un catálogo desde resultados de búsqueda
  const navegarDesdeBusqueda = useCallback(async (resultado: BuscarCatalogosResponse) => {
    // Si el catálogo está en el último nivel (permite documentos), no navegamos
    if (resultado.permiteDocumentos) {
      return;
    }

    // Buscar el catálogo en el path que no permite documentos (el último que no permite documentos)
    const catalogoParaNavegar = resultado.path.find(item => {
      // Encontrar el catálogo en el path que no permite documentos
      // Nota: Necesitaríamos información adicional para saber si cada catálogo en el path permite documentos
      // Por ahora, navegamos al catálogo actual del resultado
      return true;
    });

    if (catalogoParaNavegar) {
      await cargarCatalogoHijos(
        catalogoParaNavegar.id,
        catalogoParaNavegar.nombre,
        null,
        catalogoParaNavegar.nivel
      );
      
      // Limpiar búsqueda después de navegar
      setSearchState(prev => ({
        ...prev,
        isSearching: false,
        searchText: '',
        searchResults: [],
      }));
    }
  }, [cargarCatalogoHijos]);

  // Cargar catálogo raíz al montar el componente y verificar si hay búsqueda en la URL
  useEffect(() => {
    cargarCatalogoRaiz();
    
    // Verificar si hay un parámetro de búsqueda en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('buscar');
    
    if (searchParam && searchParam.trim().length >= 2) {
      // Realizar búsqueda automática
      buscarCatalogos(searchParam.trim());
    }
  }, [cargarCatalogoRaiz, buscarCatalogos]);

  // Determinar qué catálogos mostrar
  const catalogosParaMostrar = searchState.isSearching 
    ? searchState.searchResults 
    : (catalogoState.nivelActual === 0 ? catalogoRaiz : catalogoHijos);

  return {
    // Estado
    catalogoRaiz,
    catalogoHijos,
    loading,
    error,
    catalogoState,
    searchState,
    
    // Acciones de navegación
    cargarCatalogoRaiz,
    cargarCatalogoHijos,
    navegarABreadcrumb,
    navegarAtras,
    
    // Acciones de búsqueda
    buscarCatalogos,
    limpiarBusqueda,
    navegarDesdeBusqueda,
    
    // Helpers
    tieneHijos: catalogoHijos.length > 0,
    esNivelRaiz: catalogoState.nivelActual === 0,
    puedeNavegarAtras: catalogoState.breadcrumbs.length > 0,
    
    // Datos para mostrar
    catalogosParaMostrar,
    isSearching: searchState.isSearching,
    searchLoading: searchState.searchLoading,
    searchError: searchState.searchError,
    searchResults: searchState.searchResults,
  };
};