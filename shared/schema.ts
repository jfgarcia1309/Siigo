
import { pgTable, text, serial, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const managers = pgTable("managers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  
  // Monthly Renewals (Actual)
  febRenewals: integer("feb_renewals").notNull(),
  marRenewals: integer("mar_renewals").notNull(),
  aprRenewals: integer("apr_renewals").notNull(),
  
  // Total Q1
  totalRenewals: integer("total_renewals").notNull(),
  
  // KPIs
  atrasosPct: numeric("atrasos_pct", { precision: 5, scale: 2 }).notNull(), // e.g. 3.84
  managedRenewals: integer("managed_renewals").notNull(),
  qualityScore: integer("quality_score").notNull(),
  
  // Calculated status
  classification: text("classification").notNull(), // 'High Performance', 'Medium', 'Low'
});

// === SCHEMAS ===
export const insertManagerSchema = createInsertSchema(managers).omit({ id: true });

// === TYPES ===
export type Manager = typeof managers.$inferSelect;
export type InsertManager = z.infer<typeof insertManagerSchema>;

// === API CONTRACT TYPES ===
export type ManagerResponse = Manager;
export type ManagersListResponse = Manager[];

export interface TeamStats {
  totalCompliance: number;
  averageCompliance: number;
  teamQuality: number;
  teamAtrasos: number;
  managersMeetingGoal: number;
  totalManagers: number;
}
