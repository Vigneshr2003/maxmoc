export const Badge = ({ role }) => {
  const baseClasses = "px-2.5 py-1 text-xs font-semibold rounded-full border";
  const roleClasses =
    role === "admin"
      ? "bg-purple-900/40 text-purple-400 border-purple-500/30"
      : "bg-cyan-900/40 text-cyan-400 border-cyan-500/30";

  return (
    <span className={`${baseClasses} ${roleClasses}`}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

export const Button = ({ children, variant = "primary", ...props }) => {
  const baseClasses =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center";
  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50",
    secondary:
      "bg-slate-800 border border-slate-600 hover:bg-slate-700 text-slate-200 focus:ring-slate-500",
    danger:
      "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 focus:ring-rose-500",
    ghost:
      "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 focus:ring-slate-700",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};
