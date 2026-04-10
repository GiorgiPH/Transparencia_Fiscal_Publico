import { useState, useCallback } from 'react';
import { periodicidadService, type Periodicidad, type PeriodoOption, type DisponibilidadDocumento } from '../../services/periodicidad';

interface UsePeriodicidadReturn {
  periodicidad: Periodicidad | null;
  periodos: PeriodoOption[];
  disponibilidad: DisponibilidadDocumento[];
  loading: boolean;
  error: string | null;
  obtenerPeriodicidad: (catalogoId: number, anio: number) => Promise<void>;
  obtenerDisponibilidad: (catalogoId: number, ejercicioFiscal: number, periodoId?: number) => Promise<void>;
  limpiarPeriodicidad: () => void;
  limpiarDisponibilidad: () => void;
}

export function usePeriodicidad(): UsePeriodicidadReturn {
  const [periodicidad, setPeriodicidad] = useState<Periodicidad | null>(null);
  const [periodos, setPeriodos] = useState<PeriodoOption[]>([]);
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadDocumento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerPeriodicidad = useCallback(async (catalogoId: number, anio: number) => {
    if (!catalogoId || !anio) {
      setPeriodicidad(null);
      setPeriodos([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const periodicidadData = await periodicidadService.obtenerPeriodicidadPorAnio(catalogoId, anio);
      setPeriodicidad(periodicidadData);

      // Generar opciones de periodo basadas en la periodicidad
      const opcionesPeriodo = periodicidadService.generarOpcionesPeriodo(periodicidadData);
      setPeriodos(opcionesPeriodo);
    } catch (err) {
      console.error('Error en usePeriodicidad:', err);
      setError('Error al obtener la periodicidad');
      setPeriodicidad(null);
      setPeriodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const obtenerDisponibilidad = useCallback(async (catalogoId: number, ejercicioFiscal: number, periodoId?: number) => {
    if (!catalogoId || !ejercicioFiscal) {
      setDisponibilidad([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const disponibilidadData = await periodicidadService.obtenerDisponibilidadPorPeriodo(
        catalogoId,
        ejercicioFiscal,
        periodoId
      );
      setDisponibilidad(disponibilidadData);
    } catch (err) {
      console.error('Error al obtener disponibilidad:', err);
      setError('Error al obtener la disponibilidad de documentos');
      setDisponibilidad([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const limpiarPeriodicidad = useCallback(() => {
    setPeriodicidad(null);
    setPeriodos([]);
    setError(null);
    setLoading(false);
  }, []);

  const limpiarDisponibilidad = useCallback(() => {
    setDisponibilidad([]);
  }, []);

  return {
    periodicidad,
    periodos,
    disponibilidad,
    loading,
    error,
    obtenerPeriodicidad,
    obtenerDisponibilidad,
    limpiarPeriodicidad,
    limpiarDisponibilidad,
  };
}