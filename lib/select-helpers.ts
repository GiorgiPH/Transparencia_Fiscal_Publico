/**
 * Helper para manejar valores "Todos" en componentes Select
 * 
 * Cuando un select tiene la opción "Todos", en el frontend se muestra con un valor especial
 * pero al backend se envía `undefined` para indicar que no hay filtro aplicado.
 */

/**
 * Valor que representa "Todos" en el frontend
 * Usamos "all" en lugar de string vacío para evitar problemas con componentes que no aceptan valores vacíos
 */
export const SELECT_ALL_VALUE = 'all';

/**
 * Función para transformar el valor de un select para enviar al backend
 * - Si el valor es SELECT_ALL_VALUE, retorna undefined
 * - Si se proporciona una función de transformación, la aplica al valor
 * - De lo contrario, retorna el valor tal cual
 */
export function transformSelectValue<T>(
  value: string,
  transformFn?: (val: string) => T
): T | undefined {
  if (value === SELECT_ALL_VALUE) {
    return undefined;
  }
  
  if (transformFn) {
    return transformFn(value);
  }
  
  return value as T;
}

/**
 * Helper específico para selects de año
 */
export const yearSelectHelper = {
  /**
   * Transforma un valor de año para enviar al backend
   */
  toBackend: (value: string): number | undefined => 
    transformSelectValue(value, (val) => parseInt(val, 10)),
  
  /**
   * Obtiene el valor para mostrar en el frontend
   */
  toFrontend: (value: number | undefined | null): string => 
    value ? String(value) : SELECT_ALL_VALUE,
};

/**
 * Helper específico para selects de texto (extensión, periodicidad, institución, etc.)
 */
export const textSelectHelper = {
  /**
   * Transforma un valor de texto para enviar al backend
   */
  toBackend: (value: string): string | undefined => 
    transformSelectValue(value),
  
  /**
   * Obtiene el valor para mostrar en el frontend
   */
  toFrontend: (value: string | undefined | null): string => 
    value || SELECT_ALL_VALUE,
};

/**
 * Hook para usar los helpers de select
 */
export function useSelectHelpers() {
  return {
    SELECT_ALL_VALUE,
    transformSelectValue,
    yearSelectHelper,
    textSelectHelper,
  };
}

export default {
  SELECT_ALL_VALUE,
  transformSelectValue,
  yearSelectHelper,
  textSelectHelper,
  useSelectHelpers,
};
