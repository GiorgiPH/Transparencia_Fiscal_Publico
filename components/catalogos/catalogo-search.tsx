'use client';

import { useState, KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CatalogoSearchProps {
  onSearch: (text: string) => void;
  onClear: () => void;
  isSearching: boolean;
  searchLoading: boolean;
  searchText: string;
}

export function CatalogoSearch({
  onSearch,
  onClear,
  isSearching,
  searchLoading,
  searchText,
}: CatalogoSearchProps) {
  setTimeout(() => {
    
  }, 1000);
  const [localSearchText, setLocalSearchText] = useState(searchText);
  const handleSearch = () => {
    if (localSearchText.trim().length >= 2) {
      onSearch(localSearchText.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setLocalSearchText('');
    onClear();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar catálogos por nombre o descripción (mínimo 2 caracteres)..."
            className="pl-10 pr-10"
            value={localSearchText}
            onChange={(e) => setLocalSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={searchLoading}
          />
          {localSearchText && (
            <button
              type="button"
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
              disabled={searchLoading}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          onClick={handleSearch}
          disabled={searchLoading || localSearchText.trim().length < 2}
          className="min-w-[100px]"
        >
          {searchLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Buscando...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </>
          )}
        </Button>
      </div>

      {isSearching && (
        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              Resultados de búsqueda para: "{searchText}"
            </span>
            {searchLoading && (
              <span className="text-xs text-muted-foreground">(buscando...)</span>
            )}
          </div>
          {/* <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={searchLoading}
          >
            <X className="mr-2 h-4 w-4" />
            Limpiar búsqueda
          </Button> */}
        </div>
      )}
    </div>
  );
}