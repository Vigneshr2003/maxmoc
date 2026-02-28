import { motion } from "framer-motion";

export default function StatusSection({ statusTheme, engineStatus }) {
  const StatusIcon = statusTheme.icon;

  // Dynamic glow color for the status card
  const glowStyle = {
    "--glow-color": statusTheme.glowColor || "var(--glow-cyan)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={glowStyle}
      className={`relative overflow-hidden p-4 md:p-5 rounded-2xl glass-card ${statusTheme.bg} transition-colors duration-500 flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-6 w-full group hover:shadow-[0_0_25px_0_var(--glow-color)]`}
    >
      {/* Decorative gradient orb background */}
      <div
        className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 transition-colors duration-700 pointer-events-none ${
          engineStatus === "Critical"
            ? "bg-rose-500"
            : engineStatus === "Warning"
              ? "bg-amber-500"
              : "bg-emerald-500"
        }`}
      />

      {/* Icon container — frosted glass */}
      <div
        className={`relative z-10 shrink-0 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 ${statusTheme.iconColor}`}
      >
        <StatusIcon className="w-5 h-5 md:w-6 md:h-6" />
      </div>

      <div className="relative z-10 flex-1">
        <h2
          className={`text-xl md:text-2xl font-extrabold mb-1 tracking-tight ${statusTheme.text}`}
        >
          Engine Status: {engineStatus}
        </h2>
        <p className="opacity-70 font-medium text-xs md:text-xs max-w-2xl text-slate-400">
          {statusTheme.desc}
        </p>
      </div>

      {engineStatus === "Critical" && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block opacity-10">
          <StatusIcon className="w-32 h-32 text-rose-500 animate-pulse" />
        </div>
      )}
    </motion.div>
  );
}
