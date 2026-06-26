import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-invoices")({
  component: () => (
    <FinanceStubPage
      icon={FileText}
      title="Invoices"
      description="Generate, view, resend, and manage rent invoices issued to tenants."
    />
  ),
});
