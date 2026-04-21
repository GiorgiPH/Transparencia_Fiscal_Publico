'use client';

import { useCatalogosSearch } from '@/hooks/catalogos/use-catalogos-search';
import { CatalogoSearch } from './catalogo-search';
import { CatalogoBreadcrumb } from './breadcrumb';
import { CatalogoList } from './catalogo-list';
import { CatalogoBase, CatalogoConDocumentos } from '@/services/catalogos/types';
import { BuscarCatalogosResponse } from '@/services/catalogos/catalogo.service';
import { SectionTitle } from '../patterns/SectionTitle';

export function CatalogoHierarchySearch() {
  const {
    catalogoRaiz,
    catalogoHijos,
    loading,
    error,
    catalogoState,
    searchState,
    cargarCatalogoHijos,
    navegarABreadcrumb,
    navegarAtras,
    tieneHijos,
    esNivelRaiz,
    puedeNavegarAtras,
    buscarCatalogos,
    limpiarBusqueda,
    navegarDesdeBusqueda,
    catalogosParaMostrar,
    isSearching,
    searchLoading,
    searchError,
    searchResults,
  } = useCatalogosSearch();

  const handleCatalogoClick = (catalogo: CatalogoBase | CatalogoConDocumentos | BuscarCatalogosResponse) => {
    // Si estamos en modo búsqueda y el catálogo tiene path, navegar desde búsqueda
    if (isSearching && 'path' in catalogo) {
      navegarDesdeBusqueda(catalogo);
      return;
    }

    // Navegación normal
    if (!catalogo.permiteDocumentos) {
      cargarCatalogoHijos(catalogo.id, catalogo.nombre, catalogo.descripcion, catalogo.nivel);
    }
  };

  const handleSearch = (text: string) => {
    buscarCatalogos(text);
  };

  const handleClearSearch = () => {
    limpiarBusqueda();
  };

  // Determinar qué mostrar en la sección de información
  const getInfoSection = () => {
    if (isSearching) {
      return (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Resultados de búsqueda</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {searchLoading 
                  ? 'Buscando...' 
                  : `${searchResults.length} resultado${searchResults.length !== 1 ? 's' : ''} encontrado${searchResults.length !== 1 ? 's' : ''} para "${searchState.searchText}"`
                }
              </p>
              {searchError && (
                <p className="text-sm text-destructive mt-1">{searchError}</p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {esNivelRaiz ? '' : catalogoState.currentCatalogoNombre}
            </h2>
            {!esNivelRaiz && catalogoState.currentCatalogoDescripcion && (
              <p className="text-sm text-muted-foreground mt-1">
                {catalogoState.currentCatalogoDescripcion}
              </p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              {esNivelRaiz
                ? 'Selecciona un catálogo para comenzar'
                : `Nivel ${catalogoState.nivelActual} • ${catalogosParaMostrar.length} elementos`}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header con título */}
      <SectionTitle
        title="Infórmate"
        subtitle=" Accede a información detallada sobre la gestión fiscal del Estado de Morelos, organizada en siete categorías
        temáticas principales."
        className="mb-8"
        titleClassName="text-3xl lg:text-3xl"
      />
      {/* Información de ayuda */}
      <div className="border rounded-lg p-4 bg-tertiary/70 dark:bg-tertiary/20">
        <h3 className="font-semibold text-tertiary-foreground mb-2">¿Cómo funciona?</h3>
        <ul className="text-sm text-tertiary-foreground space-y-1">
          <li>• Usa el buscador arriba para encontrar catálogos por nombre o descripción</li>
          <li>• Haz clic en las carpetas (<span className="font-medium">📁</span>) para navegar a niveles más profundos</li>
          <li>• Los documentos (<span className="font-medium">📄</span>) muestran los formatos disponibles para descargar o visualizar</li>
          <li>• Usa el breadcrumb en la parte superior para navegar rápidamente entre niveles</li>
          <li>• El botón "Descargar" solo está activo cuando el documento está disponible</li>
          <li>• Usa "Limpiar búsqueda" para volver a la navegación normal</li>
        </ul>
      </div>
      
      {/* Buscador */}
      <CatalogoSearch
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isSearching={isSearching}
        searchLoading={searchLoading}
        searchText={searchState.searchText}
      />

      {/* Breadcrumb (solo mostrar si no estamos en búsqueda) */}
      {!isSearching && (
        <CatalogoBreadcrumb
          items={catalogoState.breadcrumbs}
          onNavigate={navegarABreadcrumb}
        />
      )}

      {/* Información del nivel actual o resultados de búsqueda */}
      {getInfoSection()}

      {/* Lista de catálogos */}
      <CatalogoList
        catalogos={catalogosParaMostrar}
        loading={loading && !isSearching}
        error={error}
        nivelActual={catalogoState.nivelActual}
        onCatalogoClick={handleCatalogoClick}
        onBackClick={navegarAtras}
        puedeNavegarAtras={puedeNavegarAtras}
      />

      
    </div>
  );
}