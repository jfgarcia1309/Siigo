
import { z } from 'zod';
import { insertManagerSchema, managers } from './schema';

export const api = {
  managers: {
    list: {
      method: 'GET' as const,
      path: '/api/managers',
      responses: {
        200: z.array(z.custom<typeof managers.$inferSelect>()),
      },
    },
    stats: {
      method: 'GET' as const,
      path: '/api/stats',
      responses: {
        200: z.object({
          totalCompliance: z.number(),
          averageCompliance: z.number(),
          teamQuality: z.number(),
          teamAtrasos: z.number(),
          managersMeetingGoal: z.number(),
          totalManagers: z.number(),
        }),
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
