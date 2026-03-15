import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { colleges, formatCurrency, getTrendDirection } from "@/lib/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitCompare, TrendingUp, TrendingDown, Minus } from "lucide-react";

const Comparison = () => {
  const [selected, setSelected] = useState<string[]>(["rvce", "bmsce", "pes"]);

  const updateSelection = (index: number, value: string) => {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const selectedColleges = selected.map((id) => colleges.find((c) => c.id === id)).filter(Boolean);

  const metrics = [
    { label: "Branch", getValue: (c: typeof colleges[0]) => c.branch },
    { label: "Region", getValue: (c: typeof colleges[0]) => c.region },
    { label: "Fees/Year", getValue: (c: typeof colleges[0]) => formatCurrency(c.fees) },
    { label: "Avg Package", getValue: (c: typeof colleges[0]) => formatCurrency(c.placementAvg) },
    { label: "Highest Package", getValue: (c: typeof colleges[0]) => formatCurrency(c.placementHighest) },
    { label: "ROI Score", getValue: (c: typeof colleges[0]) => `${c.roiScore}/100` },
    { label: "Cutoff '23", getValue: (c: typeof colleges[0]) => c.cutoffs[c.cutoffs.length - 1].rank.toLocaleString() },
    { label: "Trend", getValue: (c: typeof colleges[0]) => getTrendDirection(c.cutoffs).label },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <GitCompare className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Compare Colleges</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Compare up to 3 colleges side by side to make an informed decision.
          </p>
        </motion.div>

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <Select key={i} value={selected[i]} onValueChange={(v) => updateSelection(i, v)}>
              <SelectTrigger className="h-11 rounded-xl bg-card shadow-surface border-0 font-medium">
                <SelectValue placeholder={`College ${i + 1}`} />
              </SelectTrigger>
              <SelectContent>
                {colleges.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.shortName} - {c.branch.slice(0, 20)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl shadow-surface overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider w-32">
                    Metric
                  </th>
                  {selectedColleges.map((c) => (
                    <th key={c!.id} className="text-left p-4">
                      <p className="text-sm font-semibold text-foreground">{c!.shortName}</p>
                      <p className="text-[10px] text-muted-foreground font-normal">{c!.name}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric, i) => (
                  <tr key={metric.label} className={i % 2 === 0 ? "bg-secondary/30" : ""}>
                    <td className="p-4 text-xs font-medium text-muted-foreground">{metric.label}</td>
                    {selectedColleges.map((c) => (
                      <td key={c!.id} className="p-4 text-sm font-mono-data text-foreground">
                        {metric.getValue(c!)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Comparison;
