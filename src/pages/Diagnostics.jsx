import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiTool } from "react-icons/fi";

export default function Diagnostics() {
  const { user: loggedInUser } = useContext(AuthContext);

  // useOutletContext() returns null when ClientLayout has no context — safe to call always
  const outletCtx = useOutletContext();

  // Admin → use selectedUser; Client → use loggedInUser
  const activeUser = outletCtx?.selectedUser ?? loggedInUser;

  const displayName = activeUser?.username
    ? activeUser.username[0].toUpperCase() + activeUser.username.slice(1)
    : "Diagnostics";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          {displayName}'s Diagnostics
        </h1>
        <p className="text-slate-400 mt-1">
          System diagnostics and status checks.
        </p>
      </div>

      <div className="surface-card rounded-2xl p-6 min-h-64 flex items-center justify-center">
        <div className="text-center">
          <FiTool className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">
            Diagnostic data for{" "}
            <strong className="text-slate-200">{activeUser?.username}</strong>{" "}
            will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
