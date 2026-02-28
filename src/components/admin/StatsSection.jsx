import StatCard from "./StatCard";
import {
  FiUsers,
  FiUserCheck,
  FiUserPlus,
  FiAlertCircle,
} from "react-icons/fi";

export default function StatsSection({
  totalUsers,
  totalClients,
  activeClients,
  criticalAlerts,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatCard
        title="Total Users"
        value={totalUsers}
        colorClass="text-blue-600 ring-1 ring-blue-100/50"
        icon={FiUsers}
      />
      <StatCard
        title="Total Clients"
        value={totalClients}
        colorClass="text-indigo-600 ring-1 ring-indigo-100/50"
        icon={FiUserPlus}
      />
      <StatCard
        title="Active Clients"
        value={activeClients}
        colorClass="text-emerald-600 ring-1 ring-emerald-100/50"
        icon={FiUserCheck}
      />
      <StatCard
        title="Critical Alerts"
        value={criticalAlerts}
        colorClass="text-red-600 ring-1 ring-red-100/50"
        icon={FiAlertCircle}
      />
    </div>
  );
}
