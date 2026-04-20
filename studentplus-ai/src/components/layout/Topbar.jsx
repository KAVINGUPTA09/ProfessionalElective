export default function Topbar() {
  return (
    <div className="mb-6 flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-xl">
      <div>
        <p className="text-sm text-slate-400">Welcome back 👋</p>
        <h2 className="text-2xl font-bold text-white">
          Student Intelligence Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          AI Active
        </div>
        <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500" />
      </div>
    </div>
  );
}