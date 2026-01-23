export function StatBox({
  label,
  value,
  symbol,
}: {
  label: string;
  value: string;
  symbol?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold truncate">
        {value}{" "}
        <span className="text-sm font-normal text-muted-foreground">
          {symbol}
        </span>
      </p>
    </div>
  );
}
