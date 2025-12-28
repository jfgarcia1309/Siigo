import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function KPICard({ title, value, subtext, icon, trend, trendValue, className }: KPICardProps) {
  return (
    <div className={cn(
      "bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-300",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-secondary rounded-xl text-primary">
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
            trend === "up" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            trend === "down" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            trend === "neutral" && "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          )}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground tracking-tight">{value}</h3>
        <p className="text-sm font-medium text-muted-foreground mt-1">{title}</p>
        {subtext && <p className="text-xs text-muted-foreground/80 mt-2">{subtext}</p>}
      </div>
    </div>
  );
}
