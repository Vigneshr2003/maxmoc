import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { FiWind } from "react-icons/fi";

export default function SpeedCard({ value, data }) {
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
  const dataChart = [
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
      className="h-full w-full rounded-xl p-5 flex flex-col relative overflow-hidden bg-white/2 border border-white/6 hover:border-white/10 transition-colors duration-300"
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="flex items-center justify-between w-full mb-2 z-10">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2">
          <FiWind className="w-5 h-5 text-cyan-400" />
          Engine Speed
        </h3>
        <div className="px-3 py-1 bg-white/5 text-cyan-400 rounded-full text-[10px] md:text-xs font-semibold border border-cyan-500/20">
          Live
        </div>
      </div>

      <div className="flex-1 flex flex-row items-center justify-between relative z-10 mt-2 gap-4">
        {/* Left Column: RPM + Secondary Metrics */}
        <div className="flex flex-col justify-center">
          <motion.p
            key={value}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-5xl md:text-6xl font-black text-white tracking-tighter"
          >
            {Math.round(value)}
          </motion.p>
          <span className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1 mb-4">
            RPM
          </span>

          <div className="flex flex-col gap-1 border-t border-white/10 pt-3">
            <span className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Coolant Temp
            </span>
            <span className="text-base md:text-lg font-bold text-white">
              {data?.coolantTemp ? `${Math.round(data.coolantTemp)}°C` : "N/A"}
            </span>
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className="w-28 h-28 md:w-36 md:h-36 relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={12}
              data={dataChart}
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
        </div>
      </div>
    </motion.div>
  );
}
