import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-reminders")({
  component: () => (
    <FinanceStubPage
      icon={Send}
      title="Payment Reminders"
      description="Send, schedule, and monitor automatic or manual payment reminder notifications to tenants."
    />
  ),
});
