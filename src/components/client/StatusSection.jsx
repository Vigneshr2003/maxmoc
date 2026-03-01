import { motion } from "framer-motion";

/**
 * StatusSection — Slim horizontal system status strip.
 * Acts as a top-level indicator bar in the Command Center layout.
 */
export default function StatusSection({ statusTheme, engineStatus }) {
  const StatusIcon = statusTheme.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg border ${statusTheme.bg} bg-white/2 backdrop-blur-sm`}
    >
      {/* Status icon */}
      <div className={`shrink-0 ${statusTheme.iconColor}`}>
        <StatusIcon className="w-4 h-4" />
      </div>

      {/* Status label */}
      <span className={`text-sm font-bold tracking-tight ${statusTheme.text}`}>
        {engineStatus}
      </span>

      {/* Divider dot */}
      <span className="w-1 h-1 rounded-full bg-slate-600" />

      {/* Description */}
      <span className="text-xs font-medium text-slate-400 truncate">
        {statusTheme.desc}
      </span>

      {/* Critical pulse indicator on the far right */}
      {engineStatus === "Critical" && (
        <span className="ml-auto shrink-0 relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
        </span>
      )}
    </motion.div>
  );
}
