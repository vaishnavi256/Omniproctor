import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Mail, User, Shield, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/auth/signup", {
        name,
        email,
        password,
      });

      if (res.data.message === "registered successful") {
        setMessage("Account created successfully!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(res.data.message || "Signup failed.");
      }
    } catch (error) {
      setMessage("Signup failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      
      {/* Left Section */}
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
          Secure, online proctoring ensuring fairness in every examination.
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
      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-black" />
            </div>

            <h2 className="text-3xl font-bold text-black">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2">
              Sign up to your account
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            
            {/* Name */}
            <div>
              <Label className="text-black">Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Vaishnavi Yadav"
                  className="pl-10 h-12 bg-white text-black border border-gray-300 focus:border-black"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label className="text-black">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="pl-10 h-12 bg-white text-black border border-gray-300 focus:border-black"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label className="text-black">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 bg-white text-black border border-gray-300 focus:border-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-black text-white hover:bg-gray-900"
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>

            {/* Message */}
            <AnimatePresence>
              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-center text-sm ${
                    message.includes("success")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;