import { apiClient } from '../../lib/api/axios-client';
import { Periodicidad, PeriodoOption, DisponibilidadDocumento } from './types';

interface DisponibilidadPeriodoResponse {
  disponibilidadTiposDocumento?: DisponibilidadDocumento[];
}

class PeriodicidadService {
  /**
   * Obtiene la periodicidad de un catálogo para un año específico
   */
  async obtenerPeriodicidadPorAnio(catalogoId: number, anio: number): Promise<Periodicidad | null> {
    try {
      const periodicidad = await apiClient.get<Periodicidad>(
        `admin/catalogos/${catalogoId}/periodos/${anio}`
      );
      return periodicidad;
    } catch (error) {
      console.error('Error al obtener periodicidad:', error);
      return null;
    }
  }

  /**
   * Genera las opciones de periodo basadas en la periodicidad
   */
  generarOpcionesPeriodo(periodicidad: Periodicidad | null): PeriodoOption[] {
    const opciones: PeriodoOption[] = [];

    if (periodicidad && periodicidad.periodosPorAnio > 0) {
      // Generar periodos según la periodicidad
      for (let i = 1; i <= periodicidad.periodosPorAnio; i++) {
        opciones.push({
          value: i,
          label: `${i} ${periodicidad.nombrePortal?.toLowerCase() || 'periodo'}`,
        });
      }
    }

    // Siempre agregar opción "Anual"
    opciones.push({
      value: 0,
      label: 'Anual',
    });

    return opciones;
  }

  /**
   * Obtiene la disponibilidad de documentos por catálogo, año y periodo
   */
  async obtenerDisponibilidadPorPeriodo(
    catalogoId: number,
    ejercicioFiscal: number,
    periodoId?: number
  ): Promise<DisponibilidadDocumento[]> {
    try {
      let url = `/admin/documentos/periodo?catalogoId=${catalogoId}&ejercicioFiscal=${ejercicioFiscal}`;
      if (periodoId !== undefined) {
        url += `&periodoId=${periodoId}`;
      }
      
      const payload = await apiClient.get<DisponibilidadDocumento[] | DisponibilidadPeriodoResponse>(url);

      if (Array.isArray(payload)) {
        return payload;
      }

      if (payload && Array.isArray(payload.disponibilidadTiposDocumento)) {
        return payload.disponibilidadTiposDocumento;
      }

      return [];
    } catch (error) {
      console.error('Error al obtener disponibilidad por periodo:', error);
      return [];
    }
  }

  /**
   * Obtiene todas las periodicidades activas
   */
  async obtenerTodasPeriodicidades(): Promise<Periodicidad[]> {
    try {
      const periodicidades = await apiClient.get<Periodicidad[]>(
        '/catalogos/periodicidades'
      );
      return periodicidades;
    } catch (error) {
      console.error('Error al obtener todas las periodicidades:', error);
      return [];
    }
  }
}

export const periodicidadService = new PeriodicidadService();