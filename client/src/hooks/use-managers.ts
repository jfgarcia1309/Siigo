import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { Gestor, EstadisticasEquipo } from "@shared/schema";

export function useGestores() {
  return useQuery<Gestor[]>({
    queryKey: [api.gestores.listar.path],
    queryFn: async () => {
      const res = await fetch(api.gestores.listar.path);
      if (!res.ok) throw new Error("Error al obtener gestores");
      return res.json();
    },
  });
}

export function useEstadisticas() {
  return useQuery<EstadisticasEquipo>({
    queryKey: [api.gestores.estadisticas.path],
    queryFn: async () => {
      const res = await fetch(api.gestores.estadisticas.path);
      if (!res.ok) throw new Error("Error al obtener estadísticas");
      return res.json();
    },
  });
}
