import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Search, BookmarkCheck, TrendingUp, Bell, ArrowRight, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const widgets = [
    {
      title: "Start Prediction",
      desc: "Find the best colleges for your KCET rank",
      icon: Search,
      color: "bg-primary/10 text-primary",
      action: () => navigate("/predictor"),
    },
    {
      title: "Saved Predictions",
      desc: "3 predictions saved",
      icon: BookmarkCheck,
      color: "bg-teal-50 text-teal-700",
      action: () => navigate("/saved"),
    },
    {
      title: "Trend Insights",
      desc: "View 5-year cutoff trends",
      icon: TrendingUp,
      color: "bg-amber-50 text-amber-700",
      action: () => navigate("/predictor"),
    },
    {
      title: "KCET Updates",
      desc: "2 new notifications",
      icon: Bell,
      color: "bg-rose-50 text-rose-500",
      action: () => {},
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Welcome back 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Your future, mapped by data. Let's find the right college for you.
          </p>
        </motion.div>

        {/* Quick Action */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-card rounded-2xl shadow-surface p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-foreground">Ready to predict?</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Enter your KCET rank and preferences to discover your best college matches.
              </p>
            </div>
            <Button
              onClick={() => navigate("/predictor")}
              className="rounded-full h-11 px-6 bg-primary text-primary-foreground font-medium shadow-surface hover:shadow-overlay hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              Start Prediction
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {widgets.map((w, i) => (
            <motion.button
              key={w.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
              onClick={w.action}
              className="bg-card rounded-2xl shadow-surface hover:shadow-overlay p-5 text-left transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] group"
            >
              <div className={`w-10 h-10 rounded-xl ${w.color} flex items-center justify-center mb-3`}>
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{w.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{w.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* Data Status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-card rounded-2xl shadow-surface p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Database className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-foreground">Data Status</h3>
              <p className="text-xs text-muted-foreground">
                10 colleges · 50 cutoff records · Last updated: March 2025
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <span className="text-xs font-medium text-teal-700">Up to date</span>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
