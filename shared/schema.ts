
import { pgTable, text, serial, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === DEFINICIONES DE TABLA ===
export const gestores = pgTable("gestores", {
  id: serial("id").primaryKey(),
  nombre: text("nombre").notNull(),
  
  // Renovaciones Mensuales (Reales)
  renovacionesFeb: integer("renovaciones_feb").notNull(),
  renovacionesMar: integer("renovaciones_mar").notNull(),
  renovacionesAbr: integer("renovaciones_abr").notNull(),
  
  // Total Q1
  totalRenovaciones: integer("total_renovaciones").notNull(),
  
  // KPIs
  porcentajeAtrasos: numeric("porcentaje_atrasos", { precision: 5, scale: 2 }).notNull(),
  renovacionesGestionadas: integer("renovaciones_gestionadas").notNull(),
  puntajeCalidad: integer("puntaje_calidad").notNull(),
  
  // Estado calculado
  clasificacion: text("clasificacion").notNull(), // 'Alto Desempeño', 'Medio', 'Bajo'
});

// === ESQUEMAS ===
export const esquemaInsertarGestor = createInsertSchema(gestores).omit({ id: true });

// === TIPOS ===
export type Gestor = typeof gestores.$inferSelect;
export type InsertarGestor = z.infer<typeof esquemaInsertarGestor>;

// === TIPOS DE CONTRATO API ===
export type RespuestaGestor = Gestor;
export type RespuestaListaGestores = Gestor[];

export interface EstadisticasEquipo {
  cumplimientoTotal: number;
  cumplimientoPromedio: number;
  calidadEquipo: number;
  atrasosEquipo: number;
  gestoresCumplenMeta: number;
  totalGestores: number;
  cuartiles: {
    q1: Gestor[];
    q2: Gestor[];
    q3: Gestor[];
    q4: Gestor[];
  };
}
