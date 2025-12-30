// Tipos para la búsqueda de documentos

export interface Documento {
  id: number;
  catalogo_id: number;
  tipo_documento_id: number;
  nombre: string;
  descripcion: string;
  ejercicio_fiscal: number;
  ruta_archivo: string;
  extension: string;
  peso_archivo: {
    s: number;
    e: number;
    d: number[];
  };
  version: number;
  estatus: 'publicado' | 'borrador' | 'archivado';
  fecha_publicacion: string;
  activo: boolean;
  institucion_emisora: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  usuario_creacion_id: number;
  usuario_modif_id: number | null;
  catalogo: {
    id: number;
    nombre: string;
    descripcion: string;
    parent_id: number | null;
    nivel: number;
    orden: number;
    activo: boolean;
    permite_documentos: boolean;
    fecha_creacion: string;
    fecha_modificacion: string;
    usuario_creacion_id: number;
    usuario_modif_id: number | null;
  };
}

export interface Paginacion {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BusquedaDocumentosResponse {
  statusCode: number;
  message: string;
  data: {
    documentos: Documento[];
    paginacion: Paginacion;
  };
  timestamp: string;
  path: string;
}

export interface FiltrosBusqueda {
  search?: string;
  catalogoId?: number;
  anio?: number;
  extension?: string;
  periodicidad?: string;
  institucion?: string;
  categorias?: number[];
  page?: number;
  pageSize?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export interface OpcionFiltro {
  value: string;
  label: string;
}

export interface OpcionesFiltros {
  años: OpcionFiltro[];
  extensiones: OpcionFiltro[];
  periodicidades: OpcionFiltro[];
  instituciones: OpcionFiltro[];
}

// Tipos para descarga de documentos
export interface DescargaDocumentoParams {
  id: number;
  nombreArchivo?: string;
}

// Función para formatear el tamaño del archivo
export function formatearTamanioArchivo(pesoArchivo: Documento['peso_archivo']): string {
  try {
    // Convertir el objeto BigInt-like a número
    const bytes = pesoArchivo.d[0] * Math.pow(10, pesoArchivo.e) + (pesoArchivo.d[1] || 0);
    
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  } catch {
    return 'N/A';
  }
}

// Función para obtener URL de descarga
export function obtenerUrlDescarga(id: number): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  return `${baseUrl}/busqueda-documentos/${id}/descargar`;
}
