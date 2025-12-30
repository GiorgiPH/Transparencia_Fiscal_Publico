'use client';

import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem } from '@/services/catalogos/types';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (item: BreadcrumbItem) => void;
}

export function CatalogoBreadcrumb({ items, onNavigate }: BreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2"
        onClick={() => onNavigate({ id: 0, nombre: 'Catálogo Raíz', nivel: 0 })}
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Inicio</span>
      </Button>
      
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={() => onNavigate(item)}
            disabled={index === items.length - 1}
          >
            <span className={`${index === items.length - 1 ? 'font-semibold' : ''}`}>
              {item.nombre}
            </span>
          </Button>
        </div>
      ))}
    </nav>
  );
}
