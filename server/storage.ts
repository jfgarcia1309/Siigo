
import { db } from "./db";
import { gestores, type Gestor, type InsertarGestor } from "@shared/schema";

export interface IAlmacenamiento {
  obtenerGestores(): Promise<Gestor[]>;
  sembrarGestores(listaGestores: InsertarGestor[]): Promise<void>;
}

export class AlmacenamientoBaseDatos implements IAlmacenamiento {
  async obtenerGestores(): Promise<Gestor[]> {
    return await db.select().from(gestores);
  }

  async sembrarGestores(listaGestores: InsertarGestor[]): Promise<void> {
    const conteo = await db.select().from(gestores);
    if (conteo.length === 0) {
        await db.insert(gestores).values(listaGestores);
    }
  }
}

export const almacenamiento = new AlmacenamientoBaseDatos();
