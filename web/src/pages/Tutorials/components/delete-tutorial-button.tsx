import { getGetTutorialsQueryKey, useDeleteTutorial } from "@/api/swagger";
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
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const deleteReportSchema = z.object({
  id: z.number(),
});
type ReportType = z.infer<typeof deleteReportSchema>;

export function DeleteTutorialButton({ id }: ReportType) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteTutorial } = useDeleteTutorial();

  async function handleDeleteTutorial() {
    setIsLoading(true);
    try {
      await deleteTutorial({ id });
      await queryClient.invalidateQueries({
        queryKey: getGetTutorialsQueryKey(),
      });
      toast.success("Tutorial excluído com sucesso.");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none">
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza sobre isso ?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita, tenha certeza de que deseja apagar
            esse tutorial de forma permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteTutorial}
            disabled={isLoading}
          >
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Deletar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
