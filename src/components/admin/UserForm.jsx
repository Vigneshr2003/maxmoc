import { useState } from "react";
import { Button } from "../common/Ui";
import { METRICS } from "../../config/metricsConfig";
import { FiChevronDown, FiX } from "react-icons/fi";

export default function UserForm({
  formData,
  handleChange,
  handleMetricToggle,
  handleSubmit,
  editIndex,
  setEditIndex,
  setFormData,
}) {
  // Controls whether the metrics dropdown is open or closed
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isClient = formData.role === "client";

  // When role changes, close the dropdown
  const handleRoleChange = (e) => {
    setDropdownOpen(false);
    handleChange(e);
  };

  return (
    <div className="col-span-1 surface-card rounded-2xl p-6 lg:p-8 h-fit">
      <h2 className="text-lg font-semibold mb-6 text-slate-100">
        {editIndex !== null ? "Edit User Details" : "Onboard New User"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Username
          </label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            placeholder="Ex. client123"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Password
          </label>
          <input
            name="password"
            type="text"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            placeholder="Secure password"
          />
        </div>

        {/* Permission Role */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Permission Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="client">Client Access</option>
            <option value="admin">Admin Access</option>
          </select>
        </div>

        {/* Client-only fields: industry + metric selection */}
        {isClient && (
          <>
            {/* Industry Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Industry Type
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">Select an industry</option>
                <option value="Automotive">Automotive</option>
                <option value="Industrial Automation">
                  Industrial Automation
                </option>
                <option value="Environmental Monitoring">
                  Environmental Monitoring
                </option>
                <option value="Energy Management">Energy Management</option>
              </select>
            </div>

            {/* ── Metric Multi-Select Dropdown ── */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Visible Metrics
              </label>

              {/* Dropdown trigger button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-300 hover:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                >
                  <span className="text-sm">
                    {formData.enabledMetrics.length === 0
                      ? "Select metrics…"
                      : `${formData.enabledMetrics.length} metric${formData.enabledMetrics.length > 1 ? "s" : ""} selected`}
                  </span>
                  <FiChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown list */}
                {dropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                    {METRICS.map((metric) => {
                      const isSelected = formData.enabledMetrics.includes(
                        metric.key,
                      );
                      return (
                        <button
                          key={metric.key}
                          type="button"
                          onClick={() => handleMetricToggle(metric.key)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                            isSelected
                              ? "bg-cyan-900/30 text-cyan-400 font-medium"
                              : "text-slate-300 hover:bg-slate-700/50"
                          }`}
                        >
                          <span>{metric.label}</span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Selected metrics shown as removable chips */}
              {formData.enabledMetrics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {formData.enabledMetrics.map((key) => {
                    const metric = METRICS.find((m) => m.key === key);
                    return (
                      <span
                        key={key}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-900/40 border border-cyan-700/50 text-cyan-300 text-xs font-semibold rounded-full"
                      >
                        {metric?.label ?? key}
                        <button
                          type="button"
                          onClick={() => handleMetricToggle(key)}
                          className="hover:text-cyan-100 transition-colors"
                          aria-label={`Remove ${metric?.label}`}
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}

              {formData.enabledMetrics.length === 0 && (
                <p className="text-xs text-amber-600 mt-1.5">
                  No metrics selected — all metrics will be shown by default.
                </p>
              )}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col gap-3">
          <Button
            type="submit"
            class="px-8 py-2 text-white font-bold text-lg rounded-full shadow-lg transition-transform transform bg-transparent border border-white hover:scale-101 hover:border-blue-500 hover:shadow-blue-500/50 hover:shadow-2xl focus:outline-none"
          >
            {editIndex !== null ? "Update User Record" : "Create User"}
          </Button>
          {editIndex !== null && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setDropdownOpen(false);
                setEditIndex(null);
                setFormData({
                  username: "",
                  password: "",
                  role: "client",
                  industry: "",
                  enabledMetrics: [],
                });
              }}
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
