import { motion } from "framer-motion";
import SpeedCard from "./SpeedCard";
import TemperatureCard from "./TemperatureCard";
import PressureCard from "./PressureCard";
import HumidityCard from "./HumidityCard";
import SimpleMetricCard from "./SimpleMetricCard";
import { getMetricLabel } from "../../config/metricsConfig";

/*
  Map each metric key to its render function.
  Rich cards for the 4 main metrics; SimpleMetricCard for the rest.
*/
const METRIC_RENDERERS = {
  speed: (val) => <SpeedCard value={val} />,
  temperature: (val) => <TemperatureCard value={val} />,
  pressure: (val) => <PressureCard value={val} />,
  humidity: (val) => <HumidityCard value={val} />,
  coolantTemp: (val) => (
    <SimpleMetricCard
      label={getMetricLabel("coolantTemp")}
      value={val}
      unit="°C"
    />
  ),
  co2: (val) => (
    <SimpleMetricCard label={getMetricLabel("co2")} value={val} unit="ppm" />
  ),
  no2: (val) => (
    <SimpleMetricCard label={getMetricLabel("no2")} value={val} unit="ppb" />
  ),
};

// Cards that should span wider when present to create asymmetric layout
const WIDE_CARDS = new Set(["speed", "humidity"]);

export default function MetricsGrid({ data, enabledMetrics }) {
  // If nothing is specified, show all available metrics
  const keysToShow =
    enabledMetrics && enabledMetrics.length > 0
      ? enabledMetrics
      : Object.keys(METRIC_RENDERERS);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      {keysToShow.map((key) => {
        const renderer = METRIC_RENDERERS[key];
        if (!renderer) return null;

        // Wide cards span 2 columns on large screens for visual variety
        const isWide = WIDE_CARDS.has(key);
        const colSpan = isWide
          ? "col-span-1 sm:col-span-2 lg:col-span-2"
          : "col-span-1";

        return (
          <motion.div
            key={key}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`${colSpan} rounded-2xl`}
          >
            {renderer(data[key] ?? 0)}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
