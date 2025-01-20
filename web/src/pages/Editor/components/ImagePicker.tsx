import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Editor } from "@tiptap/react";
import { FloatingButton } from "./FloatingButton";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Loader2Icon } from "lucide-react";

interface ImagePickerProps {
  editor: Editor;
}

export function ImagePicker({ editor }: ImagePickerProps) {
  const [image, setImage] = useState<File | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const floatingButtonRef = useRef<HTMLButtonElement>(null);

  async function handleSubmitImage() {
    try {
      setIsImageLoading(true);
      if (!image) {
        throw new Error("Imagem não encontrada.");
      }
      const img = await uploadToCloudinary(image, "image");
      editor.chain().focus().setImage({ src: img.secure_url }).run();
      setImage(null);
    } catch (error) {
      console.error("Erro ao adicionar imagem:", error);
    } finally {
      setIsImageLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FloatingButton
          ref={floatingButtonRef}
          src="https://www.notion.so/images/blocks/image.c61b60c2.png"
          title="Image"
          subtitle="Upload or embed with a link"
          onClick={() => {
            editor
              .chain()
              .focus()
              .deleteRange({
                from: editor.state.selection.from - 1,
                to: editor.state.selection.from,
              })
              .run();
          }}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione uma Imagem</DialogTitle>
        </DialogHeader>
        {isImageLoading ? (
          <Loader2Icon className="animate-spin flex w-full items-center justify-center" />
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const img = e.target.files?.[0];
              setImage(img || null);
            }}
          />
        )}

        <DialogFooter className="gap-3">
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
          <Button onClick={handleSubmitImage}>Enviar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
