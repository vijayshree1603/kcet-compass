import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CollegeCard } from "@/components/CollegeCard";
import { colleges, REGIONS, CATEGORIES, BRANCHES, BUDGET_RANGES, calculateProbability, getCategory } from "@/lib/mockData";
import { ArrowRight, ArrowLeft, Loader2, Filter, Sparkles } from "lucide-react";

type Step = 1 | 2 | 3;

const Predictor = () => {
  const [step, setStep] = useState<Step>(1);
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("");
  const [branches, setBranches] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [region, setRegion] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const handlePredict = () => {
    setStep(2);
    setTimeout(() => setStep(3), 2500);
  };

  const getResults = () => {
    const rankNum = parseInt(rank) || 5000;
    return colleges
      .map((c) => {
        const lastCutoff = c.cutoffs[c.cutoffs.length - 1].rank;
        const prob = calculateProbability(rankNum, lastCutoff);
        const cat = getCategory(prob);
        return { ...c, probability: prob, category: cat };
      })
      .filter((c) => {
        if (filterRegion !== "all" && c.region !== filterRegion) return false;
        if (filterCategory !== "all" && c.category !== filterCategory) return false;
        return true;
      })
      .sort((a, b) => b.probability - a.probability);
  };

  const results = getResults();
  const safeCount = results.filter((r) => r.category === "safe").length;
  const targetCount = results.filter((r) => r.category === "target").length;
  const dreamCount = results.filter((r) => r.category === "dream").length;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300 ${
                    step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                <span className={`text-xs hidden sm:block ${step >= s ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {s === 1 ? "Your Details" : s === 2 ? "Analyzing" : "Results"}
                </span>
              </div>
            ))}
          </div>
          <div className="h-0.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Input Form */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl shadow-surface p-6 md:p-8 space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold text-foreground">Tell us about yourself</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Don't worry, you can update your details anytime in your profile.
                </p>
              </div>

              <div className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      KCET Rank
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter your rank"
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                      className="h-11 rounded-xl bg-secondary border-0 focus-visible:ring-2 focus-visible:ring-primary/20 font-mono-data"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Category
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="h-11 rounded-xl bg-secondary border-0 focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Preferred Branches
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {BRANCHES.map((b) => (
                      <button
                        key={b}
                        onClick={() =>
                          setBranches((prev) =>
                            prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
                          )
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          branches.includes(b)
                            ? "bg-primary text-primary-foreground shadow-surface"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Budget Range
                    </Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="h-11 rounded-xl bg-secondary border-0 focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUDGET_RANGES.map((b) => (
                          <SelectItem key={b.label} value={b.label}>{b.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Preferred Region
                    </Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="h-11 rounded-xl bg-secondary border-0 focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anywhere">Anywhere</SelectItem>
                        {REGIONS.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePredict}
                disabled={!rank}
                className="w-full sm:w-auto rounded-full h-12 px-8 bg-primary text-primary-foreground font-semibold shadow-surface hover:shadow-overlay hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                Predict My Colleges
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Loading */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl shadow-surface p-12 flex flex-col items-center justify-center text-center min-h-[300px]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-10 w-10 text-primary mb-6" />
              </motion.div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Analyzing your options...
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                Analyzing historical KCET cutoff trends to find the best colleges for you.
              </p>
              <div className="mt-6 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Summary */}
              <div className="bg-card rounded-2xl shadow-surface p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h2 className="font-bold text-foreground">Your Results</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Great news! You have strong matches across {results.length} colleges.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 text-xs font-semibold">
                      {safeCount} Safe
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold">
                      {targetCount} Target
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-500 text-xs font-semibold">
                      {dreamCount} Dream
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Filter className="h-3.5 w-3.5" /> Filter:
                </div>
                <Select value={filterRegion} onValueChange={setFilterRegion}>
                  <SelectTrigger className="h-8 w-36 rounded-lg bg-card shadow-surface border-0 text-xs">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {REGIONS.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="h-8 w-32 rounded-lg bg-card shadow-surface border-0 text-xs">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="safe">Safe</SelectItem>
                    <SelectItem value="target">Target</SelectItem>
                    <SelectItem value="dream">Dream</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep(1)}
                  className="text-xs text-muted-foreground ml-auto"
                >
                  <ArrowLeft className="h-3 w-3 mr-1" /> Modify Search
                </Button>
              </div>

              {/* College Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((college, i) => (
                  <CollegeCard key={college.id} college={college} rank={parseInt(rank) || 5000} index={i} />
                ))}
              </div>

              {results.length === 0 && (
                <div className="bg-card rounded-2xl shadow-surface p-12 text-center">
                  <p className="text-muted-foreground">
                    We couldn't find an exact match for this rank, but try adjusting your filters.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default Predictor;
