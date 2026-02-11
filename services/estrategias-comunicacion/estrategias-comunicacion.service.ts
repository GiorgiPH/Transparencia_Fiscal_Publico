import { apiClient } from '@/lib/api/axios-client';
import { RedSocial } from './types';

export const estrategiasComunicacionService = {
  // Obtener redes sociales activas
  async getRedesSociales(): Promise<RedSocial[]> {
    try {
      const redesSociales = await apiClient.get<RedSocial[]>('/estrategias-comunicacion/redes-sociales');
      // Filtrar solo las redes sociales activas y ordenar por el campo 'orden'
      return redesSociales
        .filter((red: RedSocial) => red.activo)
        .sort((a: RedSocial, b: RedSocial) => a.orden - b.orden);
    } catch (error) {
      console.error('Error al obtener redes sociales:', error);
      return [];
    }
  },

  // Obtener icono de Lucide React por nombre de red social
  getIconoPorRedSocial(nombreRedSocial: string): string {
    const iconos: Record<string, string> = {
      'Facebook': 'Facebook',
      'Instagram': 'Instagram',
      'Twitter': 'Twitter',
      'X': 'Twitter',
      'YouTube': 'Youtube',
      'LinkedIn': 'Linkedin',
      'WhatsApp': 'MessageCircle',
      'TikTok': 'Music',
      'Telegram': 'Send',
      'Email': 'Mail',
      'Phone': 'Phone',
    };

    return iconos[nombreRedSocial] || 'Globe';
  },

  // Obtener color por nombre de red social
  getColorPorRedSocial(nombreRedSocial: string): string {
    const colores: Record<string, string> = {
      'Facebook': 'bg-[#1877F2]',
      'Instagram': 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
      'Twitter': 'bg-black',
      'X': 'bg-black',
      'YouTube': 'bg-[#FF0000]',
      'LinkedIn': 'bg-[#0A66C2]',
      'WhatsApp': 'bg-[#25D366]',
      'TikTok': 'bg-black',
      'Telegram': 'bg-[#0088cc]',
      'Email': 'bg-primary',
      'Phone': 'bg-green-600',
    };

    return colores[nombreRedSocial] || 'bg-gray-600';
  },

  // Obtener nombre de usuario de la URL (para mostrar en la UI)
 
};
