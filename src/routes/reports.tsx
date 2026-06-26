import { createFileRoute } from "@tanstack/react-router";
import {
  ClipboardCheck, Download, Calendar, ChevronDown, ArrowUpRight, BarChart3,
} from "lucide-react";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — SGWops" },
      { name: "description", content: "Generated reports and scheduled report management." },
    ],
  }),
  component: Reports,
});

const reports = [
  { name: "Monthly Operations Summary", type: "Operations", period: "Jan 2026", generated: "Feb 1, 2026", size: "2.4 MB", status: "ready" },
  { name: "Technician Performance Report", type: "HR", period: "Q4 2025", generated: "Jan 5, 2026", size: "1.1 MB", status: "ready" },
  { name: "SLA Compliance Report", type: "Compliance", period: "Jan 2026", generated: "Feb 1, 2026", size: "0.8 MB", status: "ready" },
  { name: "Property Health Assessment", type: "Property", period: "Jan 2026", generated: "Feb 1, 2026", size: "3.2 MB", status: "ready" },
  { name: "Cost & Budget Analysis", type: "Finance", period: "Jan 2026", generated: "Generating…", size: "—", status: "generating" },
  { name: "Tenant Satisfaction Survey Results", type: "Quality", period: "Q4 2025", generated: "Jan 10, 2026", size: "1.6 MB", status: "ready" },
  { name: "Escalation & Incident Report", type: "Compliance", period: "Jan 2026", generated: "Feb 1, 2026", size: "0.5 MB", status: "ready" },
];

const typeTone: Record<string, string> = {
  Operations: "normal",
  HR: "muted",
  Compliance: "high",
  Property: "success",
  Finance: "urgent",
  Quality: "success",
};

const kpis = [
  { k: "Response within 30 min", t: 95, c: 93 },
  { k: "Urgent resolved within 4h", t: 90, c: 88 },
  { k: "Jobs completed on time", t: 95, c: 96 },
  { k: "Tenant satisfaction (×20)", t: 90, c: 94 },
  { k: "Repeat maintenance < 30 days", t: 95, c: 97 },
];

function Reports() {
  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Generated reports, KPI summaries and export history</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Calendar className="size-4 text-muted-foreground" />Jan 1, 2026 – Feb 1, 2026
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            Last 30 days <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
            <ClipboardCheck className="size-4" />Generate report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="KPI Snapshot" className="lg:col-span-2">
          <div className="space-y-4">
            {kpis.map((k) => {
              const ok = k.c >= k.t;
              return (
                <div key={k.k}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">{k.k}</span>
                    <span className="font-semibold flex items-center gap-1">
                      {ok && <ArrowUpRight className="size-3 text-success" />}
                      {k.c}% <span className="text-muted-foreground font-normal">/ {k.t}%</span>
                    </span>
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

        <SectionCard title="Quick Stats">
          <div className="space-y-3">
            {[
              { icon: BarChart3, label: "Reports generated", value: "7", sub: "this month", tone: "bg-primary/10 text-primary" },
              { icon: Download, label: "Downloads", value: "24", sub: "last 30 days", tone: "bg-info/10 text-info" },
              { icon: ClipboardCheck, label: "Scheduled reports", value: "3", sub: "active schedules", tone: "bg-success/10 text-success" },
            ].map(({ icon: Icon, label, value, sub, tone }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className={`size-8 grid place-items-center rounded-full ${tone}`}><Icon className="size-3.5" /></span>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold">{value} <span className="text-muted-foreground font-normal text-xs">{sub}</span></p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Report Library">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left font-medium pb-2">Report name</th>
              <th className="text-left font-medium pb-2">Type</th>
              <th className="text-left font-medium pb-2">Period</th>
              <th className="text-left font-medium pb-2">Generated</th>
              <th className="text-left font-medium pb-2">Size</th>
              <th className="text-right font-medium pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.name} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-7 rounded-md bg-primary/10 grid place-items-center"><ClipboardCheck className="size-3.5 text-primary" /></span>
                    <span className="font-medium">{r.name}</span>
                  </div>
                </td>
                <td className="py-3"><Pill tone={typeTone[r.type] || "muted"}>{r.type}</Pill></td>
                <td className="py-3 text-muted-foreground">{r.period}</td>
                <td className="py-3 text-muted-foreground">{r.generated}</td>
                <td className="py-3 text-muted-foreground">{r.size}</td>
                <td className="py-3 text-right">
                  {r.status === "ready"
                    ? <button className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-md bg-primary/10 text-primary font-medium hover:bg-primary/20"><Download className="size-3" />Download</button>
                    : <Pill tone="muted">Generating…</Pill>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </DashboardShell>
  );
}
