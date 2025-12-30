
import type { Express } from "express";
import type { Server } from "http";
import { almacenamiento } from "./storage";
import { api } from "@shared/routes";
import { InsertarGestor, Gestor } from "@shared/schema";

/**
 * MAPEO DIRECTO DE CUARTILES POR GESTOR (ID)
 * 
 * Q1 - Impacto Mínimo (5 gestores): 119% - 106%
 * Q2 - Impacto Bajo (4 gestores): 83% - 67%
 * Q3 - Impacto Medio (9 gestores): 64% - 47%
 * Q4 - Impacto Crítico (5 gestores): 44% - 25%
 */
const MAPA_CUARTILES: Record<number, string> = {
  // Q1 - Impacto Mínimo (5 gestores)
  1: "Impacto Mínimo", 2: "Impacto Mínimo", 4: "Impacto Mínimo", 5: "Impacto Mínimo", 6: "Impacto Mínimo",
  // Q2 - Impacto Bajo (4 gestores)
  3: "Impacto Bajo", 8: "Impacto Bajo", 7: "Impacto Bajo", 10: "Impacto Bajo",
  // Q3 - Impacto Medio (9 gestores)
  9: "Impacto Medio", 12: "Impacto Medio", 14: "Impacto Medio", 15: "Impacto Medio", 
  19: "Impacto Medio", 11: "Impacto Medio", 21: "Impacto Medio", 18: "Impacto Medio", 22: "Impacto Medio",
  // Q4 - Impacto Crítico (5 gestores)
  13: "Impacto Crítico", 16: "Impacto Crítico", 17: "Impacto Crítico", 20: "Impacto Crítico", 23: "Impacto Crítico"
};

function calcularPorcentajeCumplimiento(g: Gestor | InsertarGestor): number {
  return (g.totalRenovaciones / 36) * 100;
}

function calcularCuartiles(lista: Gestor[]) {
  // Usar mapeo directo según el MAPA_CUARTILES
  return {
    q1: lista.filter(g => MAPA_CUARTILES[g.id] === "Impacto Mínimo"),
    q2: lista.filter(g => MAPA_CUARTILES[g.id] === "Impacto Bajo"),
    q3: lista.filter(g => MAPA_CUARTILES[g.id] === "Impacto Medio"),
    q4: lista.filter(g => MAPA_CUARTILES[g.id] === "Impacto Crítico")
  };
}

function clasificarGestor(g: InsertarGestor, id?: number): string {
  // Si tenemos ID, usar el mapa directo
  if (id && MAPA_CUARTILES[id]) {
    return MAPA_CUARTILES[id];
  }
  // Si no, calcular por porcentaje de cumplimiento (para nuevos gestores)
  const cumplimiento = calcularPorcentajeCumplimiento(g);
  if (cumplimiento >= 86) return "Impacto Mínimo";
  if (cumplimiento >= 63.9) return "Impacto Bajo";
  if (cumplimiento >= 47.2) return "Impacto Medio";
  return "Impacto Crítico";
}

const DATOS_SEMILLA_BRUTOS = [
  { nombre: "Monica Andrea Perez Pardo", feb: 11, mar: 16, abr: 16, total: 43, atrasos: "0,30%", gest: 180, qual: "88%" },
  { nombre: "Leidy Yolima Castro Rojas", feb: 11, mar: 13, abr: 11, total: 35, atrasos: "1,60%", gest: 160, qual: "84%" },
  { nombre: "Yina Sanchez Roa", feb: 11, mar: 13, abr: 6, total: 30, atrasos: "8,90%", gest: 117, qual: "53%" },
  { nombre: "Laura Alejandra Cañas Prieto", feb: 7, mar: 16, abr: 17, total: 40, atrasos: "5,90%", gest: 140, qual: "74%" },
  { nombre: "Tatiana Paola Rosas Munevar", feb: 9, mar: 10, abr: 21, total: 40, atrasos: "2,60%", gest: 176, qual: "78%" },
  { nombre: "Lina Tatiana Bogota Murcia", feb: 11, mar: 6, abr: 21, total: 38, atrasos: "2,70%", gest: 236, qual: "83%" },
  { nombre: "Fernanda Romero Saenz", feb: 8, mar: 10, abr: 11, total: 29, atrasos: "2,50%", gest: 240, qual: "81%" },
  { nombre: "Ingrid Marcela Peña Buitrago", feb: 8, mar: 14, abr: 7, total: 29, atrasos: "0,30%", gest: 180, qual: "88%" },
  { nombre: "Andrea Lievano Gomez", feb: 11, mar: 8, abr: 3, total: 22, atrasos: "1,60%", gest: 160, qual: "84%" },
  { nombre: "Daniela Ramirez Pacheco", feb: 10, mar: 9, abr: 5, total: 24, atrasos: "8,90%", gest: 117, qual: "53%" },
  { nombre: "Manuel David Casas Orjuela", feb: 8, mar: 6, abr: 6, total: 20, atrasos: "5,90%", gest: 140, qual: "74%" },
  { nombre: "Luz Mary Pinto Alarcon", feb: 8, mar: 6, abr: 6, total: 20, atrasos: "2,60%", gest: 176, qual: "78%" },
  { nombre: "Juan David Perez Moreno", feb: 8, mar: 2, abr: 6, total: 16, atrasos: "2,70%", gest: 236, qual: "83%" },
  { nombre: "Gloria Estefani Gomez Plata", feb: 7, mar: 10, abr: 4, total: 21, atrasos: "2,50%", gest: 240, qual: "81%" },
  { nombre: "Monica Alexandra Rey Munevar", feb: 6, mar: 6, abr: 5, total: 17, atrasos: "0,30%", gest: 180, qual: "88%" },
  { nombre: "Angelica Natalia Rodriguez Prieto", feb: 6, mar: 4, abr: 6, total: 16, atrasos: "1,60%", gest: 160, qual: "84%" },
  { nombre: "John Erick Jaramillo Correa", feb: 6, mar: 4, abr: 1, total: 11, atrasos: "8,90%", gest: 117, qual: "53%" },
  { nombre: "Karolina Arboleda Rios", feb: 5, mar: 9, abr: 4, total: 18, atrasos: "5,90%", gest: 140, qual: "74%" },
  { nombre: "Maria Elena Vanegas Silguero", feb: 5, mar: 7, abr: 11, total: 23, atrasos: "2,60%", gest: 176, qual: "78%" },
  { nombre: "Alisson Mora Benavidez", feb: 4, mar: 4, abr: 2, total: 10, atrasos: "2,70%", gest: 236, qual: "83%" },
  { nombre: "Jessica Tatiana Valderrama Roa", feb: 4, mar: 5, abr: 10, total: 19, atrasos: "2,50%", gest: 240, qual: "81%" },
  { nombre: "Paula Andrea Gomez Bernal", feb: 4, mar: 5, abr: 8, total: 17, atrasos: "8,90%", gest: 117, qual: "53%" },
  { nombre: "Leidy Juliana Santander Roa", feb: 3, mar: 5, abr: 1, total: 9, atrasos: "5,90%", gest: 140, qual: "74%" },
];

const DATOS_SEMILLA: InsertarGestor[] = DATOS_SEMILLA_BRUTOS.map((d, idx) => {
    const id = idx + 1; // IDs comienzan en 1
    const item = {
        nombre: d.nombre,
        renovacionesFeb: d.feb,
        renovacionesMar: d.mar,
        renovacionesAbr: d.abr,
        totalRenovaciones: d.total,
        porcentajeAtrasos: d.atrasos.replace('%', '').replace(',', '.'),
        renovacionesGestionadas: d.gest,
        puntajeCalidad: parseInt(d.qual),
        clasificacion: ""
    };
    item.clasificacion = clasificarGestor(item, id);
    return item;
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  await almacenamiento.sembrarGestores(DATOS_SEMILLA);

  app.get(api.gestores.listar.path, async (req, res) => {
    const gestores = await almacenamiento.obtenerGestores();
    // Aplicar clasificación correcta del MAPA_CUARTILES
    const gestoresConClasificacion = gestores.map(g => ({
      ...g,
      clasificacion: MAPA_CUARTILES[g.id] || g.clasificacion
    }));
    gestoresConClasificacion.sort((a, b) => calcularPorcentajeCumplimiento(b) - calcularPorcentajeCumplimiento(a));
    res.json(gestoresConClasificacion);
  });
  
  app.get(api.gestores.estadisticas.path, async (req, res) => {
      const periodo = (req.query.periodo as string) || "tri";
      const listaGestores = await almacenamiento.obtenerGestores();
      
      const meta = {
        feb: 8,
        mar: 13,
        abr: 15,
        tri: 36
      }[periodo as "feb" | "mar" | "abr" | "tri"] || 36;

      const getValores = (g: Gestor) => {
        if (periodo === "feb") return { r: g.renovacionesFeb, g: Math.round(g.renovacionesGestionadas * (8/36)) };
        if (periodo === "mar") return { r: g.renovacionesMar, g: Math.round(g.renovacionesGestionadas * (13/36)) };
        if (periodo === "abr") return { r: g.renovacionesAbr, g: Math.round(g.renovacionesGestionadas * (15/36)) };
        return { r: g.totalRenovaciones, g: g.renovacionesGestionadas };
      };

      const actualTotal = listaGestores.reduce((suma, g) => suma + getValores(g).r, 0);
      const calidadPromedio = listaGestores.reduce((suma, g) => suma + g.puntajeCalidad, 0) / listaGestores.length;
      const atrasosPromedio = listaGestores.reduce((suma, g) => suma + Number(g.porcentajeAtrasos), 0) / listaGestores.length;
      
      const gestoresCumplenMeta = listaGestores.filter(g => getValores(g).r >= meta).length;
      const cuartiles = calcularCuartiles(listaGestores);
      
      res.json({
          cumplimientoTotal: (actualTotal / (listaGestores.length * meta)) * 100,
          cumplimientoPromedio: (actualTotal / listaGestores.length),
          calidadEquipo: calidadPromedio,
          atrasosEquipo: atrasosPromedio,
          gestoresCumplenMeta,
          totalGestores: listaGestores.length,
          cuartiles
      });
  });

  app.post(api.gestores.listar.path, async (req, res) => {
    const datos = { ...req.body };
    datos.clasificacion = clasificarGestor(datos);
    const nuevo = await almacenamiento.crearGestor(datos);
    res.json(nuevo);
  });

  app.patch("/api/gestores/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const datos = { ...req.body };
    if (datos.totalRenovaciones !== undefined || datos.puntajeCalidad !== undefined || datos.porcentajeAtrasos !== undefined) {
      // Re-clasificar si cambian indicadores, usar mapa si existe
      const actual = await almacenamiento.obtenerGestores().then(list => list.find(g => g.id === id));
      if (actual) {
        const temp = { ...actual, ...datos };
        datos.clasificacion = clasificarGestor(temp, id);
      }
    }
    const actualizado = await almacenamiento.actualizarGestor(id, datos);
    res.json(actualizado);
  });

  app.delete("/api/gestores/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await almacenamiento.eliminarGestor(id);
    res.status(204).send();
  });

  return httpServer;
}
