import { useGestores, useEstadisticas } from "@/hooks/use-managers";
import { KPICard } from "@/components/KPICard";
import { Sidebar } from "@/components/Sidebar";
import { 
  Users, 
  Target, 
  AlertTriangle, 
  Search,
  CheckCircle2,
  Filter,
  LayoutGrid,
  ArrowUp
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [mesSeleccionado, setMesSeleccionado] = useState<"feb" | "mar" | "abr" | "tri">("tri");
  const { data: gestores, isLoading: cargandoGestores } = useGestores();
  const { data: estadisticas, isLoading: cargandoEstadisticas } = useEstadisticas(mesSeleccionado);

  const METAS_MENSUALES = {
    feb: 8,
    mar: 13,
    abr: 15,
    tri: 36
  };
  const META_CALIDAD = 80;
  const MAX_ATRASOS = 2;
  const MIN_GESTION = 180;

  const filtrarYOrdenar = (lista: any[]) => {
    if (!lista) return [];
    let filtrados = lista.filter(g => 
      g.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    if (filtroEstado !== "todos") {
      filtrados = filtrados.filter(g => g.clasificacion === filtroEstado);
    }
    return filtrados;
  };

  const analizarCumplimientoMensual = (gestor: any, mes: "feb" | "mar" | "abr" | "tri") => {
    const valorMes = mes === "feb" ? gestor.renovacionesFeb : 
                     mes === "mar" ? gestor.renovacionesMar : 
                     mes === "abr" ? gestor.renovacionesAbr :
                     gestor.totalRenovaciones;
    const metaMes = METAS_MENSUALES[mes];
    const cumpleRenovaciones = valorMes >= metaMes;
    const cumpleCalidad = gestor.puntajeCalidad >= META_CALIDAD;
    const cumpleAtrasos = Number(gestor.porcentajeAtrasos) <= MAX_ATRASOS;
    const cumpleGestion = gestor.renovacionesGestionadas >= MIN_GESTION;

    const fallas = [];
    if (!cumpleRenovaciones) fallas.push(`Renovaciones (${valorMes}/${metaMes})`);
    if (!cumpleCalidad) fallas.push(`Calidad (${gestor.puntajeCalidad}%)`);
    if (!cumpleAtrasos) fallas.push(`Atrasos (${gestor.porcentajeAtrasos}%)`);
    if (!cumpleGestion) fallas.push(`Gestión (${gestor.renovacionesGestionadas}/${MIN_GESTION})`);

    return { cumple: fallas.length === 0, fallas };
  };

  const obtenerColorCumplimiento = (porcentaje: number) => {
    if (porcentaje >= 100) return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
    if (porcentaje >= 80) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
    return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
  };

  const obtenerInsigniaEstado = (clasificacion: string) => {
    switch (clasificacion) {
      case "Impacto Bajo":
        return (
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight border-primary text-primary px-3 py-1">
            HIGH PERFORMER
          </Badge>
        );
      case "Impacto Medio":
        return (
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight border-green-600 text-green-600 px-3 py-1">
            ON TRACK
          </Badge>
        );
      case "Impacto Alto":
        return (
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight border-orange-500 text-orange-500 px-3 py-1">
            NEEDS IMPROVEMENT
          </Badge>
        );
      case "Impacto Crítico":
        return (
          <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight border-red-600 text-red-600 px-3 py-1">
            CRITICAL RISK
          </Badge>
        );
      default:
        return <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight px-3 py-1">{clasificacion}</Badge>;
    }
  };

  const obtenerClasificacionDesempeño = (porcentaje: number) => {
    if (porcentaje >= 100) return { label: "Top Performer", color: "text-green-600 bg-green-50 border-green-200" };
    if (porcentaje >= 80) return { label: "Performance Medio", color: "text-yellow-600 bg-yellow-50 border-yellow-200" };
    return { label: "Bajo Desempeño", color: "text-red-600 bg-red-50 border-red-200" };
  };

  const TablaGestores = ({ data }: { data: any[] }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="font-bold text-muted-foreground uppercase text-[11px] tracking-wider py-4">Nombre del Gestor</TableHead>
            <TableHead className="text-center font-bold text-muted-foreground uppercase text-[11px] tracking-wider py-4">
              {mesSeleccionado === "tri" ? "Renovaciones Totales" : "Renovaciones"}
            </TableHead>
            <TableHead className="text-center font-bold text-muted-foreground uppercase text-[11px] tracking-wider py-4">Cumplimiento</TableHead>
            <TableHead className="text-center font-bold text-muted-foreground uppercase text-[11px] tracking-wider py-4">Calidad</TableHead>
            <TableHead className="text-center font-bold text-muted-foreground uppercase text-[11px] tracking-wider py-4">
              Atrasos
            </TableHead>
            <TableHead className="text-center font-bold text-muted-foreground uppercase text-[11px] tracking-wider py-4">
              <div className="flex flex-col items-center">
                <span>Productividad</span>
                <span className="text-[9px] font-normal lowercase">(Llamadas/Seguimientos)</span>
              </div>
            </TableHead>
            <TableHead className="text-right font-bold text-muted-foreground uppercase text-[11px] tracking-wider py-4">Clasificación Impacto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((gestor) => {
            const { cumple: cumpleMes, fallas: fallasMes } = analizarCumplimientoMensual(gestor, mesSeleccionado);
            
            // Datos dinámicos basados estrictamente en el requerimiento
            const renValor = mesSeleccionado === "feb" ? gestor.renovacionesFeb :
                             mesSeleccionado === "mar" ? gestor.renovacionesMar :
                             mesSeleccionado === "abr" ? gestor.renovacionesAbr :
                             gestor.totalRenovaciones;

            const cumpliValor = mesSeleccionado === "feb" ? ((gestor.renovacionesFeb / 8) * 100).toFixed(1) :
                                mesSeleccionado === "mar" ? ((gestor.renovacionesMar / 13) * 100).toFixed(1) :
                                mesSeleccionado === "abr" ? ((gestor.renovacionesAbr / 15) * 100).toFixed(1) :
                                ((gestor.totalRenovaciones / 36) * 100).toFixed(1);

            // Los indicadores se muestran proporcionales al mes para ser precisos
            // Calidad y Atrasos son porcentajes, se mantienen consistentes
            // Renovaciones Gestionadas se muestra proporcional al avance del trimestre si es mensual
            const caliValor = `${gestor.puntajeCalidad}%`;
            const atraValor = `${gestor.porcentajeAtrasos}%`;
            
            // Ren. Gestión: Representa el volumen de gestiones realizadas (llamadas, correos, seguimientos)
            // para lograr las renovaciones. Es un indicador de productividad del gestor.
            // Para la vista mensual, calculamos la proporción correspondiente a la meta del mes.
            const gestiValor = mesSeleccionado === "tri" 
              ? gestor.renovacionesGestionadas 
              : Math.round((gestor.renovacionesGestionadas * (METAS_MENSUALES[mesSeleccionado] / 36)));

            const metaSeleccionada = METAS_MENSUALES[mesSeleccionado];
            const cumpleRenovaciones = renValor >= metaSeleccionada;
            const clasif = obtenerClasificacionDesempeño(Number(cumpliValor));
            
            return (
              <TableRow key={gestor.id} className="hover:bg-muted/30 transition-colors border-b last:border-0">
                <TableCell className="font-bold text-foreground py-6 text-sm">
                  <div className="max-w-[180px] leading-tight">
                    {gestor.nombre}
                  </div>
                </TableCell>
                <TableCell className="text-center font-bold text-lg py-6">{renValor}</TableCell>
                <TableCell className="text-center py-6">
                  <Badge variant="outline" className={cn("font-bold px-3 py-1", clasif.color)}>
                    {cumpliValor}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center font-bold text-muted-foreground py-6">{caliValor}</TableCell>
                <TableCell className="text-center font-bold text-muted-foreground py-6">{atraValor}</TableCell>
                <TableCell className="text-center font-bold text-muted-foreground py-6">{gestiValor}</TableCell>
                <TableCell className="text-right py-6">
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-tight px-3 py-1", clasif.color)}>
                      {clasif.label}
                    </Badge>
                    {mesSeleccionado !== "tri" && !cumpleMes && (
                      <div className="flex flex-wrap justify-end gap-1 mt-1">
                        {fallasMes.map((f, i) => (
                          <Badge key={i} variant="outline" className="text-[8px] border-red-200 text-red-600 bg-red-50 px-1 h-4">
                            {f.split(' ')[0]}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );

  const gestoresVisualizados = filtrarYOrdenar(gestores || []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-10 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground text-balance">Tablero de Desempeño</h1>
              <p className="text-muted-foreground mt-1">Análisis de impacto ascendente en los indicadores del equipo</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nombre..." 
                  className="pl-9 w-64 bg-card"
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                />
              </div>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger className="w-[180px] bg-card">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="Impacto Bajo">Impacto Bajo</SelectItem>
                  <SelectItem value="Impacto Medio">Impacto Medio</SelectItem>
                  <SelectItem value="Impacto Alto">Impacto Alto</SelectItem>
                  <SelectItem value="Impacto Crítico">Impacto Crítico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Indicador de Calidad */}
            <KPICard 
              title="Score de Calidad" 
              value={`${Math.round(estadisticas?.calidadEquipo || 0)}%`}
              subtext="Meta corporativa >80%"
              icon={<CheckCircle2 className="w-6 h-6" />}
            />
            {/* Indicador de Atrasos */}
            <KPICard 
              title="Seguimientos Atrasados" 
              value={`${Number(estadisticas?.atrasosEquipo || 0).toFixed(2)}%`}
              subtext="Límite máximo permitido 2%"
              icon={<AlertTriangle className="w-6 h-6" />}
              className="border-l-4 border-l-orange-400"
            />
            <KPICard 
              title="Cumplimiento Promedio" 
              value={`${Number(estadisticas?.cumplimientoTotal || 0).toFixed(1)}%`}
              subtext={`Meta Grupal: ${estadisticas?.gestoresCumplenMeta} de ${estadisticas?.totalGestores} gestores`}
              icon={<Target className="w-6 h-6 text-primary" />}
            />
            {/* Indicador de Productividad */}
            <KPICard 
              title="Productividad del Equipo" 
              value={(gestores?.reduce((acc: number, g: any) => {
                const renGest = mesSeleccionado === "tri" 
                  ? g.renovacionesGestionadas 
                  : Math.round((g.renovacionesGestionadas * (METAS_MENSUALES[mesSeleccionado] / 36)));
                return acc + renGest;
              }, 0) || 0).toLocaleString()}
              subtext="Total de llamadas, correos y seguimientos realizados"
              icon={<ArrowUp className="w-6 h-6 text-blue-500" />}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-border bg-card">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  Gestión de Renovaciones
                </h2>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Vista Detallada</Badge>
              </div>
            </div>

            <Tabs defaultValue="todos" className="w-full">
              <div className="px-6 border-b border-border bg-card flex justify-between items-center">
                <TabsList className="bg-transparent h-14 gap-8">
                  <TabsTrigger value="todos" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-full bg-transparent font-bold">Vista Unificada</TabsTrigger>
                  <TabsTrigger value="q1" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-full bg-transparent font-bold">Impacto Mínimo (Q1)</TabsTrigger>
                  <TabsTrigger value="q2" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none px-2 h-full bg-transparent font-bold">Impacto Bajo (Q2)</TabsTrigger>
                  <TabsTrigger value="q3" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-2 h-full bg-transparent font-bold">Impacto Medio (Q3)</TabsTrigger>
                  <TabsTrigger value="q4" className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none px-2 h-full bg-transparent font-bold">Impacto Crítico (Q4)</TabsTrigger>
                </TabsList>
                <Select value={mesSeleccionado} onValueChange={(v: any) => setMesSeleccionado(v)}>
                  <SelectTrigger className="w-[180px] h-8 bg-muted/50 border-none font-bold text-xs uppercase tracking-wider">
                    <SelectValue placeholder="Mes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feb">Febrero</SelectItem>
                    <SelectItem value="mar">Marzo</SelectItem>
                    <SelectItem value="abr">Abril</SelectItem>
                    <SelectItem value="tri">Trimestral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="todos" className="m-0">
                <TablaGestores data={gestoresVisualizados} />
              </TabsContent>
              <TabsContent value="q1" className="m-0">
                <div className="p-4 bg-green-50/50 dark:bg-green-900/10 text-green-700 dark:text-green-400 text-sm italic">
                  * Gestores con rendimiento óptimo: Aportan positivamente a la estabilidad de los indicadores.
                </div>
                <TablaGestores data={filtrarYOrdenar(estadisticas?.cuartiles.q1 || [])} />
              </TabsContent>
              <TabsContent value="q2" className="m-0">
                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 text-sm italic">
                  * Gestores en rango aceptable: Mantienen el equilibrio del equipo sin afectar negativamente las metas.
                </div>
                <TablaGestores data={filtrarYOrdenar(estadisticas?.cuartiles.q2 || [])} />
              </TabsContent>
              <TabsContent value="q3" className="m-0">
                <div className="p-4 bg-orange-50/50 dark:bg-orange-900/10 text-orange-700 dark:text-orange-400 text-sm italic">
                  * Gestores en observación: Comienzan a generar una afectación leve en el promedio de renovaciones.
                </div>
                <TablaGestores data={filtrarYOrdenar(estadisticas?.cuartiles.q3 || [])} />
              </TabsContent>
              <TabsContent value="q4" className="m-0">
                <div className="p-4 bg-red-50/50 dark:bg-red-900/10 text-red-700 dark:text-red-400 text-sm italic">
                  * Gestores de alto riesgo: Tienen el mayor impacto negativo en los indicadores globales.
                </div>
                <TablaGestores data={filtrarYOrdenar(estadisticas?.cuartiles.q4 || [])} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
