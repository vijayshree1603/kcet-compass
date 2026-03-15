import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Chrome, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import studentsIllustration from "@/assets/students-illustration.png";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-auth flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-overlay p-8 space-y-6">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              <span className="text-xs font-medium text-primary">KCET 2025 Ready</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              KCET Admission Intelligence
            </h1>
            <p className="text-sm text-muted-foreground">
              Make smarter counseling decisions with data-driven insights.
            </p>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex justify-center"
          >
            <img
              src={studentsIllustration}
              alt="Students analyzing college data together"
              className="w-56 h-auto"
            />
          </motion.div>

          {/* Login Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleLogin}
              className="w-full h-12 rounded-xl bg-card text-foreground shadow-surface hover:shadow-overlay hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 border-0 font-medium"
              variant="outline"
            >
              <Chrome className="mr-3 h-5 w-5 text-primary" />
              Continue with Google
            </Button>

            <Button
              onClick={handleLogin}
              className="w-full h-12 rounded-xl bg-card text-foreground shadow-surface hover:shadow-overlay hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 border-0 font-medium"
              variant="outline"
            >
              <AtSign className="mr-3 h-5 w-5 text-purple-500" />
              Continue with Yahoo
            </Button>

            {!showEmail ? (
              <Button
                onClick={() => setShowEmail(true)}
                className="w-full h-12 rounded-xl bg-card text-foreground shadow-surface hover:shadow-overlay hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 border-0 font-medium"
                variant="outline"
              >
                <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                Continue with Email
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl bg-secondary border-0 focus-visible:ring-2 focus-visible:ring-primary/20"
                />
                <Button
                  onClick={handleLogin}
                  className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold shadow-surface hover:shadow-overlay hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                >
                  Start My KCET Prediction
                </Button>
              </motion.div>
            )}
          </div>

          {!showEmail && (
            <div className="pt-2">
              <Button
                onClick={handleLogin}
                className="w-full h-12 rounded-full bg-primary text-primary-foreground font-semibold shadow-surface hover:shadow-overlay hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                Start My KCET Prediction
              </Button>
            </div>
          )}

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
