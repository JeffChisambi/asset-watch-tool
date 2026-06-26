import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-notifications")({
  component: () => (
    <FinanceStubPage
      icon={Bell}
      title="Notifications"
      description="View system alerts related to payments, overdue accounts, reminder deliveries, and lease renewals."
    />
  ),
});
