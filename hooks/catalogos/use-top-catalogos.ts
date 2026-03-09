import { useState, useEffect } from 'react';
import { catalogoService } from '@/services/catalogos/catalogo.service';
import { TopCatalogo } from '@/services/catalogos/types';

export const useTopCatalogos = () => {
  const [topCatalogos, setTopCatalogos] = useState<TopCatalogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopCatalogos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await catalogoService.getTopCatalogos();
      setTopCatalogos(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los catálogos más populares');
      console.error('Error fetching top catalogos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopCatalogos();
  }, []);

  const handleTopCatalogoClick = (catalogoId: number) => {
    // Redirigir a la sección de finanzas con el ID del catálogo para búsqueda exacta
    // El método buscarCatalogos ya detecta si el texto es numérico y hace búsqueda por ID exacto
    window.location.href = `/finanzas?buscar=${encodeURIComponent(catalogoId.toString())}`;
  };

  return {
    topCatalogos,
    loading,
    error,
    refetch: fetchTopCatalogos,
    handleTopCatalogoClick,
  };
};