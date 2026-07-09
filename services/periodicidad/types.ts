export interface Periodicidad {
  id: number;
  nombre: string;
  nombrePortal: string;
  mesesPorPeriodo: number;
  periodosPorAnio: number;
  activo: boolean;
}

export interface PeriodoCalculado {
  numeroPeriodo: number;
  nombre: string;
}

export interface PeriodicidadConPeriodos {
  id?: number;
  nombre?: string;
  nombrePortal?: string;
  mesesPorPeriodo?: number;
  periodosPorAnio?: number;
  activo?: boolean;
  periodos?: PeriodoCalculado[];
}

export interface PeriodoOption {
  value: number;
  label: string;
}

export interface DisponibilidadDocumento {
  tipoDocumentoId: number;
  tipoDocumentoNombre?: string;
  nombre?: string;
  disponible: boolean;
  extension?: string;
  documentoId?: number | string;
  documentoNombre?: string;
  nombreArchivo?: string;
  fechaCreacion?: string;
}