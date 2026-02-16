import { apiClient } from '../../lib/api/axios-client';
import {
  CatalogoBase,
  CatalogoConDocumentos,
  CatalogoRaizResponse,
  CatalogoHijosResponse
} from './types';

export interface BuscarCatalogosResponse extends CatalogoConDocumentos {
  path: Array<{
    id: number;
    nombre: string;
    nivel: number;
  }>;
}

export const catalogoService = {
  async getCatalogoRaiz(): Promise<CatalogoBase[]> {
    return apiClient.get<CatalogoBase[]>('/catalogos/raiz');
  },

  async getCatalogoHijos(catalogoId: number): Promise<CatalogoConDocumentos[]> {
    return apiClient.get<CatalogoConDocumentos[]>(`/catalogos/${catalogoId}/hijos`);
  },

  async getFullCatalogoRaiz(): Promise<CatalogoRaizResponse> {
    return apiClient.getFullResponse<CatalogoBase[]>('/catalogos/raiz');
  },

  async getFullCatalogoHijos(catalogoId: number): Promise<CatalogoHijosResponse> {
    return apiClient.getFullResponse<CatalogoConDocumentos[]>(`/catalogos/${catalogoId}/hijos`);
  },

  // URLs para descarga y visualización (no usan fetch, solo URL directa)
  getDocumentoDescargaUrl(documentoId: number): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    return `${baseUrl}/busqueda-documentos/${documentoId}/descargar`;
  },

  getDocumentoVisualizacionUrl(documentoId: number): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    return `${baseUrl}/busqueda-documentos/${documentoId}/visualizar`;
  },

  // Helper para obtener icono según tipo de documento
  getIconoPorTipoDocumento(tipoDocumentoId: number): string {
    const iconos: Record<number, string> = {
      1: '📊', // CSV
      2: '📄', // JSON
      3: '📋', // XML
      4: '📈', // Excel
    };
    return iconos[tipoDocumentoId] || '📄';
  },

  // Helper para obtener color según tipo de documento
  getColorPorTipoDocumento(tipoDocumentoId: number): string {
    const colores: Record<number, string> = {
      1: 'bg-green-100 text-green-800 border-green-300', // CSV
      2: 'bg-blue-100 text-blue-800 border-blue-300', // JSON
      3: 'bg-purple-100 text-purple-800 border-purple-300', // XML
      4: 'bg-emerald-100 text-emerald-800 border-emerald-300', // Excel
    };
    return colores[tipoDocumentoId] || 'bg-gray-100 text-gray-800 border-gray-300';
  },

  // Buscar catálogos por texto
  async buscarCatalogos(texto: string): Promise<BuscarCatalogosResponse[]> {
    if (!texto || texto.trim().length < 2) {
      return [];
    }
    return apiClient.get<BuscarCatalogosResponse[]>(`/catalogos/buscar?q=${encodeURIComponent(texto.trim())}`);
  },
};
