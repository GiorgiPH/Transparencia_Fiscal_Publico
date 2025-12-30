'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Calendar, 
  Download, 
  ArrowUpDown, 
  AlertCircle,
  FileSpreadsheet,
  File,
  Image,
  Archive
} from 'lucide-react';
import { busquedaDocumentosService } from '@/services/busqueda-documentos';
import { formatearTamanioArchivo, Documento, Paginacion, FiltrosBusqueda } from '@/services/busqueda-documentos/types';

interface TablaResultadosProps {
  documentos: Documento[];
  paginacion: Paginacion;
  loading: boolean;
  error: string | null;
  filtros: FiltrosBusqueda;
  cambiarPagina: (pagina: number) => void;
  cambiarOrdenamiento: (campo: string, direccion: 'asc' | 'desc') => void;
  descargarDocumento: (id: number, nombreArchivo?: string) => void;
  esDocumentoDescargable: (documento: Documento) => boolean;
  totalDocumentos: number;
  hayResultados: boolean;
}

export function TablaResultados({
  documentos,
  paginacion,
  loading,
  error,
  filtros,
  cambiarPagina,
  cambiarOrdenamiento,
  descargarDocumento,
  esDocumentoDescargable,
  totalDocumentos,
  hayResultados,
}: TablaResultadosProps) {
  // Log para depuración
  useEffect(() => {
    console.log('TablaResultados - Estado actual:', {
      loading,
      error,
      documentosCount: documentos.length,
      hayResultados,
      totalDocumentos
    });
  }, [loading, error, documentos, hayResultados, totalDocumentos]);

  const handleOrdenar = (campo: string) => {
    const direccion = filtros.orderBy === campo && filtros.order === 'asc' ? 'desc' : 'asc';
    cambiarOrdenamiento(campo, direccion);
  };

  const getIconoPorExtension = (extension: string) => {
    const iconos: Record<string, React.ReactNode> = {
      '.pdf': <FileText className="h-4 w-4" />,
      '.xlsx': <FileSpreadsheet className="h-4 w-4" />,
      '.csv': <FileSpreadsheet className="h-4 w-4" />,
      '.docx': <FileText className="h-4 w-4" />,
      '.txt': <FileText className="h-4 w-4" />,
      '.jpg': <Image className="h-4 w-4" />,
      '.png': <Image className="h-4 w-4" />,
      '.zip': <Archive className="h-4 w-4" />,
    };

    const ext = extension.toLowerCase();
    return iconos[ext] || <File className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resultados de Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Verificar directamente el array de documentos en lugar de depender de hayResultados
  const noHayDocumentos = documentos.length === 0 && !loading && !error;
  
  if (noHayDocumentos) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron documentos</h3>
            <p className="text-muted-foreground">
              No hay documentos que coincidan con los criterios de búsqueda.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resultados de Búsqueda
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {totalDocumentos} documento{totalDocumentos !== 1 ? 's' : ''} encontrado{totalDocumentos !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="items-per-page" className="text-sm whitespace-nowrap">
              Mostrar:
            </Label>
            <Select
              value={filtros.pageSize?.toString() || '10'}
              onValueChange={(value) => cambiarPagina(1)}
            >
              <SelectTrigger id="items-per-page" className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 font-semibold"
                    onClick={() => handleOrdenar('nombre')}
                  >
                    Nombre del Documento
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 font-semibold"
                    onClick={() => handleOrdenar('institucion_emisora')}
                  >
                    Institución
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 font-semibold"
                    onClick={() => handleOrdenar('extension')}
                  >
                    Formato
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 font-semibold"
                    onClick={() => handleOrdenar('ejercicio_fiscal')}
                  >
                    Año
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 font-semibold"
                    onClick={() => handleOrdenar('fecha_publicacion')}
                  >
                    Publicación
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentos.map((doc) => {
                const esDescargable = esDocumentoDescargable(doc);
                const fechaFormateada = busquedaDocumentosService.formatearFecha(doc.fecha_publicacion);
                const tamanioFormateado = formatearTamanioArchivo(doc.peso_archivo);
                const colorExtension = busquedaDocumentosService.getColorPorExtension(doc.extension);

                return (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getIconoPorExtension(doc.extension)}
                        <div>
                          <p className="font-medium">{doc.nombre}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-xs">
                            {doc.descripcion}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{doc.institucion_emisora}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${colorExtension}`}>
                        {getIconoPorExtension(doc.extension)}
                        {doc.extension.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {doc.ejercicio_fiscal}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {fechaFormateada}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tamanioFormateado}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => descargarDocumento(doc.id, `${doc.nombre}${doc.extension}`)}
                        disabled={!esDescargable}
                        title={esDescargable ? 'Descargar documento' : 'Documento no disponible para descarga'}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Paginación */}
        {paginacion.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Mostrando {(paginacion.page - 1) * paginacion.pageSize + 1}-
              {Math.min(paginacion.page * paginacion.pageSize, paginacion.total)} de {paginacion.total} documentos
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => cambiarPagina(paginacion.page - 1)}
                disabled={!paginacion.hasPrevPage}
              >
                Anterior
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, paginacion.totalPages) }, (_, i) => {
                  let pageNum;
                  if (paginacion.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (paginacion.page <= 3) {
                    pageNum = i + 1;
                  } else if (paginacion.page >= paginacion.totalPages - 2) {
                    pageNum = paginacion.totalPages - 4 + i;
                  } else {
                    pageNum = paginacion.page - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={paginacion.page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => cambiarPagina(pageNum)}
                      className="min-w-8"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => cambiarPagina(paginacion.page + 1)}
                disabled={!paginacion.hasNextPage}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
