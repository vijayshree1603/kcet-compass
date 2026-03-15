import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { BookmarkCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const saved = [
  { id: 1, rank: 1500, date: "Mar 12, 2025", results: 8, safe: 3, target: 3, dream: 2 },
  { id: 2, rank: 3200, date: "Mar 10, 2025", results: 10, safe: 5, target: 3, dream: 2 },
  { id: 3, rank: 800, date: "Mar 8, 2025", results: 6, safe: 1, target: 2, dream: 3 },
];

const SavedPredictions = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <BookmarkCheck className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Saved Predictions</h1>
          </div>
          <p className="text-sm text-muted-foreground">Your previously saved prediction results.</p>
        </motion.div>

        <div className="space-y-3">
          {saved.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => navigate("/predictor")}
              className="w-full bg-card rounded-2xl shadow-surface hover:shadow-overlay p-5 text-left transition-all duration-300 flex items-center justify-between group"
            >
              <div>
                <p className="font-semibold text-foreground text-sm">
                  Rank <span className="font-mono-data">{s.rank.toLocaleString()}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.date} · {s.results} colleges matched</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-semibold">{s.safe} Safe</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold">{s.target} Target</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-500 text-[10px] font-semibold">{s.dream} Dream</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavedPredictions;
