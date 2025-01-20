import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";

import { CreateReportForm } from "./create-report-form";
import { Separator } from "../../../components/ui/separator";

export function CreateReportButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Criar Relatório <ArrowUpDown />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Relatório</DialogTitle>
          <DialogDescription>
            Preencha os dados do relatório para continuar.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <CreateReportForm />
      </DialogContent>
    </Dialog>
  );
}
