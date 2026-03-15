import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { colleges, formatCurrency, getTrendDirection } from "@/lib/mockData";
import { ArrowLeft, MapPin, TrendingUp, TrendingDown, Minus, Star, BookmarkPlus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CollegeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const college = colleges.find((c) => c.id === id);

  if (!college) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">College not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  const trend = getTrendDirection(college.cutoffs);
  const TrendIcon = trend.direction === "up" ? TrendingUp : trend.direction === "down" ? TrendingDown : Minus;
  const maxRank = Math.max(...college.cutoffs.map((c) => c.rank));

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back */}
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl shadow-surface p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{college.region}</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{college.name}</h1>
              <p className="text-muted-foreground mt-1">{college.branch}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {college.highlights.map((h) => (
                  <span key={h} className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground">
                    {h}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg shadow-surface border-0 bg-card hover:shadow-overlay">
                <BookmarkPlus className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg shadow-surface border-0 bg-card hover:shadow-overlay">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Fees/Year", value: formatCurrency(college.fees), icon: "💰" },
            { label: "Avg Package", value: formatCurrency(college.placementAvg), icon: "📊" },
            { label: "Highest Package", value: formatCurrency(college.placementHighest), icon: "🚀" },
            { label: "ROI Score", value: `${college.roiScore}/100`, icon: "⭐" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="bg-card rounded-2xl shadow-surface p-4"
            >
              <span className="text-lg">{stat.icon}</span>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2">{stat.label}</p>
              <p className="font-bold font-mono-data text-foreground mt-0.5">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Cutoff Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl shadow-surface p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">5-Year Cutoff Trend</h3>
              <div className="flex items-center gap-1 mt-1">
                <TrendIcon className={`h-3.5 w-3.5 ${trend.direction === "up" ? "text-rose-500" : trend.direction === "down" ? "text-teal-600" : "text-muted-foreground"}`} />
                <span className="text-xs text-muted-foreground">{trend.label}</span>
              </div>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end gap-3 h-40">
            {college.cutoffs.map((cutoff, i) => {
              const height = (cutoff.rank / maxRank) * 100;
              return (
                <div key={cutoff.year} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-mono-data text-muted-foreground">{cutoff.rank.toLocaleString()}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="w-full rounded-t-lg bg-primary/20 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-primary/10" />
                  </motion.div>
                  <span className="text-[10px] font-mono-data text-muted-foreground">{cutoff.year}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-muted-foreground mt-3 text-center">
            Lower rank numbers = more competitive (harder to get in)
          </p>
        </motion.div>

        {/* Similar Colleges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl shadow-surface p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Similar Colleges</h3>
          <div className="grid gap-3">
            {colleges
              .filter((c) => c.id !== college.id && (c.region === college.region || c.branch === college.branch))
              .slice(0, 3)
              .map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/college/${c.id}`)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors text-left"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.branch} · {c.region}</p>
                  </div>
                  <span className="text-xs font-mono-data text-muted-foreground">
                    Cutoff: {c.cutoffs[c.cutoffs.length - 1].rank.toLocaleString()}
                  </span>
                </button>
              ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CollegeDetail;
