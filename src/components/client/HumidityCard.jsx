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
      className="col-span-1 md:col-span-2 lg:col-span-1 relative overflow-hidden rounded-2xl p-6 glass-card accent-top-blue group hover:-translate-y-1 hover:shadow-[0_0_25px_0_var(--glow-color)] transition-all duration-300"
    >
      {/* Decorative glassmorphism elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-colors duration-500" />

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
