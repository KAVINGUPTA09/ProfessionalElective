import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Overview", path: "/", icon: "📊" },
  { name: "Academic Risk", path: "/academic-risk", icon: "🎓" },
  { name: "Placement Score", path: "/placement", icon: "💼" },
  { name: "Skill & Career", path: "/skills", icon: "🧠" },
  { name: "Resume Analyzer", path: "/resume", icon: "📄" },
  { name: "Internship Match", path: "/internship", icon: "🚀" },
  { name: "AI Assistant", path: "/assistant", icon: "🤖" },
  { name: "Institute Analytics", path: "/analytics", icon: "🏫" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen border-r border-white/10 bg-slate-950/70 backdrop-blur-xl text-white">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl shadow-lg shadow-cyan-500/20">
            ✦
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              Student<span className="text-cyan-400">Plus</span> AI
            </h1>
            <p className="text-xs text-slate-400">Smart Academic Platform</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-5">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Main Menu
        </p>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-400/20 shadow-lg shadow-cyan-500/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mx-4 mt-6 rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 p-4">
        <p className="text-sm font-semibold text-cyan-300">ML Models Active</p>
        <p className="mt-2 text-xs leading-5 text-slate-300">
          Academic Risk and Internship recommendation are connected.
        </p>
      </div>
    </aside>
  );
}