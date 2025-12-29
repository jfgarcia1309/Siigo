import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, ChevronRight, BarChart3, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [ubicacion] = useLocation();

  const itemsNavegacion = [
    { href: "/", etiqueta: "Tablero", icono: LayoutDashboard },
    { href: "/analisis-cumplimiento", etiqueta: "Gestores", icono: CheckCircle2 },
    { href: "/plan", etiqueta: "Plan Estratégico", icono: FileText },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
          <BarChart3 className="text-primary-foreground w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-foreground leading-none">Renovación</h1>
          <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Analítica</span>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {itemsNavegacion.map((item) => {
          const esActivo = ubicacion === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                  esActivo
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icono className={cn("w-5 h-5", esActivo ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
                  <span className="font-medium">{item.etiqueta}</span>
                </div>
                {esActivo && <ChevronRight className="w-4 h-4 text-primary-foreground/80" />}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white text-xs font-bold">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Juan Director</span>
            <span className="text-xs text-muted-foreground">Líder de Renovaciones</span>
          </div>
        </div>
      </div>
    </div>
  );
}
