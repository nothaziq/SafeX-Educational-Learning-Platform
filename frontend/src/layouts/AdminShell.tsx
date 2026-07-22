import { NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Admin Dashboard" },
  { to: "/statistics", label: "Statistics Panel" },
];

export default function AdminShell() {
  const location = useLocation();
  const currentLabel = navItems.find((item) => location.pathname.startsWith(item.to))?.label ?? "SafeX Admin";

  return (
    <div className="min-h-screen bg-background text-heading lg:flex">
      <aside className="border-b border-border bg-sidebar text-white shadow-shell lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:border-surface/10">
        <div className="flex items-center gap-3 px-5 py-5 lg:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-card bg-gradient-to-br from-primary to-info text-sm font-bold shadow-floating">
            SX
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted">SafeX</p>
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
        </div>

        <nav className="px-3 pb-4 lg:px-4">
          <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">Navigation</p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "block rounded-card px-4 py-3 text-sm font-medium transition-all duration-300 ease-out",
                    isActive
                      ? "bg-primary/15 text-white ring-1 ring-primary/30 shadow-soft"
                      : "text-muted hover:bg-surface/8 hover:text-white hover:translate-x-0.5",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="mt-auto px-4 pb-4">
          <div className="rounded-card border border-surface/10 bg-surface/6 p-4 shadow-soft backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface/10 text-sm font-semibold text-white ring-1 ring-surface/10">
                MH
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Muhammad Haziq</p>
                <p className="text-xs text-muted">Admin profile</p>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-card border border-border bg-surface px-4 py-3 text-sm font-medium text-heading transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/20 hover:bg-background hover:text-primary-hover"
            >
              <span className="text-base">⎋</span>
              Sign out / Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-surface/90 shadow-[0_1px_0_rgba(226,232,240,0.8)] backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">Current page</p>
              <h2 className="mt-1 text-lg font-semibold text-heading">{currentLabel}</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-heading">Muhammad Haziq</p>
                <p className="text-xs text-muted">Admin</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-info text-sm font-bold text-white shadow-floating ring-1 ring-primary/20">
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
