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
  const { data: gestores, isLoading: cargandoGestores } = useGestores();
  const { data: estadisticas, isLoading: cargandoEstadisticas } = useEstadisticas();
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const filtrarYOrdenar = (lista: any[]) => {
    // La lista ya viene ordenada por el backend en orden ascendente de afectación (Q1 -> Q4)
    let filtrados = lista.filter(g => 
      g.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    if (filtroEstado !== "todos") {
      filtrados = filtrados.filter(g => g.clasificacion === filtroEstado);
    }
    return filtrados;
  };

  const obtenerColorCumplimiento = (porcentaje: number) => {
    if (porcentaje >= 100) return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
    if (porcentaje >= 80) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
    return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
  };

  const obtenerInsigniaEstado = (clasificacion: string) => {
    switch (clasificacion) {
      case 'Alto Desempeño':
        return <Badge className="bg-green-500 hover:bg-green-600 border-none">Excelente</Badge>;
      case 'En Camino':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300">Estable</Badge>;
      case 'Requiere Mejora':
        return <Badge variant="destructive">Mejorar</Badge>;
      default:
        return <Badge variant="outline">{clasificacion}</Badge>;
    }
  };

  const TablaGestores = ({ data }: { data: any[] }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            <TableHead className="font-bold text-foreground w-[200px]">Nombre del Gestor</TableHead>
            <TableHead className="text-center">Feb (8)</TableHead>
            <TableHead className="text-center">Mar (13)</TableHead>
            <TableHead className="text-center">Abr (15)</TableHead>
            <TableHead className="text-center font-bold text-primary" title="Acumulado de renovaciones para el trimestre (Feb+Mar+Abr)">Acumulado de Renovaciones Trimestral</TableHead>
            <TableHead className="text-center">Cumplimiento</TableHead>
            <TableHead className="text-center">Calidad</TableHead>
            <TableHead className="text-center">Atrasos</TableHead>
            <TableHead className="text-right">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((gestor) => {
            const cumplimiento = (gestor.totalRenovaciones / 36) * 100;
            return (
              <TableRow key={gestor.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-foreground">{gestor.nombre}</TableCell>
                <TableCell className="text-center font-mono text-muted-foreground">{gestor.renovacionesFeb}</TableCell>
                <TableCell className="text-center font-mono text-muted-foreground">{gestor.renovacionesMar}</TableCell>
                <TableCell className="text-center font-mono text-muted-foreground">{gestor.renovacionesAbr}</TableCell>
                <TableCell className="text-center font-bold text-lg font-mono">{gestor.totalRenovaciones}</TableCell>
                <TableCell className="text-center">
                  <span className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold",
                    obtenerColorCumplimiento(cumplimiento)
                  )}>
                    {cumplimiento.toFixed(0)}%
                  </span>
                </TableCell>
                <TableCell className="text-center font-mono">
                  <span className={cn(
                    gestor.puntajeCalidad >= 80 ? "text-green-600" : "text-yellow-600"
                  )}>
                    {gestor.puntajeCalidad}%
                  </span>
                </TableCell>
                <TableCell className="text-center font-mono">
                  <span className={cn(
                    Number(gestor.porcentajeAtrasos) <= 2 ? "text-muted-foreground" : "text-red-500 font-bold"
                  )}>
                    {gestor.porcentajeAtrasos}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {obtenerInsigniaEstado(gestor.clasificacion)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );

  if (cargandoGestores || cargandoEstadisticas) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                  <SelectItem value="Alto Desempeño">Alto Desempeño</SelectItem>
                  <SelectItem value="En Camino">En Camino</SelectItem>
                  <SelectItem value="Requiere Mejora">Requiere Mejora</SelectItem>
                  <SelectItem value="Crítico">Crítico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard 
              title="Cumplimiento Promedio" 
              value={`${estadisticas?.cumplimientoTotal.toFixed(1)}%`} 
              subtext="Basado en meta trimestral"
              icon={<Target className="w-6 h-6" />}
            />
            <KPICard 
              title="Calidad del Equipo" 
              value={`${estadisticas?.calidadEquipo.toFixed(1)}%`}
              subtext="Meta corporativa >80%"
              icon={<CheckCircle2 className="w-6 h-6" />}
            />
            <KPICard 
              title="Promedio de Atrasos" 
              value={`${estadisticas?.atrasosEquipo.toFixed(2)}%`}
              subtext="Límite máximo permitido 2%"
              icon={<AlertTriangle className="w-6 h-6" />}
              className="border-l-4 border-l-orange-400"
            />
            <KPICard 
              title="Total Gestores" 
              value={`${estadisticas?.totalGestores}`}
              subtext={`${estadisticas?.gestoresCumplenMeta} cumpliendo meta`}
              icon={<Users className="w-6 h-6" />}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-border bg-muted/20">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <ArrowUp className="w-5 h-5 text-primary" />
                    Orden de Afectación Ascendente
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Índice de Impacto Total (IIT): Normalización de Renovaciones (50%), Calidad (30%) y Atrasos (20%).
                  </p>
                </div>
                <div className="text-right hidden md:block">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-tighter">Nivel de Impacto: Ascendente</Badge>
                </div>
              </div>
            </div>

            <Tabs defaultValue="todos" className="w-full">
              <div className="px-6 border-b border-border bg-card">
                <TabsList className="bg-transparent h-14 gap-8">
                  <TabsTrigger value="todos" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-full bg-transparent">Vista Unificada</TabsTrigger>
                  <TabsTrigger value="q1" className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-2 h-full bg-transparent">Impacto Mínimo (Q1)</TabsTrigger>
                  <TabsTrigger value="q2" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none px-2 h-full bg-transparent">Impacto Bajo (Q2)</TabsTrigger>
                  <TabsTrigger value="q3" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-2 h-full bg-transparent">Impacto Medio (Q3)</TabsTrigger>
                  <TabsTrigger value="q4" className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 rounded-none px-2 h-full bg-transparent">Impacto Crítico (Q4)</TabsTrigger>
                </TabsList>
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
