import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { FiWind } from "react-icons/fi";

export default function SpeedCard({ value }) {
  // Define maximum expected speed
  const maxSpeed = 250;

  // Set colors based on speed threshold
  let fillColor = "#06b6d4"; // cyan-500
  let glowVar = "var(--glow-cyan)";
  if (value > 200) {
    fillColor = "#f43f5e"; // rose-500
    glowVar = "var(--glow-rose)";
  } else if (value > 150) {
    fillColor = "#f59e0b"; // amber-500
    glowVar = "var(--glow-amber)";
  }

  // Chart data wrapper
  const data = [
    {
      name: "Speed",
      value: value,
      fill: fillColor,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ "--glow-color": glowVar }}
      className="col-span-1 md:col-span-2 row-span-2 glass-card accent-top-cyan rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group hover:shadow-[0_0_30px_0_var(--glow-color)]"
    >
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-700" />

      <div className="flex items-center justify-between w-full mb-2 z-10">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2">
          <FiWind className="w-5 h-5 text-cyan-400" />
          Engine Speed
        </h3>
        <div className="px-3 py-1 bg-white/5 text-cyan-400 rounded-full text-xs font-semibold border border-cyan-500/20">
          Live
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 mt-4">
        <div className="w-full h-48 md:h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={18}
              data={data}
              startAngle={220}
              endAngle={-40}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, maxSpeed]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                minAngle={15}
                background={{ fill: "rgba(255,255,255,0.05)" }}
                clockWise={true}
                dataKey="value"
                cornerRadius={10}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </RadialBarChart>
          </ResponsiveContainer>

          {/* Center value overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
            <motion.p
              key={value}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-5xl md:text-6xl font-black text-white tracking-tighter"
            >
              {Math.round(value)}
            </motion.p>
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">
              RPM
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
