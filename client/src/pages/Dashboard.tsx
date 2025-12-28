import { useGestores, useEstadisticas } from "@/hooks/use-managers";
import { KPICard } from "@/components/KPICard";
import { Sidebar } from "@/components/Sidebar";
import { 
  Users, 
  Target, 
  AlertTriangle, 
  Download, 
  Search,
  CheckCircle2,
  LayoutGrid
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: gestores, isLoading: cargandoGestores } = useGestores();
  const { data: estadisticas, isLoading: cargandoEstadisticas } = useEstadisticas();
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const gestoresFiltrados = gestores?.filter(g => 
    g.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

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
            <TableHead className="text-center font-bold text-primary">Total Q1 (36)</TableHead>
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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-10 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tablero de Desempeño</h1>
              <p className="text-muted-foreground mt-1">Resumen del Q1 y Analítica del Equipo</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar gestores..." 
                  className="pl-9 w-64 bg-card"
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <KPICard 
                title="Cumplimiento Promedio" 
                value={`${estadisticas?.cumplimientoTotal.toFixed(1)}%`} 
                subtext="Meta: 100%"
                icon={<Target className="w-6 h-6" />}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <KPICard 
                title="Puntaje de Calidad" 
                value={`${estadisticas?.calidadEquipo.toFixed(1)}%`}
                subtext="Meta: >80%"
                icon={<CheckCircle2 className="w-6 h-6" />}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <KPICard 
                title="Promedio Atrasos" 
                value={`${estadisticas?.atrasosEquipo.toFixed(2)}%`}
                subtext="Meta: <2%"
                icon={<AlertTriangle className="w-6 h-6" />}
                className="border-l-4 border-l-yellow-400"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <KPICard 
                title="Total Gestores" 
                value={`${estadisticas?.totalGestores}`}
                subtext={`${estadisticas?.gestoresCumplenMeta} en meta Q1`}
                icon={<Users className="w-6 h-6" />}
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl border border-border shadow-lg shadow-black/5 overflow-hidden"
          >
            <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold">Distribución por Rendimiento</h2>
                <p className="text-sm text-muted-foreground">Visualización por Cuartiles y Lista General</p>
              </div>
            </div>

            <Tabs defaultValue="todos" className="w-full">
              <div className="px-6 border-b border-border">
                <TabsList className="bg-transparent h-12 gap-6">
                  <TabsTrigger value="todos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 h-9">General</TabsTrigger>
                  <TabsTrigger value="q1" className="data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg px-4 h-9">Cuartil 1 (Top)</TabsTrigger>
                  <TabsTrigger value="q2" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-4 h-9">Cuartil 2</TabsTrigger>
                  <TabsTrigger value="q3" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg px-4 h-9">Cuartil 3</TabsTrigger>
                  <TabsTrigger value="q4" className="data-[state=active]:bg-red-500 data-[state=active]:text-white rounded-lg px-4 h-9">Cuartil 4 (Bajo)</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="todos" className="m-0 p-0">
                <TablaGestores data={gestoresFiltrados || []} />
              </TabsContent>
              <TabsContent value="q1" className="m-0 p-0">
                <div className="p-4 bg-green-50 dark:bg-green-900/10 border-b border-green-100 dark:border-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium">
                  Gestores con el 25% superior de rendimiento.
                </div>
                <TablaGestores data={estadisticas?.cuartiles.q1 || []} />
              </TabsContent>
              <TabsContent value="q2" className="m-0 p-0">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/20 text-blue-700 dark:text-blue-400 text-sm font-medium">
                  Gestores en el rango del 25% al 50%.
                </div>
                <TablaGestores data={estadisticas?.cuartiles.q2 || []} />
              </TabsContent>
              <TabsContent value="q3" className="m-0 p-0">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/10 border-b border-orange-100 dark:border-orange-900/20 text-orange-700 dark:text-orange-400 text-sm font-medium">
                  Gestores en el rango del 50% al 75%.
                </div>
                <TablaGestores data={estadisticas?.cuartiles.q3 || []} />
              </TabsContent>
              <TabsContent value="q4" className="m-0 p-0">
                <div className="p-4 bg-red-50 dark:bg-red-900/10 border-b border-red-100 dark:border-red-900/20 text-red-700 dark:text-red-400 text-sm font-medium">
                  Gestores con el 25% inferior de rendimiento.
                </div>
                <TablaGestores data={estadisticas?.cuartiles.q4 || []} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
