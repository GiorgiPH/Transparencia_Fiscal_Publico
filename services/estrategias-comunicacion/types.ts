// Tipos para la respuesta de redes sociales
export interface RedSocial {
  id: number;
  nombre: string;
  descripcion : string;
  url: string;
  icono: string;
  activo: boolean;
  orden: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

// Respuesta de la API para redes sociales
export interface RedesSocialesResponse {
  statusCode: number;
  message: string;
  data: RedSocial[];
  timestamp: string;
  path: string;
}

// Mapeo de iconos a componentes de Lucide React
export const ICONOS_REDES_SOCIALES: Record<string, string> = {
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

// Colores para cada red social
export const COLORES_REDES_SOCIALES: Record<string, string> = {
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
