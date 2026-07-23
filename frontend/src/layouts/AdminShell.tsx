import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "bi-columns-gap" },
  { to: "/statistics", label: "Statistics Panel", icon: "bi-bar-chart-line" },
];

export default function AdminShell() {
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const currentLabel = navItems.find((item) => location.pathname.startsWith(item.to))?.label ?? "SafeX Admin";

  const renderNavLinks = (onNavigate?: () => void) =>
    navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        onClick={onNavigate}
        className={({ isActive }) =>
          [
            "flex items-center gap-3 border-l-2 px-2.5 py-2.5 text-[13px] font-normal leading-tight transition-colors duration-150",
            isActive
              ? "border-primary bg-primary/10 text-heading"
              : "border-transparent text-body hover:bg-surface/70 hover:text-heading",
          ].join(" ")
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={[
                "grid h-[26px] w-[26px] shrink-0 place-items-center border text-[15px] transition-colors duration-150",
                isActive ? "border-primary/30 bg-primary/15 text-primary" : "border-transparent text-muted",
              ].join(" ")}
            >
              <i className={`bi ${item.icon}`} />
            </span>
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
          </>
        )}
      </NavLink>
    ));

  return (
    <div className="min-h-screen bg-background text-heading lg:flex">
      {/* Mobile top bar with hamburger — replaces the full sidebar below lg */}
      <div className="border-b border-border bg-background lg:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-sm font-bold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),3px_3px_0_0_#1a1a1a]">
            <span className="font-mono text-[12px] font-bold tracking-wide text-white">SX</span>
            <span className="absolute right-1 top-1 h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_0_2px_rgb(var(--safex-primary))]" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[14px] font-bold tracking-tight text-heading">
              <span className="text-primary">SafeX</span><span className="font-medium text-muted">/Admin</span>
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileNavOpen}
            className="grid h-9 w-9 shrink-0 place-items-center border border-border text-body transition-colors duration-150 hover:border-primary/50 hover:bg-surface/70 hover:text-heading"
          >
            <i className={`bi ${mobileNavOpen ? "bi-x-lg" : "bi-list"}`} />
          </button>
        </div>

        {mobileNavOpen && (
          <nav className="border-t border-border px-3 pb-3 pt-2">
            <p className="flex items-center gap-2 px-2.5 pb-2 pt-2 text-[10px] uppercase tracking-[0.24em] text-muted">
              <span className="font-mono tracking-[0.1em] text-muted/60">01</span>
              <span>Overview</span>
            </p>
            <div className="space-y-0.5">{renderNavLinks(() => setMobileNavOpen(false))}</div>
          </nav>
        )}
      </div>

      {/* Full sidebar — lg and up only */}
      <aside
        className="hidden shadow-shell lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-72 lg:flex-col lg:border-r lg:border-surface/10"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0) 30%), rgb(var(--safex-sidebar))" }}
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-5 lg:px-6">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-sm font-bold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),3px_3px_0_0_#1a1a1a]">
            <span className="font-mono text-[13px] font-bold tracking-wide text-white">SX</span>
            <span className="absolute right-1 top-1 h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_0_2px_rgb(var(--safex-primary))]" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-[15px] font-bold tracking-tight text-heading">
              <span className="text-primary">SafeX</span><span className="font-medium text-muted">/Admin</span>
            </h1>
            <p className="mt-1 truncate text-[10px] uppercase tracking-[0.2em] text-muted">Educational Platform · v1.0</p>
          </div>
        </div>

        <nav className="px-3 pb-4 pt-1 lg:px-3.5">
          <p className="flex items-center gap-2 px-2.5 pb-2 pt-4 text-[10px] uppercase tracking-[0.24em] text-muted">
            <span className="font-mono tracking-[0.1em] text-muted/60">01</span>
            <span>Overview</span>
          </p>
          <div className="space-y-0.5">{renderNavLinks()}</div>
        </nav>

        <div className="mt-auto border-t border-border px-3 pb-1 pt-2.5 lg:px-3.5">
          <div className="flex items-center gap-2.5 border border-border bg-background px-2.5 py-2.5">
            <div className="grid h-8 w-8 shrink-0 place-items-center bg-primary text-[13px] font-semibold text-white">
              MH
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-heading">Muhammad Haziq</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-muted">Admin</p>
            </div>
            <button type="button" aria-label="Log out" title="Log out" className="px-1.5 py-1 text-muted transition-colors hover:text-danger">
              <i className="bi bi-door-open" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[60px] items-center gap-4 border-b border-border bg-background/88 px-4 backdrop-blur-md md:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-body">{currentLabel}</p>
          <div className="flex-1" />
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            title="Toggle theme"
            className="grid h-9 w-9 place-items-center border border-border text-body transition-colors duration-150 hover:border-primary/50 hover:bg-surface/70 hover:text-heading"
          >
            <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon-stars"}`} />
          </button>
          <span className="hidden border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-body sm:inline">
            Role: Admin
          </span>
          <div className="flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p className="text-[13px] font-semibold text-heading">Muhammad Haziq</p>
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
