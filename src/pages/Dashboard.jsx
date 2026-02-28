import { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import StatusSection from "../components/client/StatusSection";
import MetricsGrid from "../components/client/MetricsGrid";
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiAlertOctagon,
  FiLayers,
} from "react-icons/fi";

export default function Dashboard() {
  const { user: loggedInUser } = useContext(AuthContext);
  const outletCtx = useOutletContext();

  // Admin → selectedUser from AdminLayout; Client → logged-in user
  const activeUser = outletCtx?.selectedUser ?? loggedInUser;
  const enabledMetrics = activeUser?.enabledMetrics ?? [];

  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString(),
  );
  const [data, setData] = useState({
    speed: 120,
    temperature: 72,
    pressure: 1013,
    humidity: 45,
    coolantTemp: 85,
    co2: 412,
    no2: 25,
  });

  // Derive engine status from live values
  let engineStatus = "Normal";
  let statusTheme = {
    bg: "border-emerald-500/30",
    text: "text-emerald-400",
    icon: FiCheckCircle,
    iconColor: "text-emerald-400",
    glowColor: "var(--glow-teal)",
    desc: "All systems are operating within optimal parameters.",
  };

  if (data.temperature > 85 || data.pressure > 1050) {
    engineStatus = "Critical";
    statusTheme = {
      bg: "border-rose-500/30",
      text: "text-rose-400",
      icon: FiAlertOctagon,
      iconColor: "text-rose-400 animate-pulse",
      glowColor: "var(--glow-rose)",
      desc: "Critical thresholds exceeded. Immediate action required.",
    };
  } else if (data.temperature > 80 || data.humidity > 60) {
    engineStatus = "Warning";
    statusTheme = {
      bg: "border-amber-500/30",
      text: "text-amber-400",
      icon: FiAlertTriangle,
      iconColor: "text-amber-400",
      glowColor: "var(--glow-amber)",
      desc: "System experiencing elevated metrics. Monitor closely.",
    };
  }

  // Simulate live sensor updates every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const jump = (val, max) =>
          Number((val + (Math.random() * max * 2 - max)).toFixed(1));
        return {
          speed: jump(prev.speed, 5),
          temperature: jump(prev.temperature, 2),
          pressure: jump(prev.pressure, 3),
          humidity: jump(prev.humidity, 1.5),
          coolantTemp: jump(prev.coolantTemp, 1.5),
          co2: jump(prev.co2, 3),
          no2: jump(prev.no2, 1),
        };
      });
      setLastUpdated(new Date().toLocaleTimeString());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const displayName = activeUser?.username
    ? activeUser.username[0].toUpperCase() + activeUser.username.slice(1)
    : "Dashboard";

  const industry = activeUser?.industry;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 md:space-y-8 pb-8"
    >
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {displayName}'s Dashboard
          </h1>

          {/* Industry badge — glowing cyan glass pill */}
          {industry && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border border-cyan-500/30">
              <FiLayers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-300 tracking-wide">
                {industry}
              </span>
            </div>
          )}

          <p className="text-slate-400 mt-2 font-medium">
            Live environment and engine telemetry.
          </p>
        </div>

        {/* Live indicator */}
        <div className="flex items-center text-slate-400 font-medium">
          <span className="relative flex h-2.5 w-2.5 mr-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          Live Data • {lastUpdated}
        </div>
      </div>

      <StatusSection statusTheme={statusTheme} engineStatus={engineStatus} />
      <MetricsGrid data={data} enabledMetrics={enabledMetrics} />
    </motion.div>
  );
}
