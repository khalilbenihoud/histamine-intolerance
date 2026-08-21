"use client";

import { useMemo, useState } from "react";
import { foods, CATEGORIES, TIERS, type Category, type Tier } from "@/data/foods";

const TIER_COLORS: Record<Tier, string> = {
  0: "var(--tier-0)",
  1: "var(--tier-1)",
  2: "var(--tier-2)",
  3: "var(--tier-3)",
};

// Plot geometry (SVG user units).
const W = 1000;
const H = 640;
const PAD = { top: 32, right: 32, bottom: 56, left: 60 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

const x = (v: number) => PAD.left + (v / 100) * plotW;
const y = (v: number) => PAD.top + (1 - v / 100) * plotH; // higher trigger = higher up

// Small deterministic jitter so identical scores don't perfectly overlap.
const jitter = (name: string, spread = 1.6) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997;
  return ((h % 100) / 100 - 0.5) * 2 * spread;
};

export default function Home() {
  const [category, setCategory] = useState<Category | "All">("All");
  const [tierFilter, setTierFilter] = useState<Tier | "All">("All");
  const [query, setQuery] = useState("");
  const [hover, setHover] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  const points = useMemo(() => {
    const pts = foods.map((f) => {
      const matchesCat = category === "All" || f.category === category;
      const matchesTier = tierFilter === "All" || f.tier === tierFilter;
      const matchesQuery = q === "" || f.name.toLowerCase().includes(q);
      return {
        ...f,
        active: matchesCat && matchesTier && matchesQuery,
        cx: x(f.histamine + jitter(f.name)),
        cy: y(f.trigger + jitter(f.name + "y")),
        homeX: x(f.histamine),
        homeY: y(f.trigger),
      };
    });

    // Relax only the visible points so emoji markers don't stack up.
    // Each iteration pushes overlapping pairs apart, then pulls every point
    // gently back toward its true (home) position.
    const visible = pts.filter((p) => p.active);
    const MIN = 30; // desired center-to-center spacing in SVG units
    for (let iter = 0; iter < 120; iter++) {
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const a = visible[i];
          const b = visible[j];
          let dx = b.cx - a.cx;
          let dy = b.cy - a.cy;
          let d = Math.hypot(dx, dy) || 0.01;
          if (d < MIN) {
            const push = (MIN - d) / 2;
            dx /= d;
            dy /= d;
            a.cx -= dx * push;
            a.cy -= dy * push;
            b.cx += dx * push;
            b.cy += dy * push;
          }
        }
      }
      // spring back toward home + clamp to plot area
      for (const p of visible) {
        p.cx += (p.homeX - p.cx) * 0.04;
        p.cy += (p.homeY - p.cy) * 0.04;
        p.cx = Math.max(PAD.left + 12, Math.min(PAD.left + plotW - 12, p.cx));
        p.cy = Math.max(PAD.top + 12, Math.min(PAD.top + plotH - 12, p.cy));
      }
    }
    return pts;
  }, [category, tierFilter, q]);

  const activeCount = points.filter((p) => p.active).length;
  const hovered = points.find((p) => p.name === hover) ?? null;

  return (
    <main className="viz-root min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
            Histamine intolerance
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            The Histamine Food Map
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
            {foods.length} everyday foods plotted by their own{" "}
            <strong>histamine content</strong> and their{" "}
            <strong>additional trigger load</strong> — histamine liberators,
            DAO-blockers and other biogenic amines. Bottom-left is safest;
            top-right is best avoided.
          </p>
        </header>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a food…"
            className="h-10 w-56 rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 text-sm outline-none focus:border-[var(--text-secondary)]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | "All")}
            className="h-10 rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 text-sm outline-none"
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <span className="text-sm text-[var(--text-muted)]">
            {activeCount} shown
          </span>
        </div>

        {/* Tier legend / filter */}
        <div className="mb-4 flex flex-wrap gap-2">
          <TierChip
            label="All levels"
            active={tierFilter === "All"}
            onClick={() => setTierFilter("All")}
          />
          {TIERS.map((t) => (
            <TierChip
              key={t.tier}
              label={t.label}
              color={TIER_COLORS[t.tier]}
              active={tierFilter === t.tier}
              onClick={() =>
                setTierFilter(tierFilter === t.tier ? "All" : t.tier)
              }
            />
          ))}
        </div>

        {/* Chart */}
        <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-2 sm:p-4">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            role="img"
            aria-label="Scatter plot of foods by histamine content and trigger load"
          >
            {/* Quadrant fills */}
            <rect x={x(0)} y={y(50)} width={plotW / 2} height={plotH / 2} fill="var(--tier-0)" opacity="0.05" />
            <rect x={x(50)} y={PAD.top} width={plotW / 2} height={plotH / 2} fill="var(--tier-3)" opacity="0.06" />

            {/* Gridlines */}
            {[0, 25, 50, 75, 100].map((v) => (
              <g key={`gx-${v}`}>
                <line x1={x(v)} y1={PAD.top} x2={x(v)} y2={PAD.top + plotH} stroke="var(--grid)" strokeWidth="1" />
                <text x={x(v)} y={PAD.top + plotH + 20} textAnchor="middle" className="axis-tick">
                  {v}
                </text>
              </g>
            ))}
            {[0, 25, 50, 75, 100].map((v) => (
              <g key={`gy-${v}`}>
                <line x1={PAD.left} y1={y(v)} x2={PAD.left + plotW} y2={y(v)} stroke="var(--grid)" strokeWidth="1" />
                <text x={PAD.left - 10} y={y(v) + 4} textAnchor="end" className="axis-tick">
                  {v}
                </text>
              </g>
            ))}

            {/* Axis titles */}
            <text x={PAD.left + plotW / 2} y={H - 8} textAnchor="middle" className="axis-title">
              Histamine content  →
            </text>
            <text
              transform={`translate(16, ${PAD.top + plotH / 2}) rotate(-90)`}
              textAnchor="middle"
              className="axis-title"
            >
              Trigger load (liberators · DAO-block)  →
            </text>

            {/* Quadrant captions */}
            <text x={x(4)} y={y(96)} className="quad-label" fill="var(--tier-0)">
              SAFE ZONE
            </text>
            <text x={x(96)} y={y(4)} textAnchor="end" className="quad-label" fill="var(--tier-3)">
              AVOID
            </text>

            {/* Inactive points first (dimmed) */}
            {points
              .filter((p) => !p.active)
              .map((p) => (
                <circle key={p.name} cx={p.cx} cy={p.cy} r={5} fill="var(--text-muted)" opacity={0.12} />
              ))}

            {/* Active points */}
            {points
              .filter((p) => p.active)
              .map((p) => {
                const isHover = p.name === hover;
                return (
                  <g
                    key={p.name}
                    className="cursor-pointer"
                    onMouseEnter={() => setHover(p.name)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {p.emoji ? (
                      <>
                        {/* tier-colored halo behind the emoji */}
                        <circle
                          cx={p.cx}
                          cy={p.cy}
                          r={isHover ? 15 : 12}
                          fill={TIER_COLORS[p.tier]}
                          opacity={isHover ? 0.32 : 0.2}
                          stroke={TIER_COLORS[p.tier]}
                          strokeWidth="1.5"
                        />
                        <text
                          x={p.cx}
                          y={p.cy}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={isHover ? 20 : 16}
                          pointerEvents="none"
                        >
                          {p.emoji}
                        </text>
                      </>
                    ) : (
                      <circle
                        cx={p.cx}
                        cy={p.cy}
                        r={isHover ? 9 : 6}
                        fill={TIER_COLORS[p.tier]}
                        stroke="var(--surface-1)"
                        strokeWidth="2"
                      />
                    )}
                    {(isHover || q !== "") && (
                      <text
                        x={p.cx + (p.emoji ? 16 : 10)}
                        y={p.cy + 4}
                        className="point-label"
                        pointerEvents="none"
                      >
                        {p.name}
                      </text>
                    )}
                  </g>
                );
              })}
          </svg>

          {/* Hover detail card */}
          {hovered && (
            <div className="pointer-events-none absolute right-4 top-4 w-60 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: TIER_COLORS[hovered.tier] }}
                />
                <span className="font-semibold">
                  {hovered.emoji && <span className="mr-1">{hovered.emoji}</span>}
                  {hovered.name}
                </span>
              </div>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {hovered.category} · {TIERS[hovered.tier].label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                {hovered.note}
              </p>
              <div className="mt-2 flex gap-4 text-xs tabular-nums text-[var(--text-secondary)]">
                <span>Histamine {hovered.histamine}</span>
                <span>Trigger {hovered.trigger}</span>
              </div>
            </div>
          )}
        </div>

        {/* List view */}
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">Food list</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {points
              .filter((p) => p.active)
              .sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name))
              .map((p) => (
                <div
                  key={p.name}
                  onMouseEnter={() => setHover(p.name)}
                  onMouseLeave={() => setHover(null)}
                  className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: TIER_COLORS[p.tier] }}
                  />
                  {p.emoji && (
                    <span className="text-base leading-none">{p.emoji}</span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="truncate text-xs text-[var(--text-muted)]">
                      {p.category} · {TIERS[p.tier].label}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <footer className="mt-10 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--text-muted)]">
          Educational overview only — not medical advice. Histamine tolerance is
          highly individual, and a food&apos;s histamine level changes sharply
          with freshness, ripeness, storage and preparation. Ratings are aligned
          with common histamine-intolerance food compatibility lists.
        </footer>
      </div>
    </main>
  );
}

function TierChip({
  label,
  color,
  active,
  onClick,
}: {
  label: string;
  color?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-[var(--text-secondary)] bg-[var(--surface-2)]"
          : "border-[var(--border)] hover:bg-[var(--surface-2)]"
      }`}
    >
      {color && (
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      )}
      {label}
    </button>
  );
}
