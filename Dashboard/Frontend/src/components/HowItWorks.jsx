import { motion } from "framer-motion";
import { Settings, UserCheck, Eye, FileText } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Setup Exam",
    description: "Instructor schedules exam and sets monitoring rules.",
    icon: Settings,
  },
  {
    number: 2,
    title: "Student Verification",
    description: "Identity verified using webcam and AI checks.",
    icon: UserCheck,
  },
  {
    number: 3,
    title: "Live Monitoring",
    description: "AI continuously analyzes behavior in real time.",
    icon: Eye,
  },
  {
    number: 4,
    title: "Report Generated",
    description: "Detailed integrity report delivered automatically.",
    icon: FileText,
  },
];

const StepCard = ({ step, index }) => {
  const Icon = step.icon;

  return (
    <motion.div
      className="relative flex flex-col items-center flex-1"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
    >
      {/* 🔵 Connector line */}
      {index < steps.length - 1 && (
        <motion.div
          className="hidden md:block  absolute top-10 left-[67%] w-[calc(100%-25%)] h-[2px] z-0
          
          bg-step-connector
          dark:bg-blue-900/40"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      )}

      {/* 🔷 Icon circle */}
      <motion.div
        className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-5 group
        
        bg-primary/10
        dark:bg-blue-500/15"
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* 🔵 Subtle pulse (reduced glow) */}
        <motion.div
          className="absolute inset-0 rounded-full 
          
          bg-primary/20
          dark:bg-blue-500/20"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.4,
          }}
        />

        <Icon className="w-8 h-8 text-primary dark:text-blue-400" />
      </motion.div>

      {/* 🔵 Step number */}
      <motion.span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold mb-3 shadow-sm
        
        bg-primary text-primary-foreground
        
        dark:bg-blue-500 dark:text-white"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 400,
          delay: index * 0.15 + 0.2,
        }}
      >
        {step.number}
      </motion.span>

      {/* 📝 Text */}
      <h3 className="text-lg font-semibold text-foreground dark:text-blue-100 mb-2">
        {step.title}
      </h3>

      <p className="text-sm text-muted-foreground dark:text-blue-300/80 max-w-[200px] leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 
      
    ">
      
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          className="text-sm font-semibold tracking-widest uppercase mb-3
          
          text-primary
          dark:text-blue-400"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          How It Works
        </motion.p>

        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4
          
          text-foreground
          dark:text-blue-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Simple. Secure. Smart.
        </motion.h2>

        <motion.p
          className="max-w-lg mx-auto mb-16
          
          text-muted-foreground
          dark:text-blue-300/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Four seamless steps to ensure exam integrity from start to finish.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;