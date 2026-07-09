import { apiClient } from '../../lib/api/axios-client';
import {
  Periodicidad,
  PeriodoOption,
  DisponibilidadDocumento,
  PeriodicidadConPeriodos,
  PeriodoCalculado,
} from './types';

interface DisponibilidadPeriodoResponse {
  disponibilidadTiposDocumento?: DisponibilidadDocumento[];
}

class PeriodicidadService {
  /**
   * Obtiene la periodicidad de un catálogo para un año específico
   */
  async obtenerPeriodicidadPorAnio(catalogoId: number, anio: number): Promise<PeriodicidadConPeriodos | null> {
    try {
      const periodicidad = await apiClient.get<PeriodoCalculado[] | PeriodicidadConPeriodos>(
        `admin/catalogos/${catalogoId}/periodosPublic/${anio}`
      );

      if (Array.isArray(periodicidad)) {
        return {
          periodos: periodicidad,
        };
      }

      if (periodicidad && Array.isArray(periodicidad.periodos)) {
        return periodicidad;
      }

      return periodicidad ?? null;
    } catch (error) {
      console.error('Error al obtener periodicidad:', error);
      return null;
    }
  }

  /**
   * Genera las opciones de periodo basadas en la periodicidad
   */
  generarOpcionesPeriodo(periodicidad: PeriodicidadConPeriodos | null): PeriodoOption[] {
    const opciones: PeriodoOption[] = [];

    if (periodicidad?.periodos?.length) {
      return periodicidad.periodos.map((periodo) => ({
        value: periodo.numeroPeriodo,
        label: periodo.nombre,
      }));
    }

    // Lógica anterior comentada para reutilizarla más adelante si se requiere.
    // if (periodicidad && periodicidad.periodosPorAnio > 0) {
    //   for (let i = 1; i <= periodicidad.periodosPorAnio; i++) {
    //     opciones.push({
    //       value: i,
    //       label: `${i} ${periodicidad.nombrePortal?.toLowerCase() || 'periodo'}`,
    //     });
    //   }
    // }

    // Siempre agregar opción "Anual" como respaldo.
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