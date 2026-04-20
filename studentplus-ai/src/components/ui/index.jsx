import { clsx } from 'clsx'

// ── MetricCard ─────────────────────────────────────────────
export const MetricCard = ({ label, value, sub, subColor = 'text-sp-sub', valueColor = 'text-sp-teal', children }) => (
  <div className="card-sm flex flex-col gap-1">
    <p className="section-label">{label}</p>
    <p className={clsx('metric-big', valueColor)}>{value}</p>
    {sub && <p className={clsx('text-[11px]', subColor)}>{sub}</p>}
    {children}
  </div>
)

// ── ProgressBar ────────────────────────────────────────────
export const ProgressBar = ({ label, value, max = 100, color = 'accent', showValue = true }) => {
  const pct = Math.round((value / max) * 100)
  const colors = {
    accent: 'from-sp-accent to-purple-400',
    teal:   'from-sp-teal to-emerald-400',
    amber:  'from-sp-amber to-orange-400',
    red:    'from-sp-red to-rose-400',
  }
  return (
    <div className="mb-2.5">
      <div className="flex justify-between text-[11px] text-sp-sub mb-1">
        <span>{label}</span>
        {showValue && <span className="font-mono">{value}{max === 100 ? '%' : `/${max}`}</span>}
      </div>
      <div className="h-1.5 bg-sp-border rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full bg-gradient-to-r prog-fill', colors[color] || colors.accent)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// ── Badge ──────────────────────────────────────────────────
export const Badge = ({ children, variant = 'accent' }) => (
  <span className={`badge-${variant}`}>{children}</span>
)

// ── StatusPill ─────────────────────────────────────────────
export const StatusPill = ({ status }) => {
  const map = {
    open:     { cls: 'badge-teal',  label: 'Apply Now' },
    applied:  { cls: 'badge-accent', label: 'Applied' },
    closed:   { cls: 'badge-muted',  label: 'Closed' },
    high:     { cls: 'badge-red',    label: 'High Risk' },
    medium:   { cls: 'badge-amber',  label: 'Medium' },
    low:      { cls: 'badge-teal',   label: 'Low' },
    eligible: { cls: 'badge-teal',   label: 'Eligible ✓' },
  }
  const { cls, label } = map[status] || { cls: 'badge-muted', label: status }
  return <span className={cls}>{label}</span>
}

// ── ScoreRing ──────────────────────────────────────────────
export const ScoreRing = ({ score, max = 100, size = 88, strokeWidth = 7 }) => {
  const r = (size - strokeWidth * 2) / 2
  const circ = 2 * Math.PI * r
  const pct = score / max
  const offset = circ * (1 - pct)
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--sp-border)" strokeWidth={strokeWidth} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke="url(#ringGrad)" strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#00D4AA" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-xl font-semibold text-sp-teal leading-none">{score}</span>
        <span className="text-[9px] text-sp-muted">/{max}</span>
      </div>
    </div>
  )
}

// ── Skeleton ───────────────────────────────────────────────
export const Skeleton = ({ h = 'h-4', w = 'w-full', rounded = 'rounded-lg' }) => (
  <div className={clsx('bg-sp-border animate-pulse', h, w, rounded)} />
)

export const SkeletonCard = () => (
  <div className="card space-y-3">
    <Skeleton h="h-3" w="w-24" />
    <Skeleton h="h-8" w="w-32" />
    <Skeleton h="h-3" w="w-48" />
  </div>
)

// ── InsightCard ────────────────────────────────────────────
export const InsightCard = ({ type, title, desc }) => {
  const variants = {
    success: { border: 'border-sp-teal/20', bg: 'bg-sp-teal/5', color: 'text-sp-teal', icon: '✅' },
    warning: { border: 'border-sp-amber/20', bg: 'bg-sp-amber/5', color: 'text-sp-amber', icon: '⚠' },
    info:    { border: 'border-sp-accent/20', bg: 'bg-sp-accent/5', color: 'text-sp-accent', icon: '🎯' },
    danger:  { border: 'border-sp-red/20', bg: 'bg-sp-red/5', color: 'text-sp-red', icon: '🔴' },
  }
  const v = variants[type] || variants.info
  return (
    <div className={clsx('flex-1 min-w-[180px] rounded-xl p-3 border', v.bg, v.border)}>
      <p className={clsx('text-[11px] font-semibold mb-1', v.color)}>{v.icon} {title}</p>
      <p className="text-[11px] text-sp-sub leading-relaxed">{desc}</p>
    </div>
  )
}

// ── SectionHeader ──────────────────────────────────────────
export const SectionHeader = ({ title, sub, right }) => (
  <div className="flex items-start justify-between mb-5">
    <div>
      <h1 className="page-title">{title}</h1>
      {sub && <p className="page-sub">{sub}</p>}
    </div>
    {right}
  </div>
)

// ── Empty State ────────────────────────────────────────────
export const EmptyState = ({ icon = '📭', message = 'No data found' }) => (
  <div className="flex flex-col items-center justify-center py-12 text-sp-muted gap-2">
    <span className="text-3xl">{icon}</span>
    <p className="text-sm">{message}</p>
  </div>
)

// ── Divider ────────────────────────────────────────────────
export const Divider = () => <div className="h-px bg-sp-border my-4" />
