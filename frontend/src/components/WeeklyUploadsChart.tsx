import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { WeeklyUploadPoint } from "../types/dashboard";

export function WeeklyUploadsChart({ data }: { data: WeeklyUploadPoint[] }) {
  return (
    <div className="bg-white rounded-md border border-slate-200 p-4 shadow-sm">
      <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-4">Videos Published / Week</p>
      <ResponsiveContainer width="100%" height={260}>
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
          <Tooltip contentStyle={{ borderRadius: 6, borderColor: "#E2E8F0", fontSize: 12 }} />
          <Area type="monotone" dataKey="uploadCount" stroke="#3B4A6B" strokeWidth={2} fill="url(#uploadFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
