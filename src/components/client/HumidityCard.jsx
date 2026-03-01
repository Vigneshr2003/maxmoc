import { motion } from "framer-motion";
import { FiDroplet } from "react-icons/fi";

export default function HumidityCard({ value }) {
  // Humidity is usually 0-100%
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{ "--glow-color": "var(--glow-blue)" }}
      className="h-full w-full relative overflow-hidden rounded-xl p-5 bg-white/2 border border-white/6 hover:border-white/10 transition-colors duration-300"
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between w-full mb-6">
          <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2">
            <FiDroplet className="w-5 h-5 text-blue-400" />
            Humidity
          </h3>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-sm">
            <FiDroplet className="w-4 h-4 text-blue-400" />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-end">
          <div className="flex items-end gap-2 mb-4">
            <motion.span
              key={value}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-black text-white tracking-tighter"
            >
              {Math.round(value)}
            </motion.span>
            <span className="text-2xl font-bold text-slate-500 mb-1">%</span>
          </div>

          {/* Minimalist progress bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ boxShadow: "0 0 8px var(--glow-blue)" }}
            />
          </div>

          <div className="mt-3 flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-widest">
            <span>Dry</span>
            <span>Humid</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
