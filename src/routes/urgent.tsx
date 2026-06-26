import { createFileRoute } from "@tanstack/react-router";
import { Flame, Home, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/urgent")({
  head: () => ({
    meta: [
      { title: "Urgent — SGWops" },
      { name: "description", content: "Urgent open maintenance issues requiring immediate action." },
    ],
  }),
  component: Urgent,
});

const urgentItems = [
  { id: "MT-00401", prop: "House A12", issue: "Electrical outage — full unit", mgr: "John Banda", tech: "Mike Phiri", time: "2h 14m", over: true, sla: "4h" },
  { id: "MT-00399", prop: "Flat C4", issue: "Water main rupture", mgr: "Peter Mulenga", tech: "Grace Moyo", time: "1h 02m", over: false, sla: "4h" },
  { id: "MT-00398", prop: "House D9", issue: "Sewer overflow in bathroom", mgr: "Grace Moyo", tech: "Unassigned", time: "45m", over: false, sla: "4h" },
  { id: "MT-00397", prop: "Block E2", issue: "Gas leak near kitchen", mgr: "Linda Phiri", tech: "John Banda", time: "28m", over: false, sla: "2h" },
  { id: "MT-00388", prop: "House B24", issue: "Lift stuck between floors", mgr: "Susan Lwanga", tech: "Mike Phiri", time: "18m", over: false, sla: "2h" },
];

function Urgent() {
  const overSla = urgentItems.filter((u) => u.over).length;

  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Urgent Issues</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Active high-priority incidents requiring immediate response</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <AlertTriangle className="size-4 text-destructive" />{overSla} over SLA
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-destructive text-destructive-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
            <Flame className="size-4" />Escalate all
          </button>
        </div>
      </div>

      {/* SLA alert banner */}
      {overSla > 0 && (
        <div className="rounded-xl bg-destructive/8 border border-destructive/20 px-5 py-3 flex items-center gap-3">
          <Flame className="size-5 text-destructive shrink-0" />
          <p className="text-sm text-destructive font-medium">{overSla} issue{overSla > 1 ? "s are" : " is"} past the SLA threshold — immediate escalation required.</p>
          <button className="ml-auto text-xs text-destructive font-semibold inline-flex items-center gap-1 hover:underline">View details<ChevronRight className="size-3" /></button>
        </div>
      )}

      <SectionCard title="Urgent Issue Queue"
        action={<span className="text-xs text-muted-foreground">{urgentItems.length} active incidents</span>}>
        <div className="space-y-3">
          {urgentItems.map((u) => (
            <div key={u.id} className={`rounded-xl border p-4 flex flex-wrap items-center gap-4 ${u.over ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"}`}>
              <span className={`size-9 rounded-full grid place-items-center shrink-0 ${u.over ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning-foreground"}`}>
                <Flame className="size-4" />
              </span>
              <div className="flex items-center gap-2 min-w-[120px]">
                <span className="size-7 rounded-lg bg-muted grid place-items-center"><Home className="size-3.5 text-muted-foreground" /></span>
                <div>
                  <p className="text-sm font-semibold leading-tight">{u.prop}</p>
                  <p className="text-xs text-muted-foreground">{u.id}</p>
                </div>
              </div>
              <div className="flex-1 min-w-[160px]">
                <p className="text-sm font-medium">{u.issue}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Mgr: {u.mgr} · Tech: {u.tech}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <Pill tone={u.over ? "urgent" : "high"}>
                    <Clock className="size-3" />{u.time}
                  </Pill>
                  <p className="text-[10px] text-muted-foreground mt-1 text-center">SLA {u.sla}</p>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-md bg-destructive/10 text-destructive font-medium hover:bg-destructive/20">Escalate</button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardShell>
  );
}
