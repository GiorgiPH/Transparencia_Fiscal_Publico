# Implementación de Búsqueda Jerárquica en Portal Público

## Descripción General

Se ha implementado un sistema de búsqueda jerárquica para los catálogos del portal público. El sistema permite buscar catálogos por nombre o descripción y muestra los resultados manteniendo la estructura jerárquica del árbol de catálogos.

## Componentes Implementados

### 1. Hook: `useCatalogosSearch`
Ubicación: `hooks/catalogos/use-catalogos-search.ts`

Este hook gestiona tanto la navegación normal del árbol como la búsqueda. Mantiene dos estados separados:
- **Estado de navegación**: Para la navegación tradicional por niveles
- **Estado de búsqueda**: Para los resultados de búsqueda

**Características principales:**
- `isSearching`: Indica si estamos en modo búsqueda
- `buscarCatalogos(texto)`: Realiza la búsqueda llamando al endpoint `/buscar?q=texto`
- `limpiarBusqueda()`: Vuelve al modo navegación normal
- `navegarDesdeBusqueda()`: Permite navegar desde un resultado de búsqueda

### 2. Componente: `CatalogoSearch`
Ubicación: `components/catalogos/catalogo-search.tsx`

Componente de UI para el buscador con las siguientes características:
- Campo de búsqueda con validación (mínimo 2 caracteres)
- Botón de búsqueda y limpieza
- Indicador visual cuando se está buscando
- Botón "Limpiar búsqueda" para volver a navegación normal

### 3. Componente: `CatalogoHierarchySearch`
Ubicación: `components/catalogos/catalogo-hierarchy-search.tsx`

Componente principal que reemplaza al `CatalogoHierarchy` original. Integra:
- El buscador en la parte superior
- Breadcrumb (solo visible en modo navegación)
- Sección de información contextual (diferente para búsqueda vs navegación)
- Lista de catálogos que muestra resultados según el modo

### 4. Utilidad: `tree-reconstruction.ts`
Ubicación: `lib/tree-reconstruction.ts`

Contiene funciones para reconstruir el árbol jerárquico a partir de resultados de búsqueda:

**`reconstructTreeFromSearchResults()`**: 
- Reconstruye un árbol con solo las ramas que contienen resultados
- Utiliza el `path` completo que devuelve el backend
- Mantiene la estructura jerárquica eliminando nodos sin resultados

**Otras funciones útiles:**
- `flattenTreeForRendering()`: Aplana el árbol para renderización
- `findNodeInTree()`: Busca un nodo por ID
- `getNodePathInTree()`: Obtiene el path completo de un nodo

## Flujo de Búsqueda

1. **Usuario escribe y presiona Enter/Buscar**
   - Se valida que tenga al menos 2 caracteres
   - Se llama a `buscarCatalogos(texto)`

2. **Backend responde con resultados**
   - Cada resultado incluye su `path` completo desde la raíz
   - El path es un array de objetos `{id, nombre, nivel}`

3. **Frontend reconstruye el árbol**
   - Se usa `reconstructTreeFromSearchResults()` para crear un árbol parcial
   - Solo se incluyen las ramas que llevan a resultados

4. **Renderización de resultados**
   - Se muestra el árbol reconstruido
   - Se mantiene la estructura jerárquica
   - Los nodos son interactivos (se puede navegar desde ellos)

5. **Limpiar búsqueda**
   - Botón "Limpiar búsqueda" restaura el estado inicial
   - Vuelve a cargar los catálogos raíz
   - Cambia `isSearching` a `false`

## Ventajas de la Reconstrucción del Árbol

### ¿Por qué no traer los 700 nodos completos al inicio?

1. **Rendimiento**: 
   - 700 nodos generarían un árbol DOM enorme
   - Impactaría el tiempo de carga inicial
   - Consumiría memoria innecesaria

2. **Experiencia de Usuario**:
   - Los usuarios rara vez necesitan ver todo el árbol
   - La navegación lazy loading es más intuitiva
   - La búsqueda filtra rápidamente lo relevante

3. **Mantenibilidad**:
   - Árboles grandes son difíciles de depurar
   - La reconstrucción parcial es más eficiente
   - Se adapta mejor a diferentes dispositivos

### ¿Cómo funciona la reconstrucción?

1. **Entrada**: Array de resultados con `path` completo
2. **Proceso**:
   - Se crea un mapa de nodos por ID
   - Se establecen relaciones padre-hijo basadas en el `path`
   - Se eliminan nodos que no están en el path de resultados
3. **Salida**: Árbol jerárquico parcial que mantiene:
   - La estructura de parentesco
   - Solo las ramas con resultados
   - El orden original por nivel y orden

## Endpoint Backend

El backend debe implementar:
```
GET /buscar?q=texto
```

**Respuesta esperada:**
```typescript
interface BuscarCatalogosResponse {
  id: number;
  nombre: string;
  nivel: number;
  permiteDocumentos: boolean;
  descripcion?: string;
  // ... otros campos
  path: Array<{
    id: number;
    nombre: string;
    nivel: number;
  }>;
}
```

## Consideraciones Técnicas

### Estado del Árbol
- No se pierde el estado al descargar documentos
- La búsqueda no afecta a las descargas existentes
- El árbol normal se restaura al limpiar la búsqueda

### Separación de Responsabilidades
- Lógica de búsqueda separada en hook dedicado
- Reconstrucción del árbol en utilidad independiente
- Componentes UI enfocados en presentación

### Compatibilidad
- Mantiene compatibilidad con componentes existentes
- No rompe la navegación tradicional
- Se integra sin afectar funcionalidades actuales

## Próximos Pasos

1. **Implementar endpoint `/buscar` en backend**
2. **Probar con datos reales**
3. **Optimizar rendimiento para muchos resultados**
4. **Agregar sugerencias de búsqueda en tiempo real**
5. **Implementar filtros adicionales (por nivel, fecha, etc.)**

## Conclusión

La implementación proporciona una búsqueda jerárquica eficiente que:
- Mantiene la estructura del árbol
- Es performante (no carga todos los nodos)
- Ofrece buena experiencia de usuario
- Se integra sin romper funcionalidades existentes