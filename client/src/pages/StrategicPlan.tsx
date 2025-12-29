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
  RotateCcw,
  LayoutDashboard,
  AlertTriangle,
  Clock,
  Briefcase
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
      titulo: "1. Recuperación de Cumplimiento (Meta 18 renovaciones)",
      desc: "Meta: 100% de cumplimiento (18 unidades para Mayo). Estrategia: Implementar el 'Embudo 10:1'. Acción: Incrementar la contactabilidad diaria para asegurar un cierre por cada 10 gestiones efectivas, priorizando clientes con portafolio básico (POS/Nómina).",
      prioridad: "Crítica",
      indicador: "Cumplimiento",
      detalle: "Análisis de Pareto semanal para enfocar esfuerzos en el 20% de clientes que generan el 80% del valor de renovación."
    },
    {
      titulo: "2. Elevación del Estándar de Calidad",
      desc: "Meta: >80% Score de Calidad. Estrategia: Feedback inmediato y refuerzo de guiones. Acción: Auditoría diaria del 5% de las llamadas de gestores con score <76%, enfocándose en la resolución de objeciones y empatía virtual.",
      prioridad: "Crítica",
      indicador: "Calidad",
      detalle: "Clínicas de ventas quincenales donde se analizan 'Best Calls' y se realizan simulacros de manejo de crisis."
    },
    {
      titulo: "3. Blindaje contra el Atraso Operativo",
      desc: "Meta: <2% de Seguimientos Atrasados. Estrategia: Gestión proactiva de agenda. Acción: Implementar 'Barrido de Pendientes' de 8:00 AM a 9:00 AM. Ningún caso debe superar las 24h sin contacto.",
      prioridad: "Alta",
      indicador: "Atrasos",
      detalle: "Escalamiento automático al Coordinador tras 48h de inactividad en un caso crítico."
    },
    {
      titulo: "4. Maximización de Productividad Telefónica",
      desc: "Meta: >180 gestiones mensuales. Estrategia: Bloques de gestión intensiva. Acción: Asegurar un mínimo de 45 llamadas diarias por gestor, garantizando que el volumen de actividad soporte el incremento de la meta a 18 unidades.",
      prioridad: "Alta",
      indicador: "Productividad",
      detalle: "Gamificación del volumen de llamadas con ranking diario de 'Power Dialers'."
    }
  ];

  const estrategiasAdicionales = [
    {
      titulo: "Estrategia de Churn Preventivo",
      subtitulo: "Detección temprana de señales de abandono",
      contenido: "Implementar un sistema de alertas cuando el cliente disminuye su uso de la plataforma Siigo 60 días antes de la renovación. El gestor debe intervenir con una 'Llamada de Valor' enfocada en capacitación de módulos no usados.",
      icono: AlertTriangle
    },
    {
      titulo: "Especialización por Producto",
      subtitulo: "Expertise técnico por segmento",
      contenido: "Dividir el equipo en 'Squads' especializados en POS, Nómina y Facturación Electrónica para brindar asesoría técnica profunda que reduzca la fricción del cliente ante cambios regulatorios.",
      icono: Target
    },
    {
      titulo: "Plan de Recobro Inteligente",
      subtitulo: "Aseguramiento del recaudo oportuno",
      contenido: "Integración de pasarelas de pago directas en el contacto por WhatsApp para que el cliente pueda renovar y pagar en un solo clic durante la llamada, eliminando el gap entre compromiso y pago.",
      icono: TrendingUp
    }
  ];

  const cronogramaQ2 = [
    { fase: "Ajuste Operativo", semana: "1-2", actividades: ["Capacitación en meta 18", "Ajuste de guiones EARC", "Auditoría baseline"] },
    { fase: "Intensificación", semana: "3-5", actividades: ["Lanzamiento de Squads", "Implementación Power Dialing", "Primer corte de diplomas"] },
    { fase: "Consolidación", semana: "6-8", actividades: ["Refuerzo de Churn Preventivo", "Optimización de Recobro", "Evaluación de impacto Q2"] }
  ];

  const incentivos = [
    { titulo: "Bienestar en Turno", desc: "Entrega de snacks saludables durante la jornada por cumplimiento de hitos diarios.", icono: ThumbsUp },
    { titulo: "Recarga de Energía", desc: "Tiempo extra de break otorgado al alcanzar la meta de gestiones del bloque morning.", icono: RotateCcw },
    { titulo: "Flexibilidad Horaria", desc: "Permiso para ingreso tardío o salida temprana tras cumplir el 100% de la meta de renovación semanal.", icono: ShieldCheck },
    { titulo: "Reconocimiento por Diplomas", desc: "Entrega trimestral de diplomas 'Excelencia Siigo' a los gestores con mejor Score de Calidad y Cumplimiento.", icono: Target }
  ];

  const herramientas = [
    { nombre: "Dashboard Siigo Real-Time", funcion: "Monitoreo en vivo de renovaciones y cumplimiento de meta de 18 unidades." },
    { nombre: "Guía de Objeciones POS/Nómina", funcion: "Manual rápido para rebatir dudas sobre Facturación y POS." },
    { nombre: "Alerta de Atrasos 24h", funcion: "Notificación automática al superar el 2% de casos pendientes." }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Plan Estratégico de Mejora - Siigo</h1>
              <p className="text-muted-foreground mt-2">Acciones para alcanzar la meta de 18 renovaciones en Mayo.</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs py-1 px-3">Estrategia Mayo 2025</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-primary uppercase">Meta Mayo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18 Unidades</div>
                <p className="text-xs text-muted-foreground">+38% vs Abril</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-500/5 border-orange-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-orange-600 uppercase">Gap Calidad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4% de Mejora</div>
                <p className="text-xs text-muted-foreground">Objetivo: 80% (Actual: 76%)</p>
              </CardContent>
            </Card>
            <Card className="bg-red-500/5 border-red-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-red-600 uppercase">Reducción Atrasos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-1.84%</div>
                <p className="text-xs text-muted-foreground">Meta: 2% (Actual: 3.84%)</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/20 shadow-xl overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <RotateCcw className="w-5 h-5" />
                Ciclo de Gestión Comercial Siigo (EARC)
              </CardTitle>
              <CardDescription>Modelo para convertir objeciones en renovaciones exitosas.</CardDescription>
            </CardHeader>
            <CardContent className="bg-card">
              <CicloEARC />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Estrategias de Recuperación y Crecimiento
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
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">{accion.desc}</p>
                      {accion.detalle && (
                        <div className="pt-2 border-t border-border/50 mt-2">
                          <p className="text-[10px] font-medium text-primary leading-tight italic">
                            💡 Detalle: {accion.detalle}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Estrategias Avanzadas de Valor Agregado
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {estrategiasAdicionales.map((est, idx) => (
                <Card key={idx} className="border-primary/10 bg-gradient-to-br from-card to-primary/5">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <est.icono className="w-4 h-4 text-primary" />
                      </div>
                      <CardTitle className="text-sm font-bold">{est.titulo}</CardTitle>
                    </div>
                    <CardDescription className="text-[10px] uppercase font-bold text-primary/70">{est.subtitulo}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">{est.contenido}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Cronograma de Ejecución Q2
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cronogramaQ2.map((fase, idx) => (
                <div key={idx} className="relative p-6 bg-card border border-border rounded-2xl">
                  <Badge className="absolute -top-3 left-6 bg-primary">Fase {idx + 1}: {fase.fase}</Badge>
                  <div className="text-[10px] font-bold text-muted-foreground mb-4">SEMANA {fase.semana}</div>
                  <ul className="space-y-2">
                    {fase.actividades.map((act, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-tight">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Plan de Motivación y Reconocimiento */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-primary" />
                Plan de Motivación y Reconocimiento
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

            {/* Dashboard Siigo Real-Time */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-primary">
                <LayoutDashboard className="w-5 h-5" />
                Dashboard Siigo Real-Time
              </h2>
              <Card className="border-primary bg-primary/5 shadow-md border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary rounded-xl text-white shadow-lg">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Monitoreo en Vivo</h4>
                      <p className="text-sm text-muted-foreground">Seguimiento de meta individual (18 unidades).</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span>Progreso Equipo Siigo</span>
                      <span className="text-primary font-bold">100% Accesible</span>
                    </div>
                    <div className="w-full h-4 bg-muted rounded-full overflow-hidden border border-primary/20">
                      <div className="h-full bg-primary w-[72%] shadow-[0_0_15px_rgba(0,161,224,0.5)]" />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest pt-2">
                      <span>23 Gestores Activos</span>
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-primary"/> Sincronizado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-card border border-border rounded-xl divide-y">
                {herramientas.filter(h => h.nombre !== "Dashboard Siigo Real-Time").map((h, idx) => (
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
              <h3 className="text-xl font-bold">Compromiso de Gestión Mayo</h3>
              <div className="text-sm text-muted-foreground max-w-2xl space-y-4 leading-relaxed">
                <p>
                  El equipo de 23 gestores se compromete a alcanzar la meta de 18 renovaciones por persona, asegurando que el portafolio básico de Siigo (Facturación, POS, Nómina) sea renovado oportunamente.
                </p>
                <div className="grid grid-cols-2 gap-4 text-[11px] uppercase font-bold text-primary/80">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> Calidad: {'>'}80% (Meta)</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> Atrasos: {'<'}2% (Meta)</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> Gestión: {'>'}180 Llamadas</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> Renovación: 100% Meta</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
