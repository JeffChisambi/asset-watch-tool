import { createFileRoute } from "@tanstack/react-router";
import { Users, Wrench, CheckCircle2, AlertTriangle, Plus } from "lucide-react";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/managers")({
  head: () => ({
    meta: [
      { title: "Managers — SGWops" },
      { name: "description", content: "Property maintenance manager roster and performance." },
    ],
  }),
  component: Managers,
});

const managers = [
  { name: "John Banda", zone: "Zone A", props: 28, open: 12, urgent: 2, completed: 46, avg: "1.2d", color: "from-[oklch(0.7_0.15_30)] to-[oklch(0.55_0.18_15)]" },
  { name: "Peter Mulenga", zone: "Zone B", props: 22, open: 8, urgent: 1, completed: 38, avg: "2.1d", color: "from-[oklch(0.7_0.13_220)] to-[oklch(0.5_0.18_260)]" },
  { name: "Grace Moyo", zone: "Zone C", props: 31, open: 5, urgent: 0, completed: 52, avg: "1.1d", color: "from-[oklch(0.75_0.15_150)] to-[oklch(0.55_0.18_165)]" },
  { name: "Linda Phiri", zone: "Zone D", props: 18, open: 7, urgent: 1, completed: 29, avg: "1.8d", color: "from-[oklch(0.78_0.14_75)] to-[oklch(0.6_0.18_55)]" },
  { name: "Susan Lwanga", zone: "Zone E", props: 25, open: 4, urgent: 1, completed: 41, avg: "1.6d", color: "from-[oklch(0.72_0.14_290)] to-[oklch(0.52_0.18_310)]" },
  { name: "David Tembo", zone: "Zone F", props: 18, open: 0, urgent: 0, completed: 33, avg: "2.4d", color: "from-[oklch(0.68_0.12_180)] to-[oklch(0.48_0.16_200)]" },
];

function Managers() {
  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Managers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Property zone managers and their current workload</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Plus className="size-4" />Add manager
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Managers", value: String(managers.length), tone: "bg-primary/10 text-primary" },
          { icon: Wrench, label: "Open Tickets", value: String(managers.reduce((s, m) => s + m.open, 0)), tone: "bg-warning/20 text-warning-foreground" },
          { icon: AlertTriangle, label: "Urgent Issues", value: String(managers.reduce((s, m) => s + m.urgent, 0)), tone: "bg-destructive/10 text-destructive" },
          { icon: CheckCircle2, label: "Jobs This Month", value: String(managers.reduce((s, m) => s + m.completed, 0)), tone: "bg-success/10 text-success" },
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

      <SectionCard title="Manager Roster">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left font-medium pb-2">Manager</th>
              <th className="text-left font-medium pb-2">Zone</th>
              <th className="text-left font-medium pb-2">Properties</th>
              <th className="text-left font-medium pb-2">Open tickets</th>
              <th className="text-left font-medium pb-2">Urgent</th>
              <th className="text-left font-medium pb-2">Completed</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((m) => (
              <tr key={m.name} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                      <span className="font-medium">{m.name}</span>
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{m.zone}</td>
                <td className="py-3">{m.props}</td>
                <td className="py-3"><Pill tone={m.open > 8 ? "urgent" : "muted"}>{m.open}</Pill></td>
                <td className="py-3">
                  {m.urgent > 0
                    ? <Pill tone="urgent">{m.urgent}</Pill>
                    : <span className="text-xs text-muted-foreground">—</span>}
                </td>
                <td className="py-3 text-muted-foreground">{m.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </DashboardShell>
  );
}
