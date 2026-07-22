import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { WeeklyUploadPoint } from "../types/dashboard";

export function WeeklyUploadsChart({ data }: { data: WeeklyUploadPoint[] }) {
  return (
    <div className="rounded-card border border-border bg-surface p-5 shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-floating">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">Weekly uploads</p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-heading">Videos published per week</h2>
        </div>
        <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-body ring-1 ring-border">{data.length} weeks</span>
      </div>

      <div className="mt-5 h-[280px]">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-card border border-dashed border-border bg-background text-sm text-muted">
            No weekly uploads available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="uploadFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(226 232 240)" vertical={false} />
              <XAxis dataKey="weekLabel" tick={{ fontSize: 12, fill: "rgb(100 116 139)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "rgb(100 116 139)" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 16, borderColor: "rgb(226 232 240)", fontSize: 12, backgroundColor: "#FFFFFF" }}
                labelStyle={{ color: "rgb(15 23 42)", fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="uploadCount" stroke="#4F46E5" strokeWidth={2.5} fill="url(#uploadFill)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
