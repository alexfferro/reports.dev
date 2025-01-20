import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Separator } from "../../../components/ui/separator";
import { UpdateReportForm } from "./update-report-form";

enum ReportsCategory {
  FINANCIAL = "FINANCIAL",
  REGISTER = "REGISTER",
  MOVEMENT = "MOVEMENT",
  OTHERS = "OTHERS",
}

interface UpdateReportButtonProps {
  id: number;
  title?: string;
  description?: string;
  category?: ReportsCategory;
}

export function UpdateReportButton({
  category,
  description,
  id,
  title,
}: UpdateReportButtonProps) {
  return (
    <Dialog>
      <DialogTrigger className="items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none">
        Editar
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Relatório</DialogTitle>
          <DialogDescription>
            Preencha os dados do relatório para continuar.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <UpdateReportForm
          id={id}
          category={category}
          description={description}
          title={title}
        />
      </DialogContent>
    </Dialog>
  );
}
