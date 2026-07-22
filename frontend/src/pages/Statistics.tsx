import { motion } from "framer-motion";
import { useDashboard } from "../services/dashboardService";
import { StatCard } from "../components/StatCard";
import { WeeklyUploadsChart } from "../components/WeeklyUploadsChart";
import { fallbackDashboard } from "../types/dashboard";

const statCards = [
  { label: "Total Videos", accent: "admin" as const },
  { label: "Kids Videos", accent: "kids" as const },
  { label: "General Videos", accent: "general" as const },
  { label: "Published Videos", accent: "admin" as const },
  { label: "Pending Recommendations", accent: "alert" as const },
  { label: "Users", accent: "admin" as const },
  { label: "Categories", accent: "admin" as const },
];

export default function Statistics() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <StatisticsSkeleton />;
  if (isError || !data) return <p className="p-6 text-danger">Couldn't load statistics data.</p>;

  const { summary, weeklyUploads, videosByCategory } = data;
  const isDemoMode = data === fallbackDashboard;

  return (
    <div className="min-h-full bg-background px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-card border border-border bg-surface p-5 shadow-shell backdrop-blur transition-all duration-300 ease-out"
        >
          <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-info">SafeX statistics</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-heading md:text-3xl">Statistics Panel</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-body">
                Weekly publishing trends, category balance, and the full statistics view for the SafeX admin team.
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
        </motion.section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryTile label="Total Videos" value={summary.totalVideos} tone="admin" sublabel="All videos in the platform" />
          <SummaryTile label="Pending Recommendations" value={summary.pendingRecommendations} tone="alert" sublabel="Awaiting admin review" />
          <SummaryTile label="Published Videos" value={summary.publishedVideos} tone="general" sublabel="Available to learners" />
          <SummaryTile label="Categories" value={summary.categories} tone="kids" sublabel="Content areas in SafeX" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {statCards.map((card, index) => {
            const value = summary[keyFromLabel(card.label)];

            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="xl:col-span-1"
              >
                <StatCard label={card.label} value={value} accent={card.accent} />
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <WeeklyUploadsChart data={weeklyUploads} />

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="rounded-card border border-border bg-surface p-5 shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-floating"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">Videos by category</p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight text-heading">Top categories</h2>
              </div>
              <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-body ring-1 ring-border">{videosByCategory.length} categories</span>
            </div>

            <div className="mt-5 space-y-3">
              {videosByCategory.slice(0, 6).map((category, index) => (
                <div key={category.categoryName} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-body">{category.categoryName}</span>
                    <span className="font-mono text-heading">{category.videoCount}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-background">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary via-info to-warning"
                      style={{ width: `${Math.max(18, 100 - index * 12)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
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

function keyFromLabel(label: string): keyof typeof fallbackDashboard.summary {
  switch (label) {
    case "Total Videos":
      return "totalVideos";
    case "Kids Videos":
      return "kidsVideos";
    case "General Videos":
      return "generalVideos";
    case "Published Videos":
      return "publishedVideos";
    case "Pending Recommendations":
      return "pendingRecommendations";
    case "Users":
      return "users";
    case "Categories":
      return "categories";
    default:
      return "totalVideos";
  }
}

function StatisticsSkeleton() {
  return (
    <div className="min-h-full bg-background px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-56 rounded-card bg-border/60 animate-pulse" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-card bg-border/60 animate-pulse" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-24 rounded-card bg-border/60 animate-pulse" />
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
