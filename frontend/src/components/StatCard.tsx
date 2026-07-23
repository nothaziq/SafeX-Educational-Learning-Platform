interface StatCardProps {
  label: string;
  value: number;
  accent: "kids" | "general" | "admin" | "alert";
}

const accentStyles: Record<StatCardProps["accent"], { border: string; text: string; icon: string }> = {
  kids: { border: "border-l-warning", text: "text-warning", icon: "bi-emoji-smile" },
  general: { border: "border-l-success", text: "text-success", icon: "bi-people" },
  admin: { border: "border-l-primary", text: "text-primary", icon: "bi-columns-gap" },
  alert: { border: "border-l-danger", text: "text-danger", icon: "bi-hourglass-split" },
};

export function StatCard({ label, value, accent }: StatCardProps) {
  const styles = accentStyles[accent];
  return (
    <div className={`group relative overflow-hidden rounded-card border border-border/70 border-l-2 ${styles.border} bg-surface/55 p-[18px] shadow-soft backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-px hover:bg-surface/70 hover:shadow-floating`}>
      <div className="flex items-center justify-between text-muted">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">{label}</p>
        <i className={`bi ${styles.icon} text-[15px]`} />
      </div>
      <p className={`mt-1 text-[1.9rem] font-semibold leading-none tracking-tight tabular-nums ${styles.text}`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}
