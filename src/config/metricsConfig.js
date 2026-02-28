// Master list of ALL available metrics in the system.
// Each metric has:
//   key   — matches the property name in the live data state (e.g. data.speed)
//   label — human-readable name shown in the UI

export const METRICS = [
  { key: "speed", label: "Engine RPM" },
  { key: "temperature", label: "Temperature" },
  { key: "pressure", label: "Fuel Pressure" },
  { key: "humidity", label: "Humidity" },
  { key: "coolantTemp", label: "Coolant Temperature" },
  { key: "co2", label: "CO2 Level" },
  { key: "no2", label: "NO2 Level" },
];

// Helper: get a metric's label by its key
export function getMetricLabel(key) {
  const metric = METRICS.find((m) => m.key === key);
  return metric ? metric.label : key;
}
