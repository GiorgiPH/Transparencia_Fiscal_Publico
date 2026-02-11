import { apiClient } from '@/lib/api/axios-client';
import { 
  Documento, 
  BusquedaDocumentosResponse, 
  FiltrosBusqueda, 
  OpcionesFiltros,
  OpcionFiltro,
  formatearTamanioArchivo,
  obtenerUrlDescarga 
} from './types';

export const busquedaDocumentosService = {
  // Buscar documentos con filtros
  async buscarDocumentos(filtros: FiltrosBusqueda = {}): Promise<BusquedaDocumentosResponse['data']> {
    try {
      // Construir query params
      const params = new URLSearchParams();
      
      if (filtros.search) params.append('search', filtros.search);
      if (filtros.catalogoId) params.append('catalogoId', filtros.catalogoId.toString());
      if (filtros.anio) params.append('anio', filtros.anio.toString());
      if (filtros.extension) params.append('extension', filtros.extension);
      if (filtros.periodicidad) params.append('periodicidad', filtros.periodicidad);
      if (filtros.institucion) params.append('institucion', filtros.institucion);
      if (filtros.categorias?.length) {
        filtros.categorias.forEach(id => params.append('categorias', id.toString()));
      }
      if (filtros.page) params.append('page', filtros.page.toString());
      if (filtros.pageSize) params.append('pageSize', filtros.pageSize.toString());
      if (filtros.orderBy) params.append('orderBy', filtros.orderBy);
      if (filtros.order) params.append('order', filtros.order);

      const url = `/busqueda-documentos${params.toString() ? `?${params.toString()}` : ''}`;
      const resultado = await apiClient.get<BusquedaDocumentosResponse['data']>(url);

      
      return resultado;
    } catch (error) {
      console.error('Error al buscar documentos:', error);
      throw error;
    }
  },

  // Obtener opciones de filtros (datos estáticos que podrían venir de API en el futuro)
  getOpcionesFiltros(): OpcionesFiltros {
    const añoActual = new Date().getFullYear();
    const años: OpcionFiltro[] = [];
    
    // Generar últimos 10 años
    for (let i = 0; i < 10; i++) {
      const año = añoActual - i;
      años.push({ value: año.toString(), label: año.toString() });
    }

    return {
      años,
      extensiones: [
        //{ value: 'pdf', label: 'PDF' },
        
        { value: '1', label: 'CSV' },
        { value: '2', label: 'JSON' },
        { value: '3', label: 'XML' },
        { value: '4', label: 'Excel (XLSX)' },
        //{ value: 'docx', label: 'Word (DOCX)' },
        //{ value: 'txt', label: 'Texto (TXT)' },
      ],
      periodicidades: [
        { value: 'mensual', label: 'Mensual' },
        { value: 'trimestral', label: 'Trimestral' },
        { value: 'semestral', label: 'Semestral' },
        { value: 'anual', label: 'Anual' },
        { value: 'bimestral', label: 'Bimestral' },
      ],
      instituciones: [
        { value: 'Secretaría de Finanzas', label: 'Secretaría de Finanzas' },
        { value: 'Tesorería General', label: 'Tesorería General' },
        { value: 'Contraloría', label: 'Contraloría' },
        { value: 'Administración', label: 'Administración' },
        { value: 'Secretaría de Hacienda', label: 'Secretaría de Hacienda' },
      ],
    };
  },

  // Formatear fecha para mostrar en UI
  formatearFecha(fechaISO: string): string {
    try {
      const fecha = new Date(fechaISO);
      return fecha.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return fechaISO;
    }
  },

  // Obtener icono según extensión del archivo
  getIconoPorExtension(extension: string): string {
    const iconos: Record<string, string> = {
      '.pdf': 'FileText',
      '.xlsx': 'FileSpreadsheet',
      '.csv': 'FileSpreadsheet',
      '.docx': 'FileText',
      '.txt': 'FileText',
      '.jpg': 'Image',
      '.png': 'Image',
      '.zip': 'Archive',
    };

    const ext = extension.toLowerCase();
    return iconos[ext] || 'File';
  },

  // Obtener color según extensión del archivo
  getColorPorExtension(extension: string): string {
    const colores: Record<string, string> = {
      '.pdf': 'bg-red-100 text-red-800 border-red-200',
      '.xlsx': 'bg-green-100 text-green-800 border-green-200',
      '.csv': 'bg-blue-100 text-blue-800 border-blue-200',
      '.docx': 'bg-blue-100 text-blue-800 border-blue-200',
      '.txt': 'bg-gray-100 text-gray-800 border-gray-200',
    };

    const ext = extension.toLowerCase();
    return colores[ext] || 'bg-gray-100 text-gray-800 border-gray-200';
  },

  // Validar si un documento está disponible para descarga
  esDocumentoDescargable(documento: Documento): boolean {
    return documento.activo  && !!documento.ruta_archivo;
  },

  // Descargar documento
  descargarDocumento(id: number, nombreArchivo?: string): void {
    const url = obtenerUrlDescarga(id);
    
    // Crear enlace temporal para descarga
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    if (nombreArchivo) {
      link.download = nombreArchivo;
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Utilidades exportadas
  formatearTamanioArchivo,
  obtenerUrlDescarga,
};
