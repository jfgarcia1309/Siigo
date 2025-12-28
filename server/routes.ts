
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { InsertManager } from "@shared/schema";

// Helper to calculate classification
function classifyManager(m: InsertManager) {
  // Goals: Feb 8, Mar 13, Apr 15 = 36 Total
  const goal = 36;
  const compliance = (m.totalRenewals / goal) * 100;
  
  // Logic: 
  // High: >= 100% compliance + Good Quality (>80) + Low Lag (<2%)
  // Medium: >= 90% compliance
  // Low: < 90%
  
  if (compliance >= 100 && m.qualityScore >= 80 && Number(m.atrasosPct) <= 2) {
    return "High Performer";
  }
  if (compliance >= 90) {
    return "On Track";
  }
  if (compliance >= 70) {
      return "Needs Improvement";
  }
  return "Critical";
}

const SEED_DATA_RAW = [
  { name: "Monica Andrea Perez Pardo", feb: 11, mar: 16, apr: 16, total: 43, atrasos: 0.30, gest: 180, qual: 88 },
  { name: "Leidy Yolima Castro Rojas", feb: 11, mar: 13, apr: 11, total: 35, atrasos: 1.60, gest: 160, qual: 84 },
  { name: "Yina Sanchez Roa", feb: 11, mar: 13, apr: 6, total: 30, atrasos: 8.90, gest: 117, qual: 53 },
  { name: "Laura Alejandra Cañas Prieto", feb: 7, mar: 16, apr: 17, total: 40, atrasos: 5.90, gest: 140, qual: 74 },
  { name: "Tatiana Paola Rosas Munevar", feb: 9, mar: 10, apr: 21, total: 40, atrasos: 2.60, gest: 176, qual: 78 },
  { name: "Lina Tatiana Bogota Murcia", feb: 11, mar: 6, apr: 21, total: 38, atrasos: 2.70, gest: 236, qual: 83 },
  { name: "Fernanda Romero Saenz", feb: 8, mar: 10, apr: 11, total: 29, atrasos: 2.50, gest: 240, qual: 81 },
  { name: "Ingrid Marcela Peña Buitrago", feb: 8, mar: 14, apr: 7, total: 29, atrasos: 0.30, gest: 180, qual: 88 },
  { name: "Andrea Lievano Gomez", feb: 11, mar: 8, apr: 3, total: 22, atrasos: 1.60, gest: 160, qual: 84 },
  { name: "Daniela Ramirez Pacheco", feb: 10, mar: 9, apr: 5, total: 24, atrasos: 8.90, gest: 117, qual: 53 },
  { name: "Manuel David Casas Orjuela", feb: 8, mar: 6, apr: 6, total: 20, atrasos: 5.90, gest: 140, qual: 74 },
  { name: "Luz Mary Pinto Alarcon", feb: 8, mar: 6, apr: 6, total: 20, atrasos: 2.60, gest: 176, qual: 78 },
  { name: "Juan David Perez Moreno", feb: 8, mar: 2, apr: 6, total: 16, atrasos: 2.70, gest: 236, qual: 83 },
  { name: "Gloria Estefani Gomez Plata", feb: 7, mar: 10, apr: 4, total: 21, atrasos: 2.50, gest: 240, qual: 81 },
  { name: "Monica Alexandra Rey Munevar", feb: 6, mar: 6, apr: 5, total: 17, atrasos: 0.30, gest: 180, qual: 88 },
  { name: "Angelica Natalia Rodriguez Prieto", feb: 6, mar: 4, apr: 6, total: 16, atrasos: 1.60, gest: 160, qual: 84 },
  { name: "John Erick Jaramillo Correa", feb: 6, mar: 4, apr: 1, total: 11, atrasos: 8.90, gest: 117, qual: 53 },
  { name: "Karolina Arboleda Rios", feb: 5, mar: 9, apr: 4, total: 18, atrasos: 5.90, gest: 140, qual: 74 },
  { name: "Maria Elena Vanegas Silguero", feb: 5, mar: 7, apr: 11, total: 23, atrasos: 2.60, gest: 176, qual: 78 },
  { name: "Alisson Mora Benavidez", feb: 4, mar: 4, apr: 2, total: 10, atrasos: 2.70, gest: 236, qual: 83 },
  { name: "Jessica Tatiana Valderrama Roa", feb: 4, mar: 5, apr: 10, total: 19, atrasos: 2.50, gest: 240, qual: 81 },
  { name: "Paula Andrea Gomez Bernal", feb: 4, mar: 5, apr: 8, total: 17, atrasos: 8.90, gest: 117, qual: 53 },
  { name: "Leidy Juliana Santander Roa", feb: 3, mar: 5, apr: 1, total: 9, atrasos: 5.90, gest: 140, qual: 74 },
];

const SEED_DATA: InsertManager[] = SEED_DATA_RAW.map(d => {
    const item = {
        name: d.name,
        febRenewals: d.feb,
        marRenewals: d.mar,
        aprRenewals: d.apr,
        totalRenewals: d.total,
        atrasosPct: d.atrasos.toFixed(2),
        managedRenewals: d.gest,
        qualityScore: d.qual,
        classification: ""
    };
    item.classification = classifyManager(item);
    return item;
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed data on startup
  await storage.seedManagers(SEED_DATA);

  app.get(api.managers.list.path, async (req, res) => {
    const managers = await storage.getManagers();
    // Sort by Total Renewals descending
    managers.sort((a, b) => b.totalRenewals - a.totalRenewals);
    res.json(managers);
  });
  
  app.get(api.managers.stats.path, async (req, res) => {
      const managers = await storage.getManagers();
      const goalPerPerson = 36;
      const totalGoal = managers.length * goalPerPerson;
      const totalActual = managers.reduce((sum, m) => sum + m.totalRenewals, 0);
      
      const avgQuality = managers.reduce((sum, m) => sum + m.qualityScore, 0) / managers.length;
      const avgAtrasos = managers.reduce((sum, m) => sum + Number(m.atrasosPct), 0) / managers.length;
      const managersMeetingGoal = managers.filter(m => m.totalRenewals >= goalPerPerson).length;
      
      res.json({
          totalCompliance: (totalActual / totalGoal) * 100,
          averageCompliance: (totalActual / managers.length), // average renewals per person
          teamQuality: avgQuality,
          teamAtrasos: avgAtrasos,
          managersMeetingGoal,
          totalManagers: managers.length
      });
  });

  return httpServer;
}
