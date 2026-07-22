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
          className="overflow-hidden rounded-card border border-border bg-surface shadow-shell backdrop-blur transition-all duration-300 ease-out"
        >
          <div className="flex flex-col gap-4 border-b border-border px-5 py-5 md:flex-row md:items-end md:justify-between md:px-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">SafeX Admin</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-heading md:text-3xl">Admin Dashboard & Statistics Panel</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-body">
                Real-time visibility into videos, recommendations, user activity, and weekly publishing trends.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
              <span className="rounded-full border border-border bg-background px-3 py-1.5 text-body">
                {new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
              </span>
              <span className={`rounded-full px-3 py-1.5 ${isDemoMode ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>
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
            className="rounded-card border border-border bg-surface p-5 shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-floating"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">Recent activity</p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-heading">Latest system updates</h2>
            <div className="mt-5 divide-y divide-border">
              {recentActivities.map((activity) => (
                <div key={`${activity.userName}-${activity.timestamp}`} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <p className="text-sm text-body">
                      <span className="font-semibold text-heading">{activity.userName}</span> {activity.action}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Activity feed</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-background px-3 py-1 text-[11px] font-medium text-body ring-1 ring-border">
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
            className="rounded-card border border-border bg-surface p-5 text-heading shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-floating"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">Overview snapshot</p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-heading">Admin dashboard</h2>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-body">
              <li>Summary counts for the platform content and user base.</li>
              <li>Recent actions that help admins spot activity at a glance.</li>
              <li>Quick status view for pending recommendations and published videos.</li>
            </ul>
            <div className="mt-6 rounded-card border border-border bg-background p-4 text-sm text-body">
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
    admin: "from-primary to-primary-hover text-white",
    kids: "from-warning to-warning-soft text-heading",
    general: "from-success to-success-strong text-white",
    alert: "from-danger to-warning-soft text-white",
  };

  return (
    <div className={`group rounded-card bg-gradient-to-br ${toneStyles[tone]} p-5 shadow-soft transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-floating`}>
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
