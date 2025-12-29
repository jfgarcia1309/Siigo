import { Sidebar } from "@/components/Sidebar";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Search, 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

const CicloEARC = () => {
  const pasos = [
    { id: "E", titulo: "Escuchar", color: "bg-blue-500", icono: Search, desc: "Identificar necesidades y objeciones del cliente sin interrumpir." },
    { id: "A", titulo: "Aceptar", color: "bg-indigo-500", icono: ThumbsUp, desc: "Validar la postura del cliente para generar empatía y apertura." },
    { id: "R", titulo: "Replantear", color: "bg-purple-500", icono: MessageSquare, desc: "Transformar la objeción en una oportunidad de valor conjunto." },
    { id: "Re", titulo: "Rebatir", color: "bg-violet-500", icono: ShieldCheck, desc: "Presentar argumentos sólidos que neutralicen dudas técnicas o de costo." },
    { id: "C", titulo: "Cerrar", color: "bg-green-600", icono: CheckCircle2, desc: "Confirmar el compromiso y formalizar la renovación del servicio." }
  ];

  return (
    <div className="relative py-12 px-4 flex flex-col items-center">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <RotateCcw className="w-[400px] h-[400px] animate-spin-slow" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full max-w-5xl relative z-10">
        {pasos.map((paso, index) => (
          <motion.div
            key={paso.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center group"
          >
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-white mb-4 shadow-lg transition-transform group-hover:scale-110",
              paso.color
            )}>
              <paso.icono className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">{paso.titulo}</h4>
            <p className="text-[10px] text-muted-foreground leading-tight px-2">{paso.desc}</p>
            {index < pasos.length - 1 && (
              <div className="hidden md:block absolute top-8 translate-x-1/2 right-[calc(100%/10*-1)]">
                <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 p-4 bg-muted/30 rounded-full border border-border/50 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <RotateCcw className="w-3 h-3" /> Flujo Continuo de Gestión Comercial
      </div>
    </div>
  );
};

export default function StrategicPlan() {
  const acciones = [
    {
      titulo: "Recuperación de Meta (Meta Mayo: 18)",
      desc: "Implementar jornadas de 'Día de Cierre' quincenales para asegurar el volumen mínimo de 18 renovaciones por gestor.",
      prioridad: "Alta",
      indicador: "Volumen"
    },
    {
      titulo: "Clínicas de Calidad",
      desc: "Sesiones semanales de escucha de llamadas para gestores con Impacto Alto/Crítico, enfocadas en el modelo EARC.",
      prioridad: "Crítica",
      indicador: "Calidad"
    },
    {
      titulo: "Plan de Choque Atrasos",
      desc: "Automatización de alertas preventivas 5 días antes del vencimiento para reducir el KPI de atrasos al <2%.",
      prioridad: "Media",
      indicador: "Atrasos"
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Plan Estratégico de Mejora</h1>
              <p className="text-muted-foreground mt-2">Acciones correctivas basadas en el desempeño del Q1 2025.</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs py-1 px-3">Estrategia Mayo 2025</Badge>
          </div>

          <Card className="border-primary/20 shadow-xl overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <RotateCcw className="w-5 h-5" />
                Ciclo de Gestión Comercial EARC
              </CardTitle>
              <CardDescription>Modelo circular para el tratamiento de objeciones y cierre de renovaciones.</CardDescription>
            </CardHeader>
            <CardContent className="bg-card">
              <CicloEARC />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {acciones.map((accion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:border-primary/30 transition-colors shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={accion.prioridad === "Crítica" ? "destructive" : "secondary"} className="text-[10px] uppercase">
                        {accion.prioridad}
                      </Badge>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{accion.indicador}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{accion.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{accion.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-primary uppercase">
                      <TrendingUp className="w-3 h-3" /> Meta de Mejora: +15%
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="bg-muted/30 p-8 rounded-2xl border border-dashed border-border flex flex-col md:flex-row items-center gap-8">
            <div className="p-4 bg-background rounded-2xl shadow-inner border border-border">
              <ShieldCheck className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold">Compromiso de Recuperación</h3>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Este plan estratégico tiene como objetivo estandarizar el nivel de impacto en el equipo, moviendo al 40% de los gestores de "Impacto Crítico/Alto" hacia "Impacto Medio/Bajo" mediante la aplicación rigurosa de la técnica EARC y el seguimiento diario de la meta de 18 renovaciones para mayo.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
