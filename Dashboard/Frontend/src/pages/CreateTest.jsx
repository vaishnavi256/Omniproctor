import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DashboardNavbar from "@/components/DashboardNavbar";
import { PlusCircle } from "lucide-react";

const CreateTest = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://omniproctor-is85.vercel.app/api/tests/addTest",
        {
          url: link,
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Test created successfully!");
      setName("");
      setLink("");
    } catch (error) {
      console.error("Failed:", error);
      alert("Failed to create test");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="max-w-3xl mx-auto px-6 py-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <PlusCircle className="h-7 w-7 text-primary" />
            Create New Test
          </h1>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border rounded-xl p-8 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Test Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Test Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter test name"
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                required
              />
            </div>

            {/* Test Link */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Test Link
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter test link"
                className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-accent-foreground from-primary to-accent text-primary-foreground py-2.5 rounded-lg font-medium hover:opacity-90 transition-all duration-300"
            >
              Create Test
            </button>

          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default CreateTest;