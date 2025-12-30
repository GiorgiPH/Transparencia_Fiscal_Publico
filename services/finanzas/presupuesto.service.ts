import { apiClient } from '../../lib/api/axios-client';

export interface PresupuestoItem {
  id: string;
  ejercicio_fiscal: number;
  descripcion: string;
  monto_asignado: number;
  monto_ejercido: number;
  porcentaje_ejercido: number;
  unidad_responsable: string;
  fecha_actualizacion: string;
}

export interface PresupuestoResponse {
  total: number;
  items: PresupuestoItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface PresupuestoFilters {
  ejercicio_fiscal?: number;
  unidad_responsable?: string;
  page?: number;
  pageSize?: number;
}

export const presupuestoService = {
  async getPresupuestos(filters?: PresupuestoFilters): Promise<PresupuestoResponse> {
    const params = new URLSearchParams();
    
    if (filters?.ejercicio_fiscal) {
      params.append('ejercicio_fiscal', filters.ejercicio_fiscal.toString());
    }
    
    if (filters?.unidad_responsable) {
      params.append('unidad_responsable', filters.unidad_responsable);
    }
    
    if (filters?.page) {
      params.append('page', filters.page.toString());
    }
    
    if (filters?.pageSize) {
      params.append('pageSize', filters.pageSize.toString());
    }
    
    const queryString = params.toString();
    const url = queryString ? `/finanzas/presupuesto?${queryString}` : '/finanzas/presupuesto';
    
    return apiClient.get<PresupuestoResponse>(url);
  },

  async getPresupuestoById(id: string): Promise<PresupuestoItem> {
    return apiClient.get<PresupuestoItem>(`/finanzas/presupuesto/${id}`);
  },

  async getEjerciciosFiscales(): Promise<number[]> {
    return apiClient.get<number[]>('/finanzas/presupuesto/ejercicios-fiscales');
  },

  async getUnidadesResponsables(): Promise<string[]> {
    return apiClient.get<string[]>('/finanzas/presupuesto/unidades-responsables');
  },
};
