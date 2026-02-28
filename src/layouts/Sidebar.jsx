import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Link, useLocation } from "react-router-dom";
import { FiLogOut, FiMenu, FiHome, FiActivity, FiTool } from "react-icons/fi";

export default function Sidebar({
  navItems = [],
  selectedUser, // only passed from AdminLayout
  setSelectedUser, // only passed from AdminLayout; undefined in ClientLayout
}) {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Fail-safe redirect if context resets
  if (!user) return <Navigate to="/" />;

  // These only exist in the admin sidebar (when setSelectedUser is provided)
  const isAdminSidebar = Boolean(setSelectedUser);

  // User-specific links shown below the separator (admin only)
  const userNavItems = [
    { name: "Dashboard", icon: FiHome, path: "dashboard" },
    { name: "Graph", icon: FiActivity, path: "graph" },
    { name: "Diagnostics", icon: FiTool, path: "diagnostics" },
  ];

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Maxmoc<span className="text-blue-500">App</span>
        </h2>
        <button
          className="text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Dark Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform
          duration-300 ease-in-out md:static flex flex-col h-full
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="hidden md:flex p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Maxmoc<span className="text-blue-500">App</span>
          </h2>
        </div>

        {/* Logged-in User Card */}
        <div className="p-6 pb-2 border-b border-slate-800/60 md:border-b-0">
          <div className="flex items-center space-x-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 group">
            <div className="w-10 h-10 rounded-full bg-[linear-gradient(to_top_right,var(--tw-gradient-stops))] from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-100 group-hover:text-cyan-300 transition-colors">
                {user.username[0].toUpperCase() + user.username.slice(1)}
              </p>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto space-y-1">
          {/* Static nav items (all layouts use this) */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  // Admin only: clear selectedUser when clicking "Users"
                  if (setSelectedUser) setSelectedUser(null);
                  closeSidebar();
                }}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? "bg-slate-800/80 text-cyan-400 shadow-[inset_3px_0_0_0_rgba(34,211,238,1)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mr-3 transition-colors ${
                    isActive
                      ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                      : "text-slate-500 group-hover:text-cyan-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}

          {/*
            Admin-only section: separator + per-user links.
            Only rendered when isAdminSidebar is true (setSelectedUser is provided).
          */}
          {isAdminSidebar && (
            <>
              {/* Separator */}
              <div className="py-2 px-2">
                <hr className="border-slate-700" />
              </div>

              {/* User-specific nav — only when a user is selected */}
              {selectedUser ? (
                <div className="space-y-1">
                  {/* Selected user label */}
                  <p className="px-4 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                    {selectedUser.username}
                  </p>

                  {userNavItems.map((item) => {
                    const Icon = item.icon;
                    const href = `/admin/user/${selectedUser.username}/${item.path}`;
                    const isActive = location.pathname === href;
                    return (
                      <Link
                        key={item.name}
                        to={href}
                        onClick={closeSidebar}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative ${
                          isActive
                            ? "bg-slate-800/80 text-cyan-400 shadow-[inset_3px_0_0_0_rgba(34,211,238,1)]"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 mr-3 transition-colors ${
                            isActive
                              ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                              : "text-slate-500 group-hover:text-cyan-400"
                          }`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                // No user selected yet
                <p className="px-4 py-2 text-xs text-slate-600 italic">
                  Select a user to view their pages
                </p>
              )}
            </>
          )}
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-500 hover:ring-1 hover:ring-red-500/50 rounded-lg transition-all"
          >
            <FiLogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
