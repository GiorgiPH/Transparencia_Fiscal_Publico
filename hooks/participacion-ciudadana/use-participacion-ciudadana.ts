'use client';

import { useState, useCallback } from 'react';
import { participacionCiudadanaService } from '@/services/participacion-ciudadana';
import { FormularioParticipacion, FormularioErrores, InformacionContacto } from '@/services/participacion-ciudadana/types';

interface MecanismoParticipacion {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
}

export function useParticipacionCiudadana() {
  const [formulario, setFormulario] = useState<FormularioParticipacion>({
    nombre_completo: '',
    correo_electronico: '',
    asunto: '',
    mensaje: '',
  });

  const [errores, setErrores] = useState<FormularioErrores>({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  const handleCambioFormulario = useCallback((campo: keyof FormularioParticipacion, valor: string) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor,
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errores[campo]) {
      setErrores(prev => ({
        ...prev,
        [campo]: undefined,
      }));
    }
  }, [errores]);

  const validarFormulario = useCallback((): boolean => {
    const nuevosErrores = participacionCiudadanaService.validarFormulario(formulario);
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }, [formulario]);

  const enviarFormulario = useCallback(async (): Promise<boolean> => {
    if (!validarFormulario()) {
      return false;
    }

    try {
      setEnviando(true);
      setErrorEnvio(null);

      await participacionCiudadanaService.enviarFormulario(formulario);

      setEnviado(true);
      // Limpiar formulario después de enviar exitosamente
      setFormulario({
        nombre_completo: '',
        correo_electronico: '',
        asunto: '',
        mensaje: '',
      });

      return true;
    } catch (error: any) {
      console.error('Error al enviar formulario:', error);
      setErrorEnvio(
        error?.message || 
        'Ocurrió un error al enviar el formulario. Por favor, intenta nuevamente.'
      );
      return false;
    } finally {
      setEnviando(false);
    }
  }, [formulario, validarFormulario]);

  const reiniciarFormulario = useCallback(() => {
    setFormulario({
      nombre_completo: '',
      correo_electronico: '',
      asunto: '',
      mensaje: '',
    });
    setErrores({});
    setEnviado(false);
    setErrorEnvio(null);
  }, []);

  const obtenerInformacionContacto = useCallback((): InformacionContacto => {
    return participacionCiudadanaService.getInformacionContacto();
  }, []);

  const obtenerMecanismosParticipacion = useCallback((): MecanismoParticipacion[] => {
    return participacionCiudadanaService.getMecanismosParticipacion();
  }, []);

  const esFormularioValido = participacionCiudadanaService.esFormularioValido(formulario);

  return {
    // Estado del formulario
    formulario,
    errores,
    enviando,
    enviado,
    errorEnvio,
    esFormularioValido,

    // Funciones del formulario
    handleCambioFormulario,
    validarFormulario,
    enviarFormulario,
    reiniciarFormulario,

    // Información estática
    informacionContacto: obtenerInformacionContacto(),
    mecanismosParticipacion: obtenerMecanismosParticipacion(),
  };
}
