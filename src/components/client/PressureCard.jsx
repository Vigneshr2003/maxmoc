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
      className="h-full w-full rounded-xl p-5 flex flex-col justify-between relative bg-white/2 border border-white/6 hover:border-white/10 transition-colors duration-300"
    >
      <div className="flex items-center justify-between w-full mb-2 z-10">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2">
          <FiCloudLightning className={`w-5 h-5 ${colorClass}`} />
          Pressure
        </h3>
      </div>

      <div className="flex-1 flex flex-row items-center justify-between z-10 gap-2">
        <div className="flex flex-col justify-center">
          <div className="flex items-end gap-1">
            <motion.span
              key={value}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-black text-white tracking-tight"
            >
              {Math.round(value)}
            </motion.span>
            <span className="text-sm font-semibold text-slate-500 mb-1">
              hPa
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-2">
            {value > 1020 ? "High Pressure" : "Stable Pressure"}
          </p>
        </div>

        <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 128 128"
          >
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
        </div>
      </div>
    </motion.div>
  );
}
