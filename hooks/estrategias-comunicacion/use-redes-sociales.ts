'use client';

import { useState, useEffect, useCallback } from 'react';
import { estrategiasComunicacionService } from '@/services/estrategias-comunicacion';
import { RedSocial } from '@/services/estrategias-comunicacion/types';

export function useRedesSociales() {
  const [redesSociales, setRedesSociales] = useState<RedSocial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarRedesSociales = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await estrategiasComunicacionService.getRedesSociales();
      setRedesSociales(data);
    } catch (err) {
      console.error('Error al cargar redes sociales:', err);
      setError('No se pudieron cargar las redes sociales. Por favor, intenta nuevamente.');
      setRedesSociales([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarRedesSociales();
  }, [cargarRedesSociales]);

  const obtenerIcono = useCallback((nombreRedSocial: string) => {
    return estrategiasComunicacionService.getIconoPorRedSocial(nombreRedSocial);
  }, []);

  const obtenerColor = useCallback((nombreRedSocial: string) => {
    return estrategiasComunicacionService.getColorPorRedSocial(nombreRedSocial);
  }, []);



  const redesSocialesActivas = redesSociales.filter(red => red.activo);

  return {
    redesSociales: redesSocialesActivas,
    loading,
    error,
    recargar: cargarRedesSociales,
    obtenerIcono,
    obtenerColor,
    
  };
}
