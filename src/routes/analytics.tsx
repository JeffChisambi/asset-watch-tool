import { createFileRoute } from "@tanstack/react-router";
import {
  Wrench, Clock, CheckCircle2, ChevronDown, ChevronRight, Star,
  Download, Calendar, Plus, ArrowUpRight,
} from "lucide-react";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Maintenance Operations" },
      { name: "description", content: "Performance analytics, completion reports and technician tracking for maintenance operations." },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  const completions = [
    { id: "MT-00124", prop: "House A12", issue: "Hybrid HVAC service", mgr: "John B.", time: "1h 42m", price: "MK 218,400", status: "approved" },
    { id: "MT-00118", prop: "Flat C4", issue: "Geyser replacement", mgr: "Peter M.", time: "3h 10m", price: "MK 161,875", status: "review" },
    { id: "MT-00109", prop: "House D9", issue: "Drain unblocking", mgr: "Grace M.", time: "55m", price: "MK 84,000", status: "approved" },
    { id: "MT-00102", prop: "Block E2", issue: "Door lock change", mgr: "Linda P.", time: "1h 05m", price: "MK 108,850", status: "approved" },
    { id: "MT-00098", prop: "House B24", issue: "Wiring inspection", mgr: "John B.", time: "2h 20m", price: "MK 129,500", status: "review" },
  ];

  const techs = [
    { n: "John Banda", jobs: 46, avg: "1.2d", over: 1, sat: 4.9, color: "from-[oklch(0.7_0.15_30)] to-[oklch(0.55_0.18_15)]" },
    { n: "Mike Phiri", jobs: 38, avg: "2.5d", over: 5, sat: 4.3, color: "from-[oklch(0.7_0.13_220)] to-[oklch(0.5_0.18_260)]" },
    { n: "Grace Moyo", jobs: 52, avg: "1.1d", over: 0, sat: 5.0, color: "from-[oklch(0.75_0.15_150)] to-[oklch(0.55_0.18_165)]" },
    { n: "Susan Lwanga", jobs: 41, avg: "1.6d", over: 2, sat: 4.7, color: "from-[oklch(0.78_0.14_75)] to-[oklch(0.6_0.18_55)]" },
  ];

  return (
    <DashboardShell>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Completion reports, technician performance and KPI tracking</p>
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

      {/* Row: Completion Reports + Tech performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Completion Reports" className="lg:col-span-3"
          action={<div className="flex items-center gap-2"><span className="text-xs text-muted-foreground">Today</span><ChevronDown className="size-3 text-muted-foreground" /></div>}>
          <table className="w-full text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left font-medium pb-2">ID</th>
                <th className="text-left font-medium pb-2">Job</th>
                <th className="text-left font-medium pb-2">Manager</th>
                <th className="text-left font-medium pb-2">Time</th>
                <th className="text-left font-medium pb-2">Cost</th>
                <th className="text-right font-medium pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {completions.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-muted-foreground">{c.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="size-7 rounded-md bg-primary/10 grid place-items-center"><Wrench className="size-3.5 text-primary" /></span>
                      <div>
                        <p className="font-medium leading-tight">{c.issue}</p>
                        <p className="text-xs text-muted-foreground">{c.prop}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{c.mgr}</td>
                  <td className="py-3 text-muted-foreground">{c.time}</td>
                  <td className="py-3 font-semibold">{c.price}</td>
                  <td className="py-3 text-right">
                    <Pill tone={c.status === "approved" ? "success" : "high"}>
                      {c.status === "approved" ? <CheckCircle2 className="size-3" /> : <Clock className="size-3" />}
                      {c.status === "approved" ? "Approved" : "Review"}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionCard>
      </div>

      {/* KPIs + activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="KPI Targets" className="lg:col-span-2">
          <div className="space-y-4">
            {[
              { k: "Response within 30 min", t: 95, c: 93 },
              { k: "Urgent resolved within 4h", t: 90, c: 88 },
              { k: "Jobs completed on time", t: 95, c: 96 },
              { k: "Tenant satisfaction (×20)", t: 90, c: 94 },
              { k: "Repeat maintenance < 30 days", t: 95, c: 97 },
            ].map((k) => {
              const ok = k.c >= k.t;
              return (
                <div key={k.k}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">{k.k}</span>
                    <span className="font-semibold">{k.c}% <span className="text-muted-foreground font-normal">/ {k.t}%</span></span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden relative">
                    <div className={`h-full rounded-full ${ok ? "bg-success" : "bg-warning"}`} style={{ width: `${k.c}%` }} />
                    <div className="absolute top-0 h-full border-r-2 border-foreground/30" style={{ left: `${k.t}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Recent Activity">
          <ol className="relative pl-5 space-y-4 before:content-[''] before:absolute before:left-1.5 before:top-1 before:bottom-1 before:w-px before:bg-border">
            {[
              { t: "11:45", txt: "Completion report submitted for MT-00124", tone: "success" },
              { t: "11:40", txt: "Job MT-00124 marked complete by John B.", tone: "success" },
              { t: "10:15", txt: "Progress updated on House A2 water outage", tone: "info" },
              { t: "09:35", txt: "Technician Grace accepted job MT-00352", tone: "info" },
              { t: "09:20", txt: "Manager Peter assigned technician", tone: "muted" },
              { t: "09:10", txt: "Tenant reported water outage at House A2", tone: "danger" },
            ].map((a, i) => (
              <li key={i} className="relative">
                <span className={`absolute -left-[18px] top-1 size-2.5 rounded-full ring-4 ring-card ${a.tone === "success" ? "bg-success" : a.tone === "danger" ? "bg-destructive" : a.tone === "info" ? "bg-info" : "bg-muted-foreground"}`} />
                <p className="text-sm leading-snug">{a.txt}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.t}</p>
              </li>
            ))}
          </ol>
        </SectionCard>
      </div>
    </DashboardShell>
  );
}
