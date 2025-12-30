'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { yearSelectHelper, textSelectHelper, SELECT_ALL_VALUE } from '@/lib/select-helpers';
import { FiltrosBusqueda as FiltrosBusquedaType, Documento, Paginacion, OpcionesFiltros } from '@/services/busqueda-documentos/types';

interface FiltrosBusquedaProps {
  filtros: FiltrosBusquedaType;
  opcionesFiltros: OpcionesFiltros;
  actualizarFiltro: <K extends keyof FiltrosBusquedaType>(campo: K, valor: FiltrosBusquedaType[K]) => void;
  buscarDocumentos: (nuevosFiltros?: Partial<FiltrosBusquedaType>) => Promise<void>;
  limpiarFiltros: () => void;
}

export function FiltrosBusqueda({
  filtros,
  opcionesFiltros,
  actualizarFiltro,
  buscarDocumentos,
  limpiarFiltros,
}: FiltrosBusquedaProps) {
  const [busquedaLocal, setBusquedaLocal] = useState(filtros.search || '');
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<number[]>(filtros.categorias || []);

  // Sincronizar búsqueda local con filtros
  useEffect(() => {
    setBusquedaLocal(filtros.search || '');
  }, [filtros.search]);

  useEffect(() => {
    setCategoriasSeleccionadas(filtros.categorias || []);
  }, [filtros.categorias]);

  const handleBuscar = () => {
    // Validar que haya algún criterio de búsqueda
    const busquedaTrimmed = busquedaLocal.trim();
    
    // Si la búsqueda está vacía y no hay otros filtros activos, no hacer nada
    buscarDocumentos({ 
      search: busquedaLocal.trim() || undefined,
      categorias: categoriasSeleccionadas.length > 0 ? categoriasSeleccionadas : undefined,
    });
  };

  const handleLimpiar = () => {
    // Limpiar estado local
    setBusquedaLocal('');
    setCategoriasSeleccionadas([]);
    
    // Llamar a limpiarFiltros del hook
    limpiarFiltros();
  };

  const handleCategoriaToggle = (categoriaId: number) => {
    const nuevasCategorias = categoriasSeleccionadas.includes(categoriaId)
      ? categoriasSeleccionadas.filter(id => id !== categoriaId)
      : [...categoriasSeleccionadas, categoriaId];
    
    setCategoriasSeleccionadas(nuevasCategorias);
    actualizarFiltro('categorias', nuevasCategorias);
  };

  const hayFiltrosActivos = 
    !!filtros.search || 
    !!filtros.anio || 
    !!filtros.extension || 
    !!filtros.periodicidad || 
    !!filtros.institucion || 
    (filtros.categorias?.length || 0) > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filtros
          {hayFiltrosActivos && (
            <span className="ml-auto text-xs font-normal text-muted-foreground">
              Filtros activos
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Búsqueda por texto */}
        <div className="space-y-2">
          <Label htmlFor="search-text">Buscar por nombre</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search-text"
              type="text"
              placeholder="Nombre del documento..."
              className="pl-9"
              value={busquedaLocal}
              onChange={(e) => setBusquedaLocal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
            />
          </div>
        </div>

        {/* Filtro por año */}
        <div className="space-y-2">
          <Label htmlFor="year">Año del documento</Label>
          <Select
            value={yearSelectHelper.toFrontend(filtros.anio)}
            onValueChange={(value) => actualizarFiltro('anio', yearSelectHelper.toBackend(value))}
          >
            <SelectTrigger id="year">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SELECT_ALL_VALUE}>Todos los años</SelectItem>
              {opcionesFiltros.años.map((año) => (
                <SelectItem key={año.value} value={año.value}>
                  {año.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por extensión */}
        <div className="space-y-2">
          <Label htmlFor="extension">Extensión de archivo</Label>
          <Select
            value={textSelectHelper.toFrontend(filtros.extension)}
            onValueChange={(value) => actualizarFiltro('extension', textSelectHelper.toBackend(value))}
          >
            <SelectTrigger id="extension">
              <SelectValue placeholder="Seleccionar formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SELECT_ALL_VALUE}>Todos los formatos</SelectItem>
              {opcionesFiltros.extensiones.map((ext) => (
                <SelectItem key={ext.value} value={ext.value}>
                  {ext.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por periodicidad */}
        <div className="space-y-2">
          <Label htmlFor="periodicity">Periodicidad</Label>
          <Select
            value={textSelectHelper.toFrontend(filtros.periodicidad)}
            onValueChange={(value) => actualizarFiltro('periodicidad', textSelectHelper.toBackend(value))}
          >
            <SelectTrigger id="periodicity">
              <SelectValue placeholder="Seleccionar periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SELECT_ALL_VALUE}>Todas las periodicidades</SelectItem>
              {opcionesFiltros.periodicidades.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtro por institución */}
        {/* <div className="space-y-2">
          <Label htmlFor="institution">Institución emisora</Label>
          <Select
            value={textSelectHelper.toFrontend(filtros.institucion)}
            onValueChange={(value) => actualizarFiltro('institucion', textSelectHelper.toBackend(value))}
          >
            <SelectTrigger id="institution">
              <SelectValue placeholder="Seleccionar institución" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SELECT_ALL_VALUE}>Todas las instituciones</SelectItem>
              {opcionesFiltros.instituciones.map((inst) => (
                <SelectItem key={inst.value} value={inst.value}>
                  {inst.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

        {/* Botones de acción */}
        <div className="space-y-3 pt-2">
          <Button onClick={handleBuscar} className="w-full">
            <Search className="mr-2 h-4 w-4" />
            Aplicar filtros
          </Button>
          
          <Button 
            onClick={handleLimpiar} 
            variant="outline" 
            className="w-full"
            disabled={!hayFiltrosActivos}
          >
            <X className="mr-2 h-4 w-4" />
            Limpiar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
