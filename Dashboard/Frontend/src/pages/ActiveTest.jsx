import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import DashboardNavbar from "@/components/DashboardNavbar";
import TestCard from "../components/TestCard";
import { ClipboardList, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ActiveTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    if (!adminId) {
      setError("Admin not logged in");
      setLoading(false);
      return;
    }

    const fetchTests = async () => {
      try {
        const response = await axios.get(
          `https://omniproctor-is85.vercel.app/api/tests/active/${adminId}`
        );
        setTests(response.data || []);
      } catch (err) {
        console.error("Error fetching tests:", err);
        setError("Failed to fetch tests.");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [adminId]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-sm tracking-wide uppercase text-primary font-semibold mb-2">
              Manage Assessments
            </p>

            <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              Active Tests
            </h1>

            <p className="text-muted-foreground mt-3 text-sm">
              View and manage all currently active assessments.
            </p>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <PlusCircle className="h-4 w-4" />
            Create Test
          </Link>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-52 gap-4">
            <div className="h-12 w-12 rounded-full border-2 border-border border-t-primary animate-spin"></div>
            <p className="text-muted-foreground text-sm">
              Loading active tests...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && tests.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {tests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                  <TestCard name={test.name} id={test.id} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && tests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-24 max-w-md mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="p-5 rounded-2xl bg-muted/40 border border-border">
                <ClipboardList className="h-10 w-10 text-muted-foreground" />
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-foreground mb-3">
              No Active Tests
            </h3>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              You haven’t created any active assessments yet. Start by creating
              your first test.
            </p>

            <Link
              to="/create"
            >
              <PlusCircle className="h-4 w-4" />
              Create Test
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ActiveTests;