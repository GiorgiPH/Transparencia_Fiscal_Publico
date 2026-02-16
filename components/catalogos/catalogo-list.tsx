'use client';

import { FileText, Folder, ChevronRight, ArrowLeft, FolderOpen, Archive, Icon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { CatalogoBase, CatalogoConDocumentos } from '@/services/catalogos/types';
import { BuscarCatalogosResponse } from '@/services/catalogos/catalogo.service';
import { TiposDocumento } from './tipos-documento';
import { cn } from '@/lib/utils';
import { ICON_MAP, IconName } from '@/lib/icons';
import { InstitutionalCard, GenericCatalogCard } from '@/components/patterns/InstitutionalCard';

interface CatalogoListProps {
  catalogos: CatalogoBase[] | CatalogoConDocumentos[] | BuscarCatalogosResponse[];
  loading: boolean;
  error: string | null;
  nivelActual: number;
  onCatalogoClick: (catalogo: CatalogoBase | CatalogoConDocumentos | BuscarCatalogosResponse) => void;
  onBackClick?: () => void;
  puedeNavegarAtras?: boolean;
  isSearching?: boolean;
  searchResults?: BuscarCatalogosResponse[];
}

export function CatalogoList({
  catalogos,
  loading,
  error,
  nivelActual,
  onCatalogoClick,
  onBackClick,
  puedeNavegarAtras = false,
}: CatalogoListProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-10 w-10 rounded-md mb-3" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-full rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="text-center">
            <Archive className="mx-auto h-12 w-12 text-destructive mb-4" />
            <p className="text-destructive font-medium">Error al cargar los catálogos</p>
            <p className="text-sm text-muted-foreground mt-2">{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (catalogos.length === 0) {
    return (
      <div className="text-center py-12">
        <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No hay catálogos disponibles</h3>
        <p className="text-muted-foreground">
          {nivelActual === 0
            ? 'No se encontraron catálogos raíz'
            : 'Este catálogo no tiene elementos hijos'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {puedeNavegarAtras && onBackClick && (
        <Button variant="outline" onClick={onBackClick} className="mb-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {catalogos.map((catalogo) => {
          const esCatalogoConDocumentos = 'disponibilidadTiposDocumento' in catalogo;
          const permiteDocumentos = catalogo.permiteDocumentos;
          const esCarpeta = !permiteDocumentos;
          const iconName = catalogo.icono as IconName;
          const Icon = ICON_MAP[iconName] ?? ICON_MAP.default;

          return (
            <div key={catalogo.id} className="h-full">
              {/* InstitutionalCard original - comentado como referencia */}
              {/*
              <InstitutionalCard
                title={catalogo.nombre}
                description={catalogo.descripcion}
                icon={esCarpeta ? <Icon className="h-10 w-10" /> : ""}
                iconSize="sm"
                iconBackgroundColor={esCarpeta ? "bg-muted" : "bg-primary/10"}
                iconRotation={0}
                headerClassName={esCarpeta ? "bg-muted" : "bg-secondary/30"}
                headerBackgroundImage={esCarpeta ? "/images/Green Texture.png" : "/images/Pink Texture.png"}
                subtitle={`Nivel ${catalogo.nivel}`}
                actionText={esCarpeta ? "Abrir" : ""}
                onClick={() => onCatalogoClick(catalogo)}
                ariaLabel={esCarpeta ? `Abrir ${catalogo.nombre}` : `Ver documentos de ${catalogo.nombre}`}
                className="h-full"
              >
                {/* Custom content for document catalogs * /}
                {!esCarpeta && esCatalogoConDocumentos && (
                  <div className="mt-4 pt-4 border-t">
                    <TiposDocumento
                      tiposDocumento={catalogo.disponibilidadTiposDocumento}
                      catalogoId={catalogo.id}
                      catalogoNombre={catalogo.nombre}
                    />
                  </div>
                )}
              </InstitutionalCard>
              */}

              {/* Nuevo GenericCatalogCard */}
              <GenericCatalogCard
                title={catalogo.nombre}
                description={catalogo.descripcion}
                level={catalogo.nivel}
                order={catalogo.orden}
                isFolder={esCarpeta}
                onClick={() => onCatalogoClick(catalogo)}
                className="h-full"
                showDocumentTypes={!esCarpeta && esCatalogoConDocumentos}
                documentTypes={!esCarpeta && esCatalogoConDocumentos ? 
                  catalogo.disponibilidadTiposDocumento?.map(td => ({
                    id: td.tipoDocumentoId,
                    nombre: td.nombre,
                    descripcion: td.extension // Usamos extension como descripción
                  })) || [] : []
                }
              >
                {/* Custom content for document catalogs */}
                {!esCarpeta && esCatalogoConDocumentos && (
                  <div className="mt-4 pt-4 border-t">
                    <TiposDocumento
                      tiposDocumento={catalogo.disponibilidadTiposDocumento}
                      catalogoId={catalogo.id}
                      catalogoNombre={catalogo.nombre}
                    />
                  </div>
                )}
              </GenericCatalogCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
