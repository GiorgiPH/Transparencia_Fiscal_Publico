import { useState, useEffect } from 'react';
import { catalogoService } from '@/services/catalogos/catalogo.service';
import { CatalogoBase } from '@/services/catalogos/types';

export interface CategoriaFiltro {
  id: number;
  nombre: string;
  descripcion: string;
}

export function useCategoriasFiltro() {
  const [categorias, setCategorias] = useState<CategoriaFiltro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const catalogoRaiz = await catalogoService.getCatalogoRaiz();
        
        // Transformar a formato de categorías para filtro
        const categoriasTransformadas: CategoriaFiltro[] = catalogoRaiz.map((catalogo: CatalogoBase) => ({
          id: catalogo.id,
          nombre: catalogo.nombre,
          descripcion: catalogo.descripcion,
        }));

        setCategorias(categoriasTransformadas);
        setError(null);
      } catch (err) {
        console.error('Error al obtener categorías para filtro:', err);
        setError('No se pudieron cargar las categorías');
        setCategorias([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
  };
}
