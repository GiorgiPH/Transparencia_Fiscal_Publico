'use client';

import { useRedesSociales } from '@/hooks/estrategias-comunicacion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Importar todos los iconos de Lucide React que necesitamos
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MessageCircle,
  Mail,
  Phone,
  Globe,
  Music,
  Send,
} from 'lucide-react';

const ICONOS_COMPONENTES: Record<string, React.ComponentType<any>> = {
  'Facebook': Facebook,
  'Instagram': Instagram,
  'Twitter': Twitter,
  'X': Twitter,
  'YouTube': Youtube,
  'LinkedIn': Linkedin,
  'WhatsApp': MessageCircle,
  'TikTok': Music,
  'Telegram': Send,
  'Email': Mail,
  'Phone': Phone,
  'Globe': Globe,
};

export function RedesSocialesDinamicas() {
  const { redesSociales, loading, error, obtenerColor } = useRedesSociales();

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (redesSociales.length === 0) {
    return (
      <div className="text-center py-8">
        <Globe className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No hay redes sociales disponibles</h3>
        <p className="text-muted-foreground">Las redes sociales oficiales no están disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {redesSociales.map((red) => {
        const IconoComponente = ICONOS_COMPONENTES[red.icono] || Globe;
        const color = obtenerColor(red.nombre);

        return (
          <a
            key={red.id}
            href={red.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="flex items-center gap-3 rounded-lg border p-4 transition-all hover:border-primary hover:bg-primary/5 h-full">
              <div className={`${color} flex h-10 w-10 items-center justify-center rounded-lg text-white flex-shrink-0`}>
                <IconoComponente className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium group-hover:text-primary truncate">{red.nombre}</p>
                <p className="text-xs text-muted-foreground truncate">{red.descripcion}</p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
