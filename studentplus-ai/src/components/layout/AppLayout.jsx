import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#1e293b,_#0f172a_45%,_#020617_100%)] text-white">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <Topbar />
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}