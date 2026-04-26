import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FiClipboard, FiPlusCircle } from "react-icons/fi";
import { ClipboardList, PlusCircle, TrendingUp, Users, Activity, ArrowRight, ShieldAlert } from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";


const Dashboard = () => {
  const [activeTestCount, setActiveTestCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const adminName = localStorage.getItem("adminName");
  const adminId = localStorage.getItem("adminId");

  const statsData = [
  {
    label: "Active Tests",
    value: activeTestCount,
    change: "",
    icon: Activity,
    trend: "up" ,
  },
  {
    label: "Total Users",
    value: totalUsers,
    change: "",
    icon: Users,
    trend: "up" ,
  },
  {
    label: "Completion Rate",
    value: "92%",
    change: "",  
    icon: TrendingUp,
    trend: "up" ,
  },
];

const actionCards = [
  {
    title: "Active Tests",
    description: "View and manage all ongoing assessments in real time.",
    icon: ClipboardList,
    to: "/active",
    gradient: "from-primary to-accent",
  },
  {
    title: "Create New Test",
    description: "Design a new assessment and assign it to candidates.",
    icon: PlusCircle,
    to: "/create",
    gradient: "from-accent to-primary",
  },
  {
    title: "Suspicious Logs",
    description: "Review suspicious activity detected during candidate assessments.",
    icon: ShieldAlert,
    to: "/logs",
    gradient: "from-red-500 to-orange-500",
  }
];


const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};


  const getActiveTestCount = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tests/active/${adminId}`);
      setActiveTestCount(response.data.length);
    } catch (error) {
      console.error("Error fetching active test count:", error);
      setActiveTestCount(0);
    }
  };

  useEffect(() => {
    getActiveTestCount();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://omniproctor-is85.vercel.app/api/users/count");
      setTotalUsers(response.data.count);
      console.log("Total users fetched:", response.data.count);
    } catch (error) {
      console.error("Error fetching total users:", error);
      setTotalUsers(0);
    }
  };
  fetchData();
}, []);

  return (
     <div className="min-h-screen bg-background dark:bg-background">
      <DashboardNavbar />

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-muted-foreground text-sm font-medium mb-1">Dashboard Overview</p>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {adminName}
            </span>
          </h1>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10"
        >
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-stat-bg flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary bg-stat-bg px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</h3>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Cards */}
         <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-5">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {actionCards.map((card, idx) => (
              <Link
                key={idx}
                to={card.to}
                className="group relative bg-card border border-border rounded-xl p-7 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex items-start gap-5"
              >
                <div className={`shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                  <card.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
                    {card.title}
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
