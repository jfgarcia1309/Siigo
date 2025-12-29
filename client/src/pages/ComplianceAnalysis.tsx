import { Sidebar } from "@/components/Sidebar";
import { useGestores } from "@/hooks/use-managers";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  Activity,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComplianceAnalysis() {
  const { data: gestores, isLoading } = useGestores();

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const analizarGestor = (g: any) => {
    const cumpleRen = g.totalRenovaciones >= 36;
    const cumpleCal = g.puntajeCalidad >= 80;
    const cumpleAtr = Number(g.porcentajeAtrasos) <= 2;
    const cumpleGes = g.renovacionesGestionadas >= 180;
    
    const fallas = [];
    if (!cumpleRen) fallas.push(`Meta (${g.totalRenovaciones}/36)`);
    if (!cumpleCal) fallas.push(`Calidad (${g.puntajeCalidad}%)`);
    if (!cumpleAtr) fallas.push(`Atrasos (${g.porcentajeAtrasos}%)`);
    if (!cumpleGes) fallas.push(`Gestión (${g.renovacionesGestionadas})`);

    return {
      cumpleTodo: fallas.length === 0,
      fallas,
      soloMeta: cumpleRen && fallas.length > 0
    };
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-10 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Análisis de Cumplimiento Integral por Gestor</h1>
              <p className="text-muted-foreground mt-2">Desempeño consolidado de los 23 gestores (Febrero - Abril)</p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-xs">Meta Trimestral: 36 Renovaciones</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gestores?.map((g) => {
              const { cumpleTodo, fallas, soloMeta } = analizarGestor(g);
              return (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "relative p-6 rounded-2xl border transition-all hover:shadow-md",
                    cumpleTodo ? "bg-green-50/50 border-green-100" : 
                    soloMeta ? "bg-blue-50/50 border-blue-100" : "bg-card border-border"
                  )}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg leading-tight pr-2">{g.nombre}</h3>
                    {cumpleTodo ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5" /> Renovaciones
                      </span>
                      <span className={cn("font-bold", g.totalRenovaciones >= 36 ? "text-green-600" : "text-red-500")}>
                        {g.totalRenovaciones} / 36
                      </span>
                    </div>

                    <div className="pt-2 border-t border-border/50">
                      {cumpleTodo ? (
                        <div className="text-xs text-green-700 font-medium bg-green-100/50 p-2 rounded-lg">
                          ¡Excelente! Cumple con el 100% de los indicadores corporativos.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Brechas detectadas:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {fallas.map((f, i) => (
                              <Badge key={i} variant="outline" className="text-[10px] bg-white/50 border-red-200 text-red-600 py-0 px-2">
                                {f}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between border-t border-border/50">
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">Estado:</span>
                    <Badge 
                      variant={cumpleTodo ? "default" : "secondary"} 
                      className={cn(
                        "text-[10px] h-5",
                        cumpleTodo && "bg-green-600"
                      )}
                    >
                      {g.clasificacion}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
