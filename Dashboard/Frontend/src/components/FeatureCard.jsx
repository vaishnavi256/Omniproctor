import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function FeatureCard({ title, desc, icon: Icon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative rounded-2xl border p-7 overflow-hidden",
        "bg-card border-border shadow-sm",
        "hover:shadow-md transition-all duration-300"
      )}
    >
      {/* 🌫 Subtle Hover Overlay */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100",
          "bg-primary/5 transition-opacity duration-300 pointer-events-none"
        )}
      />

      {/* 🔷 Icon */}
      <div
        className={cn(
          "relative mb-5 inline-flex items-center justify-center",
          "w-12 h-12 rounded-xl transition-all duration-300",

          // Base
          "bg-primary/10 text-primary",

          // Hover
          "group-hover:bg-primary group-hover:text-primary-foreground"
        )}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* 📝 Title */}
      <h3 className="relative text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>

      {/* 📄 Description */}
      <p className="relative text-sm leading-relaxed text-muted-foreground">
        {desc}
      </p>

      {/* ➖ Bottom Accent Line */}
      <div
        className={cn(
          "absolute bottom-0 left-7 right-7 h-0.5 rounded-full",
          "bg-primary",
          "scale-x-0 group-hover:scale-x-100",
          "transition-transform duration-300 origin-left"
        )}
      />
    </motion.div>
  );
}