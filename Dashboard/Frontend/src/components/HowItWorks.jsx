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
      className="relative flex flex-col items-center flex-1 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Connector */}
      {index < steps.length - 1 && (
        <motion.div
          className="hidden md:block absolute top-10 left-4/6 w-45 h-[2px] 
          bg-border"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      )}  

      {/* Icon */}
      <motion.div
        className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-5
        bg-primary/10"
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Pulse */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.4,
          }}
        />

        <Icon className="w-8 h-8 text-primary" />
      </motion.div>

      {/* Step Number */}
      <motion.span
        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold mb-3
        bg-primary text-primary-foreground"
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

      {/* Text */}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {step.title}
      </h3>

      <p className="text-sm text-muted-foreground max-w-[220px] leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Label */}
        <motion.p
          className="text-sm font-semibold tracking-widest uppercase mb-3 text-primary"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Simple. Secure. Smart.
        </motion.h2>

        {/* Description */}
        <motion.p
          className="max-w-xl mx-auto mb-16 text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Four seamless steps to ensure exam integrity from start to finish.
        </motion.p>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;