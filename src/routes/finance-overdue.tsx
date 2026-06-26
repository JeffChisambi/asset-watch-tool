import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-overdue")({
  component: () => (
    <FinanceStubPage
      icon={Clock}
      title="Overdue Payments"
      description="View tenants whose payments have passed their due dates and prioritize collection efforts."
    />
  ),
});
