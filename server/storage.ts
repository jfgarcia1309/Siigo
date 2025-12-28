
import { db } from "./db";
import { managers, type Manager, type InsertManager } from "@shared/schema";

export interface IStorage {
  getManagers(): Promise<Manager[]>;
  seedManagers(managersList: InsertManager[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getManagers(): Promise<Manager[]> {
    return await db.select().from(managers);
  }

  async seedManagers(managersList: InsertManager[]): Promise<void> {
    const count = await db.select().from(managers);
    if (count.length === 0) {
        await db.insert(managers).values(managersList);
    }
  }
}

export const storage = new DatabaseStorage();
