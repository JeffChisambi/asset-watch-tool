import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-outstanding")({
  component: () => (
    <FinanceStubPage
      icon={AlertCircle}
      title="Outstanding Balances"
      description="Monitor tenants with unpaid balances and track the amount owed by each account."
    />
  ),
});
