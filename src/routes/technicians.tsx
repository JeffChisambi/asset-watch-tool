import { createFileRoute } from "@tanstack/react-router";
import { Wrench, CheckCircle2, Clock, Star, Plus, AlertTriangle } from "lucide-react";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/technicians")({
  head: () => ({
    meta: [
      { title: "Technicians — SGWops" },
      { name: "description", content: "Technician roster, workload and performance." },
    ],
  }),
  component: Technicians,
});

const technicians = [
  { name: "Mike Phiri", specialty: "Electrical", manager: "John Banda", jobs: 46, active: 3, overdue: 1, avg: "1.2d", rating: 4.9, color: "from-[oklch(0.7_0.13_220)] to-[oklch(0.5_0.18_260)]" },
  { name: "Grace Moyo", specialty: "Plumbing", manager: "Grace Moyo", jobs: 52, active: 2, overdue: 0, avg: "1.1d", rating: 5.0, color: "from-[oklch(0.75_0.15_150)] to-[oklch(0.55_0.18_165)]" },
  { name: "John Banda", specialty: "HVAC", manager: "John Banda", jobs: 38, active: 4, overdue: 2, avg: "2.5d", rating: 4.3, color: "from-[oklch(0.7_0.15_30)] to-[oklch(0.55_0.18_15)]" },
  { name: "Susan Lwanga", specialty: "General", manager: "Linda Phiri", jobs: 41, active: 1, overdue: 0, avg: "1.6d", rating: 4.7, color: "from-[oklch(0.78_0.14_75)] to-[oklch(0.6_0.18_55)]" },
  { name: "David Tembo", specialty: "Electrical", manager: "Peter Mulenga", jobs: 33, active: 2, overdue: 0, avg: "2.0d", rating: 4.5, color: "from-[oklch(0.68_0.12_180)] to-[oklch(0.48_0.16_200)]" },
  { name: "Ruth Nkosi", specialty: "Plumbing", manager: "Susan Lwanga", jobs: 29, active: 3, overdue: 1, avg: "1.9d", rating: 4.2, color: "from-[oklch(0.72_0.14_290)] to-[oklch(0.52_0.18_310)]" },
  { name: "James Chirwa", specialty: "General", manager: "Grace Moyo", jobs: 44, active: 0, overdue: 0, avg: "1.4d", rating: 4.8, color: "from-[oklch(0.65_0.16_260)] to-[oklch(0.45_0.2_280)]" },
  { name: "Alice Phiri", specialty: "HVAC", manager: "Peter Mulenga", jobs: 36, active: 2, overdue: 0, avg: "1.7d", rating: 4.6, color: "from-[oklch(0.75_0.13_10)] to-[oklch(0.55_0.17_350)]" },
];

function Technicians() {
  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Technicians</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Field technician roster, assignments and performance ratings</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Plus className="size-4" />Add technician
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Wrench, label: "Total Technicians", value: String(technicians.length), tone: "bg-primary/10 text-primary" },
          { icon: Clock, label: "Active Jobs", value: String(technicians.reduce((s, t) => s + t.active, 0)), tone: "bg-info/10 text-info" },
          { icon: AlertTriangle, label: "Overdue", value: String(technicians.reduce((s, t) => s + t.overdue, 0)), tone: "bg-destructive/10 text-destructive" },
          { icon: CheckCircle2, label: "Jobs This Month", value: String(technicians.reduce((s, t) => s + t.jobs, 0)), tone: "bg-success/10 text-success" },
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

      <SectionCard title="Technician Roster">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left font-medium pb-2">Technician</th>
              <th className="text-left font-medium pb-2">Specialty</th>
              <th className="text-left font-medium pb-2">Manager</th>
              <th className="text-left font-medium pb-2">Active</th>
              <th className="text-left font-medium pb-2">Overdue</th>
              <th className="text-left font-medium pb-2">Jobs</th>
              <th className="text-left font-medium pb-2">Avg time</th>
              <th className="text-right font-medium pb-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((t) => (
              <tr key={t.name} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`size-8 rounded-full bg-gradient-to-br ${t.color} ring-2 ring-card`} />
                    <span className="font-medium">{t.name}</span>
                  </div>
                </td>
                <td className="py-3"><Pill tone="muted">{t.specialty}</Pill></td>
                <td className="py-3 text-muted-foreground">{t.manager}</td>
                <td className="py-3 text-muted-foreground">{t.active}</td>
                <td className="py-3">
                  {t.overdue > 0
                    ? <Pill tone="urgent">{t.overdue}</Pill>
                    : <span className="text-xs text-muted-foreground">—</span>}
                </td>
                <td className="py-3 text-muted-foreground">{t.jobs}</td>
                <td className="py-3 text-muted-foreground">{t.avg}</td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold">
                    <Star className="size-3.5 fill-warning text-warning" />{t.rating.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </DashboardShell>
  );
}
