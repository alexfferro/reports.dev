import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { File } from "lucide-react";

interface ShowPDFDialogProps {
  url: string;
}

export function ShowPDFDialog({ url }: ShowPDFDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="max-w-14 justify-center flex">
          <Button asChild variant="ghost" className="flex h-8 w-8 p-0">
            <a rel="noopener noreferrer">
              <File />
            </a>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="fixed top-1/2 left-1/2 max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-center">Visualizar PDF</DialogTitle>
          <DialogDescription className="max-w-5xl h-[80vh]">
            <iframe
              src={`${import.meta.env.VITE_BACKEND_URL}${url}`}
              className="h-full w-full"
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
