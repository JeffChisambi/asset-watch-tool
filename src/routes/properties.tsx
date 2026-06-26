import { createFileRoute } from "@tanstack/react-router";
import { Building2, Wrench, AlertTriangle, CheckCircle2, Plus, Filter } from "lucide-react";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties — SGWops" },
      { name: "description", content: "Property portfolio overview and health tracking." },
    ],
  }),
  component: Properties,
});

const properties = [
  { name: "House A12", type: "Residential", zone: "Zone A", mgr: "John Banda", units: 1, open: 20, month: 32, issue: "Plumbing", health: 28 },
  { name: "House B24", type: "Residential", zone: "Zone B", mgr: "Peter Mulenga", units: 1, open: 4, month: 9, issue: "Electrical", health: 72 },
  { name: "Flats C8", type: "Multi-unit", zone: "Zone C", mgr: "Grace Moyo", units: 8, open: 16, month: 24, issue: "Water supply", health: 40 },
  { name: "Block E2", type: "Multi-unit", zone: "Zone E", mgr: "Linda Phiri", units: 12, open: 7, month: 14, issue: "HVAC", health: 58 },
  { name: "House D9", type: "Residential", zone: "Zone D", mgr: "Grace Moyo", units: 1, open: 11, month: 19, issue: "Sewer", health: 35 },
  { name: "Flat C4", type: "Residential", zone: "Zone C", mgr: "Peter Mulenga", units: 1, open: 3, month: 7, issue: "Plumbing", health: 80 },
  { name: "Complex F1", type: "Commercial", zone: "Zone F", mgr: "David Tembo", units: 24, open: 9, month: 21, issue: "Electrical", health: 62 },
  { name: "House G3", type: "Residential", zone: "Zone A", mgr: "John Banda", units: 1, open: 1, month: 4, issue: "General", health: 90 },
];

function Properties() {
  const avgHealth = Math.round(properties.reduce((s, p) => s + p.health, 0) / properties.length);

  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Portfolio of {properties.length} properties across 6 zones</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Filter className="size-4" />Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
            <Plus className="size-4" />Add property
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Building2, label: "Total Properties", value: String(properties.length), tone: "bg-primary/10 text-primary" },
          { icon: Wrench, label: "Open Tickets", value: String(properties.reduce((s, p) => s + p.open, 0)), tone: "bg-warning/20 text-warning-foreground" },
          { icon: AlertTriangle, label: "Critical Health", value: String(properties.filter((p) => p.health < 40).length), tone: "bg-destructive/10 text-destructive" },
          { icon: CheckCircle2, label: "Avg Health Score", value: `${avgHealth}%`, tone: "bg-success/10 text-success" },
        ].map(({ icon: Icon, label, value, tone }) => (
          <div key={label} className="rounded-2xl bg-card border border-border p-4 flex items-center gap-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <span className={`size-9 grid place-items-center rounded-full ${tone}`}><Icon className="size-4" /></span>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-xl font-bold tracking-tight">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Property Portfolio">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left font-medium pb-2">Property</th>
              <th className="text-left font-medium pb-2">Manager</th>
              <th className="text-left font-medium pb-2">Open</th>
              <th className="text-left font-medium pb-2">Health</th>
              <th className="text-right font-medium pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.name} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-7 rounded-lg bg-muted grid place-items-center"><Building2 className="size-3.5 text-muted-foreground" /></span>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="py-3">{p.mgr}</td>
                <td className="py-3"><Pill tone={p.open > 10 ? "urgent" : "muted"}>{p.open}</Pill></td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${p.health > 60 ? "bg-success" : p.health > 40 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${p.health}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{p.health}%</span>
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
