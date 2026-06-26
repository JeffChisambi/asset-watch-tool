import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-payments")({
  component: () => (
    <FinanceStubPage
      icon={CreditCard}
      title="Payments"
      description="Record, verify, and review all rent payments received from tenants."
    />
  ),
});
