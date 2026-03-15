import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, BRANCHES, REGIONS, BUDGET_RANGES } from "@/lib/mockData";
import { UserCircle, Save } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [rank, setRank] = useState("2000");
  const [category, setCategory] = useState("General");
  const [region, setRegion] = useState("Bengaluru");
  const [budget, setBudget] = useState(BUDGET_RANGES[1].label);
  const [branches, setBranches] = useState<string[]>(["Computer Science & Engineering"]);

  const handleSave = () => {
    toast.success("Profile saved! Your predictions will use these settings.");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <UserCircle className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Profile Settings</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Your predictions will automatically use these saved preferences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-surface p-6 md:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">KCET Rank</Label>
              <Input
                type="number"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="h-11 rounded-xl bg-secondary border-0 focus-visible:ring-2 focus-visible:ring-primary/20 font-mono-data"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-11 rounded-xl bg-secondary border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferred Branches</Label>
            <div className="flex flex-wrap gap-2">
              {BRANCHES.map((b) => (
                <button
                  key={b}
                  onClick={() => setBranches((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b])}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    branches.includes(b) ? "bg-primary text-primary-foreground shadow-surface" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Budget Range</Label>
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="h-11 rounded-xl bg-secondary border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_RANGES.map((b) => (<SelectItem key={b.label} value={b.label}>{b.label}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferred Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="h-11 rounded-xl bg-secondary border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((r) => (<SelectItem key={r} value={r}>{r}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="rounded-full h-11 px-6 bg-primary text-primary-foreground font-medium shadow-surface hover:shadow-overlay hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
          >
            <Save className="h-4 w-4 mr-2" /> Save Profile
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
