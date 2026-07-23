import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "bi-columns-gap" },
  { to: "/statistics", label: "Statistics Panel", icon: "bi-bar-chart-line" },
];

export default function AdminShell() {
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const currentLabel =
    navItems.find((item) => location.pathname.startsWith(item.to))?.label ??
    "SafeX Admin";

  return (
    <div className="min-h-screen bg-background text-heading lg:flex">
      <aside className="flex flex-col border-b border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0)_30%),rgb(var(--safex-sidebar))] text-white shadow-shell lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:border-surface/10">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5 lg:px-6">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-sm font-bold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),3px_3px_0_0_#1a1a1a]">
            <span className="font-mono text-[13px] font-bold tracking-wide">
              SX
            </span>
            <span className="absolute right-1 top-1 h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_0_2px_rgb(var(--safex-primary))]" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-[15px] font-bold tracking-tight text-white">
              <span className="text-primary">SafeX</span>
              <span className="font-medium text-muted">/Admin</span>
            </h1>
            <p className="mt-1 truncate text-[10px] uppercase tracking-[0.2em] text-muted">
              Educational Platform · v1.0
            </p>
          </div>
        </div>

        <nav className="px-3 pb-4 pt-1 lg:px-3.5">
          <p className="flex items-center gap-2 px-2.5 pb-2 pt-4 text-[10px] uppercase tracking-[0.24em] text-white/40">
            <span className="font-mono tracking-[0.1em] text-[#3a3a3a]">
              01
            </span>
            <span>Overview</span>
          </p>
          <div className="space-y-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 border-l-2 px-2.5 py-2.5 text-[13px] font-normal leading-tight transition-colors duration-150",
                    isActive
                      ? "border-primary bg-white/10 text-white"
                      : "border-transparent text-white/60 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={[
                        "grid h-[26px] w-[26px] shrink-0 place-items-center border text-[15px] transition-colors duration-150",
                        isActive
                          ? "border-primary/30 bg-primary/15 text-primary"
                          : "border-transparent text-white/40",
                      ].join(" ")}
                    >
                      <i className={`bi ${item.icon}`} />
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="mt-auto border-t border-white/10 px-3 pb-1 pt-2.5 lg:px-3.5">
          <div className="flex items-center gap-2.5 border border-white/10 bg-black/20 px-2.5 py-2.5">
            <div className="grid h-8 w-8 shrink-0 place-items-center bg-primary text-[13px] font-semibold text-white">
              MH
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-white/90">
                Muhammad Haziq
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/40">
                Admin
              </p>
            </div>
            <button
              type="button"
              aria-label="Log out"
              title="Log out"
              className="px-1.5 py-1 text-white/40 transition-colors hover:text-danger"
            >
              <i className="bi bi-door-open" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[60px] items-center gap-4 border-b border-border bg-background/88 px-4 backdrop-blur-md md:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-body">
            {currentLabel}
          </p>
          <div className="flex-1" />
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            title="Toggle theme"
            className="grid h-9 w-9 place-items-center border border-border text-body transition-colors duration-150 hover:border-primary/50 hover:bg-surface/70 hover:text-heading"
          >
            <i
              className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon-stars"}`}
            />
          </button>
          <span className="hidden border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-body sm:inline">
            Role: Admin
          </span>
          <div className="flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p className="text-[13px] font-semibold text-heading">
                Muhammad Haziq
              </p>
              <p className="text-[11px] text-muted">Admin</p>
            </div>
            <div className="grid h-9 w-9 shrink-0 place-items-center bg-primary text-[13px] font-semibold text-white">
              MH
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
