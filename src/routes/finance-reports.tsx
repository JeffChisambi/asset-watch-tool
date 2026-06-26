import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-reports")({
  component: () => (
    <FinanceStubPage
      icon={BarChart3}
      title="Reports"
      description="Generate financial reports such as rent collection summaries, outstanding balances, overdue accounts, and payment history."
    />
  ),
});
