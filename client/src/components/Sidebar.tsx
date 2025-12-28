import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, ChevronRight, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/plan", label: "Strategic Plan", icon: FileText },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
          <BarChart3 className="text-primary-foreground w-6 h-6" />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl text-foreground leading-none">Renewal</h1>
          <span className="text-xs text-muted-foreground font-medium tracking-wider">ANALYTICS</span>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-primary-foreground/80" />}
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
            <span className="text-sm font-semibold text-foreground">John Director</span>
            <span className="text-xs text-muted-foreground">Head of Renewals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
