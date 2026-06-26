import { createFileRoute } from "@tanstack/react-router";
import { Bell, Plus, Info, AlertTriangle, CheckCircle2, Megaphone } from "lucide-react";
import { DashboardShell, SectionCard, Pill } from "../components/DashboardShell";

export const Route = createFileRoute("/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — SGWops" },
      { name: "description", content: "Operational announcements and team communications." },
    ],
  }),
  component: Announcements,
});

const announcements = [
  {
    id: 1,
    title: "SLA Policy Update — Urgent Response Window Reduced to 2h",
    body: "Effective Feb 15, 2026, the SLA target for critical and gas-related issues has been revised from 4 hours to 2 hours. All managers and technicians must update their response protocols accordingly.",
    author: "Operations Director",
    date: "Feb 3, 2026",
    type: "policy",
    pinned: true,
    read: false,
  },
  {
    id: 2,
    title: "Scheduled Maintenance — Block E2 Water System",
    body: "Block E2 main water supply will be shut down on Feb 10, 2026 from 08:00 to 14:00 for pipe replacement works. Tenants have been notified. Coordinate with Peter Mulenga for any urgent cases.",
    author: "Grace Moyo",
    date: "Feb 2, 2026",
    type: "maintenance",
    pinned: true,
    read: false,
  },
  {
    id: 3,
    title: "New Technician Onboarded — Alice Phiri (HVAC Specialist)",
    body: "Alice Phiri has joined the team as an HVAC specialist effective Feb 1, 2026. She will be covering Zone B and Zone F. Please update your job assignment rosters.",
    author: "HR Department",
    date: "Feb 1, 2026",
    type: "team",
    pinned: false,
    read: true,
  },
  {
    id: 4,
    title: "January KPI Results — Team Performance Above Target",
    body: "The team achieved 96% on-time completion in January, exceeding the 95% target. Tenant satisfaction averaged 4.7/5.0. Full report available in the Reports section. Well done to all.",
    author: "Operations Director",
    date: "Feb 1, 2026",
    type: "report",
    pinned: false,
    read: true,
  },
  {
    id: 5,
    title: "Safety Reminder — Gas Leak Protocol",
    body: "Following the Block E2 gas incident, please remind all technicians to follow the full gas isolation checklist before any kitchen or utility work. Updated safety cards have been issued.",
    author: "Safety Officer",
    date: "Jan 30, 2026",
    type: "safety",
    pinned: false,
    read: true,
  },
  {
    id: 6,
    title: "System Update — SGWops Mobile App v2.3",
    body: "The SGWops mobile app has been updated to v2.3. Key changes include offline ticket submission, push notifications for urgent assignments, and improved photo upload for job evidence.",
    author: "IT Department",
    date: "Jan 28, 2026",
    type: "system",
    pinned: false,
    read: true,
  },
];

const typeConfig: Record<string, { tone: string; icon: typeof Bell; label: string }> = {
  policy: { tone: "urgent", icon: AlertTriangle, label: "Policy" },
  maintenance: { tone: "high", icon: Info, label: "Maintenance" },
  team: { tone: "normal", icon: CheckCircle2, label: "Team" },
  report: { tone: "success", icon: CheckCircle2, label: "Report" },
  safety: { tone: "urgent", icon: AlertTriangle, label: "Safety" },
  system: { tone: "muted", icon: Info, label: "System" },
};

function Announcements() {
  const unread = announcements.filter((a) => !a.read).length;
  const pinned = announcements.filter((a) => a.pinned);
  const rest = announcements.filter((a) => !a.pinned);

  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Team communications and operational notices</p>
        </div>
        <div className="ml-auto flex gap-2">
          {unread > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm">
              <Bell className="size-4 text-primary" />{unread} unread
            </span>
          )}
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90">
            <Plus className="size-4" />New announcement
          </button>
        </div>
      </div>

      {/* Pinned */}
      {pinned.length > 0 && (
        <SectionCard title="Pinned"
          action={<span className="text-xs text-muted-foreground">{pinned.length} pinned</span>}>
          <div className="space-y-3">
            {pinned.map((a) => {
              const cfg = typeConfig[a.type];
              const Icon = cfg.icon;
              return (
                <div key={a.id} className={`rounded-xl border p-4 ${!a.read ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                  <div className="flex items-start gap-3">
                    <span className={`size-8 rounded-full grid place-items-center shrink-0 mt-0.5 bg-${cfg.tone === "urgent" ? "destructive" : cfg.tone === "high" ? "warning" : "primary"}/10`}>
                      <Icon className={`size-4 ${cfg.tone === "urgent" ? "text-destructive" : cfg.tone === "high" ? "text-warning-foreground" : "text-primary"}`} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-sm font-semibold ${!a.read ? "text-foreground" : "text-foreground"}`}>{a.title}</p>
                        <Pill tone={cfg.tone}>{cfg.label}</Pill>
                        {!a.read && <Pill tone="normal">New</Pill>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.body}</p>
                      <p className="text-xs text-muted-foreground mt-2">{a.author} · {a.date}</p>
                    </div>
                    <Megaphone className="size-4 text-muted-foreground shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {/* All others */}
      <SectionCard title="All Announcements"
        action={<span className="text-xs text-muted-foreground">{rest.length} notices</span>}>
        <div className="space-y-3">
          {rest.map((a) => {
            const cfg = typeConfig[a.type];
            const Icon = cfg.icon;
            return (
              <div key={a.id} className={`rounded-xl border p-4 ${!a.read ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                <div className="flex items-start gap-3">
                  <span className="size-8 rounded-full bg-muted grid place-items-center shrink-0 mt-0.5">
                    <Icon className="size-4 text-muted-foreground" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{a.title}</p>
                      <Pill tone={cfg.tone}>{cfg.label}</Pill>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.body}</p>
                    <p className="text-xs text-muted-foreground mt-2">{a.author} · {a.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </DashboardShell>
  );
}
