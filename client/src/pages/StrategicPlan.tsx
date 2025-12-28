import { Sidebar } from "@/components/Sidebar";
import { motion } from "framer-motion";
import { 
  CheckSquare, 
  TrendingUp, 
  AlertOctagon, 
  ArrowRight,
  Target
} from "lucide-react";

export default function StrategicPlan() {
  const contenedor = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-10 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Plan de Acción Estratégico</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Análisis del desempeño del Q1 y estrategia correctiva para asegurar los objetivos corporativos en el próximo periodo.
            </p>
          </div>

          <motion.div 
            variants={contenedor}
            initial="hidden"
            animate="show"
            className="grid gap-10"
          >
            {/* Sección 1: Diagnóstico */}
            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-3 text-primary mb-4 border-b border-border pb-2">
                <AlertOctagon className="w-6 h-6" />
                <h2 className="text-2xl font-bold">1. Diagnóstico y Brechas</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-2xl border border-red-100 shadow-sm">
                  <h3 className="text-lg font-bold text-red-700 mb-3">Problemas Críticos</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span><strong>Atrasos Elevados:</strong> El promedio del equipo es del 3.84%, superando el límite del 2%.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span><strong>Desempeño Inconsistente:</strong> Gran brecha entre los gestores top y los de bajo rendimiento.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">Oportunidades</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span><strong>Calidad Base:</strong> El equipo tiene buen conocimiento de los procesos de gestión.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span><strong>Mentores Internos:</strong> Contamos con gestores de alto desempeño para guiar al equipo.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Sección 2: Plan Mayo */}
            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-3 text-accent mb-4 border-b border-border pb-2">
                <Target className="w-6 h-6" />
                <h2 className="text-2xl font-bold">2. Plan de Acción: Mayo (Meta 18)</h2>
              </div>

              <div className="bg-gradient-to-br from-card to-secondary p-8 rounded-3xl border border-border shadow-lg">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-foreground mb-2">Operación "Recuperación"</h3>
                    <p className="text-muted-foreground">Objetivo: Lograr 18 renovaciones por gestor en mayo.</p>
                  </div>
                  <div className="bg-primary/10 px-6 py-4 rounded-2xl text-center min-w-[200px]">
                    <span className="block text-sm text-primary font-bold uppercase tracking-wider mb-1">Nueva Meta</span>
                    <span className="block text-4xl font-black text-primary">18</span>
                    <span className="text-xs text-muted-foreground">Renovaciones / Gestor</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold mb-2">1</div>
                    <h4 className="font-bold text-foreground">Micro-Metas Diarias</h4>
                    <p className="text-sm text-muted-foreground">Desglosar las 18 renovaciones en objetivos diarios alcanzables.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold mb-2">2</div>
                    <h4 className="font-bold text-foreground">Limpieza de Embudo</h4>
                    <p className="text-sm text-muted-foreground">Priorizar el cierre de casos pendientes de abril en la primera semana.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold mb-2">3</div>
                    <h4 className="font-bold text-foreground">Incentivos Semanales</h4>
                    <p className="text-sm text-muted-foreground">Reconocimiento público y bonos por cumplimiento temprano.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Sección 3: Acciones Correctivas */}
            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-3 text-orange-600 mb-4 border-b border-border pb-2">
                <TrendingUp className="w-6 h-6" />
                <h2 className="text-2xl font-bold">3. Recuperación de Desempeño</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="p-1 bg-red-100 text-red-600 rounded">Bajo Rendimiento</span>
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-red-400 mt-0.5" />
                      <p className="text-sm text-muted-foreground"><strong className="text-foreground">Plan de Mejora:</strong> Implementación de PIP enfocado en métricas de actividad diaria.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-red-400 mt-0.5" />
                      <p className="text-sm text-muted-foreground"><strong className="text-foreground">Acompañamiento:</strong> Sesiones de escucha de llamadas con gestores top.</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="p-1 bg-green-100 text-green-600 rounded">Retención de Talento</span>
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckSquare className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground"><strong className="text-foreground">Liderazgo:</strong> Asignación de roles de mentoría para los mejores gestores.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckSquare className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground"><strong className="text-foreground">Plan de Carrera:</strong> Conversaciones sobre crecimiento profesional.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
