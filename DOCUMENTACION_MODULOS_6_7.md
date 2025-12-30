# Documentación: Módulos 6 y 7 - Portal Público

## Módulo 6: Estrategias de Comunicación

### Arquitectura Implementada

#### 1. Servicios (`/services/estrategias-comunicacion/`)
- **`types.ts`**: Tipos TypeScript para redes sociales
  - `RedSocial`: Interface para datos de redes sociales
  - `RedesSocialesResponse`: Formato de respuesta API
  - `ICONOS_REDES_SOCIALES`: Mapeo de nombres a iconos Lucide
  - `COLORES_REDES_SOCIALES`: Colores específicos por red social

- **`estrategias-comunicacion.service.ts`**: Servicio principal
  - `getRedesSociales()`: Obtiene redes sociales activas desde API
  - `getIconoPorRedSocial()`: Devuelve nombre de componente icono
  - `getColorPorRedSocial()`: Devuelve clases CSS de color
  - `getNombreUsuarioDeUrl()`: Extrae nombre de usuario de URL

#### 2. Hooks (`/hooks/estrategias-comunicacion/`)
- **`use-redes-sociales.ts`**: Hook personalizado
  - Estado: `redesSociales`, `loading`, `error`
  - Funciones: `cargarRedesSociales()`, `obtenerIcono()`, `obtenerColor()`, `obtenerNombreUsuario()`
  - Filtrado automático de redes activas

#### 3. Componentes (`/components/estrategias-comunicacion/`)
- **`redes-sociales-dinamicas.tsx`**: Componente visual
  - Carga dinámica de redes sociales desde API
  - Estados: loading, error, empty
  - Iconos Lucide React dinámicos
  - Diseño responsive con TailwindCSS

#### 4. Integración con Página Existente
- **`/app/estrategias-comunicacion/page.tsx`**: Actualizado
  - Reemplazo de redes sociales estáticas por componente dinámico
  - Mantenimiento de secciones existentes (noticias, contacto)

### Flujo de Datos
```
API Backend → apiClient.get() → estrategiasComunicacionService → useRedesSociales() → RedesSocialesDinamicas
```

---

## Módulo 7: Participación Ciudadana

### Arquitectura Implementada

#### 1. Servicios (`/services/participacion-ciudadana/`)
- **`types.ts`**: Tipos TypeScript para formularios
  - `FormularioParticipacion`: Campos del formulario
  - `ParticipacionResponse`: Formato de respuesta API
  - `InformacionContacto`: Datos de contacto de la unidad
  - `FormularioErrores`: Validación de formulario

- **`participacion-ciudadana.service.ts`**: Servicio principal
  - `enviarFormulario()`: Envía datos a API
  - `validarFormulario()`: Validación cliente-side
  - `esFormularioValido()`: Verifica validez
  - `getInformacionContacto()`: Datos estáticos de contacto
  - `getMecanismosParticipacion()`: Mecanismos disponibles

#### 2. Hooks (`/hooks/participacion-ciudadana/`)
- **`use-participacion-ciudadana.ts`**: Hook personalizado
  - Estado completo del formulario
  - Validación en tiempo real
  - Manejo de envío y errores
  - Funciones de limpieza y reinicio

#### 3. Componentes (`/components/participacion-ciudadana/`)
- **`formulario-participacion.tsx`**: Componente de formulario
  - Formulario con validación
  - Estados: enviando, enviado, error
  - UI con ShadCN components
  - Mensajes de éxito/error

#### 4. Integración con Página Existente
- **`/app/participacion-ciudadana/page.tsx`**: Actualizado
  - Reemplazo de formulario estático por componente dinámico
  - Mantenimiento de información de contacto

### Flujo de Datos
```
Formulario → useParticipacionCiudadana() → participacionCiudadanaService → API Backend
```

---

## Patrones y Buenas Prácticas Implementadas

### 1. Separación por Dominios
- Servicios organizados por módulo funcional
- Hooks específicos por dominio
- Componentes reutilizables

### 2. TypeScript Estricto
- Interfaces definidas para todos los tipos
- Validación de tipos en tiempo de compilación
- Sin uso de `any`

### 3. Manejo de Estado
- Hooks personalizados para lógica compleja
- Estado localizado en componentes
- Validación en tiempo real

### 4. UX/UI
- Estados de loading y error
- Feedback visual inmediato
- Diseño responsive
- Accesibilidad (labels, ARIA)

### 5. Integración con Stack Existente
- Uso de `apiClient` centralizado
- Compatible con ShadCN UI
- Sigue convenciones de nomenclatura del proyecto

---

## Endpoints API Esperados

### Módulo 6: Estrategias de Comunicación
```
GET /api/estrategias-comunicacion/redes-sociales
Response: RedSocial[]
```

### Módulo 7: Participación Ciudadana
```
POST /api/participacion-ciudadana
Body: FormularioParticipacion
Response: ParticipacionResponse
```

---

## Variables de Entorno Requeridas

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## Pruebas Realizadas

1. **Build de Producción**: `npm run build` exitoso
2. **TypeScript**: Sin errores de compilación
3. **Estructura**: Arquitectura consistente con proyecto existente
4. **Integración**: Compatible con módulos anteriores (catálogos, finanzas)

---

## Consideraciones para Producción

### 1. Backend API
- Implementar endpoints correspondientes
- Validación de datos en backend
- Autenticación si es necesario (para Módulo 7)

### 2. Seguridad
- Sanitización de inputs en formularios
- Protección contra CSRF
- Rate limiting para formularios

### 3. Performance
- Caching de redes sociales (pueden ser datos estáticos)
- Lazy loading de componentes
- Optimización de imágenes

### 4. Monitoreo
- Logging de errores en servicios
- Tracking de envíos de formularios
- Métricas de uso

---

## Archivos Creados

### Módulo 6
```
/services/estrategias-comunicacion/types.ts
/services/estrategias-comunicacion/estrategias-comunicacion.service.ts
/services/estrategias-comunicacion/index.ts
/hooks/estrategias-comunicacion/use-redes-sociales.ts
/hooks/estrategias-comunicacion/index.ts
/components/estrategias-comunicacion/redes-sociales-dinamicas.tsx
```

### Módulo 7
```
/services/participacion-ciudadana/types.ts
/services/participacion-ciudadana/participacion-ciudadana.service.ts
/services/participacion-ciudadana/index.ts
/hooks/participacion-ciudadana/use-participacion-ciudadana.ts
/hooks/participacion-ciudadana/index.ts
/components/participacion-ciudadana/formulario-participacion.tsx
```

### Actualizaciones
```
/services/index.ts (exportaciones actualizadas)
/hooks/index.ts (exportaciones actualizadas)
/app/estrategias-comunicacion/page.tsx (integración dinámica)
/app/participacion-ciudadana/page.tsx (integración dinámica)
```

---

## Conclusión

La implementación de los Módulos 6 y 7 sigue las mejores prácticas establecidas en el proyecto:

1. **Arquitectura limpia**: Separación clara entre servicios, hooks y componentes
2. **TypeScript robusto**: Tipado completo sin compromisos
3. **UX mejorada**: Estados de carga, errores y éxito
4. **Integración seamless**: Compatible con stack existente
5. **Escalable**: Fácil de extender y mantener

Los módulos están listos para integrarse con el backend API correspondiente y funcionar en producción.
