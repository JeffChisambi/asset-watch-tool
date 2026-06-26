import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight, ArrowDownRight, Banknote, CreditCard, AlertCircle,
  Clock, Users, CalendarDays, Send, FileText, Download, Plus,
  Eye, PhoneCall, StickyNote,
  MessageSquare, Mail, Smartphone, ChevronRight, Calendar,
} from "lucide-react";
import { FinanceDashboardShell, FinanceSectionCard as SectionCard, FinancePill as Pill } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Finance Dashboard — SGWops" },
      { name: "description", content: "Rent collection, outstanding balances, and lease management." },
    ],
  }),
  component: FinanceDashboard,
});

/* ─── helpers ─────────────────────────────────────────── */
function fmt(n: number) {
  return `MWK ${n.toLocaleString()}`;
}

function StatCard({ icon: Icon, label, value, sub, trend, tone = "primary" }: {
  icon: React.ElementType; label: string; value: string; sub: string;
  trend?: { up: boolean; value: string }; tone?: string;
}) {
  const toneMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    danger:  "bg-destructive/10 text-destructive",
    success: "bg-success/10 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    info:    "bg-info/10 text-info",
  };
  return (
    <div className="rounded-2xl bg-card border border-border p-5 flex flex-col gap-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={`size-7 grid place-items-center rounded-full ${toneMap[tone] ?? toneMap.primary}`}>
          <Icon className="size-4" />
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight leading-none">{value}</span>
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

function ActionBtn({ children, variant = "ghost" }: { children: React.ReactNode; variant?: "ghost" | "primary" | "outline" }) {
  const cls = {
    ghost: "text-xs text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-1 rounded-lg transition",
    primary: "text-xs bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-lg transition font-medium",
    outline: "text-xs border border-border text-foreground hover:bg-muted px-2 py-1 rounded-lg transition",
  };
  return <button className={cls[variant]}>{children}</button>;
}

function SeverityDot({ days }: { days: number }) {
  const cls =
    days > 30 ? "bg-destructive" :
    days > 7  ? "bg-warning" :
                "bg-info";
  return <span className={`size-2 rounded-full inline-block ${cls}`} />;
}

/* ─── mock data ───────────────────────────────────────── */
const outstandingBalances = [
  { tenant: "John Banda",    property: "House A12", balance: 75000,  due: "15 Jun", status: "Overdue",     daysOverdue: 11 },
  { tenant: "Grace Phiri",   property: "Flat B3",   balance: 20000,  due: "28 Jun", status: "Outstanding", daysOverdue: 0  },
  { tenant: "Chisomo Mwale", property: "House C7",  balance: 55000,  due: "10 Jun", status: "Overdue",     daysOverdue: 16 },
  { tenant: "Fatima Nakala", property: "Flat D2",   balance: 90000,  due: "5 Jun",  status: "Overdue",     daysOverdue: 21 },
  { tenant: "Peter James",   property: "House A4",  balance: 250000, due: "30 Jun", status: "Outstanding", daysOverdue: 0  },
];

const upcomingPayments = [
  { property: "House A4",  tenant: "Peter James",   rent: 250000, due: "30 Jun", daysLeft: 4  },
  { property: "Flat E1",   tenant: "Amina Chirwa",  rent: 180000, due: "2 Jul",  daysLeft: 6  },
  { property: "House B9",  tenant: "Samuel Dube",   rent: 320000, due: "5 Jul",  daysLeft: 9  },
  { property: "Flat C4",   tenant: "Rose Tembo",    rent: 150000, due: "7 Jul",  daysLeft: 11 },
];

const overduePayments = [
  { tenant: "John Banda",    property: "House A12", days: 11, balance: 75000  },
  { tenant: "Mary Phiri",    property: "Flat B5",   days: 5,  balance: 40000  },
  { tenant: "Chisomo Mwale", property: "House C7",  days: 16, balance: 55000  },
  { tenant: "Fatima Nakala", property: "Flat D2",   days: 21, balance: 90000  },
  { tenant: "James Nyirenda", property: "House F1", days: 35, balance: 120000 },
];

const reminders = [
  { tenant: "John Banda",    type: "Balance Reminder",     date: "25 Jun", method: "SMS",   status: "Delivered" },
  { tenant: "Mary Phiri",    type: "Overdue Notice",       date: "25 Jun", method: "Email", status: "Delivered" },
  { tenant: "Chisomo Mwale", type: "Final Reminder",       date: "24 Jun", method: "SMS",   status: "Delivered" },
  { tenant: "Peter James",   type: "Upcoming Payment",     date: "24 Jun", method: "App",   status: "Sent"      },
  { tenant: "Rose Tembo",    type: "Upcoming Payment",     date: "23 Jun", method: "Email", status: "Delivered" },
];

const paymentHistory = [
  { tenant: "Alice Mkandawire", property: "Flat A1",  amount: 200000, date: "22 Jun", method: "Mobile Money"  },
  { tenant: "David Lungu",      property: "House B3",  amount: 300000, date: "20 Jun", method: "Bank Transfer" },
  { tenant: "Grace Phiri",      property: "Flat B3",   amount: 180000, date: "18 Jun", method: "Mobile Money"  },
  { tenant: "John Banda",       property: "House A12", amount: 250000, date: "1 Jun",  method: "Bank Transfer" },
  { tenant: "Samuel Dube",      property: "House B9",  amount: 320000, date: "1 Jun",  method: "Cash"          },
];

const leaseExpiries = [
  { tenant: "Peter James",   property: "House C2",  ends: "15 Jul", days: 19 },
  { tenant: "Mary Banda",    property: "Flat D4",   ends: "30 Jun", days: 4  },
  { tenant: "Esther Nkoma",  property: "House A7",  ends: "20 Jul", days: 24 },
  { tenant: "Kelvin Phiri",  property: "Flat B6",   ends: "10 Aug", days: 45 },
];

const recentActivity = [
  { time: "09:10", event: "Payment received from House A12 — MWK 250,000" },
  { time: "09:30", event: "Reminder sent to Flat B3 (John Banda)" },
  { time: "10:15", event: "Balance updated for House C5" },
  { time: "11:05", event: "Lease renewal reminder sent to House D1" },
  { time: "11:40", event: "New payment recorded — Flat A1 (Alice Mkandawire)" },
  { time: "12:00", event: "Overdue notice sent to Flat D2 (Fatima Nakala)" },
];

const methodIcon = (m: string) => {
  if (m === "SMS") return <Smartphone className="size-3.5" />;
  if (m === "Email") return <Mail className="size-3.5" />;
  return <MessageSquare className="size-3.5" />;
};

/* ─── collection analytics bar chart ─────────────────── */
function CollectionBar() {
  const months = [
    { m: "Jan", pct: 88 }, { m: "Feb", pct: 91 }, { m: "Mar", pct: 85 },
    { m: "Apr", pct: 94 }, { m: "May", pct: 89 }, { m: "Jun", pct: 79 },
  ];
  return (
    <div className="flex items-end gap-3 h-24">
      {months.map(({ m, pct }) => (
        <div key={m} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] text-muted-foreground">{pct}%</span>
          <div className="w-full rounded-t-md bg-primary/15 relative overflow-hidden" style={{ height: 64 }}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-md transition-all"
              style={{ height: `${pct}%` }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">{m}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── main component ─────────────────────────────────── */
function FinanceDashboard() {
  return (
    <FinanceDashboardShell>
      {/* page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Finance Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Rent collection, balances and lease management — June 2026</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 text-sm border border-border rounded-lg px-3 py-2 bg-card hover:bg-muted transition">
            <Calendar className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Jun 2026</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm bg-primary text-primary-foreground rounded-lg px-3 py-2 hover:bg-primary/90 transition font-medium">
            <Plus className="size-4" /> Record Payment
          </button>
          <button className="flex items-center gap-1.5 text-sm border border-border rounded-lg px-3 py-2 bg-card hover:bg-muted transition">
            <Download className="size-4 text-muted-foreground" /> Export
          </button>
        </div>
      </div>


      {/* ── summary cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={AlertCircle}   label="Outstanding Balance"  value="MWK 8.45M"  sub="Across 16 tenants"       tone="danger"   trend={{ up: false, value: "+2.1M" }} />
        <StatCard icon={Banknote}      label="Collected This Month" value="MWK 23.7M"  sub="vs MWK 21.2M last month" tone="success"  trend={{ up: true,  value: "+11.8%" }} />
        <StatCard icon={Users}         label="Overdue Tenants"      value="16"         sub="Require follow-up"       tone="danger"   />
      </div>

      {/* ── outstanding + upcoming ── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* outstanding balances */}
        <SectionCard
          title="Outstanding Balances"
          className="xl:col-span-3"
          action={
            <div className="flex items-center gap-2">
              <ActionBtn variant="outline">Filter</ActionBtn>
              <ActionBtn variant="ghost">Export</ActionBtn>
            </div>
          }
        >
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-muted-foreground border-b border-border">
                  <th className="text-left pb-2 pl-1 font-medium">Tenant</th>
                  <th className="text-left pb-2 font-medium">Property</th>
                  <th className="text-right pb-2 font-medium">Balance</th>
                  <th className="text-left pb-2 font-medium">Due</th>
                  <th className="text-left pb-2 font-medium">Status</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {outstandingBalances.map((r) => (
                  <tr key={r.tenant} className="hover:bg-muted/40 transition group">
                    <td className="py-2.5 pl-1 font-medium text-foreground">{r.tenant}</td>
                    <td className="py-2.5 text-muted-foreground">{r.property}</td>
                    <td className="py-2.5 text-right font-semibold tabular-nums">{fmt(r.balance)}</td>
                    <td className="py-2.5 text-muted-foreground">{r.due}</td>
                    <td className="py-2.5">
                      <Pill tone={r.status === "Overdue" ? "urgent" : "high"}>{r.status}</Pill>
                    </td>
                    <td className="py-2.5 pr-1">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition justify-end">
                        <ActionBtn><Eye className="size-3.5" /></ActionBtn>
                        <ActionBtn><CreditCard className="size-3.5" /></ActionBtn>
                        <ActionBtn><Send className="size-3.5" /></ActionBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* upcoming payments */}
        <SectionCard title="Upcoming Payments" className="xl:col-span-2">
          <div className="space-y-3">
            {upcomingPayments.map((p) => {
              const urgency = p.daysLeft <= 1 ? "Tomorrow" : p.daysLeft <= 7 ? `Due in ${p.daysLeft} days` : `Due in ${p.daysLeft} days`;
              const urgencyColor = p.daysLeft <= 1 ? "text-destructive" : p.daysLeft <= 7 ? "text-warning-foreground" : "text-muted-foreground";
              return (
                <div key={p.property} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3 hover:bg-muted/30 transition">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight">{p.property}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.tenant}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs font-semibold tabular-nums">{fmt(p.rent)}</span>
                      <span className={`text-[11px] font-medium ${urgencyColor}`}>{urgency}</span>
                    </div>
                  </div>
                  <button className="shrink-0 flex items-center gap-1 text-[11px] bg-primary/10 text-primary hover:bg-primary/20 px-2.5 py-1.5 rounded-lg font-medium transition">
                    <Send className="size-3" /> Remind
                  </button>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      {/* ── overdue + lease expiry ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* overdue payments */}
        <SectionCard
          title="Overdue Payments"
          action={
            <div className="flex items-center gap-2">
              <ActionBtn variant="outline">Export List</ActionBtn>
            </div>
          }
        >
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-wide text-muted-foreground pb-2 border-b border-border">
              <span className="flex-1">Tenant</span>
              <span className="w-24 text-center">Days Overdue</span>
              <span className="w-28 text-right">Balance</span>
              <span className="w-20" />
            </div>
            {overduePayments.map((r) => (
              <div key={r.tenant} className="flex items-center gap-3 py-2.5 hover:bg-muted/40 rounded-lg px-1 group transition">
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <SeverityDot days={r.days} />
                  <div>
                    <p className="text-sm font-medium leading-tight">{r.tenant}</p>
                    <p className="text-xs text-muted-foreground">{r.property}</p>
                  </div>
                </div>
                <div className="w-24 text-center">
                  <Pill tone={r.days > 30 ? "urgent" : r.days > 7 ? "high" : "normal"}>
                    {r.days} days
                  </Pill>
                </div>
                <span className="w-28 text-right text-sm font-semibold tabular-nums">{fmt(r.balance)}</span>
                <div className="w-20 flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition">
                  <button title="Send Reminder" className="size-7 grid place-items-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition"><Send className="size-3.5" /></button>
                  <button title="Call Tenant" className="size-7 grid place-items-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition"><PhoneCall className="size-3.5" /></button>
                  <button title="Add Note" className="size-7 grid place-items-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition"><StickyNote className="size-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground pt-3 border-t border-border">
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-info inline-block" /> 1–7 days</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-warning inline-block" /> 8–30 days</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-destructive inline-block" /> 30+ days</span>
          </div>
        </SectionCard>

        {/* lease expiry monitor */}
        <SectionCard title="Lease Expiry Monitor">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-wide text-muted-foreground pb-2 border-b border-border">
              <span className="flex-1">Tenant</span>
              <span className="w-20">Lease Ends</span>
              <span className="w-24 text-center">Days Left</span>
              <span className="w-16" />
            </div>
            {leaseExpiries.map((r) => (
              <div key={r.tenant} className="flex items-center gap-3 py-2.5 hover:bg-muted/40 rounded-lg px-1 group transition">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{r.tenant}</p>
                  <p className="text-xs text-muted-foreground">{r.property}</p>
                </div>
                <span className="w-20 text-xs text-muted-foreground">{r.ends}</span>
                <div className="w-24 text-center">
                  <Pill tone={r.days <= 7 ? "urgent" : r.days <= 14 ? "high" : r.days <= 30 ? "normal" : "muted"}>
                    {r.days} days
                  </Pill>
                </div>
                <div className="w-16 flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition">
                  <button title="Send Renewal Reminder" className="size-7 grid place-items-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition"><Send className="size-3.5" /></button>
                  <button title="View Lease" className="size-7 grid place-items-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition"><FileText className="size-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ── reminder center + recent activity ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* payment reminder center */}
        <SectionCard
          title="Payment Reminder Center"
          action={
            <button className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1.5 rounded-lg transition font-medium">
              <Plus className="size-3" /> Send Reminder
            </button>
          }
        >
          <div className="space-y-2">
            {reminders.map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 hover:bg-muted/30 transition">
                <div className="size-7 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0">
                  {methodIcon(r.method)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{r.tenant}</p>
                  <p className="text-xs text-muted-foreground">{r.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                  <Pill tone={r.status === "Delivered" ? "success" : "muted"}>{r.status}</Pill>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* recent financial activity */}
        <SectionCard title="Recent Financial Activity">
          <div className="space-y-0">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
                <div className="shrink-0 flex flex-col items-center gap-1 mt-0.5">
                  <span className="text-[11px] font-semibold tabular-nums text-muted-foreground w-10 text-right">{a.time}</span>
                </div>
                <div className="flex-1">
                  <div className="size-1.5 rounded-full bg-primary mt-1.5 float-left mr-2.5" />
                  <p className="text-sm text-foreground">{a.event}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ── payment history ── */}
      <SectionCard
        title="Payment History"
        action={
          <div className="flex items-center gap-2">
            <select className="text-xs border border-border rounded-lg px-2 py-1.5 bg-card text-muted-foreground focus:outline-none focus:border-primary/40">
              <option>All Methods</option>
              <option>Bank Transfer</option>
              <option>Mobile Money</option>
              <option>Cash</option>
            </select>
            <ActionBtn variant="outline"><Download className="size-3.5 mr-1 inline" />Export</ActionBtn>
          </div>
        }
      >
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-muted-foreground border-b border-border">
                <th className="text-left pb-2 pl-1 font-medium">Tenant</th>
                <th className="text-left pb-2 font-medium">Property</th>
                <th className="text-right pb-2 font-medium">Amount</th>
                <th className="text-left pb-2 font-medium">Date</th>
                <th className="text-left pb-2 font-medium">Method</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paymentHistory.map((r, i) => (
                <tr key={i} className="hover:bg-muted/40 transition group">
                  <td className="py-2.5 pl-1 font-medium">{r.tenant}</td>
                  <td className="py-2.5 text-muted-foreground">{r.property}</td>
                  <td className="py-2.5 text-right font-semibold tabular-nums text-success">{fmt(r.amount)}</td>
                  <td className="py-2.5 text-muted-foreground">{r.date}</td>
                  <td className="py-2.5">
                    <Pill tone="muted">{r.method}</Pill>
                  </td>
                  <td className="py-2.5 pr-1">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition justify-end">
                      <ActionBtn><Eye className="size-3.5" /></ActionBtn>
                      <ActionBtn><FileText className="size-3.5" /></ActionBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* ── collection analytics + reports ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* collection analytics */}
        <SectionCard title="Collection Analytics" className="xl:col-span-2">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">79%</p>
              <p className="text-xs text-muted-foreground">Collection rate — June 2026</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-primary inline-block" /> Collected</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-primary/15 inline-block" /> Target</span>
            </div>
          </div>
          <CollectionBar />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Avg Collection Time", value: "3.2 days" },
              { label: "Total Properties",     value: "142" },
              { label: "Paying On Time",       value: "81%" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-muted/50 px-3 py-2.5 text-center">
                <p className="text-sm font-bold">{s.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* reports & export */}
        <SectionCard title="Reports & Export">
          <div className="space-y-2">
            {[
              { label: "Daily Payment Report",           icon: Banknote },
              { label: "Monthly Rent Collection",        icon: CreditCard },
              { label: "Outstanding Balances Report",    icon: AlertCircle },
              { label: "Overdue Payments Report",        icon: Clock },
              { label: "Lease Renewal Report",           icon: CalendarDays },
              { label: "Payment Reminder History",       icon: Send },
              { label: "Tenant Account Statement",       icon: FileText },
            ].map((r) => (
              <button key={r.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border hover:bg-muted/50 transition group text-left">
                <r.icon className="size-4 text-muted-foreground group-hover:text-primary transition shrink-0" />
                <span className="flex-1 text-sm text-foreground">{r.label}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <Download className="size-3.5 text-muted-foreground" />
                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ── quick actions ── */}
      <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-3 flex-wrap shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <span className="text-sm font-semibold text-foreground mr-2">Quick Actions</span>
        {[
          { label: "+ Record Payment",         tone: "primary" as const },
          { label: "+ Send Payment Reminder",  tone: "outline" as const },
          { label: "+ Generate Report",        tone: "outline" as const },
          { label: "View Overdue Accounts",    tone: "outline" as const },
          { label: "Export Tenant Balances",   tone: "outline" as const },
        ].map((a) => (
          <ActionBtn key={a.label} variant={a.tone}>{a.label}</ActionBtn>
        ))}
      </div>
    </FinanceDashboardShell>
  );
}
