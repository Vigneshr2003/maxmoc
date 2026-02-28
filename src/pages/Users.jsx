import { useState, useEffect } from "react";
import StatsSection from "../components/admin/StatsSection";
import UserForm from "../components/admin/UserForm";
import UserTable from "../components/admin/UserTable";
import { useAdminContext } from "../layouts/AppLayout";

const USERS_PER_PAGE = 5;

// Default empty form state — used on reset and initial render
const EMPTY_FORM = {
  username: "",
  password: "",
  role: "client",
  industry: "",
  enabledMetrics: [],
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { setSelectedUser } = useAdminContext();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("app_users");
    if (saved) setUsers(JSON.parse(saved));
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem("app_users", JSON.stringify(users));
  }, [users]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Derived stats
  const totalUsers = users.length + 1;
  const totalClients = users.filter((u) => u.role === "client").length;
  const activeClients = Math.floor(totalClients * 0.8);
  const criticalAlerts = 2;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Toggle a metric key in enabledMetrics array
  const handleMetricToggle = (key) => {
    const current = formData.enabledMetrics;
    const updated = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    setFormData({ ...formData, enabledMetrics: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedUsers;
    if (editIndex !== null) {
      updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setEditIndex(null);
    } else {
      updatedUsers = [...users, formData];

      // Auto-advance to the last page when a new user is added
      const newTotal = updatedUsers.filter((u) =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()),
      ).length;
      const newLastPage = Math.max(1, Math.ceil(newTotal / USERS_PER_PAGE));
      setCurrentPage(newLastPage);
    }
    setUsers(updatedUsers);
    setFormData(EMPTY_FORM);
  };

  const deleteUser = (usernameToDelete) => {
    const updated = users.filter((u) => u.username !== usernameToDelete);
    setUsers(updated);
    // If current page is now empty after deletion, go back one page
    const newFilteredCount = updated.filter((u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()),
    ).length;
    const newTotalPages = Math.max(
      1,
      Math.ceil(newFilteredCount / USERS_PER_PAGE),
    );
    if (currentPage > newTotalPages) setCurrentPage(newTotalPages);
  };

  const editUser = (userToEdit) => {
    const idx = users.findIndex((u) => u.username === userToEdit.username);
    if (idx !== -1) {
      setFormData({
        ...EMPTY_FORM,
        ...userToEdit,
        enabledMetrics: userToEdit.enabledMetrics ?? [],
      });
      setEditIndex(idx);
    }
  };

  // Filtered users passed to UserTable (table handles slicing per page)
  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          System Overview
        </h1>
        <p className="text-slate-400 mt-1">
          Manage users, clients, and monitor system health.
        </p>
      </div>

      <StatsSection
        totalUsers={totalUsers}
        totalClients={totalClients}
        activeClients={activeClients}
        criticalAlerts={criticalAlerts}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <UserForm
          formData={formData}
          handleChange={handleChange}
          handleMetricToggle={handleMetricToggle}
          handleSubmit={handleSubmit}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          setFormData={setFormData}
        />
        <UserTable
          filteredUsers={filteredUsers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          editUser={editUser}
          deleteUser={deleteUser}
          onSelectUser={setSelectedUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
