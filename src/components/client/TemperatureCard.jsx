import { motion } from "framer-motion";
import { FiThermometer } from "react-icons/fi";

export default function TemperatureCard({ value }) {
  const maxTemp = 120;
  const percentage = Math.min(Math.max((value / maxTemp) * 100, 0), 100);

  let tempColor = "from-orange-400 to-orange-500";
  let iconColor = "text-orange-400";
  let glowVar = "var(--glow-amber)";

  if (value > 90) {
    tempColor = "from-rose-500 to-rose-600";
    iconColor = "text-rose-400";
    glowVar = "var(--glow-rose)";
  } else if (value < 50) {
    tempColor = "from-blue-400 to-blue-500";
    iconColor = "text-blue-400";
    glowVar = "var(--glow-blue)";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ "--glow-color": glowVar }}
      className="col-span-1 row-span-2 glass-card accent-top-orange rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:shadow-[0_0_25px_0_var(--glow-color)]"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-linear-to-br from-orange-500/20 to-transparent" />

      <div className="flex items-center justify-between w-full mb-6 z-10">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2">
          <FiThermometer className={`w-5 h-5 ${iconColor}`} />
          Core Temp
        </h3>
      </div>

      <div className="flex-1 flex flex-row items-end justify-between z-10 gap-4">
        {/* Thermometer visual */}
        <div className="h-full w-12 bg-white/5 rounded-full flex flex-col justify-end p-1.5 border border-white/10">
          <motion.div
            className={`w-full rounded-full bg-linear-to-t ${tempColor}`}
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ type: "spring", bounce: 0.2, duration: 1 }}
            style={{ boxShadow: `0 0 12px ${glowVar}` }}
          />
        </div>

        {/* Info Column */}
        <div className="flex flex-col justify-end pb-2">
          <motion.div
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-start"
          >
            <span className="text-5xl font-black text-white tracking-tighter">
              {Math.round(value)}
            </span>
            <span className="text-xl font-bold text-slate-500 mt-1 ml-1">
              °F
            </span>
          </motion.div>
          <div className="mt-4 space-y-2">
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Status
              </span>
              <span className={`text-sm font-bold ${iconColor}`}>
                {value > 90 ? "Critical" : value > 75 ? "Elevated" : "Optimal"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
