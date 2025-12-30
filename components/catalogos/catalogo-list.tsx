'use client';

import { FileText, Folder, ChevronRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CatalogoBase, CatalogoConDocumentos } from '@/services/catalogos/types';
import { TiposDocumento } from './tipos-documento';

interface CatalogoListProps {
  catalogos: CatalogoBase[] | CatalogoConDocumentos[];
  loading: boolean;
  error: string | null;
  nivelActual: number;
  onCatalogoClick: (catalogo: CatalogoBase | CatalogoConDocumentos) => void;
  onBackClick?: () => void;
  puedeNavegarAtras?: boolean;
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
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
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
        <Folder className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
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
    <div className="space-y-6">
      {puedeNavegarAtras && onBackClick && (
        <Button variant="outline" onClick={onBackClick} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalogos.map((catalogo) => {
          const esCatalogoConDocumentos = 'disponibilidadTiposDocumento' in catalogo;
          const permiteDocumentos = catalogo.permiteDocumentos;

          return (
            <Card
              key={catalogo.id}
              className="h-full transition-all hover:shadow-lg cursor-pointer group"
              onClick={() => !permiteDocumentos && onCatalogoClick(catalogo)}
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  {permiteDocumentos ? (
                    <FileText className="h-6 w-6" />
                  ) : (
                    <Folder className="h-6 w-6" />
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-balance group-hover:text-primary transition-colors">
                  {catalogo.nombre}
                </CardTitle>
                <CardDescription className="text-pretty line-clamp-2">
                  {catalogo.descripcion}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Nivel {catalogo.nivel} • Orden {catalogo.orden}
                  </div>
                  
                  {!permiteDocumentos ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-muted"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCatalogoClick(catalogo);
                      }}
                    >
                      Ver contenido
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  ) : (
                    <Badge variant="secondary" className="ml-2">
                      Documentos
                    </Badge>
                  )}
                </div>

                {/* Mostrar tipos de documento si es el último nivel */}
                {permiteDocumentos && esCatalogoConDocumentos && (
                  <div className="mt-4 pt-4 border-t">
                    <TiposDocumento
                      tiposDocumento={catalogo.disponibilidadTiposDocumento}
                      catalogoId={catalogo.id}
                      catalogoNombre={catalogo.nombre}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// Componente Badge auxiliar
function Badge({ variant = 'default', className = '', children }: { variant?: 'default' | 'secondary'; className?: string; children: React.ReactNode }) {
  const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  const variantClasses = variant === 'secondary' 
    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' 
    : 'bg-primary text-primary-foreground hover:bg-primary/80';
  
  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}
