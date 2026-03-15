import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Predictor from "./pages/Predictor";
import CollegeDetail from "./pages/CollegeDetail";
import Comparison from "./pages/Comparison";
import Strategy from "./pages/Strategy";
import Profile from "./pages/Profile";
import SavedPredictions from "./pages/SavedPredictions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predictor" element={<Predictor />} />
          <Route path="/college/:id" element={<CollegeDetail />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<SavedPredictions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
