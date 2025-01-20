import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyCheck, CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ClipboardButtonProps {
  label?: string;
  text: string;
  type: "Link" | "Contato";
}

export function ClipboardButton({ text, label, type }: ClipboardButtonProps) {
  const [isCopying, setIsCopying] = useState(false);
  function handleCopyToClipboard() {
    setIsCopying(true);
    try {
      if (type === "Contato") {
        navigator.clipboard.writeText(`${label} - ${text}`);
      } else {
        navigator.clipboard.writeText(text);
      }
      toast.success("Link copiado para a área de transferência");
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setIsCopying(false), 2000);
    }
  }

  return (
    <div className="flex md:flex-col justify-center items-center gap-2 rounded-lg p-1">
      {label && <Label className="font-semibold w-40 md:w-auto">{label}</Label>}
      <div className="flex items-center justify-between w-full gap-1">
        <Input value={text} readOnly className="text-sm" />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleCopyToClipboard}
          className="transition-all ease-linear"
        >
          {isCopying ? (
            <CopyCheck className="text-emerald-500 transition-all ease-in duration-300" />
          ) : (
            <CopyIcon className="transition-all ease-in duration-300" />
          )}
        </Button>
      </div>
    </div>
  );
}
