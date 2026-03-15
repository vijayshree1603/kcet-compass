import { motion } from "framer-motion";
import { MapPin, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { College, calculateProbability, getCategory, getTrendDirection, formatCurrency } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

interface CollegeCardProps {
  college: College;
  rank: number;
  index: number;
}

const categoryConfig = {
  safe: { label: "Safe", bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-100" },
  target: { label: "Target", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100" },
  dream: { label: "Dream", bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

export function CollegeCard({ college, rank, index }: CollegeCardProps) {
  const navigate = useNavigate();
  const lastCutoff = college.cutoffs[college.cutoffs.length - 1].rank;
  const probability = calculateProbability(rank, lastCutoff);
  const category = getCategory(probability);
  const trend = getTrendDirection(college.cutoffs);
  const config = categoryConfig[category];
  const TrendIcon = trendIcons[trend.direction];

  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (circumference * probability) / 100;

  const probColor = category === "safe" ? "text-teal-600" : category === "target" ? "text-amber-600" : "text-rose-500";
  const strokeColor = category === "safe" ? "#0d9488" : category === "target" ? "#d97706" : "#e11d48";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      onClick={() => navigate(`/college/${college.id}`)}
      className="bg-card rounded-2xl shadow-surface hover:shadow-overlay hover:bg-card transition-all duration-300 cursor-pointer p-5 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full ${config.bg} ${config.text}`}>
              {config.label}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-secondary text-muted-foreground">
              <MapPin className="inline h-3 w-3 mr-0.5" />
              {college.region}
            </span>
          </div>
          <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
            {college.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{college.branch}</p>
        </div>

        {/* Probability Circle */}
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="transparent" stroke="hsl(var(--muted))" strokeWidth="3" />
            <motion.circle
              cx="22" cy="22" r="20"
              fill="transparent"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.08 + 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xs font-bold font-mono-data ${probColor}`}>{probability}%</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div>
          <span className="block text-[10px] uppercase tracking-wider">Cutoff '23</span>
          <span className="font-mono-data font-semibold text-foreground">{lastCutoff.toLocaleString()}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-wider">Avg Package</span>
          <span className="font-mono-data font-semibold text-foreground">{formatCurrency(college.placementAvg)}</span>
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-wider">ROI</span>
          <span className="font-mono-data font-semibold text-teal-600">{college.roiScore}</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <TrendIcon className={`h-3 w-3 ${trend.direction === "up" ? "text-rose-500" : trend.direction === "down" ? "text-teal-600" : "text-muted-foreground"}`} />
          <span className="text-[10px]">{trend.label}</span>
        </div>
      </div>

      {/* Hover hint */}
      <div className="mt-3 flex items-center gap-1 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        View details <ArrowRight className="h-3 w-3" />
      </div>
    </motion.div>
  );
}
