import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // 1. HARDCODED ADMIN
    if (username.trim() === "admin" && password.trim() === "admin123") {
      login({ username: "admin", role: "admin" });
      navigate("/admin");
      return;
    }

    // 2. CHECK USERS CREATED IN ADMIN DASHBOARD
    const storedUsers = JSON.parse(localStorage.getItem("app_users") || "[]");
    const foundUser = storedUsers.find(
      (u) => u.username === username && u.password === password,
    );

    if (foundUser) {
      login({ username: foundUser.username, role: foundUser.role });
      navigate(`/${foundUser.role}`);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card p-8 rounded-xl max-w-md w-full animate-in fade-in duration-500 shadow-xl shadow-cyan-900/10">
        <h2 className="text-2xl font-black text-center text-white tracking-tight mb-6">
          System Login
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-lg mb-5 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Username
            </label>
            <input
              type="text"
              className="mt-1 block w-full bg-slate-900/50 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 focus:shadow-[0_0_15px_var(--glow-cyan)]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. client123"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full bg-slate-900/50 border border-slate-700 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 focus:shadow-[0_0_15px_var(--glow-cyan)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] mt-2"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-5 text-xs text-slate-500 font-medium text-center">
          <p>Test Admin: admin / admin123</p>
        </div>
      </div>
    </div>
  );
}
