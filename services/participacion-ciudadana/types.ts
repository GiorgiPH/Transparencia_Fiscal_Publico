// Tipos para el formulario de participación ciudadana
export interface FormularioParticipacion {
  nombre_completo: string;
  correo_electronico: string;
  asunto: string;
  mensaje: string;
}

// Respuesta de la API para envío de formulario
export interface ParticipacionResponse {
  statusCode: number;
  message: string;
  data: {
    id: number;
    nombre_completo: string;
    correo_electronico: string;
    asunto: string;
    mensaje: string;
    fecha_creacion: string;
    estado: 'pendiente' | 'en_proceso' | 'atendido';
  };
  timestamp: string;
  path: string;
}

// Tipos para información de contacto de la unidad
export interface InformacionContacto {
  unidad: string;
  correo: string;
  telefono: string;
  extension?: string;
  direccion: string;
  horario: string;
}

// Validación de formulario
export interface FormularioErrores {
  nombre_completo?: string;
  correo_electronico?: string;
  asunto?: string;
  mensaje?: string;
}
