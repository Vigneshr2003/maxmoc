import { motion } from "framer-motion";
import { FiCloudLightning } from "react-icons/fi";

export default function PressureCard({ value }) {
  const maxPressure = 1100;
  // min threshold is around 900 for our gauge
  const minPressure = 900;

  // Calculate percentage within the meaningful range (900-1100)
  const range = maxPressure - minPressure;
  const clampedValue = Math.max(minPressure, Math.min(value, maxPressure));
  const percentage = ((clampedValue - minPressure) / range) * 100;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let colorClass = "text-indigo-400";
  let strokeColor = "#818cf8"; // indigo-400
  let glowVar = "var(--glow-indigo)";
  if (value > 1020) {
    colorClass = "text-rose-400";
    strokeColor = "#fb7185"; // rose-400
    glowVar = "var(--glow-rose)";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{ "--glow-color": glowVar }}
      className="col-span-1 glass-card accent-top-indigo rounded-2xl p-6 flex flex-col items-center justify-center relative group hover:shadow-[0_0_25px_0_var(--glow-color)]"
    >
      <div className="flex items-center justify-between w-full mb-4 absolute top-6 left-6 right-6">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2">
          <FiCloudLightning className={`w-5 h-5 ${colorClass}`} />
          Pressure
        </h3>
      </div>

      <div className="relative flex items-center justify-center mt-10">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-white/10"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${strokeColor})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.span
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-black text-white tracking-tight"
          >
            {Math.round(value)}
          </motion.span>
          <span className="text-xs font-semibold text-slate-500">hPa</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm font-medium text-slate-400">
          {value > 1020 ? "High Pressure" : "Stable Pressure"}
        </p>
      </div>
    </motion.div>
  );
}
