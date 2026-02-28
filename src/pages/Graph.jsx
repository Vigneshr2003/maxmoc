import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiActivity } from "react-icons/fi";

export default function Graph() {
  const { user: loggedInUser } = useContext(AuthContext);

  // useOutletContext() returns null when ClientLayout has no context — safe to call always
  const outletCtx = useOutletContext();

  // Admin → use selectedUser; Client → use loggedInUser
  const activeUser = outletCtx?.selectedUser ?? loggedInUser;

  const displayName = activeUser?.username
    ? activeUser.username[0].toUpperCase() + activeUser.username.slice(1)
    : "Graph";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
          {displayName}'s Graph
        </h1>
        <p className="text-slate-400 mt-1">Metric graphs and analytics data.</p>
      </div>

      <div className="surface-card rounded-2xl p-6 min-h-64 flex items-center justify-center">
        <div className="text-center">
          <FiActivity className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">
            Graph data for{" "}
            <strong className="text-slate-200">{activeUser?.username}</strong>{" "}
            will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
