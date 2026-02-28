import { FiSearch } from "react-icons/fi";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative">
      <FiSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 border text-slate-100 border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full sm:w-64"
      />
    </div>
  );
}
