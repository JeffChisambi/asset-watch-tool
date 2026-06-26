import { Link, useLocation } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Users, CreditCard, AlertCircle, Clock,
  Bell, Send, CalendarDays, FileText, Receipt, BarChart3,
  Settings, Wrench, Search, Sun, ChevronRight, Banknote,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type NavItem = { icon: LucideIcon; label: string; to: string; badge?: string };

const financeNav: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard",          to: "/finance" },
  { icon: Users,           label: "Tenant Accounts",    to: "/finance-tenants" },
  { icon: CreditCard,      label: "Payments",           to: "/finance-payments" },
  { icon: AlertCircle,     label: "Outstanding Balances", to: "/finance-outstanding" },
  { icon: Clock,           label: "Overdue Payments",   to: "/finance-overdue",   badge: "16" },
  { icon: Send,            label: "Payment Reminders",  to: "/finance-reminders" },
  { icon: CalendarDays,    label: "Lease Renewals",     to: "/finance-lease-renewals", badge: "5" },
  { icon: FileText,        label: "Invoices",           to: "/finance-invoices" },
  { icon: Receipt,         label: "Receipts",           to: "/finance-receipts" },
  { icon: BarChart3,       label: "Reports",            to: "/finance-reports" },
  { icon: Bell,            label: "Notifications",      to: "/finance-notifications", badge: "3" },
  { icon: Settings,        label: "Settings",           to: "/finance-settings" },
];

export function FinanceDashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      <FinanceSidebar />
      <main className="ml-64 h-screen min-w-0 flex flex-col overflow-hidden">
        <FinanceTopbar />
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function FinanceSidebar() {
  const location = useLocation();
  const path = location.pathname;
  const isActive = (to: string) => path === to;

  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden">
      {/* logo */}
      <div className="px-5 py-5 flex items-center gap-2 shrink-0">
        <div className="size-8 rounded-lg bg-primary grid place-items-center text-primary-foreground">
          <Banknote className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="font-bold tracking-tight text-sm leading-tight">SGWops</p>
          <p className="text-[10px] text-muted-foreground leading-tight">Finance</p>
        </div>
      </div>

      {/* nav */}
      <nav className="px-3 flex-1 overflow-y-auto">
        <ul className="space-y-0.5">
          {financeNav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive(item.to)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                }`}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span className={`text-[11px] font-semibold tabular-nums ${
                    item.label === "Overdue Payments" ? "text-destructive" :
                    item.label === "Notifications" ? "text-destructive" :
                    "text-muted-foreground"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* switch back hint */}
      <div className="px-3 py-3 border-t border-sidebar-border shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-sidebar-accent/60 transition"
        >
          <Wrench className="size-3.5 shrink-0" />
          <span>Switch to Operations</span>
        </Link>
      </div>
    </aside>
  );
}

function FinanceTopbar() {
  const location = useLocation();
  const path = location.pathname;
  const currentPage = financeNav.find((n) => n.to === path)?.label ?? "Finance";

  return (
    <div className="flex items-center gap-3 px-8 py-4 border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
      <div className="relative flex-1 max-w-xl">
        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search tenants, properties, invoices..."
          className="w-full rounded-full bg-muted/70 border border-transparent focus:border-primary/30 focus:bg-card outline-none pl-9 pr-16 py-2 text-sm"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</kbd>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="size-9 grid place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground">
          <Sun className="size-4" />
        </button>
        <button className="size-9 grid place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground relative">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 bg-destructive rounded-full" />
        </button>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="size-9 rounded-full bg-gradient-to-br from-[oklch(0.75_0.13_45)] to-[oklch(0.55_0.18_25)] ring-2 ring-card focus:outline-none focus:ring-primary/40" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="z-50 w-56 rounded-xl border border-border bg-card shadow-lg p-1.5 animate-in fade-in-0 zoom-in-95"
            >
              <div className="px-3 py-2 mb-1 border-b border-border">
                <p className="text-xs font-semibold text-foreground">Switch Dashboard</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Testing mode</p>
              </div>

              <DropdownMenu.Item asChild>
                <Link
                  to="/"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors outline-none select-none text-foreground hover:bg-muted"
                >
                  <div className="size-6 rounded-md grid place-items-center bg-muted text-muted-foreground">
                    <Wrench className="size-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Operations</p>
                    <p className="text-[11px] text-muted-foreground">Maintenance & tickets</p>
                  </div>
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <Link
                  to="/finance"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors outline-none select-none bg-primary/10 text-primary font-semibold"
                >
                  <div className="size-6 rounded-md grid place-items-center bg-primary text-primary-foreground">
                    <Banknote className="size-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">Finance</p>
                    <p className="text-[11px] text-primary/70">Rent, payments & leases</p>
                  </div>
                  <ChevronRight className="size-3.5 text-primary" />
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}

export function FinanceSectionCard({
  title, action, children, className = "",
}: {
  title: string; action?: React.ReactNode; children: React.ReactNode; className?: string;
}) {
  return (
    <section className={`rounded-2xl bg-card border border-border shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${className}`}>
      <header className="flex items-center justify-between px-5 pt-5">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {action ?? (
          <button className="text-muted-foreground hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
          </button>
        )}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function FinancePill({ tone = "muted", children }: { tone?: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    urgent:  "bg-destructive/10 text-destructive",
    high:    "bg-warning/20 text-warning-foreground",
    normal:  "bg-info/10 text-info",
    success: "bg-success/10 text-success",
    muted:   "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${map[tone] || map.muted}`}>
      {children}
    </span>
  );
}

/* Stub page wrapper — used for nav pages not yet fully built */
export function FinanceStubPage({
  icon: Icon, title, description,
}: {
  icon: LucideIcon; title: string; description: string;
}) {
  return (
    <FinanceDashboardShell>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <div className="rounded-2xl bg-card border border-border p-16 flex flex-col items-center justify-center gap-4 text-center">
        <div className="size-14 rounded-2xl bg-primary/10 grid place-items-center">
          <Icon className="size-7 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">{description}</p>
        </div>
        <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">Coming soon</span>
      </div>
    </FinanceDashboardShell>
  );
}
