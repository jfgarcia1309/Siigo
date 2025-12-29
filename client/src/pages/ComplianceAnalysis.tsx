import { Sidebar } from "@/components/Sidebar";
import { useGestores } from "@/hooks/use-managers";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle,
  Target,
  AlertTriangle,
  Award
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

  const META_RENOVACIONES = 36;
  const META_CALIDAD = 80;
  const MAX_ATRASOS = 2;
  const MIN_GESTION = 180;

  const analizarGestor = (g: any) => {
    const cumpleRen = g.totalRenovaciones >= META_RENOVACIONES;
    const cumpleCal = g.puntajeCalidad >= META_CALIDAD;
    const cumpleAtr = Number(g.porcentajeAtrasos) <= MAX_ATRASOS;
    const cumpleGes = g.renovacionesGestionadas >= MIN_GESTION;
    
    const fallas = [];
    if (!cumpleRen) fallas.push("Meta de Renovaciones");
    if (!cumpleCal) fallas.push("Calidad");
    if (!cumpleAtr) fallas.push("Atrasos");
    if (!cumpleGes) fallas.push("Renovaciones Gestionadas");

    return {
      cumpleTodo: fallas.length === 0,
      cumpleSoloMeta: cumpleRen && fallas.length > 0,
      cumpleMeta: cumpleRen,
      fallas
    };
  };

  const gestoresAnalizados = gestores?.map(g => ({ ...g, ...analizarGestor(g) })) || [];
  const cumplenMetaTotal = gestoresAnalizados.filter(g => g.cumpleMeta).length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-10 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Desempeño Individual de Gestores</h1>
            <p className="text-muted-foreground">Identificación clara de cumplimiento (Meta Trimestral: {META_RENOVACIONES} renovaciones)</p>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Cumplimiento de Meta (≥36)</p>
                <h2 className="text-2xl font-bold">{cumplenMetaTotal} de 23 gestores</h2>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-4">
                <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-tighter">Calidad</p>
                <Badge variant="outline">{'>'}{META_CALIDAD}%</Badge>
              </div>
              <div className="text-center px-4">
                <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-tighter">Atrasos</p>
                <Badge variant="outline">≤{MAX_ATRASOS}%</Badge>
              </div>
              <div className="text-center px-4">
                <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-tighter">Gestión</p>
                <Badge variant="outline">{'>'}{MIN_GESTION}</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gestoresAnalizados.map((g) => (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-6 rounded-2xl border transition-all relative overflow-hidden",
                  g.cumpleTodo ? "bg-green-50/50 border-green-200 shadow-sm" : 
                  g.cumpleSoloMeta ? "bg-blue-50/50 border-blue-200" : "bg-card border-border shadow-sm"
                )}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{g.nombre}</h3>
                    <p className="text-xs text-muted-foreground mt-1">ID: {g.id}</p>
                  </div>
                  {g.cumpleTodo ? (
                    <Award className="w-8 h-8 text-green-600" />
                  ) : g.cumpleMeta ? (
                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-background/50 p-3 rounded-xl border border-border/40">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Renovaciones</span>
                    <span className={cn("text-lg font-black", g.cumpleMeta ? "text-green-600" : "text-red-600")}>
                      {g.totalRenovaciones} <span className="text-xs font-normal text-muted-foreground">/ {META_RENOVACIONES}</span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest px-1">Análisis de Cumplimiento</p>
                    <div className="space-y-2">
                      {g.cumpleTodo ? (
                        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-100/50 p-2.5 rounded-lg border border-green-200/50">
                          <CheckCircle2 className="w-3 h-3" />
                          Cumple satisfactoriamente todos los criterios.
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          {g.fallas.map((f: string, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] text-red-700 bg-red-50 p-1.5 rounded-md border border-red-100">
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                              Incumple {f}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Clasificación</span>
                  <Badge variant={g.cumpleTodo ? "default" : "secondary"} className={cn("text-[10px] uppercase", g.cumpleTodo && "bg-green-600 hover:bg-green-700")}>
                    {g.clasificacion}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
