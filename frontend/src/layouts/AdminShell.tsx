import { NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Admin Dashboard" },
  { to: "/statistics", label: "Statistics Panel" },
];

export default function AdminShell() {
  const location = useLocation();
  const currentLabel = navItems.find((item) => location.pathname.startsWith(item.to))?.label ?? "SafeX Admin";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] text-slate-900 lg:flex">
      <aside className="border-b border-slate-200 bg-[#0F172A] text-white lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:border-slate-800">
        <div className="flex items-center gap-3 px-5 py-5 lg:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B4A6B] to-[#1F8A8C] text-sm font-bold shadow-lg shadow-black/20">
            SX
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">SafeX</p>
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
        </div>

        <nav className="px-3 pb-4 lg:px-4">
          <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Navigation</p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "block rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-white/10 text-white shadow-inner"
                      : "text-slate-300 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="mt-auto px-4 pb-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                MH
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Muhammad Haziq</p>
                <p className="text-xs text-slate-400">Admin profile</p>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
            >
              <span className="text-base">⎋</span>
              Sign out / Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Current page</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-950">{currentLabel}</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-900">Muhammad Haziq</p>
                <p className="text-xs text-slate-500">Admin</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#3B4A6B] to-[#1F8A8C] text-sm font-bold text-white shadow-md">
                MH
              </div>
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
