import { apiClient } from '@/lib/api/axios-client';
import { FormularioParticipacion, ParticipacionResponse, FormularioErrores } from './types';

export const participacionCiudadanaService = {
  // Enviar formulario de participación ciudadana
  async enviarFormulario(formulario: FormularioParticipacion): Promise<ParticipacionResponse['data']> {
    try {
      const response = await apiClient.post<ParticipacionResponse['data']>('/participacion-ciudadana', formulario);
      return response;
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      throw error;
    }
  },

  // Validar formulario
  validarFormulario(formulario: FormularioParticipacion): FormularioErrores {
    const errores: FormularioErrores = {};

    // Validar nombre completo
    if (!formulario.nombre_completo.trim()) {
      errores.nombre_completo = 'El nombre completo es requerido';
    } else if (formulario.nombre_completo.trim().length < 3) {
      errores.nombre_completo = 'El nombre debe tener al menos 3 caracteres';
    }

    // Validar correo electrónico
    if (!formulario.correo_electronico.trim()) {
      errores.correo_electronico = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo_electronico)) {
      errores.correo_electronico = 'El correo electrónico no es válido';
    }

    // Validar asunto
    if (!formulario.asunto.trim()) {
      errores.asunto = 'El asunto es requerido';
    } else if (formulario.asunto.trim().length < 5) {
      errores.asunto = 'El asunto debe tener al menos 5 caracteres';
    }

    // Validar mensaje
    if (!formulario.mensaje.trim()) {
      errores.mensaje = 'El mensaje es requerido';
    } else if (formulario.mensaje.trim().length < 10) {
      errores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    return errores;
  },

  // Verificar si el formulario es válido
  esFormularioValido(formulario: FormularioParticipacion): boolean {
    const errores = this.validarFormulario(formulario);
    return Object.keys(errores).length === 0;
  },

  // Información de contacto de la unidad (datos estáticos que podrían venir de una API en el futuro)
  getInformacionContacto() {
    return {
      unidad: 'Unidad de Transparencia Fiscal',
      correo: 'utfiscal@morelos.gob.mx',
      telefono: '(777) 329-1700',
      extension: '1234',
      direccion: 'Av. Morelos Sur No. 187, Col. Las Palmas, C.P. 62050, Cuernavaca, Morelos',
      horario: 'Lunes a Viernes, 9:00 AM - 6:00 PM',
    };
  },

  // Mecanismos de participación disponibles
  getMecanismosParticipacion() {
    return [
      {
        id: 1,
        titulo: 'Buzón de sugerencias',
        descripcion: 'Envía tus comentarios y sugerencias para mejorar el portal de transparencia fiscal',
        icono: 'MessageSquare',
      },
      {
        id: 2,
        titulo: 'Solicitudes de información',
        descripcion: 'Realiza solicitudes de acceso a información pública conforme a la ley',
        icono: 'FileText',
      },
      {
        id: 3,
        titulo: 'Foros ciudadanos',
        descripcion: 'Participa en consultas públicas y foros de discusión sobre transparencia fiscal',
        icono: 'Users',
      },
    ];
  },
};
