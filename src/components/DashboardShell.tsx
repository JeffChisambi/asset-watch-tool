import { Link, useLocation } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Wrench, AlertTriangle, ClipboardCheck, Users, Building2,
  BarChart3, Bell, Search, Sun, ChevronDown, ShieldAlert,
} from "lucide-react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <main className="ml-64 h-screen min-w-0 flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  type NavItem = { icon: LucideIcon; label: string; to?: string; badge?: string };

  const nav: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/" },
    { icon: Wrench, label: "Tickets", badge: "36" },
    { icon: AlertTriangle, label: "Urgent", badge: "5" },
    { icon: ClipboardCheck, label: "Completions" },
    { icon: Users, label: "Managers" },
    { icon: Users, label: "Technicians" },
    { icon: Building2, label: "Properties" },
  ];
  const ops: NavItem[] = [
    { icon: BarChart3, label: "Analytics", to: "/analytics" },
    { icon: ShieldAlert, label: "Escalations" },
    { icon: ClipboardCheck, label: "Reports" },
    { icon: Bell, label: "Announcements" },
  ];

  const isActive = (to?: string) => to ? path === to : false;

  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden">
      <div className="px-5 py-5 flex items-center gap-2">
        <div className="size-8 rounded-lg bg-primary grid place-items-center text-primary-foreground">
          <Wrench className="size-4" />
        </div>
        <span className="font-bold tracking-tight">FixOps</span>
      </div>
      <nav className="px-3 flex-1 min-h-0 overflow-hidden">
        <ul className="space-y-0.5">
          {nav.map((i) => (
            <li key={i.label}>
              {i.to ? (
                <Link
                  to={i.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive(i.to) ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" : "text-sidebar-foreground hover:bg-sidebar-accent/60"}`}
                >
                  <i.icon className="size-4" />
                  <span className="flex-1">{i.label}</span>
                  {i.badge && <span className={`text-[11px] font-semibold ${i.label === "Urgent" ? "text-destructive" : "text-muted-foreground"}`}>{i.badge}</span>}
                </Link>
              ) : (
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 cursor-default">
                  <i.icon className="size-4" />
                  <span className="flex-1">{i.label}</span>
                  {i.badge && <span className={`text-[11px] font-semibold ${i.label === "Urgent" ? "text-destructive" : "text-muted-foreground"}`}>{i.badge}</span>}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-6 px-3 text-[11px] uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Operations</span><ChevronDown className="size-3" />
        </div>
        <ul className="mt-2 space-y-0.5">
          {ops.map((i) => (
            <li key={i.label}>
              {i.to ? (
                <Link
                  to={i.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive(i.to) ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" : "text-sidebar-foreground hover:bg-sidebar-accent/60"}`}
                >
                  <i.icon className="size-4" />
                  <span>{i.label}</span>
                </Link>
              ) : (
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 cursor-default">
                  <i.icon className="size-4" />
                  <span>{i.label}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function Topbar() {
  return (
    <div className="flex items-center gap-3 px-8 py-4 border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
      <div className="relative flex-1 max-w-xl">
        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input placeholder="Search tickets, properties, technicians..." className="w-full rounded-full bg-muted/70 border border-transparent focus:border-primary/30 focus:bg-card outline-none pl-9 pr-16 py-2 text-sm" />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</kbd>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="size-9 grid place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground"><Sun className="size-4" /></button>
        <button className="size-9 grid place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground relative">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 bg-destructive rounded-full" />
        </button>
        <div className="size-9 rounded-full bg-gradient-to-br from-[oklch(0.75_0.13_45)] to-[oklch(0.55_0.18_25)] ring-2 ring-card" />
      </div>
    </div>
  );
}

export function SectionCard({ title, action, children, className = "" }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl bg-card border border-border shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${className}`}>
      <header className="flex items-center justify-between px-5 pt-5">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {action ?? <button className="text-muted-foreground hover:text-foreground"><span className="sr-only">More</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></button>}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Pill({ tone = "muted", children }: { tone?: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    urgent: "bg-destructive/10 text-destructive",
    high: "bg-warning/20 text-warning-foreground",
    normal: "bg-info/10 text-info",
    success: "bg-success/10 text-success",
    muted: "bg-muted text-muted-foreground",
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${map[tone] || map.muted}`}>{children}</span>;
}
