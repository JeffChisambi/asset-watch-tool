import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2, Clock, Wrench, Calendar, Download, ChevronDown, Star,
} from "lucide-react";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/completions")({
  head: () => ({
    meta: [
      { title: "Completions — SGWops" },
      { name: "description", content: "Completed maintenance jobs and approval queue." },
    ],
  }),
  component: Completions,
});

const jobs = [
  { id: "MT-00390", prop: "House A12", issue: "Hybrid HVAC service", tech: "John Banda", mgr: "John B.", duration: "1h 42m", cost: "MK 218,400", status: "approved", rating: 5 },
  { id: "MT-00385", prop: "Flat C4", issue: "Geyser replacement", tech: "Mike Phiri", mgr: "Peter M.", duration: "3h 10m", cost: "MK 161,875", status: "review", rating: null },
  { id: "MT-00381", prop: "House D9", issue: "Drain unblocking", tech: "Grace Moyo", mgr: "Grace M.", duration: "55m", cost: "MK 84,000", status: "approved", rating: 4 },
  { id: "MT-00377", prop: "Block E2", issue: "Door lock replacement", tech: "Susan Lwanga", mgr: "Linda P.", duration: "1h 05m", cost: "MK 108,850", status: "approved", rating: 5 },
  { id: "MT-00372", prop: "House B24", issue: "Wiring inspection — garage", tech: "Mike Phiri", mgr: "John B.", duration: "2h 20m", cost: "MK 129,500", status: "review", rating: null },
  { id: "MT-00368", prop: "Flats C8", issue: "Tap replacement — kitchen", tech: "Grace Moyo", mgr: "Susan L.", duration: "40m", cost: "MK 56,000", status: "approved", rating: 4 },
  { id: "MT-00361", prop: "House A12", issue: "Ceiling fan installation", tech: "John Banda", mgr: "John B.", duration: "1h 15m", cost: "MK 94,500", status: "approved", rating: 5 },
];

function Completions() {
  const pending = jobs.filter((j) => j.status === "review").length;
  const totalCost = jobs.filter((j) => j.status === "approved").reduce((s, j) => s + parseInt(j.cost.replace(/[^0-9]/g, "")), 0);

  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Completions</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Completed jobs awaiting approval and approved records</p>
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: CheckCircle2, label: "Approved", value: String(jobs.filter((j) => j.status === "approved").length), tone: "bg-success/10 text-success" },
          { icon: Clock, label: "Pending Review", value: String(pending), tone: "bg-warning/20 text-warning-foreground" },
          { icon: Wrench, label: "Total Jobs", value: String(jobs.length), tone: "bg-primary/10 text-primary" },
          { icon: CheckCircle2, label: "Total Cost", value: `MK ${(totalCost / 1000).toFixed(0)}k`, tone: "bg-info/10 text-info" },
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

      <SectionCard title="Completion Records"
        action={pending > 0 ? <span className="text-xs text-warning-foreground font-medium bg-warning/20 px-2 py-0.5 rounded-full">{pending} awaiting approval</span> : undefined}>
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left font-medium pb-2">Job</th>
              <th className="text-left font-medium pb-2">Manager</th>
              <th className="text-left font-medium pb-2">Cost</th>
              <th className="text-right font-medium pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-7 rounded-md bg-primary/10 grid place-items-center"><Wrench className="size-3.5 text-primary" /></span>
                    <div>
                      <p className="font-medium leading-tight">{j.issue}</p>
                      <p className="text-xs text-muted-foreground">{j.prop}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">{j.mgr}</td>
                <td className="py-3 font-semibold">{j.cost}</td>
                <td className="py-3 text-right">
                  <Pill tone={j.status === "approved" ? "success" : "high"}>
                    {j.status === "approved" ? <CheckCircle2 className="size-3" /> : <Clock className="size-3" />}
                    {j.status === "approved" ? "Approved" : "Review"}
                  </Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </DashboardShell>
  );
}
