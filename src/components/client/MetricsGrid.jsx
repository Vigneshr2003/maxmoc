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
  speed: (val, data) => <SpeedCard value={val} data={data} />,
  temperature: (val, data) => <TemperatureCard value={val} data={data} />,
  pressure: (val, data) => <PressureCard value={val} data={data} />,
  humidity: (val, data) => <HumidityCard value={val} data={data} />,
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
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {keysToShow.map((key) => {
        const renderer = METRIC_RENDERERS[key];
        if (!renderer) return null;

        let colSpan = "col-span-1";
        if (key === "speed") colSpan = "col-span-1 md:col-span-2 lg:col-span-2";
        else if (key === "temperature")
          colSpan = "col-span-1 md:col-span-1 lg:col-span-1 md:row-span-2";
        else if (key === "pressure")
          colSpan = "col-span-1 md:col-span-2 lg:col-span-1";
        else if (key === "humidity")
          colSpan = "col-span-1 md:col-span-1 lg:col-span-2";

        return (
          <motion.div
            key={key}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`${colSpan} rounded-2xl flex flex-col`}
          >
            {renderer(data[key] ?? 0, data)}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
