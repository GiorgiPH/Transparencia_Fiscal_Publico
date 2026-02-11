# ============================================
# DOCKERFILE PARA APLICACIÓN NEXT.JS - PRODUCCIÓN
# Transparencia Fiscal Público - Portal Ciudadano
# Versión simplificada y robusta
# ============================================

# Etapa 1: Builder
FROM node:20-alpine AS builder
RUN apk add --no-cache python3 make g++
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Variables de entorno para build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Construir la aplicación
RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine AS runner
WORKDIR /app

# Configurar zona horaria
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/America/Mexico_City /etc/localtime && \
    echo "America/Mexico_City" > /etc/timezone

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Variables de entorno
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copiar archivos necesarios del builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Configurar permisos
USER nextjs

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]

# ============================================
# CONFIGURACIÓN AVANZADA
# ============================================

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Labels para metadata
LABEL org.opencontainers.image.title="Transparencia Fiscal Público"
LABEL org.opencontainers.image.description="Portal Ciudadano de Transparencia Fiscal"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.authors="Gobierno de Morelos"
LABEL org.opencontainers.image.licenses="MIT"
