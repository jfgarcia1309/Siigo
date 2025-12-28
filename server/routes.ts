
import type { Express } from "express";
import type { Server } from "http";
import { almacenamiento } from "./storage";
import { api } from "@shared/routes";
import { InsertarGestor, Gestor } from "@shared/schema";

// Ayudante para calcular clasificación
function clasificarGestor(g: InsertarGestor) {
  const meta = 36;
  const cumplimiento = (g.totalRenovaciones / meta) * 100;
  
  if (cumplimiento >= 100 && g.puntajeCalidad >= 80 && Number(g.porcentajeAtrasos) <= 2) {
    return "Alto Desempeño";
  }
  if (cumplimiento >= 90) {
    return "En Camino";
  }
  if (cumplimiento >= 70) {
      return "Requiere Mejora";
  }
  return "Crítico";
}

const DATOS_SEMILLA_BRUTOS = [
  { nombre: "Monica Andrea Perez Pardo", feb: 11, mar: 16, abr: 16, total: 43, atrasos: 0.30, gest: 180, qual: 88 },
  { nombre: "Leidy Yolima Castro Rojas", feb: 11, mar: 13, abr: 11, total: 35, atrasos: 1.60, gest: 160, qual: 84 },
  { nombre: "Yina Sanchez Roa", feb: 11, mar: 13, abr: 6, total: 30, atrasos: 8.90, gest: 117, qual: 53 },
  { nombre: "Laura Alejandra Cañas Prieto", feb: 7, mar: 16, abr: 17, total: 40, atrasos: 5.90, gest: 140, qual: 74 },
  { nombre: "Tatiana Paola Rosas Munevar", feb: 9, mar: 10, abr: 21, total: 40, atrasos: 2.60, gest: 176, qual: 78 },
  { nombre: "Lina Tatiana Bogota Murcia", feb: 11, mar: 6, abr: 21, total: 38, atrasos: 2.70, gest: 236, qual: 83 },
  { nombre: "Fernanda Romero Saenz", feb: 8, mar: 10, abr: 11, total: 29, atrasos: 2.50, gest: 240, qual: 81 },
  { nombre: "Ingrid Marcela Peña Buitrago", feb: 8, mar: 14, abr: 7, total: 29, atrasos: 0.30, gest: 180, qual: 88 },
  { nombre: "Andrea Lievano Gomez", feb: 11, mar: 8, abr: 3, total: 22, atrasos: 1.60, gest: 160, qual: 84 },
  { nombre: "Daniela Ramirez Pacheco", feb: 10, mar: 9, abr: 5, total: 24, atrasos: 8.90, gest: 117, qual: 53 },
  { nombre: "Manuel David Casas Orjuela", feb: 8, mar: 6, abr: 6, total: 20, atrasos: 5.90, gest: 140, qual: 74 },
  { nombre: "Luz Mary Pinto Alarcon", feb: 8, mar: 6, abr: 6, total: 20, atrasos: 2.60, gest: 176, qual: 78 },
  { nombre: "Juan David Perez Moreno", feb: 8, mar: 2, abr: 6, total: 16, atrasos: 2.70, gest: 236, qual: 83 },
  { nombre: "Gloria Estefani Gomez Plata", feb: 7, mar: 10, abr: 4, total: 21, atrasos: 2.50, gest: 240, qual: 81 },
  { nombre: "Monica Alexandra Rey Munevar", feb: 6, mar: 6, abr: 5, total: 17, atrasos: 0.30, gest: 180, qual: 88 },
  { nombre: "Angelica Natalia Rodriguez Prieto", feb: 6, mar: 4, abr: 6, total: 16, atrasos: 1.60, gest: 160, qual: 84 },
  { nombre: "John Erick Jaramillo Correa", feb: 6, mar: 4, abr: 1, total: 11, atrasos: 8.90, gest: 117, qual: 53 },
  { nombre: "Karolina Arboleda Rios", feb: 5, mar: 9, abr: 4, total: 18, atrasos: 5.90, gest: 140, qual: 74 },
  { nombre: "Maria Elena Vanegas Silguero", feb: 5, mar: 7, abr: 11, total: 23, atrasos: 2.60, gest: 176, qual: 78 },
  { nombre: "Alisson Mora Benavidez", feb: 4, mar: 4, abr: 2, total: 10, atrasos: 2.70, gest: 236, qual: 83 },
  { nombre: "Jessica Tatiana Valderrama Roa", feb: 4, mar: 5, abr: 10, total: 19, atrasos: 2.50, gest: 240, qual: 81 },
  { nombre: "Paula Andrea Gomez Bernal", feb: 4, mar: 5, abr: 8, total: 17, atrasos: 8.90, gest: 117, qual: 53 },
  { nombre: "Leidy Juliana Santander Roa", feb: 3, mar: 5, abr: 1, total: 9, atrasos: 5.90, gest: 140, qual: 74 },
];

const DATOS_SEMILLA: InsertarGestor[] = DATOS_SEMILLA_BRUTOS.map(d => {
    const item = {
        nombre: d.nombre,
        renovacionesFeb: d.feb,
        renovacionesMar: d.mar,
        renovacionesAbr: d.apr,
        totalRenovaciones: d.total,
        porcentajeAtrasos: d.atrasos.toFixed(2),
        renovacionesGestionadas: d.gest,
        puntajeCalidad: d.qual,
        clasificacion: ""
    };
    item.clasificacion = clasificarGestor(item);
    return item;
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  await almacenamiento.sembrarGestores(DATOS_SEMILLA);

  app.get(api.gestores.listar.path, async (req, res) => {
    const gestores = await almacenamiento.obtenerGestores();
    gestores.sort((a, b) => b.totalRenovaciones - a.totalRenovaciones);
    res.json(gestores);
  });
  
  app.get(api.gestores.estadisticas.path, async (req, res) => {
      const listaGestores = await almacenamiento.obtenerGestores();
      const metaPorPersona = 36;
      const metaTotal = listaGestores.length * metaPorPersona;
      const actualTotal = listaGestores.reduce((suma, g) => suma + g.totalRenovaciones, 0);
      
      const calidadPromedio = listaGestores.reduce((suma, g) => suma + g.puntajeCalidad, 0) / listaGestores.length;
      const atrasosPromedio = listaGestores.reduce((suma, g) => suma + Number(g.porcentajeAtrasos), 0) / listaGestores.length;
      const gestoresCumplenMeta = listaGestores.filter(g => g.totalRenovaciones >= metaPorPersona).length;

      // Cálculo de Cuartiles por rendimiento (totalRenovaciones)
      const ordenados = [...listaGestores].sort((a, b) => b.totalRenovaciones - a.totalRenovaciones);
      const tamanoCuartil = Math.ceil(ordenados.length / 4);
      
      const cuartiles = {
        q1: ordenados.slice(0, tamanoCuartil),
        q2: ordenados.slice(tamanoCuartil, tamanoCuartil * 2),
        q3: ordenados.slice(tamanoCuartil * 2, tamanoCuartil * 3),
        q4: ordenados.slice(tamanoCuartil * 3)
      };
      
      res.json({
          cumplimientoTotal: (actualTotal / metaTotal) * 100,
          cumplimientoPromedio: (actualTotal / listaGestores.length),
          calidadEquipo: calidadPromedio,
          atrasosEquipo: atrasosPromedio,
          gestoresCumplenMeta,
          totalGestores: listaGestores.length,
          cuartiles
      });
  });

  return httpServer;
}
