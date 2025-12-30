'use client';

import { useCatalogos } from '@/hooks/catalogos';
import { CatalogoBreadcrumb } from './breadcrumb';
import { CatalogoList } from './catalogo-list';
import { CatalogoBase, CatalogoConDocumentos } from '@/services/catalogos/types';

export function CatalogoHierarchy() {
  const {
    catalogoRaiz,
    catalogoHijos,
    loading,
    error,
    catalogoState,
    cargarCatalogoHijos,
    navegarABreadcrumb,
    navegarAtras,
    tieneHijos,
    esNivelRaiz,
    puedeNavegarAtras,
  } = useCatalogos();

  const handleCatalogoClick = (catalogo: CatalogoBase | CatalogoConDocumentos) => {
    if (!catalogo.permiteDocumentos) {
      cargarCatalogoHijos(catalogo.id, catalogo.nombre, catalogo.nivel);
    }
  };

  const catalogosActuales = esNivelRaiz ? catalogoRaiz : catalogoHijos;

  return (
    <div className="space-y-6">
      {/* Header con breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Información de Finanzas Públicas</h1>
            <p className="text-muted-foreground mt-2">
            Accede a información detallada sobre la gestión fiscal del Estado de Morelos, organizada en siete categorías
            temáticas principales.
            </p>
          </div>
        </div>



        <CatalogoBreadcrumb
          items={catalogoState.breadcrumbs}
          onNavigate={navegarABreadcrumb}
        />
      </div>

      {/* Información del nivel actual */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {esNivelRaiz ? '' : catalogoState.currentCatalogoNombre}
            </h2>
            <p className="text-sm text-muted-foreground">
              {esNivelRaiz
                ? 'Selecciona un catálogo para comenzar'
                : `Nivel ${catalogoState.nivelActual} • ${catalogosActuales.length} elementos`}
            </p>
          </div>
          
        
        </div>
      </div>

      {/* Lista de catálogos */}
      <CatalogoList
        catalogos={catalogosActuales}
        loading={loading}
        error={error}
        nivelActual={catalogoState.nivelActual}
        onCatalogoClick={handleCatalogoClick}
        onBackClick={navegarAtras}
        puedeNavegarAtras={puedeNavegarAtras}
      />

      {/* Información de ayuda */}
      <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
        <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">¿Cómo funciona?</h3>
        <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
          <li>• Haz clic en las carpetas (<span className="font-medium">📁</span>) para navegar a niveles más profundos</li>
          <li>• Los documentos (<span className="font-medium">📄</span>) muestran los formatos disponibles para descargar o visualizar</li>
          <li>• Usa el breadcrumb en la parte superior para navegar rápidamente entre niveles</li>
          <li>• Los botones "Descargar" y "Ver" solo están activos cuando el documento está disponible</li>
        </ul>
      </div>
    </div>
  );
}
