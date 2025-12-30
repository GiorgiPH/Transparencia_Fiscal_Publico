'use client';

import { Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TipoDocumentoDisponibilidad } from '@/services/catalogos/types';
import { useDocumentos } from '@/hooks/catalogos';

interface TiposDocumentoProps {
  tiposDocumento: TipoDocumentoDisponibilidad[];
  catalogoId: number;
  catalogoNombre: string;
}

export function TiposDocumento({ tiposDocumento, catalogoId, catalogoNombre }: TiposDocumentoProps) {
  const { descargarDocumento, visualizarDocumento, getIconoDocumento, getClasesDocumento, documentoDisponible } = useDocumentos();

  if (!tiposDocumento || tiposDocumento.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No hay documentos disponibles para este catálogo
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Documentos disponibles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiposDocumento.map((tipoDoc) => {
          const disponible = documentoDisponible(tipoDoc.disponible);
          const icono = getIconoDocumento(tipoDoc.tipoDocumentoId);
          const clases = getClasesDocumento(tipoDoc.tipoDocumentoId);

          return (
            <div
              key={tipoDoc.tipoDocumentoId}
              className={`border rounded-lg p-4 flex flex-col items-center justify-center space-y-3 ${clases} ${
                !disponible ? 'opacity-50' : ''
              }`}
            >
              <div className="text-2xl">{icono}</div>
              <div className="text-center">
                <h4 className="font-medium">{tipoDoc.nombre}</h4>
                <p className="text-sm text-muted-foreground">.{tipoDoc.extension}</p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => descargarDocumento(catalogoId, catalogoNombre, tipoDoc.extension)}
                  disabled={!disponible}
                  className="flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  Descargar
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => visualizarDocumento(catalogoId)}
                  disabled={!disponible}
                  className="flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  Ver
                </Button>
              </div>
              
              {!disponible && (
                <Badge variant="secondary" className="text-xs">
                  No disponible
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
