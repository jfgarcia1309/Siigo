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
  Briefcase,
  Users,
  Zap,
  Eye,
  PhoneCall,
  BookOpen
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

const MetricaActual = ({ titulo, valor, unidad, meta, gap, color }: any) => (
  <Card className={cn("border-l-4", {
    "border-l-red-500": gap < 0,
    "border-l-yellow-500": gap >= 0 && gap < 2,
    "border-l-green-500": gap >= 2
  })}>
    <CardHeader className="pb-2">
      <CardTitle className="text-xs font-medium text-muted-foreground uppercase">{titulo}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="flex justify-between items-end">
        <div className="text-2xl font-bold">{valor}</div>
        <span className="text-xs text-muted-foreground">{unidad}</span>
      </div>
      <div className="flex justify-between items-center text-[11px]">
        <span className="text-muted-foreground">Meta: {meta}</span>
        <Badge variant={gap < 0 ? "destructive" : "secondary"} className="text-[9px]">
          {gap > 0 ? "+" : ""}{gap} {gap >= 0 ? "puntos" : "% atraso"}
        </Badge>
      </div>
    </CardContent>
  </Card>
);

export default function StrategicPlan() {
  // Datos actuales vs metas
  const metricas = [
    { titulo: "Cumplimiento Renovaciones", valor: "66.1%", unidad: "de la meta", meta: "100%", gap: -33.9 },
    { titulo: "Puntaje de Calidad", valor: "76%", unidad: "actual", meta: ">80%", gap: -4 },
    { titulo: "Seguimientos Atrasados", valor: "3.84%", unidad: "del total", meta: "≤2%", gap: -1.84 },
    { titulo: "Productividad Mensual", valor: "174", unidad: "gestiones/mes", meta: "≥180", gap: -6 }
  ];

  // Cuatro pilares estratégicos
  const pilares = [
    {
      titulo: "1. Recuperación del Cumplimiento",
      meta: "De 66.1% a 100%",
      problema: "Déficit de 33.9% en renovaciones. Solo 4 de 23 gestores alcanzan meta.",
      acciones: [
        "Implementar 'Embudo 10:1': 1 cierre por cada 10 gestiones de calidad.",
        "Análisis Pareto semanal: enfoque en el 20% de clientes que generan 80% de valor.",
        "Cartera diferenciada: POS/Nómina (mayor probabilidad) + Facturación (consolidación).",
        "Seguimiento intensivo: mínimo 5 intentos de contacto antes de dar por perdida una renovación."
      ],
      indicador: "Renovaciones gestionadas vs meta semanal",
      responsable: "Gestor individual + Coordinador"
    },
    {
      titulo: "2. Elevación de Estándar de Calidad",
      meta: "De 76% a >80%",
      problema: "4% de brecha. Problemas en empatía y resolución de objeciones.",
      acciones: [
        "Auditoría diaria: análisis del 5% de llamadas de gestores con score <76%.",
        "Clínicas quincenales: análisis de 'Best Calls' + simulacros de crisis y objeciones.",
        "Guía de Objeciones POS/Nómina: respuestas modelo para dudas técnicas y de costo.",
        "Evaluación de Empatía: métricas específicas de tono, validación y escucha activa."
      ],
      indicador: "Score de calidad promedio + casos auditados",
      responsable: "Auditor de calidad + Coordinador"
    },
    {
      titulo: "3. Blindaje contra Atrasos Operativos",
      meta: "De 3.84% a ≤2%",
      problema: "Casi el doble de la meta. Gestiones inconclusas acumulándose.",
      acciones: [
        "'Barrido de Pendientes': 8:00-9:00 AM diaria para contactar casos críticos.",
        "Regla de 24h: ningún caso debe superar las 24h sin contacto documentado.",
        "Escalamiento automático: tras 48h de inactividad, escala a Coordinador.",
        "Dashboard de alertas: visualización en tiempo real de casos vencidos."
      ],
      indicador: "% de casos resueltos en <24h + días promedio de seguimiento",
      responsable: "Gestor individual + Coordinador (escalamientos)"
    },
    {
      titulo: "4. Optimización de Productividad Telefónica",
      meta: "De 174 a ≥180 gestiones/mes",
      problema: "Déficit de 6 gestiones/mes. Necesario: 45+ llamadas diarias.",
      acciones: [
        "Bloques de gestión intensiva: 45 llamadas diarias mínimo garantizadas.",
        "Power Dialer gamificado: ranking diario de 'Gestores Telefonicistas' con incentivos.",
        "Jornada optimizada: 3 bloques de gestión (2h cada uno) + pausas de recarga.",
        "Métrica de 'Contactabilidad': no solo volumen, sino conversaciones efectivas."
      ],
      indicador: "Llamadas diarias + tasa de conectividad + duración promedio",
      responsable: "Gestor individual + Supervisor"
    }
  ];

  // Acciones específicas por pilar
  const tareasEstrategicas = [
    {
      pilar: "Cumplimiento",
      semana: "1-2",
      tareas: [
        "Segmentar cartera: clasificar clientes por probabilidad de renovación.",
        "Crear guiones por segmento (POS/Nómina vs. Facturación).",
        "Capacitar equipo en 'Embudo 10:1'.",
        "Iniciar seguimiento intensivo de casos críticos."
      ]
    },
    {
      pilar: "Calidad",
      semana: "1-2",
      tareas: [
        "Seleccionar 5 gestores para auditoría diaria.",
        "Grabar y analizar 3-5 'Best Calls' para replicar.",
        "Crear 'Guía de Objeciones' con 15 preguntas+respuestas modelo.",
        "Agendar clínicas quincenales."
      ]
    },
    {
      pilar: "Atrasos",
      semana: "1",
      tareas: [
        "Implementar 'Barrido de Pendientes' diario 8-9 AM.",
        "Configurar alertas automáticas en CRM tras 24h sin contacto.",
        "Establecer protocolo de escalamiento a Coordinador.",
        "Revisar dashboard de atrasos cada 2h."
      ]
    },
    {
      pilar: "Productividad",
      semana: "1",
      tareas: [
        "Configurar Power Dialer en sistema telefónico.",
        "Crear ranking diario visual en control room.",
        "Establecer objetivo de 45 llamadas/día por gestor.",
        "Iniciar 'Juego del Telefonicista' con puntos y reconocimiento."
      ]
    }
  ];

  const incentivos = [
    { titulo: "Bienestar en Turno", desc: "Snacks saludables durante jornada por cumplimiento de hitos diarios.", icono: ThumbsUp },
    { titulo: "Recarga de Energía", desc: "Break adicional al alcanzar meta de gestiones en bloque matutino.", icono: RotateCcw },
    { titulo: "Flexibilidad Horaria", desc: "Ingreso tardío o salida temprana tras 100% cumplimiento semanal.", icono: ShieldCheck },
    { titulo: "Diplomas Excelencia", desc: "Reconocimiento trimestral a mejores scores de calidad y cumplimiento.", icono: Target },
    { titulo: "Bonus de Productividad", desc: "Incentivo monetario por superar 200 gestiones mensuales.", icono: TrendingUp },
    { titulo: "Mentoría Premium", desc: "Los Top 3 gestores lideran clínicas de ventas y reciben bonus adicional.", icono: Users }
  ];

  const herramientas = [
    { nombre: "Dashboard Real-Time", funcion: "Monitoreo en vivo de renovaciones, calidad y gestiones por gestor." },
    { nombre: "Guía de Objeciones", funcion: "Manual rápido con respuestas modelo para dudas técnicas y precio." },
    { nombre: "Alerta de Atrasos 24h", funcion: "Notificación automática cuando un caso vence el límite de contacto." },
    { nombre: "Power Dialer", funcion: "Sistema de llamadas con ranking diario de 'Telefonicistas'." },
    { nombre: "CRM + Calendario", funcion: "Integración de próximas acciones y recordatorios de contacto." }
  ];

  const fasesPlan = [
    {
      numero: 1,
      titulo: "Diagnóstico y Capacitación",
      semanas: "Semana 1-2",
      color: "bg-blue-500",
      actividades: [
        "Auditoría de 20 llamadas actuales (5 por pilar de mejora).",
        "Sesión de capacitación general: Ciclo EARC + Embudo 10:1.",
        "Distribución de herramientas (Guía de Objeciones, Scripts).",
        "Establecimiento de métricas baseline en cada pilar."
      ]
    },
    {
      numero: 2,
      titulo: "Activación y Aceleración",
      semanas: "Semana 3-5",
      color: "bg-purple-500",
      actividades: [
        "Inicio de 'Barrido de Pendientes' diario.",
        "Primeras clínicas quincenales de calidad.",
        "Ranking diario de 'Power Dialers' activado.",
        "Seguimiento intensivo de casos críticos por Pareto."
      ]
    },
    {
      numero: 3,
      titulo: "Consolidación y Resultados",
      semanas: "Semana 6-8",
      color: "bg-green-600",
      actividades: [
        "Revisión de avances: cumplimiento, calidad, atrasos, productividad.",
        "Entregas de reconocimientos (Diplomas, Bonos).",
        "Ajustes finales según resultados.",
        "Celebración de logros y plan para Q3."
      ]
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-10 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Encabezado */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Plan Estratégico Integral Q2 2025</h1>
              <p className="text-muted-foreground mt-2">Transformación desde 66.1% hacia 100% de cumplimiento en renovaciones.</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs py-1 px-3">Actualizado: Enero 2025</Badge>
          </div>

          {/* Métricas Actuales vs Metas */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Situación Actual vs. Metas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metricas.map((m, idx) => (
                <MetricaActual key={idx} {...m} />
              ))}
            </div>
          </div>

          {/* Ciclo EARC */}
          <Card className="border-primary/20 shadow-xl overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="flex items-center gap-2 text-primary">
                <RotateCcw className="w-5 h-5" />
                Modelo de Gestión: Ciclo EARC
              </CardTitle>
              <CardDescription>Convertir objeciones en renovaciones exitosas manteniendo empatía y valor.</CardDescription>
            </CardHeader>
            <CardContent className="bg-card">
              <CicloEARC />
            </CardContent>
          </Card>

          {/* Cuatro Pilares */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Cuatro Pilares Estratégicos Priorizados
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {pilares.map((pilar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <CardTitle className="text-base mb-1">{pilar.titulo}</CardTitle>
                          <CardDescription className="text-sm font-semibold text-primary">{pilar.meta}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="shrink-0">{pilar.indicador}</Badge>
                      </div>
                      <p className="text-xs text-red-600/80 bg-red-50 dark:bg-red-950 p-2 rounded mt-2">
                        <span className="font-bold">Problema:</span> {pilar.problema}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h5 className="text-sm font-bold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          Acciones Concretas:
                        </h5>
                        <ul className="space-y-2">
                          {pilar.acciones.map((accion, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="text-primary font-bold mt-0.5">•</span>
                              {accion}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-border text-[11px]">
                        <span className="text-muted-foreground"><span className="font-bold">Responsable:</span> {pilar.responsable}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cronograma de Implementación */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Cronograma de Implementación (8 Semanas)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {fasesPlan.map((fase, idx) => (
                <div key={idx} className="relative p-6 bg-card border-2 border-border rounded-2xl">
                  <div className={cn("absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold", fase.color)}>
                    {fase.numero}
                  </div>
                  <h4 className="text-sm font-bold mb-1 mt-4">{fase.titulo}</h4>
                  <p className="text-xs text-muted-foreground font-semibold mb-4">{fase.semanas}</p>
                  <ul className="space-y-2">
                    {fase.actividades.map((act, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-snug">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tareas Específicas por Pilar */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Tareas Específicas Semana 1-2 (Puesta en Marcha)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tareasEstrategicas.map((item, idx) => (
                <Card key={idx} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs uppercase font-bold text-primary">{item.pilar}</CardTitle>
                    <CardDescription className="text-[10px]">{item.semana}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.tareas.map((tarea, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground leading-tight">
                          <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                          {tarea}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Plan de Motivación */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Plan de Motivación y Reconocimiento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {incentivos.map((i, idx) => (
                <Card key={idx} className="border-border/40 bg-muted/20 hover:border-primary/30 transition-colors">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-lg border border-primary/20 shrink-0">
                      <i.icono className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{i.titulo}</h4>
                      <p className="text-xs text-muted-foreground leading-snug mt-1">{i.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-bold text-primary">Filosofía:</span> El reconocimiento es continuo y diverso. Combina incentivos inmediatos (snacks, breaks) con reconocimientos de mediano plazo (diplomas, flexibilidad) y oportunidades de crecimiento (mentoría, leadership). Esto mantiene alta la motivación sin generar fatiga de "más de lo mismo".
              </p>
            </div>
          </div>

          {/* Dashboard y Herramientas */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-primary" />
              Herramientas de Soporte y Control
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-primary border-2 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <PhoneCall className="w-4 h-4" />
                    Dashboard Real-Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-xs">
                    <p className="text-muted-foreground"><span className="font-bold">Renovaciones:</span> Individual vs Meta (100%)</p>
                    <p className="text-muted-foreground"><span className="font-bold">Calidad:</span> Score de cada gestor + promedio equipo (meta {'>'}80%)</p>
                    <p className="text-muted-foreground"><span className="font-bold">Atrasos:</span> % de seguimientos pendientes {'>'}24h (meta ≤2%)</p>
                    <p className="text-muted-foreground"><span className="font-bold">Productividad:</span> Llamadas diarias + Tasa de conectividad (meta 45+/día)</p>
                  </div>
                  <Badge className="mt-2">Actualización cada 30 minutos</Badge>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Herramientas Clave</CardTitle>
                </CardHeader>
                <CardContent className="divide-y">
                  {herramientas.map((h, idx) => (
                    <div key={idx} className="py-2 first:pt-0 last:pb-0 flex justify-between items-start">
                      <span className="text-xs font-medium">{h.nombre}</span>
                      <span className="text-[10px] text-muted-foreground text-right max-w-[120px]">{h.funcion}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Compromiso Final */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-2xl border-2 border-primary/30 flex flex-col md:flex-row items-center gap-8">
            <div className="p-4 bg-primary/20 rounded-2xl">
              <ShieldCheck className="w-12 h-12 text-primary" />
            </div>
            <div className="space-y-3 flex-1">
              <h3 className="text-xl font-bold">Compromiso Estratégico Q2 2025</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                El equipo de 23 gestores, con soporte de Coordinadores y Supervisores, se compromete a ejecutar este plan de forma disciplinada. Los cuatro pilares (Cumplimiento, Calidad, Atrasos, Productividad) son interdependientes: no se puede lograr 100% sin mejorar calidad, y la calidad requiere productividad sostenida. El modelo EARC es la brújula de todas las interacciones. La motivación y el reconocimiento son continuos, no solo al final.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px] uppercase font-bold text-primary/80 pt-2">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> Cumplimiento: 100%</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> Calidad: {'>'}80%</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> Atrasos: {'<'}2%</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3"/> Gestiones: ≥180/mes</div>
              </div>
            </div>
          </div>

          {/* Notas Importantes */}
          <Card className="border-border/50 bg-muted/20">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                Notas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-bold">Interdependencia de Pilares:</span> Cumplimiento sin Calidad genera roturas futuras. Calidad sin Productividad es lenta. Productividad sin Calidad es ruido. Los cuatro deben mejorar juntos.
              </p>
              <p>
                <span className="font-bold">Métricas de Éxito:</span> Revisar semanalmente (no solo al final del trimestre). Ajustar tácticas si en Semana 3 no hay progreso visible en al menos 2 pilares.
              </p>
              <p>
                <span className="font-bold">Diferencia Gestor a Gestor:</span> Algunos gestores necesitarán mentoría más intensiva (Mentores). Otros están listos para liderazgo. Personalizar el soporte, no aplicar una única receta.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}