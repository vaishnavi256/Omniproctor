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
      whileHover={{ y: -4 }} // reduced lift (more subtle)
      className={cn(
        "group relative rounded-2xl border p-7 overflow-hidden transition-all duration-300",

        // 🌞 Light theme
        "bg-card border-border shadow-sm hover:shadow-md",

        // 🌙 Dark theme (blue toned, subtle)
        "dark:bg-[#0B1120]",
        "dark:border-blue-900/30",
        "dark:hover:border-blue-500/30",
        "dark:shadow-none dark:hover:shadow-md"
      )}
    >
      {/* 🔵 Subtle hover overlay (NO GLOW) */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",

          // Light
          "bg-primary/[0.03]",

          // Dark (very soft blue tint)
          "dark:bg-blue-500/[0.05]"
        )}
      />

      {/* 🔷 Icon */}
      <div
        className={cn(
          "relative mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300",

          // Light
          "bg-primary/10 text-primary",

          // Dark
          "dark:bg-blue-500/15 dark:text-blue-400",

          // Hover (soft, not too bright)
          "group-hover:bg-primary/90 group-hover:text-primary-foreground",
          "dark:group-hover:bg-blue-500/80 dark:group-hover:text-white"
        )}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* 📝 Content */}
      <h3 className="relative text-lg font-semibold text-card-foreground dark:text-blue-100 mb-2">
        {title}
      </h3>

      <p className="relative text-sm leading-relaxed text-muted-foreground dark:text-blue-300/80">
        {desc}
      </p>

      {/* ➖ Bottom accent line (subtle) */}
      <div
        className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full 
        bg-primary 
        dark:bg-blue-500/70
        scale-x-0 group-hover:scale-x-100 
        transition-transform duration-300 origin-left"
      />
    </motion.div>
  );
}