# Documentación: Módulo 7 - Búsqueda de Datos y Documentos (Portal Público)

## Objetivo Funcional
Permitir al ciudadano localizar, filtrar y descargar documentos de Transparencia Fiscal de forma clara, rápida y precisa, utilizando múltiples criterios de búsqueda basados en los catálogos definidos en el Modelo Temático de Transparencia Fiscal (MTTF).

## Alcance del Módulo
El módulo permite al usuario público:
- Buscar documentos por nombre
- Filtrar documentos por:
  - Año / ejercicio fiscal
  - Categoría del MTTF
  - Periodicidad
  - Tipo / extensión de archivo
  - Institución emisora
- Visualizar los resultados en una tabla paginada
- Ordenar resultados por columnas
- Descargar documentos publicados

**Nota:** Este módulo es 100% de consulta pública, no requiere autenticación.

## Arquitectura Implementada

### 1. Servicios (`/services/busqueda-documentos/`)
#### `types.ts`
- **`Documento`**: Interface completa para documentos con todos los campos de la API
- **`Paginacion`**: Estructura de paginación
- **`BusquedaDocumentosResponse`**: Formato de respuesta API
- **`FiltrosBusqueda`**: Todos los parámetros de búsqueda soportados
- **`OpcionesFiltros`**: Opciones predefinidas para filtros
- **Funciones utilitarias**:
  - `formatearTamanioArchivo()`: Convierte bytes a formato legible
  - `obtenerUrlDescarga()`: Genera URL para descarga de documentos

#### `busqueda-documentos.service.ts`
- **`buscarDocumentos()`**: Método principal para búsqueda con filtros
- **`getOpcionesFiltros()`**: Devuelve opciones predefinidas para filtros
- **`formatearFecha()`**: Formatea fechas ISO a formato legible
- **`getIconoPorExtension()`**: Devuelve icono según extensión
- **`getColorPorExtension()`**: Devuelve clases CSS según extensión
- **`esDocumentoDescargable()`**: Valida si un documento está disponible
- **`descargarDocumento()`**: Maneja la descarga de documentos

### 2. Hooks (`/hooks/busqueda-documentos/`)
#### `use-busqueda-documentos.ts`
- **Estado completo**: documentos, paginación, loading, error, filtros
- **Funciones principales**:
  - `buscarDocumentos()`: Ejecuta búsqueda con filtros
  - `actualizarFiltro()`: Actualiza filtros individuales
  - `limpiarFiltros()`: Restablece filtros a valores por defecto
  - `cambiarPagina()`: Navegación entre páginas
  - `cambiarOrdenamiento()`: Cambia orden de resultados
  - `descargarDocumento()`: Descarga documento específico
- **Utilidades**:
  - `totalDocumentos`: Número total de documentos
  - `hayResultados`: Booleano si hay resultados
  - `esDocumentoDescargable()`: Valida disponibilidad

### 3. Componentes (`/components/busqueda-documentos/`)
#### `filtros-busqueda.tsx`
- Panel lateral izquierdo con todos los filtros
- Búsqueda por texto con debounce
- Selectores para año, extensión, periodicidad, institución
- Botones para aplicar y limpiar filtros
- Indicador visual de filtros activos

#### `tabla-resultados.tsx`
- Tabla responsive con resultados
- Ordenamiento por columnas
- Paginación completa
- Estados: loading, error, vacío
- Iconos y colores según extensión de archivo
- Botones de descarga con validación

### 4. Integración con Página Existente
- **`/app/busqueda-documentos/page.tsx`**: Actualizado
  - Reemplazo completo de implementación estática
  - Integración de componentes dinámicos
  - Mantenimiento de diseño y layout existente

## Endpoints API Implementados

### GET `/busqueda-documentos`
**Parámetros de búsqueda:**
- `search`: Término de búsqueda en nombre o descripción
- `catalogoId`: ID del catálogo para filtrar
- `anio`: Año del ejercicio fiscal
- `extension`: Extensión del archivo (pdf, xlsx, csv, etc.)
- `periodicidad`: Periodicidad del documento
- `institucion`: Institución emisora
- `categorias`: Lista de IDs de categorías
- `page`: Número de página
- `pageSize`: Tamaño de página
- `orderBy`: Campo para ordenar
- `order`: Dirección del orden (asc | desc)

**Respuesta:**
```typescript
{
  documentos: Documento[],
  paginacion: Paginacion
}
```

### GET `/busqueda-documentos/{id}/descargar`
- **No retorna JSON**: Stream directo del archivo
- **Tipos soportados**: CSV, PDF, XLSX, DOCX, etc.
- **Validación**: Solo documentos activos y publicados

## Patrones y Buenas Prácticas

### 1. Separación por Capas
- **Servicios**: Lógica de negocio y comunicación API
- **Hooks**: Manejo de estado y efectos secundarios
- **Componentes**: UI pura y presentación
- **Tipos**: TypeScript estricto sin `any`

### 2. Manejo de Estado
- Estado localizado en hooks personalizados
- Actualizaciones optimizadas con `useCallback`
- Memoización de valores con `useMemo`
- Sincronización automática de filtros

### 3. UX/UI
- **Estados visuales**: loading, error, vacío, éxito
- **Feedback inmediato**: Indicadores de filtros activos
- **Accesibilidad**: Labels, ARIA, navegación por teclado
- **Responsive**: Diseño adaptativo para móviles

### 4. Performance
- **Paginación**: Carga incremental de resultados
- **Debounce**: Búsqueda por texto optimizada
- **Lazy loading**: Componentes cargados bajo demanda
- **Memoización**: Evita re-renders innecesarios

## Variables de Entorno Requeridas

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Archivos Creados

### Servicios
```
/services/busqueda-documentos/types.ts
/services/busqueda-documentos/busqueda-documentos.service.ts
/services/busqueda-documentos/index.ts
```

### Hooks
```
/hooks/busqueda-documentos/use-busqueda-documentos.ts
/hooks/busqueda-documentos/index.ts
```

### Componentes
```
/components/busqueda-documentos/filtros-busqueda.tsx
/components/busqueda-documentos/tabla-resultados.tsx
/components/busqueda-documentos/index.ts
```

### Actualizaciones
```
/services/index.ts (exportaciones actualizadas)
/hooks/index.ts (exportaciones actualizadas)
/app/busqueda-documentos/page.tsx (integración dinámica)
```

## Consideraciones para Producción

### 1. Backend API
- Implementar endpoints correspondientes
- Validación de parámetros de búsqueda
- Optimización de consultas con índices
- Caching de resultados frecuentes

### 2. Seguridad
- Sanitización de inputs de búsqueda
- Validación de rutas de archivos para descarga
- Rate limiting para prevenir abuso
- Logging de descargas

### 3. Performance
- Implementar caching en frontend (SWR/React Query)
- Compresión de respuestas API
- CDN para archivos estáticos
- Optimización de imágenes/icons

### 4. Monitoreo
- Tracking de búsquedas populares
- Métricas de tiempo de respuesta
- Logging de errores de descarga
- Analytics de uso del módulo

## Pruebas Realizadas

1. **Build de Producción**: `npm run build` exitoso
2. **TypeScript**: Sin errores de compilación
3. **Estructura**: Compatible con arquitectura existente
4. **Integración**: Funciona con otros módulos (catálogos, finanzas)

## Conclusión

El Módulo 7 implementa completamente la funcionalidad de búsqueda de documentos con:

1. **Arquitectura robusta**: Separación clara de responsabilidades
2. **TypeScript completo**: Tipado estricto en todas las capas
3. **UX mejorada**: Estados visuales y feedback inmediato
4. **Performance optimizada**: Paginación, debounce, memoización
5. **Escalable**: Fácil de extender con nuevos filtros o funcionalidades

El módulo está listo para integrarse con el backend API y funcionar en producción, siguiendo todas las convenciones y mejores prácticas establecidas en el proyecto.
