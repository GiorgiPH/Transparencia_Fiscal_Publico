'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ReactNode } from 'react';

interface OpcionFiltro {
  value: string;
  label: string;
}

interface SelectFiltroProps {
  id: string;
  label: string;
  placeholder: string;
  value: string | number | undefined;
  onValueChange: (value: string) => void;
  opciones: OpcionFiltro[];
  opcionTodos?: {
    label?: string;
    value?: string;
  };
  className?: string;
  disabled?: boolean;
}

export function SelectFiltro({
  id,
  label,
  placeholder,
  value,
  onValueChange,
  opciones,
  opcionTodos = { label: 'Todos', value: '' },
  className = '',
  disabled = false,
}: SelectFiltroProps) {
  const handleValueChange = (selectedValue: string) => {
    // El componente Select siempre pasa un string, nunca undefined
    onValueChange(selectedValue);
  };

  const getDisplayValue = () => {
    if (value === undefined || value === '') {
      return '';
    }
    return value.toString();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <Select
        value={getDisplayValue()}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
         
          
          {/* Opciones específicas */}
          {opciones.map((opcion) => (
            <SelectItem key={opcion.value} value={opcion.value}>
              {opcion.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Componente para filtros numéricos (años, IDs, etc.)
interface SelectFiltroNumericoProps extends Omit<SelectFiltroProps, 'value' | 'onValueChange'> {
  value: number | undefined;
  onValueChange: (value: number | undefined) => void;
}

export function SelectFiltroNumerico({
  id,
  label,
  placeholder,
  value,
  onValueChange,
  opciones,
  opcionTodos = { label: 'Todos', value: '' },
  className = '',
  disabled = false,
}: SelectFiltroNumericoProps) {
  const handleValueChange = (selectedValue: string) => {
    const todosValue = opcionTodos.value || '';
    if (selectedValue === '' || selectedValue === todosValue) {
      onValueChange(undefined);
    } else {
      onValueChange(parseInt(selectedValue, 10));
    }
  };

  const stringValue = value?.toString() || '';

  return (
    <SelectFiltro
      id={id}
      label={label}
      placeholder={placeholder}
      value={stringValue}
      onValueChange={handleValueChange}
      opciones={opciones}
      opcionTodos={opcionTodos}
      className={className}
      disabled={disabled}
    />
  );
}
