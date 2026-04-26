import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Shield, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://omniproctor-is85.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.message === "success") {
        setIsSuccess(true);
        setMessage("Login successful!");

        localStorage.setItem("token", data.token);
        localStorage.setItem("adminId", data.admin.id);
        localStorage.setItem("adminName", data.admin.name);

        setTimeout(() => {
          navigate("/dashboard");
        }, 800);
      } else {
        setIsSuccess(false);
        setMessage(data.error || "Invalid credentials");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-black overflow-hidden">
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex w-1/2 flex-col justify-center items-center p-16"
        style={{
          background:
            "linear-gradient(135deg, hsl(0 0% 0%), hsl(0 0% 25%), hsl(0 0% 50%))",
        }}
      >
        <div className="mb-8">
          <div className="w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white text-center">
          Omniproctor
        </h1>

        <p className="text-white/70 text-center max-w-sm mt-4">
          Secure online proctoring ensuring fairness in every examination.
        </p>

        <div className="flex flex-wrap gap-3 mt-10 justify-center">
          {[
            "Background Monitoring",
            "Identity Verification",
            "Real-time Reports",
          ].map((feature) => (
            <span
              key={feature}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
            >
              {feature}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white text-black p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5">
              <Lock className="w-7 h-7 text-black" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Welcome back
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to your admin account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label className="text-gray-700">Email</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@omniproctor.com"
                  className="pl-10 h-12 bg-white text-black border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="text-gray-700">Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 bg-white text-black border-gray-300"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold bg-black text-white hover:bg-gray-800"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Status */}
            <AnimatePresence>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-center text-sm font-medium ${
                    isSuccess
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* Signup */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-black font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;