import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, Flame, Clock, CheckCircle2, ChevronRight, AlertTriangle } from "lucide-react";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/escalations")({
  head: () => ({
    meta: [
      { title: "Escalations — SGWops" },
      { name: "description", content: "Escalation log and resolution tracking." },
    ],
  }),
  component: Escalations,
});

const escalations = [
  { id: "ESC-041", ticket: "MT-00401", prop: "House A12", issue: "Electrical outage — full unit", raised: "John Banda", to: "Supervisor", time: "2h 14m ago", status: "open", priority: "critical" },
  { id: "ESC-040", ticket: "MT-00388", prop: "Block E2", issue: "Lift stuck between floors", raised: "Linda Phiri", to: "Emergency Services", time: "4h ago", status: "in-progress", priority: "critical" },
  { id: "ESC-039", ticket: "MT-00372", prop: "Flat C4", issue: "Structural crack — external wall", raised: "Peter Mulenga", to: "Engineer", time: "1d ago", status: "in-progress", priority: "high" },
  { id: "ESC-038", ticket: "MT-00361", prop: "House D9", issue: "Roof leak during heavy rain", raised: "Grace Moyo", to: "Supervisor", time: "2d ago", status: "resolved", priority: "high" },
  { id: "ESC-037", ticket: "MT-00344", prop: "House B24", issue: "Gas metre fault", raised: "John Banda", to: "Utility provider", time: "3d ago", status: "resolved", priority: "critical" },
];

const priorityTone: Record<string, string> = { critical: "urgent", high: "high", medium: "normal" };
const statusTone: Record<string, string> = { open: "urgent", "in-progress": "high", resolved: "success" };

function Escalations() {
  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Escalations</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Issues escalated beyond standard resolution channels</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg bg-destructive text-destructive-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
            <ShieldAlert className="size-4" />Raise escalation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: ShieldAlert, label: "Total Escalations", value: String(escalations.length), tone: "bg-primary/10 text-primary" },
          { icon: Flame, label: "Critical", value: String(escalations.filter((e) => e.priority === "critical").length), tone: "bg-destructive/10 text-destructive" },
          { icon: Clock, label: "In Progress", value: String(escalations.filter((e) => e.status === "in-progress").length), tone: "bg-warning/20 text-warning-foreground" },
          { icon: CheckCircle2, label: "Resolved", value: String(escalations.filter((e) => e.status === "resolved").length), tone: "bg-success/10 text-success" },
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

      <SectionCard title="Escalation Log">
        <div className="space-y-3">
          {escalations.map((e) => (
            <div key={e.id} className={`rounded-xl border p-4 flex flex-wrap items-center gap-4 ${e.status === "open" ? "border-destructive/30 bg-destructive/5" : e.status === "in-progress" ? "border-warning/30 bg-warning/5" : "border-border bg-card"}`}>
              <span className={`size-9 rounded-full grid place-items-center shrink-0 ${e.priority === "critical" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning-foreground"}`}>
                {e.priority === "critical" ? <Flame className="size-4" /> : <AlertTriangle className="size-4" />}
              </span>
              <div className="min-w-[100px]">
                <p className="text-xs text-muted-foreground font-mono">{e.id}</p>
                <p className="text-xs text-muted-foreground">{e.ticket}</p>
              </div>
              <div className="flex-1 min-w-[180px]">
                <p className="text-sm font-medium">{e.issue}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{e.prop} · Raised by {e.raised} → {e.to}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <p className="text-xs text-muted-foreground">{e.time}</p>
                <Pill tone={priorityTone[e.priority]}>{e.priority}</Pill>
                <Pill tone={statusTone[e.status]}>{e.status === "in-progress" ? "In progress" : e.status.charAt(0).toUpperCase() + e.status.slice(1)}</Pill>
                <button className="text-xs text-primary font-medium inline-flex items-center gap-0.5 hover:underline">
                  Details<ChevronRight className="size-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardShell>
  );
}
