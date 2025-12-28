
import { z } from 'zod';
import { gestores } from './schema';

export const api = {
  gestores: {
    listar: {
      method: 'GET' as const,
      path: '/api/gestores',
      respuestas: {
        200: z.array(z.custom<typeof gestores.$inferSelect>()),
      },
    },
    estadisticas: {
      method: 'GET' as const,
      path: '/api/estadisticas',
      respuestas: {
        200: z.object({
          cumplimientoTotal: z.number(),
          cumplimientoPromedio: z.number(),
          calidadEquipo: z.number(),
          atrasosEquipo: z.number(),
          gestoresCumplenMeta: z.number(),
          totalGestores: z.number(),
        }),
      },
    }
  },
};

export function construirUrl(ruta: string, parametros?: Record<string, string | number>): string {
  let url = ruta;
  if (parametros) {
    Object.entries(parametros).forEach(([llave, valor]) => {
      if (url.includes(`:${llave}`)) {
        url = url.replace(`:${llave}`, String(valor));
      }
    });
  }
  return url;
}
