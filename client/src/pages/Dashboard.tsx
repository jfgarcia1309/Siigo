import { useManagers, useTeamStats } from "@/hooks/use-managers";
import { KPICard } from "@/components/KPICard";
import { Sidebar } from "@/components/Sidebar";
import { 
  Users, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  Search,
  CheckCircle2,
  XCircle
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
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: managers, isLoading: isLoadingManagers } = useManagers();
  const { data: stats, isLoading: isLoadingStats } = useTeamStats();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredManagers = managers?.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 100) return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
    if (percentage >= 80) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
    return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'High Performance':
        return <Badge className="bg-green-500 hover:bg-green-600 border-none">Top Performer</Badge>;
      case 'Medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300">Steady</Badge>;
      case 'Low':
        return <Badge variant="destructive">Needs Support</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleExport = () => {
    // Simple mock export
    const headers = ["Name", "Feb Renewals", "Mar Renewals", "Apr Renewals", "Total Q1", "Compliance %", "Quality %", "Status"];
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + managers?.map(m => 
          `${m.name},${m.febRenewals},${m.marRenewals},${m.aprRenewals},${m.totalRenewals},${((m.totalRenewals/36)*100).toFixed(1)}%,${m.qualityScore}%,${m.classification}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "managers_performance_q1.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoadingManagers || isLoadingStats) {
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
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Performance Dashboard</h1>
              <p className="text-muted-foreground mt-1">Q1 Performance Overview & Team Analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search managers..." 
                  className="pl-9 w-64 bg-card"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleExport} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <KPICard 
                title="Avg Compliance" 
                value={`${stats?.averageCompliance.toFixed(1)}%`} 
                subtext="Target: 100%"
                icon={<Target className="w-6 h-6" />}
                trend="up"
                trendValue="+2.4%"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <KPICard 
                title="Avg Quality Score" 
                value={`${stats?.teamQuality.toFixed(1)}%`}
                subtext="Target: >95%"
                icon={<CheckCircle2 className="w-6 h-6" />}
                trend="neutral"
                trendValue="Stable"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <KPICard 
                title="Avg Atrasos" 
                value={`${stats?.teamAtrasos.toFixed(2)}%`}
                subtext="Target: <5%"
                icon={<AlertTriangle className="w-6 h-6" />}
                trend="down"
                trendValue="-0.5%"
                className="border-l-4 border-l-yellow-400"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <KPICard 
                title="Managers on Target" 
                value={`${stats?.managersMeetingGoal} / ${stats?.totalManagers}`}
                subtext="Meeting Q1 Goal (36+)"
                icon={<Users className="w-6 h-6" />}
                trend={stats && stats.managersMeetingGoal > (stats.totalManagers / 2) ? "up" : "down"}
                trendValue="Team Health"
              />
            </motion.div>
          </div>

          {/* Main Data Table */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl border border-border shadow-lg shadow-black/5 overflow-hidden"
          >
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold font-display">Manager Performance</h2>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> On Track (≥100%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> At Risk (80-99%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Critical ({'<'}80%)</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                    <TableHead className="font-bold text-foreground w-[200px]">Manager Name</TableHead>
                    <TableHead className="text-center">Feb (8)</TableHead>
                    <TableHead className="text-center">Mar (13)</TableHead>
                    <TableHead className="text-center">Apr (15)</TableHead>
                    <TableHead className="text-center font-bold text-primary">Total Q1 (36)</TableHead>
                    <TableHead className="text-center">Compliance</TableHead>
                    <TableHead className="text-center">Quality</TableHead>
                    <TableHead className="text-center">Atrasos</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredManagers?.map((manager) => {
                    const compliance = (manager.totalRenewals / 36) * 100;
                    return (
                      <TableRow key={manager.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium text-foreground">{manager.name}</TableCell>
                        <TableCell className="text-center font-mono text-muted-foreground">{manager.febRenewals}</TableCell>
                        <TableCell className="text-center font-mono text-muted-foreground">{manager.marRenewals}</TableCell>
                        <TableCell className="text-center font-mono text-muted-foreground">{manager.aprRenewals}</TableCell>
                        <TableCell className="text-center font-bold text-lg font-mono">{manager.totalRenewals}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "px-2.5 py-1 rounded-md text-xs font-bold",
                            getComplianceColor(compliance)
                          )}>
                            {compliance.toFixed(0)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-center font-mono">
                          <span className={cn(
                            manager.qualityScore >= 95 ? "text-green-600" : "text-yellow-600"
                          )}>
                            {manager.qualityScore}%
                          </span>
                        </TableCell>
                        <TableCell className="text-center font-mono">
                          <span className={cn(
                            Number(manager.atrasosPct) <= 5 ? "text-muted-foreground" : "text-red-500 font-bold"
                          )}>
                            {manager.atrasosPct}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {getStatusBadge(manager.classification)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filteredManagers?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                        No managers found matching "{searchTerm}"
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
