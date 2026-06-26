import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { FinanceStubPage } from "../components/FinanceDashboardShell";

export const Route = createFileRoute("/finance-settings")({
  component: () => (
    <FinanceStubPage
      icon={Settings}
      title="Settings"
      description="Configure payment reminder schedules, invoice templates, receipt formats, and finance-related system preferences."
    />
  ),
});
