import { useState, useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import StatusSection from "../components/client/StatusSection";
import SpeedCard from "../components/client/SpeedCard";
import TemperatureCard from "../components/client/TemperatureCard";
import PressureCard from "../components/client/PressureCard";
import HumidityCard from "../components/client/HumidityCard";
import SimpleMetricCard from "../components/client/SimpleMetricCard";
import { getMetricLabel } from "../config/metricsConfig";
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiAlertOctagon,
  FiLayers,
  FiActivity,
  FiWind,
  FiThermometer,
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

  // Helper: check if a metric is enabled
  // If enabledMetrics is empty, show all (fallback for admin preview)
  const show = (key) => !enabledMetrics.length || enabledMetrics.includes(key);

  // Section visibility — only render a group if at least one metric is enabled
  const hasEngine = show("speed") || show("pressure");
  const hasThermal = show("temperature") || show("coolantTemp");
  const hasEnvironment = show("humidity") || show("co2") || show("no2");

  /* ── Reusable section header ── */
  const SectionHeader = ({ icon: Icon, label, color }) => (
    <div className="flex items-center gap-2 px-1 mt-1">
      <Icon className={`w-3.5 h-3.5 ${color}`} />
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5 pb-6"
    >
      {/* ── Top Bar: Header + Status Strip ── */}
      <div className="flex flex-col gap-3">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {displayName}'s Command Center
            </h1>
            {industry && (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-cyan-500/20 bg-cyan-500/5">
                <FiLayers className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] font-semibold text-cyan-300 tracking-wide uppercase">
                  {industry}
                </span>
              </div>
            )}
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            Live • {lastUpdated}
          </div>
        </div>

        {/* System Status Strip */}
        <StatusSection statusTheme={statusTheme} engineStatus={engineStatus} />
      </div>

      {/* ════════════════════════════════════════════════════════
          Section 1 — ENGINE PERFORMANCE
          Speed (full width) + Pressure (below)
         ════════════════════════════════════════════════════════ */}
      {hasEngine && (
        <div className="flex flex-col gap-3">
          <SectionHeader
            icon={FiActivity}
            label="Engine Performance"
            color="text-cyan-400"
          />

          {/* Speed — full width hero card */}
          {show("speed") && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <SpeedCard value={data.speed} data={data} />
            </motion.div>
          )}

          {/* Pressure — sits below speed */}
          {show("pressure") && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="min-h-[180px]"
            >
              <PressureCard value={data.pressure} data={data} />
            </motion.div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          Section 2 — THERMAL MONITORING
          Temperature + Coolant Temp side-by-side
         ════════════════════════════════════════════════════════ */}
      {hasThermal && (
        <div className="flex flex-col gap-3">
          <SectionHeader
            icon={FiThermometer}
            label="Thermal Monitoring"
            color="text-amber-400"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {show("temperature") && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="min-h-[200px]"
              >
                <TemperatureCard value={data.temperature} data={data} />
              </motion.div>
            )}
            {show("coolantTemp") && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="min-h-[200px]"
              >
                <SimpleMetricCard
                  label={getMetricLabel("coolantTemp")}
                  value={data.coolantTemp}
                  unit="°C"
                />
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          Section 3 — ENVIRONMENTAL
          Humidity + CO₂ + NO₂ in a 3-column row
         ════════════════════════════════════════════════════════ */}
      {hasEnvironment && (
        <div className="flex flex-col gap-3">
          <SectionHeader
            icon={FiWind}
            label="Environmental"
            color="text-emerald-400"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {show("humidity") && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="min-h-[180px]"
              >
                <HumidityCard value={data.humidity} data={data} />
              </motion.div>
            )}
            {show("co2") && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="min-h-[180px]"
              >
                <SimpleMetricCard
                  label={getMetricLabel("co2")}
                  value={data.co2}
                  unit="ppm"
                />
              </motion.div>
            )}
            {show("no2") && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="min-h-[180px]"
              >
                <SimpleMetricCard
                  label={getMetricLabel("no2")}
                  value={data.no2}
                  unit="ppb"
                />
              </motion.div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
