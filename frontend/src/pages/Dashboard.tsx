import { motion } from "framer-motion";
import { useDashboard } from "../services/dashboardService";
import { fallbackDashboard } from "../types/dashboard";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !data) return <p className="p-6 text-danger">Couldn't load dashboard data.</p>;

  const { summary, recentActivities } = data;
  const isDemoMode = data === fallbackDashboard;

  return (
    <div className="min-h-full bg-background px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-card border border-border/70 bg-surface/55 shadow-shell backdrop-blur-xl transition-all duration-300 ease-out"
        >
          <div className="flex flex-col gap-4 border-b border-border/60 px-5 py-5 md:flex-row md:items-end md:justify-between md:px-6">
            <div>
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-primary before:h-px before:w-[22px] before:bg-primary">
                SafeX Admin
              </p>
              <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-heading md:text-3xl">Admin Dashboard &amp; Statistics Panel</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-body">
                Real-time visibility into videos, recommendations, user activity, and weekly publishing trends.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium">
              <span className="border border-border px-2.5 py-1.5 uppercase tracking-[0.08em] text-body">
                {new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 uppercase tracking-[0.08em] before:h-[6px] before:w-[6px] before:bg-current ${
                  isDemoMode ? "bg-[color-mix(in_oklab,rgb(var(--safex-warning))_14%,transparent)] text-warning" : "bg-[color-mix(in_oklab,rgb(var(--safex-success))_14%,transparent)] text-success"
                }`}
              >
                {isDemoMode ? "Demo fallback data" : "Live API data"}
              </span>
            </div>
          </div>

          <div className="grid gap-4 px-5 py-5 md:grid-cols-2 xl:grid-cols-4 md:px-6">
            <SummaryTile label="Total Videos" value={summary.totalVideos} tone="admin" sublabel="All content in the platform" />
            <SummaryTile label="Pending Recommendations" value={summary.pendingRecommendations} tone="alert" sublabel="Awaiting admin review" />
            <SummaryTile label="Published Videos" value={summary.publishedVideos} tone="general" sublabel="Ready for learners" />
            <SummaryTile label="Users" value={summary.users} tone="kids" sublabel="Active accounts in the system" />
          </div>
        </motion.section>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="rounded-card border border-border/70 bg-surface/55 p-5 shadow-card backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-px hover:shadow-floating"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Recent activity</p>
            <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-heading">Latest system updates</h2>
            <div className="mt-5 divide-y divide-border/60">
              {recentActivities.map((activity) => (
                <div key={`${activity.userName}-${activity.timestamp}`} className="flex items-start justify-between gap-4 py-4">
                  <div className="flex items-start gap-3">
                    <i className="bi bi-dot mt-0.5 text-lg text-primary" />
                    <div>
                      <p className="text-sm text-body">
                        <span className="font-semibold text-heading">{activity.userName}</span> {activity.action}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">Activity feed</p>
                    </div>
                  </div>
                  <span className="shrink-0 border border-border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-body">
                    {formatShortTimestamp(activity.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="rounded-card border border-border/70 bg-surface/55 p-5 text-heading shadow-card backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-px hover:shadow-floating"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Overview snapshot</p>
            <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-heading">Admin dashboard</h2>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-body">
              <li className="flex gap-2.5"><i className="bi bi-check2 mt-0.5 text-primary" />Summary counts for the platform content and user base.</li>
              <li className="flex gap-2.5"><i className="bi bi-check2 mt-0.5 text-primary" />Recent actions that help admins spot activity at a glance.</li>
              <li className="flex gap-2.5"><i className="bi bi-check2 mt-0.5 text-primary" />Quick status view for pending recommendations and published videos.</li>
            </ul>
            <div className="mt-6 border border-dashed border-border bg-background/60 p-4 text-sm text-body">
              The dashboard now lives on its own page, separate from the statistics panel.
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  tone,
  sublabel,
}: {
  label: string;
  value: number;
  tone: "admin" | "kids" | "general" | "alert";
  sublabel: string;
}) {
  const toneStyles = {
    admin: "bg-primary text-white",
    kids: "bg-warning text-white",
    general: "bg-success text-white",
    alert: "bg-danger text-white",
  };

  return (
    <div className={`group rounded-card ${toneStyles[tone]} p-5 shadow-soft transition-all duration-300 ease-out hover:-translate-y-px hover:shadow-floating`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] opacity-80">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">{value.toLocaleString()}</p>
      <p className="mt-2 text-sm leading-6 opacity-85">{sublabel}</p>
    </div>
  );
}

function formatShortTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-56 rounded-card bg-border/60 animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-28 rounded-card bg-border/60 animate-pulse" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-80 rounded-card bg-border/60 animate-pulse" />
          <div className="h-80 rounded-card bg-border/60 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
