'use client';

import { useParticipacionCiudadana } from '@/hooks/participacion-ciudadana';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export function FormularioParticipacion() {
  const {
    formulario,
    errores,
    enviando,
    enviado,
    errorEnvio,
    esFormularioValido,
    handleCambioFormulario,
    enviarFormulario,
    reiniciarFormulario,
  } = useParticipacionCiudadana();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await enviarFormulario();
  };

  if (enviado) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">¡Formulario enviado exitosamente!</h3>
            <p className="text-muted-foreground mb-6">
              Tu mensaje ha sido recibido. Nos pondremos en contacto contigo en breve.
            </p>
            <Button onClick={reiniciarFormulario} variant="outline">
              Enviar otro mensaje
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Envía tu mensaje</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorEnvio && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorEnvio}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="nombre_completo">Nombre completo *</Label>
            <Input
              id="nombre_completo"
              value={formulario.nombre_completo}
              onChange={(e) => handleCambioFormulario('nombre_completo', e.target.value)}
              placeholder="Ingresa tu nombre completo"
              className={errores.nombre_completo ? 'border-destructive' : ''}
            />
            {errores.nombre_completo && (
              <p className="text-sm text-destructive">{errores.nombre_completo}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="correo_electronico">Correo electrónico *</Label>
            <Input
              id="correo_electronico"
              type="email"
              value={formulario.correo_electronico}
              onChange={(e) => handleCambioFormulario('correo_electronico', e.target.value)}
              placeholder="ejemplo@correo.com"
              className={errores.correo_electronico ? 'border-destructive' : ''}
            />
            {errores.correo_electronico && (
              <p className="text-sm text-destructive">{errores.correo_electronico}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="asunto">Asunto *</Label>
            <Input
              id="asunto"
              value={formulario.asunto}
              onChange={(e) => handleCambioFormulario('asunto', e.target.value)}
              placeholder="¿Sobre qué quieres comunicarte?"
              className={errores.asunto ? 'border-destructive' : ''}
            />
            {errores.asunto && (
              <p className="text-sm text-destructive">{errores.asunto}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje">Mensaje *</Label>
            <Textarea
              id="mensaje"
              value={formulario.mensaje}
              onChange={(e) => handleCambioFormulario('mensaje', e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              className={errores.mensaje ? 'border-destructive' : ''}
            />
            {errores.mensaje && (
              <p className="text-sm text-destructive">{errores.mensaje}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Los campos marcados con * son obligatorios
            </p>
            <Button
              type="submit"
              disabled={!esFormularioValido || enviando}
              className="min-w-32"
            >
              {enviando ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar mensaje'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
