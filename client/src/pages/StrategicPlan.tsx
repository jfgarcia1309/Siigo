import { Sidebar } from "@/components/Sidebar";
import { motion } from "framer-motion";
import { 
  CheckSquare, 
  TrendingUp, 
  AlertOctagon, 
  Lightbulb, 
  ArrowRight,
  Target
} from "lucide-react";

export default function StrategicPlan() {
  const container = {
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
            <h1 className="text-4xl font-display font-bold text-foreground">Strategic Action Plan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Analysis of Q1 performance and corrective strategy for the upcoming period to align the team with corporate objectives.
            </p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-10"
          >
            {/* Section 1: Diagnosis */}
            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-3 text-primary mb-4 border-b border-border pb-2">
                <AlertOctagon className="w-6 h-6" />
                <h2 className="text-2xl font-bold font-display">1. Diagnosis & Gaps</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-2xl border border-red-100 shadow-sm">
                  <h3 className="text-lg font-bold text-red-700 mb-3">Critical Issues</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span><strong>High Delays (Atrasos):</strong> Team average is 4.79%, dangerously close to the 5% limit. Several managers exceed 8%.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                      <span><strong>Inconsistent Performance:</strong> While 11 managers are high performers, 6 are critically low, pulling down the average.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-blue-100 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-700 mb-3">Opportunities</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span><strong>Quality Foundation:</strong> Average quality score is high (96.4%), proving the team knows <em>how</em> to do the job well, but lacks volume.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span><strong>Top Talent:</strong> We have strong mentors available among the 11 high performers to guide the strugglers.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 2: May Plan */}
            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-3 text-accent mb-4 border-b border-border pb-2">
                <Target className="w-6 h-6" />
                <h2 className="text-2xl font-bold font-display">2. Action Plan: May (Target 18)</h2>
              </div>

              <div className="bg-gradient-to-br from-card to-secondary p-8 rounded-3xl border border-border shadow-lg">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-foreground mb-2">Operation "Catch-Up"</h3>
                    <p className="text-muted-foreground">Objective: Achieve 18 renewals per manager in May to recover Q1 deficit.</p>
                  </div>
                  <div className="bg-primary/10 px-6 py-4 rounded-2xl text-center min-w-[200px]">
                    <span className="block text-sm text-primary font-bold uppercase tracking-wider mb-1">New Target</span>
                    <span className="block text-4xl font-black text-primary">18</span>
                    <span className="text-xs text-muted-foreground">Renewals / Manager</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold mb-2">1</div>
                    <h4 className="font-bold text-foreground">Daily Micro-Goals</h4>
                    <p className="text-sm text-muted-foreground">Break down 18 renewals into ~1 renewal per working day. Daily stand-ups to track progress.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold mb-2">2</div>
                    <h4 className="font-bold text-foreground">Pipeline Clean-up</h4>
                    <p className="text-sm text-muted-foreground">Mandatory review of all "Pending" cases from April to close them in first week of May.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold mb-2">3</div>
                    <h4 className="font-bold text-foreground">Incentive Sprint</h4>
                    <p className="text-sm text-muted-foreground">Weekly recognition for top 3 managers. "Early Bird" bonus for hitting 50% target by May 15th.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Corrective Actions */}
            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-3 text-orange-600 mb-4 border-b border-border pb-2">
                <TrendingUp className="w-6 h-6" />
                <h2 className="text-2xl font-bold font-display">3. Performance Recovery</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="p-1 bg-red-100 text-red-600 rounded">Low Performers</span>
                    Strategy
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-red-400 mt-0.5" />
                      <p className="text-sm text-muted-foreground"><strong className="text-foreground">PIP Implementation:</strong> Formal Performance Improvement Plan for bottom 6 managers focused on activity metrics.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-red-400 mt-0.5" />
                      <p className="text-sm text-muted-foreground"><strong className="text-foreground">Shadowing:</strong> Mandatory 2-hour shadowing sessions with High Performers twice a week.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-red-400 mt-0.5" />
                      <p className="text-sm text-muted-foreground"><strong className="text-foreground">Closer Supervision:</strong> Daily check-ins at 4 PM to review progress and blockers.</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="p-1 bg-green-100 text-green-600 rounded">Retention</span>
                    Strategy
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckSquare className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground"><strong className="text-foreground">Recognition:</strong> Public acknowledgment of the 11 High Performers in the town hall.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckSquare className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground"><strong className="text-foreground">Mentorship Role:</strong> Offer "Senior Manager" badge/status to top 3 performers who mentor others.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckSquare className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground"><strong className="text-foreground">Career Path:</strong> Discuss career advancement opportunities to maintain engagement.</p>
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
