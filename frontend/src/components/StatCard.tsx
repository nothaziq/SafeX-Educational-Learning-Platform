interface StatCardProps {
  label: string;
  value: number;
  accent: "kids" | "general" | "admin" | "alert";
}

const accentStyles: Record<StatCardProps["accent"], { border: string; text: string }> = {
  kids: { border: "border-l-[#E8A33D]", text: "text-[#E8A33D]" },
  general: { border: "border-l-[#1F8A8C]", text: "text-[#1F8A8C]" },
  admin: { border: "border-l-[#3B4A6B]", text: "text-[#3B4A6B]" },
  alert: { border: "border-l-[#C2542B]", text: "text-[#C2542B]" },
};

export function StatCard({ label, value, accent }: StatCardProps) {
  const styles = accentStyles[accent];
  return (
    <div className={`rounded-2xl border border-slate-200 border-l-4 ${styles.border} bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-semibold tracking-tight ${styles.text}`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}
