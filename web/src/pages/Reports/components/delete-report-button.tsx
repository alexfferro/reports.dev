import { getGetReportsQueryKey, useDeleteReport } from "@/api/swagger";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const deleteReportSchema = z.object({
  id: z.number(),
});
type ReportType = z.infer<typeof deleteReportSchema>;

export function DeleteReportButton({ id }: ReportType) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteReport } = useDeleteReport();

  async function handleDeleteReport() {
    setIsLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/files/${id}`, {
        method: "DELETE",
      });
      await deleteReport({ id });
      await queryClient.invalidateQueries({
        queryKey: getGetReportsQueryKey(),
      });
      toast.success("Relatório excluído com sucesso.");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none">
        Deletar
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza sobre isso ?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita, tenha certeza de que deseja apagar
            esse relatório de forma permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteReport}>
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
