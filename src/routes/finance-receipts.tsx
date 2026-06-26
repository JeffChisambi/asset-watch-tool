import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-receipts")({
  component: () => (
    <FinanceStubPage
      icon={Receipt}
      title="Receipts"
      description="Access and reissue payment receipts for completed transactions."
    />
  ),
});
