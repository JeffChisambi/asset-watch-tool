import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Wrench, Flame, Home, Clock, CheckCircle2,
  ArrowUpRight, ArrowDownRight, Building2,
  ChevronRight, Calendar, Plus, Download, ChevronDown,
} from "lucide-react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Supervisor Dashboard — Maintenance Operations" },
      { name: "description", content: "Oversight, performance monitoring and reporting for property maintenance operations." },
    ],
  }),
  component: Dashboard,
});

/* ---------- helpers ---------- */
function Stat({ icon: Icon, label, value, sub, trend, tone = "primary" }: any) {
  const toneMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    danger: "bg-destructive/10 text-destructive",
    success: "bg-success/10 text-success",
    warning: "bg-warning/20 text-warning-foreground",
  };
  return (
    <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={`size-7 grid place-items-center rounded-full ${toneMap[tone]}`}>
          <Icon className="size-4" />
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {trend && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${trend.up ? "text-success" : "text-destructive"}`}>
            {trend.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {trend.value}
          </span>
        )}
      </div>
      <span className="text-xs text-muted-foreground">{sub}</span>
    </div>
  );
}

/* ---------- charts (pure SVG) ---------- */
const trendData = [
  { label: "1 Jan",  plumbing: 2,  electrical: 1, hvac: 1  },
  { label: "",       plumbing: 5,  electrical: 2, hvac: 1  },
  { label: "",       plumbing: 6,  electrical: 3, hvac: 2  },
  { label: "",       plumbing: 2,  electrical: 1, hvac: 0  },
  { label: "",       plumbing: 1,  electrical: 1, hvac: 0  },
  { label: "",       plumbing: 8,  electrical: 4, hvac: 2  },
  { label: "",       plumbing: 10, electrical: 5, hvac: 3  },
  { label: "8 Jan",  plumbing: 11, electrical: 6, hvac: 2  },
  { label: "",       plumbing: 9,  electrical: 5, hvac: 2  },
  { label: "",       plumbing: 7,  electrical: 4, hvac: 2  },
  { label: "",       plumbing: 2,  electrical: 1, hvac: 1  },
  { label: "",       plumbing: 2,  electrical: 1, hvac: 0  },
  { label: "",       plumbing: 9,  electrical: 5, hvac: 2  },
  { label: "",       plumbing: 11, electrical: 6, hvac: 3  },
  { label: "15 Jan", plumbing: 13, electrical: 6, hvac: 3  },
  { label: "",       plumbing: 10, electrical: 6, hvac: 2  },
  { label: "",       plumbing: 8,  electrical: 5, hvac: 2  },
  { label: "",       plumbing: 3,  electrical: 1, hvac: 1  },
  { label: "",       plumbing: 2,  electrical: 1, hvac: 0  },
  { label: "",       plumbing: 10, electrical: 5, hvac: 3  },
  { label: "",       plumbing: 13, electrical: 7, hvac: 3  },
  { label: "22 Jan", plumbing: 14, electrical: 7, hvac: 4  },
  { label: "",       plumbing: 11, electrical: 6, hvac: 3  },
  { label: "",       plumbing: 9,  electrical: 6, hvac: 2  },
  { label: "",       plumbing: 3,  electrical: 2, hvac: 1  },
  { label: "",       plumbing: 2,  electrical: 1, hvac: 1  },
  { label: "",       plumbing: 12, electrical: 6, hvac: 3  },
  { label: "",       plumbing: 15, electrical: 8, hvac: 3  },
  { label: "29 Jan", plumbing: 16, electrical: 8, hvac: 4  },
  { label: "",       plumbing: 13, electrical: 8, hvac: 3  },
  { label: "",       plumbing: 12, electrical: 7, hvac: 3  },
];

function TrendChart() {
  return (
    <ResponsiveContainer width="100%" height={176}>
      <AreaChart data={trendData} margin={{ top: 4, right: 12, left: 12, bottom: 0 }}>
        <defs>
          <linearGradient id="gradPlumbing" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradElectrical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradHvac" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "oklch(0.55 0.02 250)" }}
          axisLine={false}
          tickLine={false}
          interval={0}
        />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid oklch(0.92 0.008 250)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          labelStyle={{ fontWeight: 600 }}
          labelFormatter={(l) => l || ""}
          formatter={(v: number, name: string) => [v, name === "plumbing" ? "Plumbing" : name === "electrical" ? "Electrical" : "HVAC / Other"]}
        />
        <Legend
          iconType="circle"
          iconSize={7}
          formatter={(val) => val === "plumbing" ? "Plumbing" : val === "electrical" ? "Electrical" : "HVAC / Other"}
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
        />
        <Area type="monotone" dataKey="plumbing"    stroke="#3b82f6" strokeWidth={2} fill="url(#gradPlumbing)"    dot={false} activeDot={{ r: 4, stroke: "white", strokeWidth: 2 }} />
        <Area type="monotone" dataKey="electrical"  stroke="#22c55e" strokeWidth={2} fill="url(#gradElectrical)"  dot={false} activeDot={{ r: 4, stroke: "white", strokeWidth: 2 }} />
        <Area type="monotone" dataKey="hvac"        stroke="#f59e0b" strokeWidth={2} fill="url(#gradHvac)"        dot={false} activeDot={{ r: 4, stroke: "white", strokeWidth: 2 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function WeekdayChart() {
  const days = [{ d: "Sun", v: 3 }, { d: "Mon", v: 8 }, { d: "Tue", v: 14 }, { d: "Wed", v: 6 }, { d: "Thu", v: 9 }, { d: "Fri", v: 5 }, { d: "Sat", v: 2 }];
  const max = 14;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setProgress(eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="h-44 flex items-end gap-2 px-1">
      {days.map((d) => {
        const active = d.d === "Tue";
        const animatedHeight = (d.v / max) * 100 * progress;
        return (
          <div key={d.d} className="flex-1 flex flex-col items-center gap-2 h-full">
            {active && <span className="text-xs font-semibold text-foreground -mb-1">{d.v}</span>}
            <div className="w-full flex-1 flex items-end">
              <div className={`w-full rounded-md ${active ? "bg-primary" : "bg-muted"}`} style={{ height: `${animatedHeight}%` }} />
            </div>
            <span className={`text-[11px] ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>{d.d}</span>
          </div>
        );
      })}
    </div>
  );
}

function Gauge({ value = 68 }) {
  const [displayed, setDisplayed] = useState(0);
  const seg = 40;

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setDisplayed(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <div className="relative w-full grid place-items-center py-2">
      <svg viewBox="0 0 200 120" className="w-56">
        {Array.from({ length: seg }).map((_, i) => {
          const a = Math.PI * (i / (seg - 1));
          const x1 = 100 + Math.cos(Math.PI - a) * 80;
          const y1 = 100 - Math.sin(Math.PI - a) * 80;
          const x2 = 100 + Math.cos(Math.PI - a) * 95;
          const y2 = 100 - Math.sin(Math.PI - a) * 95;
          const active = i / seg <= displayed / 100;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={active ? "oklch(0.68 0.16 155)" : "oklch(0.92 0.008 250)"} strokeWidth="3" strokeLinecap="round" />;
        })}
        <text x="100" y="92" textAnchor="middle" className="fill-foreground" style={{ fontSize: 26, fontWeight: 700 }}>{displayed}%</text>
      </svg>
      <p className="text-xs text-muted-foreground -mt-2">On track to 75% SLA target</p>
    </div>
  );
}

/* ---------- dashboard ---------- */
function Dashboard() {
  const urgent = [
    { p: "House A12", issue: "Electrical outage — full unit", mgr: "John Banda", time: "2h 14m", over: true },
    { p: "Flat C4", issue: "Water main rupture", mgr: "Peter Mulenga", time: "1h 02m", over: false },
    { p: "House D9", issue: "Sewer overflow in bathroom", mgr: "Grace Moyo", time: "45m", over: false },
    { p: "Block E2", issue: "Gas leak near kitchen", mgr: "Linda Phiri", time: "28m", over: false },
  ];

  return (
    <DashboardShell>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">SGWops Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Live oversight across 142 properties · 6 managers · 18 technicians</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Calendar className="size-4 text-muted-foreground" />Jan 1, 2026 – Feb 1, 2026
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            Last 30 days <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
            <Download className="size-4" />Export
          </button>
        </div>
      </div>

      {/* Executive cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={Wrench} label="Open Tickets" value="36" sub="vs. 41 last period" trend={{ up: false, value: "12.2%" }} tone="primary" />
        <Stat icon={Flame} label="Urgent Issues" value="5" sub="vs. 3 last period" trend={{ up: true, value: "66%" }} tone="danger" />
        <Stat icon={CheckCircle2} label="Completed Today" value="14" sub="vs. 11 yesterday" trend={{ up: true, value: "27%" }} tone="success" />
        <Stat icon={Clock} label="Overdue Jobs" value="3" sub="2 over SLA threshold" trend={{ up: false, value: "1.0%" }} tone="warning" />
      </div>

      {/* Two-column layout: left = Trend + Urgent, right = Repeat Rate + Most Active Day */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <SectionCard title="Maintenance Trend"
            action={<div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-primary" />Tickets created<span className="ml-3">Avg resolution <span className="text-foreground font-semibold ml-1">2.4d</span></span></div>}>
            <div className="mb-2">
              <p className="text-3xl font-bold tracking-tight">446</p>
              <p className="text-xs text-success font-medium mt-0.5 inline-flex items-center gap-1"><ArrowUpRight className="size-3" />24.4% vs last period</p>
            </div>
            <TrendChart />
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3">
              <div className="rounded-lg border border-border px-2.5 py-2">
                <p className="text-[11px] text-muted-foreground">Plumbing</p>
                <p className="text-sm font-bold mt-0.5">2,884</p>
                <div className="h-0.5 rounded-full bg-info mt-1.5" />
              </div>
              <div className="rounded-lg border border-border px-2.5 py-2">
                <p className="text-[11px] text-muted-foreground">Electrical</p>
                <p className="text-sm font-bold mt-0.5">1,432</p>
                <div className="h-0.5 rounded-full bg-success mt-1.5" />
              </div>
              <div className="rounded-lg border border-border px-2.5 py-2">
                <p className="text-[11px] text-muted-foreground">HVAC / Other</p>
                <p className="text-sm font-bold mt-0.5">562</p>
                <div className="h-0.5 rounded-full bg-warning mt-1.5" />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Urgent Issues Monitor"
            action={<a className="text-xs text-primary font-medium inline-flex items-center gap-1">View all<ChevronRight className="size-3" /></a>}>
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="text-left font-medium pb-2">Property</th>
                  <th className="text-left font-medium pb-2">Issue</th>
                  <th className="text-left font-medium pb-2">Manager</th>
                  <th className="text-right font-medium pb-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {urgent.map((u, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="size-7 rounded-lg bg-muted grid place-items-center"><Home className="size-3.5 text-muted-foreground" /></span>
                        <span className="font-medium">{u.p}</span>
                      </div>
                    </td>
                    <td className="py-3 max-w-[200px] truncate text-muted-foreground">{u.issue}</td>
                    <td className="py-3">{u.mgr}</td>
                    <td className="py-3 text-right">
                      <button className="text-xs px-2 py-1 rounded-md bg-destructive/10 text-destructive font-medium">Escalate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <SectionCard title="Repeat Maintenance Rate">
            <Gauge value={68} />
            <button className="mx-auto mt-3 block text-xs font-medium rounded-full border border-border px-3 py-1.5 hover:bg-muted">Show details</button>
          </SectionCard>

          <SectionCard title="Most Active Day">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xs text-muted-foreground">Peak load</span>
            </div>
            <WeekdayChart />
          </SectionCard>
        </div>
      </div>

    </DashboardShell>
  );
}
