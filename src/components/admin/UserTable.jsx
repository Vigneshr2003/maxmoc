import { Badge, Button } from "../common/Ui";
import SearchBar from "./SearchBar";
import { FiLayout, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const USERS_PER_PAGE = 5;

export default function UserTable({
  filteredUsers, // already-filtered list (all pages)
  searchTerm,
  setSearchTerm,
  editUser,
  deleteUser,
  onSelectUser,
  currentPage, // controlled from Users.jsx
  setCurrentPage, // controlled from Users.jsx
}) {
  const navigate = useNavigate();

  // Slice the filtered list to only the current page
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE),
  );
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const pageUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE,
  );

  const handleViewDashboard = (u) => {
    onSelectUser(u);
    navigate(`/admin/user/${u.username}/dashboard`);
  };

  const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="lg:col-span-2 surface-card rounded-2xl flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-100">User Directory</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-900/40 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-semibold">User Details</th>
              <th className="px-6 py-4 font-semibold">Security</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {/* Hardcoded admin row — always on page 1 */}
            {currentPage === 1 && (
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-purple-900/40 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold mr-3">
                      A
                    </div>
                    <div className="font-medium text-slate-200">admin</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-500 font-mono text-xs tracking-widest">
                    ••••••••
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge role="admin" />
                </td>
                <td className="px-6 py-4 text-right text-slate-500 italic text-xs">
                  System Default
                </td>
              </tr>
            )}

            {/* Empty search result */}
            {filteredUsers.length === 0 && searchTerm && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-8 text-center text-slate-500"
                >
                  No users found matching "{searchTerm}".
                </td>
              </tr>
            )}

            {/* Current page user rows */}
            {pageUsers.map((u, index) => (
              <tr
                key={index}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center font-bold mr-3">
                      {u.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">
                        {u.username}
                      </div>
                      {u.industry && (
                        <div className="text-xs text-slate-500">
                          {u.industry}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-400">
                  <span className="font-mono text-xs">{u.password}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge role={u.role} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {u.role === "client" && (
                      <button
                        title={`View ${u.username}'s dashboard`}
                        onClick={() => handleViewDashboard(u)}
                        className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 transition-all"
                      >
                        <FiLayout className="w-4 h-4" />
                      </button>
                    )}
                    <Button
                      variant="ghost"
                      className="px-3 text-slate-100 hover:bg-blue-400"
                      onClick={() => editUser(u)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="px-3 text-slate-100 hover:bg-red-400"
                      onClick={() => deleteUser(u.username)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Controls ── */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-800/60 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Page{" "}
            <span className="font-semibold text-slate-300">{currentPage}</span>{" "}
            of{" "}
            <span className="font-semibold text-slate-300">{totalPages}</span>
            <span className="ml-2 text-slate-500">
              ({filteredUsers.length} user
              {filteredUsers.length !== 1 ? "s" : ""})
            </span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={goToPrev}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            {/* Page number pills */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                  page === currentPage
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
