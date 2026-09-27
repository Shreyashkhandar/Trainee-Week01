interface StatusBadgeProps {
  value: string;
  kind?: 'facility' | 'inspection' | 'complaint' | 'priority';
}

export function StatusBadge({ value, kind = 'facility' }: StatusBadgeProps) {
  const normalized = value.toLowerCase();
  const tone = normalized === 'critical' || normalized === 'inactive'
    ? 'badge--danger'
    : normalized.includes('follow') || normalized === 'pending' || normalized === 'open' || normalized === 'high'
      ? 'badge--warning'
      : normalized === 'in progress' || normalized === 'medium'
        ? 'badge--blue'
        : normalized === 'resolved' || normalized === 'completed' || normalized === 'active'
          ? ''
          : 'badge--muted';
  return <span className={`badge badge--${kind}${tone ? ` ${tone}` : ''}`}>{value}</span>;
}