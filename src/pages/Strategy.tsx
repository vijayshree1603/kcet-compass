import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { colleges, calculateProbability, getCategory, formatCurrency } from "@/lib/mockData";
import { FileBarChart, Download, Shield, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Strategy = () => {
  const rank = 2000; // Would come from profile
  const results = colleges.map((c) => {
    const lastCutoff = c.cutoffs[c.cutoffs.length - 1].rank;
    const prob = calculateProbability(rank, lastCutoff);
    return { ...c, probability: prob, category: getCategory(prob) };
  });

  const safe = results.filter((r) => r.category === "safe").sort((a, b) => b.probability - a.probability);
  const target = results.filter((r) => r.category === "target").sort((a, b) => b.probability - a.probability);
  const dream = results.filter((r) => r.category === "dream").sort((a, b) => b.probability - a.probability);

  const sections = [
    { title: "Safe Choices", icon: Shield, items: safe, color: "text-teal-600", bg: "bg-teal-50", desc: "High probability of admission. These should be your backup options." },
    { title: "Target Choices", icon: Target, items: target, color: "text-amber-600", bg: "bg-amber-50", desc: "Good chances — focus your counseling efforts here." },
    { title: "Dream Choices", icon: Sparkles, items: dream, color: "text-rose-500", bg: "bg-rose-50", desc: "Worth trying! These colleges may have competitive cutoffs." },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileBarChart className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Strategy Report</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Your personalized KCET counseling strategy for Rank <span className="font-mono-data font-semibold text-foreground">{rank.toLocaleString()}</span>
            </p>
          </div>
          <Button variant="outline" className="rounded-lg shadow-surface border-0 bg-card hover:shadow-overlay">
            <Download className="h-4 w-4 mr-1" /> Download
          </Button>
        </motion.div>

        {/* Recommended Order */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-surface p-6"
        >
          <h3 className="font-semibold text-foreground mb-2">Recommended Choice Filling Order</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Fill choices in this order for the best outcome. Start with dream, then target, then safe.
          </p>
          <div className="flex flex-wrap gap-2">
            {[...dream, ...target, ...safe].map((c, i) => (
              <span key={c.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-xs font-medium text-foreground">
                <span className="font-mono-data text-muted-foreground">{i + 1}.</span>
                {c.shortName} ({c.branch.slice(0, 3)})
              </span>
            ))}
          </div>
        </motion.div>

        {/* Category Sections */}
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + si * 0.08 }}
            className="bg-card rounded-2xl shadow-surface p-6"
          >
            <div className="flex items-center gap-2 mb-1">
              <section.icon className={`h-4 w-4 ${section.color}`} />
              <h3 className={`font-semibold ${section.color}`}>{section.title}</h3>
              <span className={`ml-auto px-2 py-0.5 rounded-full ${section.bg} text-xs font-semibold ${section.color}`}>
                {section.items.length}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">{section.desc}</p>
            <div className="space-y-2">
              {section.items.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.branch} · {c.region}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold font-mono-data ${section.color}`}>{c.probability}%</p>
                    <p className="text-[10px] text-muted-foreground">{formatCurrency(c.fees)}/yr</p>
                  </div>
                </div>
              ))}
              {section.items.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No colleges in this category for your rank.</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Strategy;
