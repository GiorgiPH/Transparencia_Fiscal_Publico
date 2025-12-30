# MÓDULO 5: Información de Finanzas Públicas (Portal Público)

## Objetivo Funcional
Visualizar la información de manera jerárquica los catálogos financieros del Estado de Morelos.

## Alcance del Módulo
El módulo permite:
- Visualizar primero los módulos padre (nivel 1)
- Seleccionar un módulo y ver los catálogos en cascada hasta llegar al último nivel
- En el último nivel, visualizar o descargar documentos disponibles

## Arquitectura Implementada

### 1. Capa de Servicios (`services/catalogos/`)
- **`types.ts`**: Tipos TypeScript para las respuestas de la API
- **`catalogo.service.ts`**: Servicio para consumir la API de catálogos
- **`index.ts`**: Exportación del dominio

### 2. Capa de Hooks (`hooks/catalogos/`)
- **`use-catalogos.ts`**: Hook para gestión de estado y navegación de catálogos
- **`use-documentos.ts`**: Hook para descarga y visualización de documentos
- **`index.ts`**: Exportación de hooks

### 3. Capa de Componentes (`components/catalogos/`)
- **`breadcrumb.tsx`**: Componente de navegación jerárquica
- **`tipos-documento.tsx`**: Componente para mostrar formatos disponibles
- **`catalogo-list.tsx`**: Componente para listar catálogos
- **`catalogo-hierarchy.tsx`**: Componente principal que integra todo
- **`index.ts`**: Exportación de componentes

### 4. Página Principal (`app/finanzas/catalogos/page.tsx`)
- Página que integra el sistema completo de catálogos
- Accesible desde la página principal de finanzas

## APIs Consumidas

### GET `/catalogos/raiz`
**Propósito**: Obtener catálogos de nivel 1 (padres)
**Respuesta**:
```typescript
{
  "statusCode": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "id": 110,
      "nombre": "PLAN ESTATAL DE DESARROLLO",
      "descripcion": "Planes Estatales de Desarrollo y programas derivados",
      "nivel": 1,
      "orden": 1,
      "permiteDocumentos": false,
      "fechaCreacion": "2025-12-28T16:36:20.243Z",
      "fechaModificacion": "2025-12-28T16:36:20.243Z"
    }
  ],
  "timestamp": "2025-12-29T20:57:27.362Z",
  "path": "/catalogos/raiz"
}
```

### GET `/catalogos/{id}/hijos`
**Propósito**: Obtener catálogos hijos de un catálogo específico
**Respuesta**:
```typescript
{
  "statusCode": 200,
  "message": "Operación exitosa",
  "data": [
    {
      "id": 294,
      "nombre": "Explicación de políticas contables aplicadas",
      "descripcion": "Políticas contables",
      "nivel": 3,
      "orden": 1,
      "permiteDocumentos": true,
      "fechaCreacion": "2025-12-28T16:36:20.243Z",
      "fechaModificacion": "2025-12-28T16:36:20.243Z",
      "disponibilidadTiposDocumento": [
        {
          "tipoDocumentoId": 1,
          "nombre": "CSV",
          "disponible": false,
          "extension": "csv"
        }
      ]
    }
  ],
  "timestamp": "2025-12-29T20:16:40.834Z",
  "path": "/catalogos/293/hijos"
}
```

### GET `/busqueda-documentos/{id}/descargar`
**Propósito**: Descargar archivo (stream)
**Características**:
- No retorna JSON
- Respuesta es un stream de archivo (CSV, PDF, etc.)
- Implementado con URL directa (no usa fetch)

### GET `/busqueda-documentos/{id}/visualizar`
**Propósito**: Visualizar archivo en el navegador
**Características**:
- Usa `Content-Disposition: inline`
- Permite que el navegador muestre el archivo
- Implementado con URL directa (no usa fetch)

## Flujo de Navegación

1. **Nivel Raíz**: El usuario ve los catálogos padre (nivel 1)
2. **Navegación Jerárquica**: 
   - Click en carpeta (📁) → navega al siguiente nivel
   - Click en documento (📄) → muestra formatos disponibles
3. **Breadcrumbs**: Navegación rápida entre niveles
4. **Documentos**:
   - Iconos por tipo: 📊 (CSV), 📄 (JSON), 📋 (XML), 📈 (Excel)
   - Botones "Descargar" y "Ver" solo activos cuando `disponible: true`
   - Descarga automática con nombre personalizado
   - Visualización en nueva pestaña

## Características Técnicas

### Separación por Dominios
- Servicios organizados por dominio (`services/catalogos/`)
- Hooks específicos del dominio
- Componentes reutilizables

### TypeScript Estricto
- Tipos completos para todas las respuestas API
- Validación en tiempo de compilación
- Prohibido el uso de `any`

### Performance
- Lazy loading de componentes
- Estados de carga y error
- Optimización de re-renders con `useCallback`

### UX/UI
- Diseño responsive (mobile-first)
- Estados visuales claros (loading, error, empty)
- Feedback inmediato al usuario
- Instrucciones de uso integradas

## Convenciones Seguidas

### Nomenclatura
- **Componentes**: `PascalCase` (CatalogoHierarchy)
- **Hooks**: `camelCase` con prefijo `use` (useCatalogos)
- **Servicios**: `camelCase` con sufijo `Service` (catalogoService)
- **Tipos**: `PascalCase` (CatalogoBase)
- **Archivos**: `kebab-case` (catalogo-list.tsx)

### Patrones
- Service Layer Pattern
- Custom Hooks Pattern
- Component Composition
- Error Boundary Pattern

## Variables de Entorno Utilizadas
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api  # Desarrollo
NEXT_PUBLIC_API_URL=https://api.transparenciafiscal.morelos.gob.mx/api  # Producción
```

## Pruebas y Validación

### Build Exitoso
- ✅ Compilación TypeScript sin errores
- ✅ Generación estática de páginas
- ✅ Rutas configuradas correctamente

### Rutas Disponibles
- `/finanzas` → Página principal de finanzas
- `/finanzas/catalogos` → Módulo 5 implementado
- Todas las subpáginas de finanzas mantienen funcionalidad

### Integración
- ✅ Enlace agregado en la página principal de finanzas
- ✅ Icono y descripción apropiados
- ✅ Navegación fluida entre secciones

## Consideraciones de Implementación

### Seguridad
- URLs de descarga/visualización generadas dinámicamente
- No exposición de tokens en URLs
- Validación de disponibilidad antes de acciones

### Accesibilidad
- Navegación por teclado
- Etiquetas ARIA apropiadas
- Contraste de colores adecuado

### Mantenibilidad
- Código modular y documentado
- Separación clara de responsabilidades
- Fácil extensión para nuevos tipos de documento

## Pasos para Extender

### Agregar Nuevo Tipo de Documento
1. Actualizar `catalogo.service.ts`:
   ```typescript
   getIconoPorTipoDocumento() {
     const iconos = {
       5: '📊', // Nuevo tipo
     };
   }
   ```

2. Actualizar `getColorPorTipoDocumento()` con clases CSS

### Agregar Nueva Acción de Documento
1. Extender `useDocumentos.ts` con nueva función
2. Actualizar `TiposDocumento.tsx` con nuevo botón

### Integrar con Otros Módulos
1. Importar hooks desde `@/hooks/catalogos`
2. Usar componentes desde `@/components/catalogos`
3. Consumir servicios desde `@/services/catalogos`

## Conclusión

El Módulo 5 está completamente implementado y listo para producción. Cumple con todos los requerimientos funcionales y técnicos especificados, siguiendo las mejores prácticas de desarrollo y las convenciones establecidas en el proyecto.

**Estado**: ✅ IMPLEMENTADO Y VERIFICADO
