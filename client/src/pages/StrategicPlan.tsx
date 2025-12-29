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
      titulo: "1. Optimización de la Conversión (Efectividad)",
      desc: "Meta: 100% Cumplimiento. Estrategia: Mejorar la conversión de la productividad vs efectividad mediante el 'Embudo 12:1'. Acción: Asegurar que cada 12 gestiones resulten en 1 cierre efectivo, transformando la alta actividad en resultados reales.",
      prioridad: "Crítica",
      indicador: "Cumplimiento"
    },
    {
      titulo: "2. Excelencia Operativa (Calidad)",
      desc: "Meta: >80% Calidad. Estrategia: Garantizar que el resultado de la valoración de llamadas y gestión con clientes sea superior al 80%. Acción: Auditoría técnica y actitudinal con feedback en 24h para eliminar brechas de comunicación.",
      prioridad: "Crítica",
      indicador: "Calidad"
    },
    {
      titulo: "3. Blindaje de Cartera (Atrasos)",
      desc: "Meta: <2% Atrasos. Estrategia: Asegurar que el seguimiento atrasado no supere el 2% del total de renovaciones u oportunidades abiertas. Acción: Bloqueo de agenda 'Hora de Oro' (8-9 AM) para limpieza total de pendientes.",
      prioridad: "Alta",
      indicador: "Atrasos"
    },
    {
      titulo: "4. Maximización de Actividad (Productividad)",
      desc: "Meta: >180 Gestiones/mes. Estrategia: Mantener un volumen superior a 180 gestiones mensuales de manera constante. Acción: Ejecutar bloques de 'Gestión Intensiva' de 60 minutos (Batching) enfocados exclusivamente en barrido de cartera, eliminando distracciones y asegurando que cada contacto alimente el embudo de conversión.",
      prioridad: "Alta",
      indicador: "Productividad"
    }
  ];

  const incentivos = [
    { titulo: "Bienestar en Turno", desc: "Entrega de snacks saludables durante la jornada por cumplimiento de hitos diarios.", icono: ThumbsUp },
    { titulo: "Recarga de Energía", desc: "Tiempo extra de break otorgado al alcanzar la meta de gestiones del bloque morning.", icono: RotateCcw },
    { titulo: "Flexibilidad Horaria", desc: "Permiso para ingreso tardío o salida temprana tras cumplir el 100% de la meta de renovación semanal.", icono: ShieldCheck }
  ];

  const herramientas = [
    { nombre: "Dashboard en Vivo", funcion: "Seguimiento minuto a minuto de gestiones y renovaciones." },
    { nombre: "Plantillero EARC", funcion: "Guía rápida de respuestas ante objeciones comunes." },
    { nombre: "Monitor de Atrasos", funcion: "Alerta visual para casos con más de 24h sin gestión." }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Plan Estratégico de Mejora</h1>
              <p className="text-muted-foreground mt-2">Acciones correctivas y preventivas para el Q2 2025.</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs py-1 px-3">Estrategia Optimizada</Badge>
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

          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Estrategias por Indicador
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <CardTitle className="text-base leading-tight">{accion.titulo}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground leading-relaxed">{accion.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-primary" />
                Plan de Incentivos y Reconocimiento
              </h2>
              <div className="grid gap-4">
                {incentivos.map((i, idx) => (
                  <Card key={idx} className="border-border/40 bg-muted/20">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-2 bg-background rounded-lg border border-border">
                        <i.icono className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{i.titulo}</h4>
                        <p className="text-xs text-muted-foreground">{i.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Herramientas de Apoyo
              </h2>
              <div className="bg-card border border-border rounded-xl divide-y">
                {herramientas.map((h, idx) => (
                  <div key={idx} className="p-4 flex justify-between items-center group hover:bg-muted/30 transition-colors">
                    <span className="text-sm font-medium">{h.nombre}</span>
                    <Badge variant="outline" className="text-[10px] font-normal">{h.funcion}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-8 rounded-2xl border border-dashed border-border flex flex-col md:flex-row items-center gap-8">
            <div className="p-4 bg-background rounded-2xl shadow-inner border border-border">
              <ShieldCheck className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold">Compromiso de Recuperación y Productividad</h3>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Este plan estratégico tiene como objetivo estandarizar el nivel de impacto en el equipo, asegurando que cada gestor alcance el 100% de cumplimiento y mantenga una productividad superior a 180 gestiones mensuales. La técnica de Gestión Intensiva (Batching) será el eje central para transformar la actividad constante en cierres efectivos, optimizando la tasa de conversión de cada contacto.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
