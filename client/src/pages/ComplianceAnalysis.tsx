import { Sidebar } from "@/components/Sidebar";
import { useGestores } from "@/hooks/use-managers";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  XCircle,
  Target,
  AlertCircle,
  Award,
  TrendingDown,
  ShieldAlert,
  Clock,
  Briefcase
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
    
    const detalles = [];
    
    // Análisis de Renovaciones
    const brecha_ren = META_RENOVACIONES - g.totalRenovaciones;
    detalles.push({
      label: "Renovaciones Gestionadas",
      cumple: cumpleRen,
      valor: g.totalRenovaciones,
      meta: META_RENOVACIONES,
      brecha: brecha_ren,
      explicacion: cumpleRen 
        ? `Superó la meta con ${g.totalRenovaciones} renovaciones (${g.totalRenovaciones - META_RENOVACIONES}+ de lo requerido). Desglose: Feb: ${g.renovacionesFeb}, Mar: ${g.renovacionesMar}, Abr: ${g.renovacionesAbr}`
        : `Logró ${g.totalRenovaciones} renovaciones pero requería 36 (brecha de -${brecha_ren}). Desglose: Feb: ${g.renovacionesFeb}, Mar: ${g.renovacionesMar}, Abr: ${g.renovacionesAbr}`,
      icono: Target
    });

    // Análisis de Calidad
    const brecha_cal = META_CALIDAD - g.puntajeCalidad;
    detalles.push({
      label: "Puntaje de Calidad",
      cumple: cumpleCal,
      valor: g.puntajeCalidad,
      meta: META_CALIDAD,
      brecha: brecha_cal,
      explicacion: cumpleCal
        ? `Alcanzó ${g.puntajeCalidad}% de score de calidad, superando la meta de ${META_CALIDAD}%. Desempeño de calidad óptimo.`
        : `Obtuvo ${g.puntajeCalidad}% pero la meta es ${META_CALIDAD}% (brecha de -${brecha_cal}%). Requiere mejorar procesos de control de calidad.`,
      icono: ShieldAlert
    });

    // Análisis de Atrasos
    const atrasos_num = Number(g.porcentajeAtrasos);
    const exceso_atrasos = atrasos_num - MAX_ATRASOS;
    detalles.push({
      label: "Porcentaje de Atrasos",
      cumple: cumpleAtr,
      valor: atrasos_num,
      meta: MAX_ATRASOS,
      brecha: exceso_atrasos,
      explicacion: cumpleAtr
        ? `Mantiene ${g.porcentajeAtrasos}% de atrasos, dentro del límite de ${MAX_ATRASOS}%. Gestión de tiempos óptima.`
        : `Presenta ${g.porcentajeAtrasos}% de atrasos, excediendo el máximo permitido de ${MAX_ATRASOS}% (${atrasos_num > MAX_ATRASOS ? '+' : ''}${exceso_atrasos.toFixed(2)}%). Necesita mejorar puntualidad.`,
      icono: Clock
    });

    // Análisis de Gestión
    const brecha_ges = MIN_GESTION - g.renovacionesGestionadas;
    detalles.push({
      label: "Renovaciones Gestionadas",
      cumple: cumpleGes,
      valor: g.renovacionesGestionadas,
      meta: MIN_GESTION,
      brecha: brecha_ges,
      explicacion: cumpleGes
        ? `Gestionó ${g.renovacionesGestionadas} renovaciones, superando la media de ${MIN_GESTION}. Alto volumen de gestión.`
        : `Gestionó ${g.renovacionesGestionadas} renovaciones pero la media de la unidad es ${MIN_GESTION} (brecha de -${brecha_ges}). Requiere mayor carga de trabajo.`,
      icono: Briefcase
    });

    const fallas = detalles.filter(d => !d.cumple);

    return {
      cumpleTodo: fallas.length === 0,
      cumpleSoloMeta: cumpleRen && fallas.length > 0,
      cumpleMeta: cumpleRen,
      fallas,
      detalles
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
            <h1 className="text-3xl font-bold tracking-tight">Desempeño Individual de Gestores</h1>
            <p className="text-muted-foreground">Identificación detallada de cumplimiento y brechas de indicadores.</p>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Cumplimiento de Meta (≥36)</p>
                <h2 className="text-2xl font-bold">{cumplenMetaTotal} de 23 gestores</h2>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground mb-1 uppercase font-bold">Calidad</p>
                <Badge variant="outline" className="text-[10px]">{'>'}{META_CALIDAD}%</Badge>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground mb-1 uppercase font-bold">Atrasos</p>
                <Badge variant="outline" className="text-[10px]">≤{MAX_ATRASOS}%</Badge>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground mb-1 uppercase font-bold">Gestión</p>
                <Badge variant="outline" className="text-[10px]">{'>'}{MIN_GESTION}</Badge>
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
                  "p-6 rounded-2xl border transition-all relative group",
                  g.cumpleTodo ? "bg-green-50/30 border-green-200 shadow-sm" : 
                  g.cumpleSoloMeta ? "bg-blue-50/30 border-blue-200" : "bg-card border-border shadow-sm"
                )}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{g.nombre}</h3>
                    <Badge variant="outline" className="mt-2 text-[10px] h-5 py-0">ID: {g.id}</Badge>
                  </div>
                  {g.cumpleTodo ? (
                    <Award className="w-8 h-8 text-green-600 shrink-0" />
                  ) : g.cumpleMeta ? (
                    <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-500 shrink-0" />
                  )}
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-center bg-background/60 p-3 rounded-xl border border-border/40">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-tight">Renovaciones</span>
                    <span className={cn("text-lg font-black", g.cumpleMeta ? "text-green-600" : "text-red-600")}>
                      {g.totalRenovaciones} <span className="text-xs font-normal text-muted-foreground italic">/ {META_RENOVACIONES}</span>
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest px-1">Análisis Detallado de Indicadores:</p>
                    <div className="space-y-2">
                      {g.cumpleTodo ? (
                        <div className="flex items-center gap-3 text-xs text-green-700 bg-green-100/40 p-3 rounded-xl border border-green-200/50">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>¡Cumplimiento Integral! El gestor cumple con el 100% de los KPI corporativos.</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-2.5">
                          {g.detalles.map((d: any, i: number) => (
                            <div key={i} className={cn(
                              "flex flex-col gap-2 p-3 rounded-xl border transition-colors",
                              d.cumple 
                                ? "bg-green-50/50 border-green-100/60 text-green-700" 
                                : "bg-red-50/50 border-red-100/60 text-red-700"
                            )}>
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <d.icono className="w-4 h-4 shrink-0" />
                                  <span className="text-xs font-bold uppercase">{d.label}</span>
                                </div>
                                <span className="text-xs font-bold bg-white/60 px-2 py-0.5 rounded border" style={{borderColor: d.cumple ? '#86efac' : '#fca5a5'}}>
                                  {d.valor} / {d.meta}
                                </span>
                              </div>
                              <p className="text-[11px] leading-relaxed font-medium text-opacity-90">{d.explicacion}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border/40 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Desempeño</span>
                  <Badge 
                    variant={g.cumpleTodo ? "default" : "secondary"} 
                    className={cn(
                      "text-[10px] px-2 h-5 font-bold uppercase",
                      g.cumpleTodo && "bg-green-600 hover:bg-green-700"
                    )}
                  >
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
