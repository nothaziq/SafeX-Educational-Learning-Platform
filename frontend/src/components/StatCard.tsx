interface StatCardProps {
  label: string;
  value: number;
  accent: "kids" | "general" | "admin" | "alert";
}

const accentStyles: Record<StatCardProps["accent"], { border: string; text: string }> = {
  kids: { border: "border-l-warning", text: "text-warning" },
  general: { border: "border-l-success", text: "text-success" },
  admin: { border: "border-l-primary", text: "text-primary" },
  alert: { border: "border-l-danger", text: "text-danger" },
};

export function StatCard({ label, value, accent }: StatCardProps) {
  const styles = accentStyles[accent];
  return (
    <div className={`rounded-card border border-border border-l-4 ${styles.border} bg-surface p-4 shadow-soft transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-floating`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">{label}</p>
      <p className={`mt-2 text-3xl font-semibold tracking-tight ${styles.text}`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}
