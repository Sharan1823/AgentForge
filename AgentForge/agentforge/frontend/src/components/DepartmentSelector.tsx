const DEPTS = ["SALES", "HR", "MARKETING", "FINANCE", "SUPPORT"] as const;
export type Department = (typeof DEPTS)[number];

export function DepartmentSelector({
  value,
  onChange,
}: {
  value: Department;
  onChange: (d: Department) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {DEPTS.map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => onChange(d)}
          className={
            "px-3 py-1.5 rounded-xl border text-sm transition " +
            (value === d ? "bg-accent/20 border-accent/40" : "bg-white/5 border-white/10 hover:bg-white/10")
          }
        >
          {d}
        </button>
      ))}
    </div>
  );
}

