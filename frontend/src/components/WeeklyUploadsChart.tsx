import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { WeeklyUploadPoint } from "../types/dashboard";

export function WeeklyUploadsChart({ data }: { data: WeeklyUploadPoint[] }) {
  const total = data.reduce((sum, point) => sum + point.uploadCount, 0);

  return (
    <div className="rounded-card border border-border/70 bg-surface/55 p-5 shadow-card backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-px hover:shadow-floating">
      <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-[18px]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">Weekly output</p>
          <h2 className="mt-1.5 text-[1.05rem] font-semibold tracking-tight text-heading">
            Published <span className="font-normal text-body">- videos per week</span>
          </h2>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[1.8rem] font-bold leading-none tracking-tight tabular-nums text-heading">{total}</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] leading-tight text-body">
            Videos
            <br />
            published
          </div>
        </div>
      </div>

      <div className="mt-[18px] h-[260px]">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-card border border-dashed border-border bg-background text-sm text-muted">
            No weekly uploads available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="uploadFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(160 42 104)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="rgb(160 42 104)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(228 228 228)" vertical={false} />
              <XAxis dataKey="weekLabel" tick={{ fontSize: 11, fill: "rgb(138 138 138)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "rgb(138 138 138)" }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 2, borderColor: "rgb(216 216 216)", fontSize: 12, backgroundColor: "#FFFFFF" }}
                labelStyle={{ color: "rgb(10 10 10)", fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="uploadCount" stroke="rgb(160 42 104)" strokeWidth={2.5} fill="url(#uploadFill)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
