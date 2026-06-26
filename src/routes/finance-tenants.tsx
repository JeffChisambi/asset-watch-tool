import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-tenants")({
  component: () => (
    <FinanceStubPage
      icon={Users}
      title="Tenant Accounts"
      description="View and manage each tenant's financial account, including rent charges, balances, and payment history."
    />
  ),
});
