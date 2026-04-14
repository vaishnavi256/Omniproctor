import { motion } from "framer-motion";
import {
  ScanFace,
  Eye,
  AudioLines,
  Users,
  MonitorX,
  FileBarChart,
} from "lucide-react";
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
    <section id="features" className="py-24 px-4 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        
        {/* Label */}
        <motion.p
          className="text-sm font-semibold tracking-widest uppercase mb-3 text-primary"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Features
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Powerful Proctoring Features
        </motion.h2>

        {/* Description */}
        <motion.p
          className="max-w-xl mx-auto text-muted-foreground text-base md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Enterprise-grade monitoring to ensure exam integrity at every step.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <FeatureCard key={f.title} {...f} index={i} />
        ))}
      </div>
    </section>
  );
}