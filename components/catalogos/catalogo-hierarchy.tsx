'use client';

import { useCatalogos } from '@/hooks/catalogos';
import { CatalogoBreadcrumb } from './breadcrumb';
import { CatalogoList } from './catalogo-list';
import { CatalogoBase, CatalogoConDocumentos } from '@/services/catalogos/types';
import { SectionTitle } from '../patterns/SectionTitle';

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
      cargarCatalogoHijos(catalogo.id, catalogo.nombre, catalogo.descripcion, catalogo.nivel);
    }
  };

  const catalogosActuales = esNivelRaiz ? catalogoRaiz : catalogoHijos;

  return (
    <div className="space-y-6">
      {/* Header con breadcrumb */}
      <div className="space-y-4">
      <SectionTitle
          title="Infórmate"
          subtitle=" Accede a información detallada sobre la gestión fiscal del Estado de Morelos, organizada en siete categorías
          temáticas principales."
          className="mb-8"
          titleClassName="text-3xl lg:text-3xl"
        />



        <CatalogoBreadcrumb
          items={catalogoState.breadcrumbs}
          onNavigate={navegarABreadcrumb}
        />
      </div>

      {/* Información del nivel actual */}
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
      <div className="border rounded-lg p-4 bg-tertiary/70 dark:bg-tertiary/20">
        <h3 className="font-semibold text-tertiary-foreground mb-2">¿Cómo funciona?</h3>
        <ul className="text-sm text-tertiary-foreground space-y-1">
          <li>• Haz clic en las carpetas (<span className="font-medium">📁</span>) para navegar a niveles más profundos</li>
          <li>• Los documentos (<span className="font-medium">📄</span>) muestran los formatos disponibles para descargar o visualizar</li>
          <li>• Usa el breadcrumb en la parte superior para navegar rápidamente entre niveles</li>
          <li>• Los botón "Descargar" solo está activo cuando el documento está disponible</li>
        </ul>
      </div>
    </div>
  );
}
