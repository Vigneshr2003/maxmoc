import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FiUsers, FiHome, FiActivity, FiTool } from "react-icons/fi";

const adminNavItems = [{ name: "Users", href: "/admin/users", icon: FiUsers }];

const clientNavItems = [
  { name: "Dashboard", href: "/client/dashboard", icon: FiHome },
  { name: "Graph", href: "/client/graph", icon: FiActivity },
  { name: "Diagnostics", href: "/client/diagnostics", icon: FiTool },
];

export default function AppLayout({ role }) {
  // Only Admin uses selectedUser. Client uses logged-in user natively
  const [selectedUser, setSelectedUser] = useState(null);

  const navItems = role === "admin" ? adminNavItems : clientNavItems;

  return (
    <div className="flex h-screen bg-slate-950 font-sans overflow-hidden relative z-0">
      {/* Deep, modern radial gradient highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-transparent -z-10 pointer-events-none select-none" />

      {/* Secondary subtle glow at the bottom left */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent -z-10 pointer-events-none select-none" />

      {/* Subtle tech gridlines overlay */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay -z-10 pointer-events-none select-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <Sidebar
        navItems={navItems}
        // Only pass setter if admin, which enables the user-specific links section dynamically
        selectedUser={role === "admin" ? selectedUser : undefined}
        setSelectedUser={role === "admin" ? setSelectedUser : undefined}
      />
      <div className="flex-1 overflow-auto flex flex-col pt-16 md:pt-0">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 w-full mx-auto max-w-7xl">
          <Outlet
            context={
              role === "admin" ? { selectedUser, setSelectedUser } : undefined
            }
          />
        </main>
      </div>
    </div>
  );
}

// Custom hook — child pages call this to get selectedUser state (Admin only)
export function useAdminContext() {
  return useOutletContext();
}
