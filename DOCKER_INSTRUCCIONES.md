# Docker para Portal Público - Transparencia Fiscal

Este documento proporciona instrucciones para construir y ejecutar la aplicación Next.js del Portal Público usando Docker.

## Archivos Creados

1. **`dockerfile`** - Dockerfile optimizado para producción con:
   - Multi-stage build para minimizar el tamaño de la imagen final
   - Usuario no-root para seguridad
   - Configuración de zona horaria (America/Mexico_City)
   - Health checks integrados
   - Labels de metadata para mejor gestión

2. **`.dockerignore`** - Archivo para excluir archivos innecesarios del build
3. **`next.config.mjs`** - Actualizado con `output: 'standalone'` para optimización

## Comandos Básicos

### Construir la imagen

```bash
# Desde el directorio transparencia-fiscal-publico
docker build -t transparencia-fiscal-publico:latest .
```

### Ejecutar en modo desarrollo (con montaje de volumen)

```bash
docker run -d --rm \
  --name portal-publico-dev \
  -p 3000:3000 \
  -v $(pwd):/app \
  -w /app \
  node:20-alpine \
  npm run dev
```

### Ejecutar en producción

```bash
# Construir la imagen primero
docker build -t transparencia-fiscal-publico:prod .

# Ejecutar el contenedor
docker run -d --rm \
  --name portal-publico-prod \
  -p 3000:3000 \
  -e NODE_ENV=production \
  transparencia-fiscal-publico:prod
```

### Comandos útiles

```bash
# Ver logs del contenedor
docker logs portal-publico-prod

# Ver estado del contenedor
docker ps -a --filter "name=portal-publico"

# Detener el contenedor
docker stop portal-publico-prod

# Eliminar la imagen
docker rmi transparencia-fiscal-publico:prod
```

## Variables de Entorno

La aplicación puede configurarse con las siguientes variables de entorno:

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución | `production` |
| `PORT` | Puerto de la aplicación | `3000` |
| `NEXT_PUBLIC_API_URL` | URL del backend API | `http://localhost:3001` |

### Ejemplo con variables personalizadas

```bash
docker run -d --rm \
  --name portal-publico \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e NEXT_PUBLIC_API_URL=http://backend:3001 \
  transparencia-fiscal-publico:latest
```

## Integración con Docker Compose

Para ejecutar junto con el backend, crear un archivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ../transparencia-fiscal-api
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=sqlserver://db:1433;database=DB_Transparencia_Fiscal;user=sa;password=YourPassword123;encrypt=false;trustServerCertificate=true
    depends_on:
      - db

  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://backend:3001
    depends_on:
      - backend

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourPassword123
    ports:
      - "1433:1433"
```

## Características del Dockerfile

### Seguridad
- Usuario no-root (`nextjs:nodejs`) para ejecutar la aplicación
- Permisos mínimos necesarios
- Health checks automáticos

### Optimización
- Multi-stage build para imagen final pequeña (~100MB)
- Cache de dependencias para builds más rápidos
- Solo archivos necesarios en la imagen final

### Configuración
- Zona horaria configurada a America/Mexico_City
- Variables de entorno preconfiguradas
- Labels de metadata para mejor gestión de imágenes

## Troubleshooting

### Problema: Error de permisos
```bash
# Si hay problemas de permisos con node_modules
docker run -d --rm \
  --name portal-publico \
  -p 3000:3000 \
  -v $(pwd):/app \
  -w /app \
  node:20-alpine \
  sh -c "npm install && npm run dev"
```

### Problema: Puerto en uso
```bash
# Verificar qué proceso está usando el puerto
netstat -ano | findstr :3000

# Cambiar el puerto de exposición
docker run -d --rm --name portal-publico -p 3002:3000 transparencia-fiscal-publico:latest
```

### Problema: Build falla por falta de memoria
```bash
# Aumentar memoria de Docker Desktop
# En Docker Desktop: Settings -> Resources -> Memory (mínimo 4GB)

# O usar build con menos memoria
docker build --memory 4g -t transparencia-fiscal-publico:latest .
```

## Mejores Prácticas

1. **Siempre usar tags específicos** en producción
2. **No almacenar secrets** en la imagen Docker
3. **Usar .dockerignore** para excluir archivos innecesarios
4. **Monitorear logs** en producción
5. **Configurar health checks** para orquestadores como Kubernetes

## Soporte

Para problemas o preguntas, consultar la documentación del proyecto o contactar al equipo de desarrollo.
```

<task_progress>
- [x] Analizar estructura del proyecto Next.js
- [x] Revisar configuración y dependencias
- [x] Crear Dockerfile optimizado para producción
- [x] Crear .dockerignore apropiado
- [x] Probar la construcción de la imagen
- [x] Verificar que la aplicación funciona
- [x] Crear documentación adicional
</task_progress>
</write_to_file>
