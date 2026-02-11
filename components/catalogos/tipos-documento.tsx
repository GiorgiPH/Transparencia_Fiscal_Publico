'use client';

import { Download, Eye, File, FileText, FileSpreadsheet, FileCode, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TipoDocumentoDisponibilidad } from '@/services/catalogos/types';
import { useDocumentos } from '@/hooks/catalogos';
import { cn } from '@/lib/utils';

interface TiposDocumentoProps {
  tiposDocumento: TipoDocumentoDisponibilidad[];
  catalogoId: number;
  catalogoNombre: string;
}

// Mapeo de extensiones a iconos de Lucide (versión minimalista)
const getLucideIcon = (extension: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'csv': <FileSpreadsheet className="h-8 w-8" />,
    'json': <FileJson className="h-8 w-8" />,
    'xml': <FileCode className="h-8 w-8" />,
    'xlsx': <FileSpreadsheet className="h-8 w-8" />,
    'xls': <FileSpreadsheet className="h-8 w-8" />,
    'pdf': <FileText className="h-8 w-8" />,
    'doc': <FileText className="h-8 w-8" />,
    'docx': <FileText className="h-8 w-8" />,
  };
  return iconMap[extension.toLowerCase()] || <File className="h-8 w-8" />;
};

export function TiposDocumento({ tiposDocumento, catalogoId, catalogoNombre }: TiposDocumentoProps) {
  const { descargarDocumento, visualizarDocumento, documentoDisponible } = useDocumentos();

  if (!tiposDocumento || tiposDocumento.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <File className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p>No hay documentos disponibles para este catálogo</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {tiposDocumento.map((tipoDoc) => {
      const disponible = documentoDisponible(tipoDoc.disponible);
  
      return (
        <div
          key={tipoDoc.tipoDocumentoId}
          onClick={() => {
            if (!disponible) return;
            descargarDocumento(
              parseInt(tipoDoc.documentoId),
              catalogoNombre,
              tipoDoc.extension
            );
          }}
          className={cn(
            "group cursor-pointer rounded-xl border bg-card p-4 flex flex-col items-center text-center transition",
            "hover:shadow-md hover:border-primary",
            !disponible && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* Icono documento */}
          <div className="relative p-4 rounded-lg bg-muted text-muted-foreground">
            {getLucideIcon(tipoDoc.extension)}
  
            {/* Icono descargar (solo visual) */}
            {disponible && (
              <Download className="absolute -bottom-2 -right-2 h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition" />
            )}
          </div>
  
          {/* Info */}
          <div className="mt-3 space-y-1">
            <p className="text-sm font-medium">
              {tipoDoc.extension.toUpperCase()}
            </p>
            {/* <span className="text-xs text-muted-foreground font-mono">
              .{tipoDoc.extension}
            </span> */}
          </div>
        </div>
      );
    })}
  </div>
  
  );
}
