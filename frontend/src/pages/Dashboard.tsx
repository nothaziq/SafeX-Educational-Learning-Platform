import { useDashboard } from "../services/dashboardService";
import { StatCard } from "../components/StatCard";
import { WeeklyUploadsChart } from "../components/WeeklyUploadsChart";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !data) return <p className="p-6 text-[#C2542B]">Couldn't load dashboard data.</p>;

  const { summary, weeklyUploads, videosByCategory, recentActivities } = data;

  return (
    <div className="p-4 md:p-6 space-y-6 bg-[#F7F8FA] min-h-screen">
      <h1 className="text-xl font-semibold text-slate-900">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Videos" value={summary.totalVideos} accent="admin" />
        <StatCard label="Kids Videos" value={summary.kidsVideos} accent="kids" />
        <StatCard label="General Videos" value={summary.generalVideos} accent="general" />
        <StatCard label="Published" value={summary.publishedVideos} accent="admin" />
        <StatCard label="Pending Recommendations" value={summary.pendingRecommendations} accent="alert" />
        <StatCard label="Users" value={summary.users} accent="admin" />
        <StatCard label="Categories" value={summary.categories} accent="admin" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WeeklyUploadsChart data={weeklyUploads} />
        </div>

        <div className="bg-white rounded-md border border-slate-200 p-4 shadow-sm">
          <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-4">Videos by Category</p>
          <ul className="space-y-2">
            {videosByCategory.slice(0, 6).map((c) => (
              <li key={c.categoryName} className="flex items-center justify-between text-sm">
                <span className="text-slate-700">{c.categoryName}</span>
                <span className="font-mono text-slate-900">{c.videoCount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200 p-4 shadow-sm">
        <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-4">Recent Activity</p>
        <ul className="divide-y divide-slate-100">
          {recentActivities.map((a, i) => (
            <li key={i} className="py-2 flex items-center justify-between text-sm">
              <span className="text-slate-700">
                <span className="font-medium">{a.userName}</span> {a.action}
              </span>
              <span className="text-slate-400 text-xs">{new Date(a.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-24 rounded-md bg-slate-200 animate-pulse" />
      ))}
    </div>
  );
}
