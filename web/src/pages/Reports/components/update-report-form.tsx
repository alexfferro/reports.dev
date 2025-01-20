import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { getGetReportsQueryKey, useUpdateReport } from "../../../api/swagger";
import { Input } from "../../../components/ui/input";
import { DialogClose, DialogFooter } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Separator } from "../../../components/ui/separator";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

enum ReportsCategory {
  FINANCIAL = "FINANCIAL",
  REGISTER = "REGISTER",
  MOVEMENT = "MOVEMENT",
  OTHERS = "OTHERS",
}

const updateReportSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.nativeEnum(ReportsCategory).optional(),
  pdf: z
    .instanceof(File)
    .refine((file) => file.size > 0, "O arquivo não pode ser vazio")
    .refine(
      (file) => ["application/pdf".includes(file.type)],
      "O arquivo deve ser um PDF"
    )
    .optional(),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "O arquivo não pode ser vazio")
    .refine(
      (file) => ["application/pdf".includes(file.type)],
      "O arquivo deve ser um PDF"
    )
    .optional(),
});
type ReportType = z.infer<typeof updateReportSchema>;

export function UpdateReportForm({
  title,
  description,
  id,
  category,
}: ReportType) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ReportType>({
    resolver: zodResolver(updateReportSchema),
    defaultValues: {
      id,
      category,
      title,
      description,
      pdf: undefined,
      file: undefined,
    },
  });

  const queryClient = useQueryClient();
  const { mutateAsync: updateReport } = useUpdateReport();

  async function handleCreateReport(data: ReportType) {
    setIsLoading(true);
    const { title, description, category, pdf, file, id } = data;
    await updateReport({ id, data: { title, description, category } });
    await queryClient.invalidateQueries({
      queryKey: getGetReportsQueryKey(),
    });

    try {
      if (!pdf || !file) {
        return;
      }

      const form = new FormData();
      form.append("pdf", pdf);
      form.append("file", file);
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/files/${id}`, {
        method: "PUT",
        body: form,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      toast.success("Relatório criado com sucesso!");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateReport)}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 justify-between items-center">
                  <FormLabel>Titulo</FormLabel>
                  <FormMessage className="text-xs font-semibold" />
                </div>
                <FormControl>
                  <Input
                    placeholder="Titulo do relatório - Prefira um nome que resuma bem o que ele faz"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 justify-between items-center">
                  <FormLabel>Descrição</FormLabel>
                  <FormMessage className="text-xs font-semibold" />
                </div>
                <FormControl>
                  <Textarea
                    className="resize-none h-24"
                    placeholder="Descrição do relatório, explique como ele funciona e/ou quais são os parâmetros necessários para que ele funcione."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 justify-between items-center">
                  <FormLabel>Categoria</FormLabel>
                  <FormMessage className="text-xs font-semibold" />
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ReportsCategory.FINANCIAL}>
                      Financeiro
                    </SelectItem>
                    <SelectItem value={ReportsCategory.OTHERS}>
                      Outros
                    </SelectItem>
                    <SelectItem value={ReportsCategory.REGISTER}>
                      Cadastro
                    </SelectItem>
                    <SelectItem value={ReportsCategory.MOVEMENT}>
                      Movimento
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pdf"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 justify-between items-center">
                  <FormLabel>Selecione o PDF</FormLabel>
                  <FormMessage className="text-xs font-semibold" />
                </div>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] || undefined)
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 justify-between items-center">
                  <FormLabel>Selecione o arquivo do Relatório</FormLabel>
                  <FormMessage className="text-xs font-semibold" />
                </div>
                <FormControl>
                  <Input
                    type="file"
                    accept=".SGR9"
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] || undefined)
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator />
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Fechar</Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Enviar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
