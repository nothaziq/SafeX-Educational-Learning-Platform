import { motion } from "framer-motion";
import { useDashboard } from "../services/dashboardService";
import { fallbackDashboard } from "../types/dashboard";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !data) return <p className="p-6 text-[#C2542B]">Couldn't load dashboard data.</p>;

  const { summary, recentActivities } = data;
  const isDemoMode = data === fallbackDashboard;

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(59,74,107,0.16),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f3f6fb_100%)] px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur"
        >
          <div className="flex flex-col gap-4 border-b border-slate-200/80 px-5 py-5 md:flex-row md:items-end md:justify-between md:px-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#3B4A6B]">SafeX Admin</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-950 md:text-3xl">Admin Dashboard & Statistics Panel</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Real-time visibility into videos, recommendations, user activity, and weekly publishing trends.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600">
                {new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
              </span>
              <span className={`rounded-full px-3 py-1.5 ${isDemoMode ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"}`}>
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
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Recent activity</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">Latest system updates</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {recentActivities.map((activity) => (
                <div key={`${activity.userName}-${activity.timestamp}`} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-slate-950">{activity.userName}</span> {activity.action}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Activity feed</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">
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
            className="rounded-3xl border border-slate-200 bg-[#0F172A] p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">Overview snapshot</p>
            <h2 className="mt-2 text-lg font-semibold">Admin dashboard</h2>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-200">
              <li>Summary counts for the platform content and user base.</li>
              <li>Recent actions that help admins spot activity at a glance.</li>
              <li>Quick status view for pending recommendations and published videos.</li>
            </ul>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
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
    admin: "from-[#3B4A6B] to-[#52658f] text-white",
    kids: "from-[#E8A33D] to-[#ffbf58] text-slate-950",
    general: "from-[#1F8A8C] to-[#2fa4a7] text-white",
    alert: "from-[#C2542B] to-[#db6d47] text-white",
  };

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${toneStyles[tone]} p-5 shadow-lg shadow-slate-200/40`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] opacity-80">{label}</p>
      <p className="mt-3 text-3xl font-semibold tabular-nums">{value.toLocaleString()}</p>
      <p className="mt-2 text-sm opacity-85">{sublabel}</p>
    </div>
  );
}

function formatShortTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-56 rounded-3xl bg-slate-200/70 animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200/70 animate-pulse" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-80 rounded-3xl bg-slate-200/70 animate-pulse" />
          <div className="h-80 rounded-3xl bg-slate-200/70 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
