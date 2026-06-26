import { createFileRoute } from "@tanstack/react-router";
import {
  Wrench, Flame, Home, Clock, CheckCircle2,
  ArrowUpRight, ArrowDownRight, Building2,
  ChevronRight, Calendar, Plus, Download, ChevronDown,
} from "lucide-react";
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
function TrendChart() {
  const data = [12, 18, 14, 22, 19, 26, 24, 30, 27, 34, 31, 38, 35, 41, 39, 46];
  const max = Math.max(...data), min = Math.min(...data);
  const w = 100, h = 40;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`).join(" ");
  const area = `M0,${h} L${pts.split(" ").join(" L")} L${w},${h} Z`.replace("L0,", "0,");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-44 overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.58 0.21 260)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.58 0.21 260)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2={w} y1={(h / 3) * i} y2={(h / 3) * i} stroke="oklch(0.92 0.008 250)" strokeWidth="0.2" strokeDasharray="0.5,0.8" />)}
      <path d={area} fill="url(#g1)" />
      <polyline points={pts} fill="none" stroke="oklch(0.58 0.21 260)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx={(9 / 15) * w} cy={h - ((data[9] - min) / (max - min)) * h} r="1.2" fill="oklch(0.58 0.21 260)" stroke="white" strokeWidth="0.5" />
    </svg>
  );
}

function WeekdayChart() {
  const days = [{ d: "Sun", v: 3 }, { d: "Mon", v: 8 }, { d: "Tue", v: 14 }, { d: "Wed", v: 6 }, { d: "Thu", v: 9 }, { d: "Fri", v: 5 }, { d: "Sat", v: 2 }];
  const max = 14;
  return (
    <div className="h-44 flex items-end gap-2 px-1">
      {days.map((d) => {
        const active = d.d === "Tue";
        return (
          <div key={d.d} className="flex-1 flex flex-col items-center gap-2 h-full">
            {active && <span className="text-xs font-semibold text-foreground -mb-1">{d.v}</span>}
            <div className="w-full flex-1 flex items-end">
              <div className={`w-full rounded-md ${active ? "bg-primary" : "bg-muted"}`} style={{ height: `${(d.v / max) * 100}%` }} />
            </div>
            <span className={`text-[11px] ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>{d.d}</span>
          </div>
        );
      })}
    </div>
  );
}

function Gauge({ value = 68 }) {
  const r = 70, c = Math.PI * r;
  const seg = 40;
  return (
    <div className="relative w-full grid place-items-center py-2">
      <svg viewBox="0 0 200 120" className="w-56">
        {Array.from({ length: seg }).map((_, i) => {
          const a = Math.PI * (i / (seg - 1));
          const x1 = 100 + Math.cos(Math.PI - a) * 80;
          const y1 = 100 - Math.sin(Math.PI - a) * 80;
          const x2 = 100 + Math.cos(Math.PI - a) * 95;
          const y2 = 100 - Math.sin(Math.PI - a) * 95;
          const active = i / seg <= value / 100;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={active ? "oklch(0.68 0.16 155)" : "oklch(0.92 0.008 250)"} strokeWidth="3" strokeLinecap="round" />;
        })}
        <text x="100" y="92" textAnchor="middle" className="fill-foreground" style={{ fontSize: 26, fontWeight: 700 }}>{value}%</text>
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
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Plus className="size-4" />Add widget
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

      {/* Row: Trend + Most Day Active */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Maintenance Trend" className="lg:col-span-2"
          action={<div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2 rounded-full bg-primary" />Tickets created<span className="ml-3">Avg resolution <span className="text-foreground font-semibold ml-1">2.4d</span></span></div>}>
          <div className="flex items-end gap-6 mb-2">
            <div>
              <p className="text-3xl font-bold tracking-tight">446</p>
              <p className="text-xs text-success font-medium mt-0.5 inline-flex items-center gap-1"><ArrowUpRight className="size-3" />24.4% vs last period</p>
            </div>
            <div className="ml-auto flex gap-6 text-xs text-muted-foreground">
              <span>1 Jan</span><span>8 Jan</span><span>15 Jan</span><span>22 Jan</span><span>29 Jan</span>
            </div>
          </div>
          <TrendChart />
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs text-muted-foreground">Plumbing</p>
              <p className="text-lg font-bold mt-1">2,884</p>
              <div className="h-1 rounded-full bg-info mt-2" />
            </div>
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs text-muted-foreground">Electrical</p>
              <p className="text-lg font-bold mt-1">1,432</p>
              <div className="h-1 rounded-full bg-success mt-2" />
            </div>
            <div className="rounded-xl border border-border p-3">
              <p className="text-xs text-muted-foreground">HVAC / Other</p>
              <p className="text-lg font-bold mt-1">562</p>
              <div className="h-1 rounded-full bg-warning mt-2" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Most Active Day">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xs text-muted-foreground">Peak load</span>
          </div>
          <WeekdayChart />
        </SectionCard>
      </div>

      {/* Row: Urgent + Repeat rate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Urgent Issues Monitor" className="lg:col-span-2"
          action={<a className="text-xs text-primary font-medium inline-flex items-center gap-1">View all<ChevronRight className="size-3" /></a>}>
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium pb-2">Property</th>
                <th className="text-left font-medium pb-2">Issue</th>
                <th className="text-left font-medium pb-2">Manager</th>
                <th className="text-left font-medium pb-2">Time open</th>
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
                  <td className="py-3">
                    <Pill tone={u.over ? "urgent" : "high"}>{u.over && <Flame className="size-3" />}{u.time}</Pill>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-xs px-2 py-1 rounded-md bg-destructive/10 text-destructive font-medium">Escalate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>

        <SectionCard title="Repeat Maintenance Rate">
          <Gauge value={68} />
          <button className="mx-auto mt-3 block text-xs font-medium rounded-full border border-border px-3 py-1.5 hover:bg-muted">Show details</button>
        </SectionCard>
      </div>

      {/* Property Health */}
      <SectionCard title="Property Health"
        action={<div className="flex items-center gap-2"><button className="text-xs text-muted-foreground hover:text-foreground">Filter</button><button className="text-xs text-primary font-medium inline-flex items-center gap-1">All properties<ChevronRight className="size-3" /></button></div>}>
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left font-medium pb-2">Property</th>
              <th className="text-left font-medium pb-2">Open</th>
              <th className="text-left font-medium pb-2">This month</th>
              <th className="text-left font-medium pb-2">Common issue</th>
              <th className="text-left font-medium pb-2">Health</th>
              <th className="text-right font-medium pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { p: "House A12", o: 20, m: 32, c: "Plumbing", h: 28 },
              { p: "House B24", o: 4, m: 9, c: "Electrical", h: 72 },
              { p: "Flats C8", o: 16, m: 24, c: "Water supply", h: 40 },
              { p: "Block E2", o: 7, m: 14, c: "HVAC", h: 58 },
              { p: "House D9", o: 11, m: 19, c: "Sewer", h: 35 },
            ].map((r) => (
              <tr key={r.p} className="border-b border-border last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-7 rounded-lg bg-muted grid place-items-center"><Building2 className="size-3.5 text-muted-foreground" /></span>
                    <span className="font-medium">{r.p}</span>
                  </div>
                </td>
                <td className="py-3"><Pill tone={r.o > 10 ? "urgent" : "muted"}>{r.o}</Pill></td>
                <td className="py-3 text-muted-foreground">{r.m}</td>
                <td className="py-3">{r.c}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${r.h > 60 ? "bg-success" : r.h > 40 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${r.h}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{r.h}%</span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <button className="text-xs px-3 py-1 rounded-md border border-border hover:bg-muted">Inspect</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

    </DashboardShell>
  );
}
