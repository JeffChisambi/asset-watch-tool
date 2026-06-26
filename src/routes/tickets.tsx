import { createFileRoute } from "@tanstack/react-router";
import {
  Wrench, Home, Clock, CheckCircle2, AlertTriangle,
  Calendar, Download, ChevronDown, Plus, Filter,
} from "lucide-react";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Tickets — SGWops" },
      { name: "description", content: "All maintenance tickets across properties." },
    ],
  }),
  component: Tickets,
});

const tickets = [
  { id: "MT-00401", prop: "House A12", issue: "Electrical outage — full unit", cat: "Electrical", mgr: "John Banda", status: "urgent", age: "2h 14m" },
  { id: "MT-00399", prop: "Flat C4", issue: "Water main rupture", cat: "Plumbing", mgr: "Peter Mulenga", status: "open", age: "1h 02m" },
  { id: "MT-00398", prop: "House D9", issue: "Sewer overflow in bathroom", cat: "Plumbing", mgr: "Grace Moyo", status: "open", age: "45m" },
  { id: "MT-00397", prop: "Block E2", issue: "Gas leak near kitchen", cat: "Electrical", mgr: "Linda Phiri", status: "urgent", age: "28m" },
  { id: "MT-00396", prop: "House B24", issue: "Broken window latch (bedroom)", cat: "General", mgr: "John Banda", status: "open", age: "3h" },
  { id: "MT-00395", prop: "Flats C8", issue: "HVAC not cooling — living room", cat: "HVAC", mgr: "Peter Mulenga", status: "in-progress", age: "5h 10m" },
  { id: "MT-00394", prop: "Block E2", issue: "Ceiling damp patch — bedroom 2", cat: "Plumbing", mgr: "Susan Lwanga", status: "in-progress", age: "1d" },
  { id: "MT-00393", prop: "House A12", issue: "Geyser pressure fault", cat: "Plumbing", mgr: "Grace Moyo", status: "open", age: "6h" },
  { id: "MT-00392", prop: "House D9", issue: "Front door deadbolt stuck", cat: "General", mgr: "John Banda", status: "open", age: "4h 30m" },
  { id: "MT-00391", prop: "House B24", issue: "Wiring inspection — garage", cat: "Electrical", mgr: "Linda Phiri", status: "in-progress", age: "2d" },
];

const statusTone: Record<string, string> = {
  urgent: "urgent",
  open: "high",
  "in-progress": "normal",
  done: "success",
};
const statusLabel: Record<string, string> = {
  urgent: "Urgent",
  open: "Open",
  "in-progress": "In progress",
  done: "Done",
};

function Tickets() {
  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tickets</h1>
          <p className="text-sm text-muted-foreground mt-0.5">All active maintenance requests across 142 properties</p>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Calendar className="size-4 text-muted-foreground" />Jan 1, 2026 – Feb 1, 2026
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            Last 30 days <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Filter className="size-4" />Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Plus className="size-4" />New ticket
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
            <Download className="size-4" />Export
          </button>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Wrench, label: "Total Open", value: "36", tone: "bg-primary/10 text-primary" },
          { icon: AlertTriangle, label: "Urgent", value: "5", tone: "bg-destructive/10 text-destructive" },
          { icon: Clock, label: "In Progress", value: "14", tone: "bg-info/10 text-info" },
          { icon: CheckCircle2, label: "Resolved Today", value: "14", tone: "bg-success/10 text-success" },
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

      <SectionCard title="All Tickets">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="text-left font-medium pb-2">ID</th>
              <th className="text-left font-medium pb-2">Property</th>
              <th className="text-left font-medium pb-2">Issue</th>
              <th className="text-left font-medium pb-2">Manager</th>
              <th className="text-left font-medium pb-2">Age</th>
              <th className="text-right font-medium pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                <td className="py-3 text-muted-foreground font-mono text-xs">{t.id}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-7 rounded-lg bg-muted grid place-items-center"><Home className="size-3.5 text-muted-foreground" /></span>
                    <span className="font-medium">{t.prop}</span>
                  </div>
                </td>
                <td className="py-3 max-w-[200px] truncate text-muted-foreground">{t.issue}</td>
                <td className="py-3">{t.mgr}</td>
                <td className="py-3 text-muted-foreground">{t.age}</td>
                <td className="py-3 text-right">
                  <Pill tone={t.status === "urgent" ? "urgent" : "muted"}>{statusLabel[t.status]}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </DashboardShell>
  );
}
