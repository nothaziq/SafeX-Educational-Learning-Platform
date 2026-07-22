import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { WeeklyUploadPoint } from "../types/dashboard";

export function WeeklyUploadsChart({ data }: { data: WeeklyUploadPoint[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Weekly uploads</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">Videos published per week</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{data.length} weeks</span>
      </div>

      <div className="mt-5 h-[280px]">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
            No weekly uploads available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="uploadFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B4A6B" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3B4A6B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="weekLabel" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#E2E8F0", fontSize: 12 }} />
              <Area type="monotone" dataKey="uploadCount" stroke="#3B4A6B" strokeWidth={2.5} fill="url(#uploadFill)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
