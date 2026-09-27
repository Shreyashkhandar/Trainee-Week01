interface MetricCardProps {
  label: string;
  value: string | number;
  note?: string;
  tone?: 'forest' | 'gold' | 'clay' | 'blue';
}

export function MetricCard({ label, value, note, tone = 'forest' }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      {note && <span className="metric-note">{note}</span>}
    </article>
  );
}