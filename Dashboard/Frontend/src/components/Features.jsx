import { motion } from "framer-motion";
import { ScanFace, Eye, AudioLines, Users, MonitorX, FileBarChart } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Face Detection",
    desc: "Continuously verifies candidate identity using advanced AI facial recognition.",
    icon: ScanFace,
  },
  {
    title: "Eye & Head Tracking",
    desc: "Detects suspicious movements like looking away or leaving the screen.",
    icon: Eye,
  },
  {
    title: "Noise Detection",
    desc: "Identifies background conversations or unusual sounds during exams.",
    icon: AudioLines,
  },
  {
    title: "Multiple Person Detection",
    desc: "Alerts if more than one person appears in the camera frame.",
    icon: Users,
  },
  {
    title: "Tab Switch Monitoring",
    desc: "Detects tab switching and attempts to leave the exam window.",
    icon: MonitorX,
  },
  {
    title: "Automated Reports",
    desc: "Generates detailed post-exam reports with flagged events.",
    icon: FileBarChart,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-2 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        
      <div className="max-w-5xl mx-auto text-center pt-20">
        <motion.p
          className="text-sm font-semibold tracking-widest uppercase mb-3
          
          text-primary
          dark:text-blue-400"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Features
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
         Powerful Proctoring Features
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
          Enterprise-grade monitoring to ensure exam integrity at every step.


        </motion.p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <FeatureCard key={f.title} {...f} index={i} />
        ))}
      </div>
    </section>
  );
}
