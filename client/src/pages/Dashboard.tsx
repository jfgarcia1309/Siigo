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
  ArrowUp,
  Plus,
  Pencil,
  Trash2,
  X,
  Check
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaInsertarGestor, type InsertarGestor, type Gestor } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Componente para el Formulario de Gestor
const FormularioGestor = ({ initialData, onSuccess, onCancel }: { initialData?: Gestor, onSuccess: () => void, onCancel: () => void }) => {
  const { toast } = useToast();
  const form = useForm<InsertarGestor>({
    resolver: zodResolver(esquemaInsertarGestor),
    defaultValues: initialData ? {
      nombre: initialData.nombre,
      renovacionesFeb: initialData.renovacionesFeb,
      renovacionesMar: initialData.renovacionesMar,
      renovacionesAbr: initialData.renovacionesAbr,
      totalRenovaciones: initialData.totalRenovaciones,
      porcentajeAtrasos: String(initialData.porcentajeAtrasos),
      renovacionesGestionadas: initialData.renovacionesGestionadas,
      puntajeCalidad: initialData.puntajeCalidad,
      clasificacion: initialData.clasificacion
    } : {
      nombre: "",
      renovacionesFeb: 0,
      renovacionesMar: 0,
      renovacionesAbr: 0,
      totalRenovaciones: 0,
      porcentajeAtrasos: "0",
      renovacionesGestionadas: 0,
      puntajeCalidad: 0,
      clasificacion: "Impacto Medio"
    }
  });

  const onSubmit = async (data: InsertarGestor) => {
    try {
      if (initialData) {
        await apiRequest("PATCH", `/api/gestores/${initialData.id}`, data);
        toast({ title: "Gestor actualizado", description: "Los cambios se guardaron correctamente." });
      } else {
        await apiRequest("POST", "/api/gestores", data);
        toast({ title: "Gestor creado", description: "Se ha agregado el nuevo gestor al equipo." });
      }
      queryClient.invalidateQueries({ queryKey: ["/api/gestores"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gestores/estadisticas"] });
      onSuccess();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo guardar la información." });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="nombre">Nombre Completo</Label>
          <Input id="nombre" {...form.register("nombre")} placeholder="Ej: Juan Perez" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feb">Renov. Febrero</Label>
          <Input id="feb" type="number" {...form.register("renovacionesFeb", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mar">Renov. Marzo</Label>
          <Input id="mar" type="number" {...form.register("renovacionesMar", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="abr">Renov. Abril</Label>
          <Input id="abr" type="number" {...form.register("renovacionesAbr", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="total">Total Q1</Label>
          <Input id="total" type="number" {...form.register("totalRenovaciones", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="calidad">Puntaje Calidad (%)</Label>
          <Input id="calidad" type="number" {...form.register("puntajeCalidad", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="atrasos">Atrasos (%)</Label>
          <Input id="atrasos" {...form.register("porcentajeAtrasos")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gestionadas">Gestiones Realizadas</Label>
          <Input id="gestionadas" type="number" {...form.register("renovacionesGestionadas", { valueAsNumber: true })} />
        </div>
      </div>
      <DialogFooter className="gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Guardar Cambios</Button>
      </DialogFooter>
    </form>
  );
};

export default function Dashboard() {
  const [mesSeleccionado, setMesSeleccionado] = useState<"feb" | "mar" | "abr" | "tri">("tri");
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [gestorEditar, setGestorEditar] = useState<Gestor | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { toast } = useToast();
  const { data: gestores, isLoading: cargandoGestores } = useGestores();
  const { data: estadisticas, isLoading: cargandoEstadisticas } = useEstadisticas(mesSeleccionado);

  const METAS_MENSUALES = {
    feb: 8,
    mar: 13,
    abr: 15,
    tri: 36
  };
  
  const BASELINE_CALIDAD = 76;
  const BASELINE_ATRASOS = 3.84;
  const BASELINE_GESTION = 174;

  const filtrarYOrdenar = (lista: any[]) => {
    if (!lista) return [];
    let filtrados = lista.filter(g => 
      g.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    if (filtroEstado !== "todos") {
      filtrados = filtrados.filter(g => g.clasificacion === filtroEstado);
    }
    
    // Ordenar por impacto: de menor a mayor impacto negativo (mejor a peor desempeño)
    const ordenImpacto: Record<string, number> = {
      "Impacto Bajo": 0,
      "Impacto Medio": 1,
      "Impacto Alto": 2,
      "Impacto Crítico": 3
    };
    
    return filtrados.sort((a, b) => {
      const impactoA = ordenImpacto[a.clasificacion] ?? 999;
      const impactoB = ordenImpacto[b.clasificacion] ?? 999;
      return impactoA - impactoB;
    });
  };

  const analizarCumplimientoMensual = (gestor: any, mes: "feb" | "mar" | "abr" | "tri") => {
    const valorMes = mes === "feb" ? gestor.renovacionesFeb : 
                     mes === "mar" ? gestor.renovacionesMar : 
                     mes === "abr" ? gestor.renovacionesAbr :
                     gestor.totalRenovaciones;
    const metaMes = METAS_MENSUALES[mes];
    const cumpleRenovaciones = valorMes >= metaMes;
    const cumpleCalidad = gestor.puntajeCalidad >= BASELINE_CALIDAD;
    const cumpleAtrasos = Number(gestor.porcentajeAtrasos) <= BASELINE_ATRASOS;
    const cumpleGestion = gestor.renovacionesGestionadas >= BASELINE_GESTION;

    const fallas = [];
    if (!cumpleRenovaciones) fallas.push(`Renovaciones (${valorMes}/${metaMes})`);
    if (!cumpleCalidad) fallas.push(`Calidad (${gestor.puntajeCalidad}%)`);
    if (!cumpleAtrasos) fallas.push(`Atrasos (${gestor.porcentajeAtrasos}%)`);
    if (!cumpleGestion) fallas.push(`Gestión (${gestor.renovacionesGestionadas}/${BASELINE_GESTION})`);

    return { cumple: fallas.length === 0, fallas };
  };

  const eliminarGestor = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este gestor?")) return;
    try {
      await apiRequest("DELETE", `/api/gestores/${id}`);
      toast({ title: "Gestor eliminado", description: "El gestor ha sido retirado del equipo." });
      queryClient.invalidateQueries({ queryKey: ["/api/gestores"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gestores/estadisticas"] });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "No se pudo eliminar al gestor." });
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
            <TableHead className="text-center font-bold text-muted-foreground uppercase text-[11px] tracking-wider py-4">Atrasos</TableHead>
            <TableHead className="text-center font-bold text-muted-foreground uppercase text-[11px] tracking-wider py-4">
              Productividad
              <div className="text-[9px] lowercase font-normal">(llamadas/seguimientos)</div>
            </TableHead>
            <TableHead className="text-right font-bold text-muted-foreground uppercase text-[11px] tracking-wider py-4">Clasificación Impacto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((gestor) => {
            const { cumple: cumpleMes, fallas: fallasMes } = analizarCumplimientoMensual(gestor, mesSeleccionado);
            const renValor = mesSeleccionado === "feb" ? gestor.renovacionesFeb :
                             mesSeleccionado === "mar" ? gestor.renovacionesMar :
                             mesSeleccionado === "abr" ? gestor.renovacionesAbr :
                             gestor.totalRenovaciones;

            const cumpliValor = mesSeleccionado === "feb" ? ((gestor.renovacionesFeb / 8) * 100).toFixed(1) :
                                mesSeleccionado === "mar" ? ((gestor.renovacionesMar / 13) * 100).toFixed(1) :
                                mesSeleccionado === "abr" ? ((gestor.renovacionesAbr / 15) * 100).toFixed(1) :
                                ((gestor.totalRenovaciones / 36) * 100).toFixed(1);

            const gestiValor = mesSeleccionado === "tri" 
              ? gestor.renovacionesGestionadas 
              : Math.round(gestor.renovacionesGestionadas * (renValor / gestor.totalRenovaciones));

            const clasif = obtenerClasificacionDesempeño(Number(cumpliValor));
            
            return (
              <TableRow key={gestor.id} className="hover:bg-muted/30 transition-colors border-b last:border-0 group">
                <TableCell className="font-bold text-foreground py-6 text-sm">{gestor.nombre}</TableCell>
                <TableCell className="text-center font-bold text-lg py-6">{renValor}</TableCell>
                <TableCell className="text-center py-6">
                  <Badge variant="outline" className={cn("font-bold px-3 py-1", clasif.color)}>
                    {cumpliValor}%
                  </Badge>
                </TableCell>
                <TableCell className="text-center font-bold text-muted-foreground py-6">{gestor.puntajeCalidad}%</TableCell>
                <TableCell className="text-center font-bold text-muted-foreground py-6">{gestor.porcentajeAtrasos}%</TableCell>
                <TableCell className="text-center font-bold text-muted-foreground py-6">{gestiValor}</TableCell>
                <TableCell className="text-right py-6">
                  <div className="flex flex-col items-end gap-1 group-hover:hidden">
                    <Badge variant="outline" className={cn("text-[10px] font-bold uppercase tracking-tight px-3 py-1", clasif.color)}>
                      {clasif.label}
                    </Badge>
                  </div>
                  <div className="hidden group-hover:flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => {
                        setGestorEditar(gestor);
                        setIsEditOpen(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => eliminarGestor(gestor.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Información del Gestor</DialogTitle>
            </DialogHeader>
            {gestorEditar && (
              <FormularioGestor 
                initialData={gestorEditar}
                onSuccess={() => setIsEditOpen(false)} 
                onCancel={() => setIsEditOpen(false)} 
              />
            )}
          </DialogContent>
        </Dialog>
        
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground text-balance">Tablero de Desempeño</h1>
              <p className="text-muted-foreground mt-1">Análisis de impacto ascendente en los indicadores del equipo</p>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 hover-elevate shadow-sm">
                    <Plus className="w-4 h-4" />
                    Agregar Gestor
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Nuevo Gestor de Renovaciones</DialogTitle>
                  </DialogHeader>
                  <FormularioGestor 
                    onSuccess={() => setIsCreateOpen(false)} 
                    onCancel={() => setIsCreateOpen(false)} 
                  />
                </DialogContent>
              </Dialog>
              <div className="h-8 w-[1px] bg-border hidden md:block" />
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-bold text-primary">Juan Fernando Garcia</span>
                <span className="text-[10px] uppercase font-medium text-muted-foreground tracking-wider">Coordinador de Renovaciones</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nombre..." 
                  className="pl-9 bg-card"
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-card p-1 rounded-lg border flex items-center shadow-sm w-full lg:w-auto overflow-x-auto">
              <Tabs value={mesSeleccionado} onValueChange={(v) => setMesSeleccionado(v as any)} className="w-full">
                <TabsList className="bg-transparent h-9 gap-1">
                  <TabsTrigger value="feb" className="px-6 text-[11px] uppercase font-bold tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Febrero</TabsTrigger>
                  <TabsTrigger value="mar" className="px-6 text-[11px] uppercase font-bold tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Marzo</TabsTrigger>
                  <TabsTrigger value="abr" className="px-6 text-[11px] uppercase font-bold tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Abril</TabsTrigger>
                  <TabsTrigger value="tri" className="px-6 text-[11px] uppercase font-bold tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Total Q1</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard 
              title="Puntaje de Calidad" 
              value={`${Math.round(estadisticas?.calidadEquipo || 0)}%`}
              subtext={`Estado inicial: ${BASELINE_CALIDAD}%`}
              icon={<CheckCircle2 className="w-6 h-6" />}
            />
            <KPICard 
              title="Seguimientos Pendientes" 
              value={`${Number(estadisticas?.atrasosEquipo || 0).toFixed(2)}%`}
              subtext={`Promedio inicial: ${BASELINE_ATRASOS}%`}
              icon={<AlertTriangle className="w-6 h-6" />}
              className="border-l-4 border-l-orange-400"
            />
            <KPICard 
              title="Cumplimiento Promedio" 
              value={`${Number(estadisticas?.cumplimientoTotal || 0).toFixed(1)}%`}
              subtext={`Meta Grupal: ${estadisticas?.gestoresCumplenMeta} de ${estadisticas?.totalGestores} gestores`}
              icon={<Target className="w-6 h-6 text-primary" />}
            />
            <KPICard 
              title="Productividad del Equipo" 
              value={(gestores?.reduce((acc: number, g: any) => acc + g.renovacionesGestionadas, 0) || 0).toLocaleString()}
              subtext={`Referencia: ${BASELINE_GESTION} gestiones/mes`}
              icon={<ArrowUp className="w-6 h-6 text-blue-500" />}
            />
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-card flex justify-between items-center">
              <h2 className="text-xl font-bold">Gestión de Renovaciones</h2>
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Vista Detallada</Badge>
            </div>
            
            <Tabs defaultValue="todos" className="w-full">
              <div className="px-6 border-b border-border bg-card flex justify-between items-center overflow-x-auto">
                <TabsList className="bg-transparent h-14 gap-8">
                  <TabsTrigger value="todos" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-full bg-transparent font-bold">Vista Unificada</TabsTrigger>
                  <TabsTrigger value="q1" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-full bg-transparent font-bold">Impacto Mínimo (Q1)</TabsTrigger>
                  <TabsTrigger value="q2" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none px-2 h-full bg-transparent font-bold">Impacto Bajo (Q2)</TabsTrigger>
                  <TabsTrigger value="q3" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-2 h-full bg-transparent font-bold">Impacto Medio (Q3)</TabsTrigger>
                  <TabsTrigger value="q4" className="data-[state=active]:border-b-2 data-[state=active]:border-red-600 rounded-none px-2 h-full bg-transparent font-bold">Impacto Crítico (Q4)</TabsTrigger>
                </TabsList>
                <div className="bg-muted/50 p-1 rounded-md flex items-center ml-auto">
                  <Select value={mesSeleccionado} onValueChange={(v: any) => setMesSeleccionado(v)}>
                    <SelectTrigger className="w-[180px] h-8 border-none bg-transparent font-bold text-xs uppercase tracking-wider">
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
              </div>

              <TabsContent value="todos" className="m-0">
                <TablaGestores data={gestoresVisualizados} />
              </TabsContent>
              <TabsContent value="q1" className="m-0">
                <TablaGestores data={gestoresVisualizados.filter(g => estadisticas?.cuartiles.q1.some((q: any) => q.id === g.id))} />
              </TabsContent>
              <TabsContent value="q2" className="m-0">
                <TablaGestores data={gestoresVisualizados.filter(g => estadisticas?.cuartiles.q2.some((q: any) => q.id === g.id))} />
              </TabsContent>
              <TabsContent value="q3" className="m-0">
                <TablaGestores data={gestoresVisualizados.filter(g => estadisticas?.cuartiles.q3.some((q: any) => q.id === g.id))} />
              </TabsContent>
              <TabsContent value="q4" className="m-0">
                <TablaGestores data={gestoresVisualizados.filter(g => estadisticas?.cuartiles.q4.some((q: any) => q.id === g.id))} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
