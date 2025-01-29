import { useGetReports } from "@/api/swagger";
import { DataTable } from "../../components/data-table/data-table";
import { columns } from "./components/columns";
import { Loader2Icon } from "lucide-react";
import { CreateReportButton } from "../Reports/components/create-report-button";
import { useAuth } from "@clerk/clerk-react";

export function Reports() {
  const { data: reports } = useGetReports();
  const { userId } = useAuth();

  return (
    <div className="mt-2 space-y-3">
      <div className="flex-col gap-3 lg:flex-row lg:max-w-5xl mx-auto flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reports</h2>
        {userId && <CreateReportButton />}
      </div>
      {reports ? (
        <DataTable columns={columns} data={reports?.data} />
      ) : (
        <div className="flex items-center justify-center">
          <Loader2Icon size={24} className="animate-spin" />
        </div>
      )}
    </div>
  );
}
