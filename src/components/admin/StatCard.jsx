import { FiActivity } from "react-icons/fi";

export default function StatCard({ title, value, colorClass, icon: Icon }) {
  return (
    <div className="surface-card rounded-xl p-6 flex flex-col items-start hover:bg-slate-900/80 transition-all group">
      <div className="flex items-center justify-between w-full mb-4">
        <h3 className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
          {title}
        </h3>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-800/50 border border-slate-700/50 ${colorClass}`}
        >
          {Icon ? (
            <Icon className="w-4 h-4" />
          ) : (
            <FiActivity className="w-4 h-4" />
          )}
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-100 drop-shadow-sm">
        {value}
      </p>
    </div>
  );
}
