import { Sidebar } from "@/components/Sidebar";
import { useGestores } from "@/hooks/use-managers";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  AlertCircle, 
  Target,
  FileText,
  Activity
} from "lucide-react";

export default function ComplianceAnalysis() {
  const { data: gestores, isLoading } = useGestores();

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const cumplidoresIntegrales = gestores?.filter(g => 
    g.totalRenovaciones >= 36 && 
    g.puntajeCalidad >= 80 && 
    Number(g.porcentajeAtrasos) <= 2 && 
    g.renovacionesGestionadas >= 180
  ) || [];

  const soloMeta = gestores?.filter(g => 
    g.totalRenovaciones >= 36 && 
    !(g.puntajeCalidad >= 80 && Number(g.porcentajeAtrasos) <= 2 && g.renovacionesGestionadas >= 180)
  ) || [];

  const noCumplenMeta = gestores?.filter(g => g.totalRenovaciones < 36) || [];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Análisis de Cumplimiento Integral</h1>
            <p className="text-lg text-muted-foreground">
              Evaluación detallada de brechas de rendimiento frente a los 4 indicadores corporativos.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Sección: Cumplimiento 100% */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 text-green-600 border-b border-green-100 pb-2">
                <CheckCircle2 className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Cumplimiento Integral (100%)</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {cumplidoresIntegrales.length > 0 ? (
                  cumplidoresIntegrales.map(g => (
                    <div key={g.id} className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-green-900 text-lg">{g.nombre}</h3>
                        <p className="text-sm text-green-700">Cumple Meta, Calidad, Atrasos y Gestión.</p>
                      </div>
                      <Badge className="bg-green-600 px-4 py-1">Líder</Badge>
                    </div>
                  ))
                ) : (
                  <div className="bg-muted/30 p-8 rounded-2xl text-center md:col-span-2">
                    <p className="text-muted-foreground italic">No se identifican gestores con cumplimiento del 100% en todos los indicadores.</p>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Sección: Solo Meta */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 text-blue-600 border-b border-blue-100 pb-2">
                <Target className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Cumplimiento Solo de Meta</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {soloMeta.map(g => (
                  <div key={g.id} className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex flex-col gap-3">
                    <h3 className="font-bold text-blue-900">{g.nombre}</h3>
                    <div className="flex flex-wrap gap-2">
                      {g.puntajeCalidad < 80 && (
                        <Badge variant="outline" className="bg-white/50 border-red-200 text-red-600 text-[10px]">
                          Falla Calidad ({g.puntajeCalidad}%)
                        </Badge>
                      )}
                      {Number(g.porcentajeAtrasos) > 2 && (
                        <Badge variant="outline" className="bg-white/50 border-red-200 text-red-600 text-[10px]">
                          Falla Atrasos ({g.porcentajeAtrasos}%)
                        </Badge>
                      )}
                      {g.renovacionesGestionadas < 180 && (
                        <Badge variant="outline" className="bg-white/50 border-red-200 text-red-600 text-[10px]">
                          Falla Gestión ({g.renovacionesGestionadas})
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Sección: Incumplimiento Meta */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 text-red-600 border-b border-red-100 pb-2">
                <AlertCircle className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Brechas Críticas (Meta no alcanzada)</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {noCumplenMeta.map(g => (
                  <div key={g.id} className="bg-card p-4 rounded-xl border border-border flex justify-between items-center group hover:border-red-200 transition-colors">
                    <span className="font-medium text-foreground text-sm truncate max-w-[180px]">{g.nombre}</span>
                    <div className="text-right">
                      <span className="block text-xs font-bold text-red-500">-{36 - g.totalRenovaciones} renov.</span>
                      <span className="text-[10px] text-muted-foreground">{g.totalRenovaciones} / 36</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}
