import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import StrategicPlan from "@/pages/StrategicPlan";
import ComplianceAnalysis from "@/pages/ComplianceAnalysis";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/plan" component={StrategicPlan} />
      <Route path="/analisis-cumplimiento" component={ComplianceAnalysis} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
