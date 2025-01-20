import { Separator } from "@/components/ui/separator";
import { ClipboardButton } from "./components/ClipboardButton";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center sm:grid sm:grid-cols-2 py-4">
      <div className="max-w-96 items-center space-y-2 px-2 md:border-r md:col-span-1 ">
        <div className="flex flex-col md:grid">
          <ClipboardButton text="bit.ly/plussoft_s9" type="Link" />
          <ClipboardButton text="bit.ly/plussoft_SQL" type="Link" />
          <ClipboardButton text="bit.ly/plussoft_SSMS" type="Link" />
          <ClipboardButton text="bit.ly/plussoft_impressoras" type="Link" />
        </div>
        <Separator />
        <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
          <ClipboardButton
            text="(82) 99984-8410"
            label="Administrativo"
            type="Contato"
          />
          <ClipboardButton
            text="(82) 99685-2019"
            label="WhatsApp"
            type="Contato"
          />
          <ClipboardButton
            text="(82) 3142-0867"
            label="Central"
            type="Contato"
          />
          <ClipboardButton
            text="(82) 99649-6051"
            label="Cenmatica"
            type="Contato"
          />
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}
