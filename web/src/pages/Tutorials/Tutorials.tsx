import { useGetTutorials } from "@/api/swagger";
import { DataTable } from "../../components/data-table/data-table";
import { Loader2Icon } from "lucide-react";
import { columns } from "./components/columns";
import { CreateTutorialButton } from "./components/create-tutorial-button";
import { useAuth } from "@clerk/clerk-react";

export function Tutorials() {
  const { data: tutorials } = useGetTutorials();
  const { userId } = useAuth();

  return (
    <div className="mt-2 space-y-3">
      <div className="flex-col gap-3 lg:flex-row lg:max-w-5xl mx-auto flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tutorials</h2>
        {userId && <CreateTutorialButton />}
      </div>
      {tutorials ? (
        <DataTable columns={columns} data={tutorials?.data} />
      ) : (
        <div className="flex items-center justify-center">
          <Loader2Icon size={24} className="animate-spin" />
        </div>
      )}
    </div>
  );
}
