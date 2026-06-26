import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-lease-renewals")({
  component: () => (
    <FinanceStubPage
      icon={CalendarDays}
      title="Lease Renewals"
      description="Track lease expiry dates and notify tenants whose rental agreements are approaching renewal."
    />
  ),
});
