// Tipos para la API de Catálogos

export interface CatalogoBase {
  id: number;
  nombre: string;
  descripcion: string;
  nivel: number;
  orden: number;
  permiteDocumentos: boolean;
  fechaCreacion: string;
  fechaModificacion: string;
}

export interface TipoDocumentoDisponibilidad {
  tipoDocumentoId: number;
  nombre: string;
  disponible: boolean;
  extension: string;
}

export interface CatalogoConDocumentos extends CatalogoBase {
  disponibilidadTiposDocumento: TipoDocumentoDisponibilidad[];
}

export interface CatalogoRaizResponse {
  statusCode: number;
  message: string;
  data: CatalogoBase[];
  timestamp: string;
  path: string;
}

export interface CatalogoHijosResponse {
  statusCode: number;
  message: string;
  data: CatalogoConDocumentos[];
  timestamp: string;
  path: string;
}

export interface BreadcrumbItem {
  id: number;
  nombre: string;
  nivel: number;
}

export interface CatalogoState {
  currentCatalogoId: number | null;
  currentCatalogoNombre: string;
  breadcrumbs: BreadcrumbItem[];
  nivelActual: number;
}
