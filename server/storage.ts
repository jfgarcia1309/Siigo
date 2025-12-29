
import { db } from "./db";
import { gestores, type Gestor, type InsertarGestor } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IAlmacenamiento {
  obtenerGestores(): Promise<Gestor[]>;
  sembrarGestores(listaGestores: InsertarGestor[]): Promise<void>;
  crearGestor(gestor: InsertarGestor): Promise<Gestor>;
  actualizarGestor(id: number, gestor: Partial<InsertarGestor>): Promise<Gestor>;
  eliminarGestor(id: number): Promise<void>;
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

  async crearGestor(gestor: InsertarGestor): Promise<Gestor> {
    const [nuevo] = await db.insert(gestores).values(gestor).returning();
    return nuevo;
  }

  async actualizarGestor(id: number, gestor: Partial<InsertarGestor>): Promise<Gestor> {
    const [actualizado] = await db.update(gestores).set(gestor).where(eq(gestores.id, id)).returning();
    return actualizado;
  }

  async eliminarGestor(id: number): Promise<void> {
    await db.delete(gestores).where(eq(gestores.id, id));
  }
}

export const almacenamiento = new AlmacenamientoBaseDatos();
