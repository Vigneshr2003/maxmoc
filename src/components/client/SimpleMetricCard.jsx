import { motion } from "framer-motion";

// A simple generic metric card for metrics that don't have a dedicated component.
// Used for: CO2 Level, NO2 Level, Coolant Temperature
export default function SimpleMetricCard({ label, value, unit }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
      style={{ "--glow-color": "var(--glow-cyan)" }}
      className="glass-card accent-top-cyan rounded-2xl p-6 flex flex-col justify-between hover:shadow-[0_0_20px_0_var(--glow-color)] transition-all duration-300"
    >
      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
        {label}
      </p>
      <div className="flex items-end gap-1">
        <span className="text-4xl font-black text-white">
          {value !== undefined ? Number(value).toFixed(1) : "—"}
        </span>
        {unit && (
          <span className="text-lg font-semibold text-slate-500 mb-1">
            {unit}
          </span>
        )}
      </div>
      <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-700"
          style={{
            width: `${Math.min((value / 200) * 100, 100)}%`,
            boxShadow: "0 0 6px var(--glow-cyan)",
          }}
        />
      </div>
    </motion.div>
  );
}
