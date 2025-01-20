import { useGetReports } from "@/api/swagger";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Loader2Icon } from "lucide-react";

export function Reports() {
  const { data: reports } = useGetReports();

  return (
    <div className="mt-2">
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
