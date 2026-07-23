interface SummaryTileProps {
  label: string;
  value: number;
  sublabel: string;
  tone: "admin" | "kids" | "general" | "alert";
  icon: string;
}

const toneStyles: Record<SummaryTileProps["tone"], { border: string; iconBg: string; iconText: string; value: string }> = {
  admin: { border: "border-l-primary", iconBg: "bg-primary/10", iconText: "text-primary", value: "text-primary" },
  alert: { border: "border-l-danger", iconBg: "bg-danger/10", iconText: "text-danger", value: "text-danger" },
  general: { border: "border-l-success", iconBg: "bg-success/10", iconText: "text-success-strong", value: "text-success-strong" },
  kids: { border: "border-l-warning", iconBg: "bg-warning/10", iconText: "text-warning-soft", value: "text-warning-soft" },
};

export function SummaryTile({ label, value, sublabel, tone, icon }: SummaryTileProps) {
  const styles = toneStyles[tone];

  return (
    <div
      className={`group relative overflow-hidden rounded-card border border-border/70 border-l-4 ${styles.border} bg-surface p-5 shadow-soft transition-all duration-300 ease-out hover:-translate-y-px hover:shadow-floating`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">{label}</p>
        <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${styles.iconBg} ${styles.iconText} text-base`}>
          <i className={`bi ${icon}`} />
        </div>
      </div>
      <p className={`mt-3 text-3xl font-bold tracking-tight tabular-nums ${styles.value}`}>{value.toLocaleString()}</p>
      <p className="mt-2 text-sm leading-6 text-body">{sublabel}</p>
    </div>
  );
}