import {
  getGetTutorialsQueryKey,
  GetTutorials200ItemCategory,
  useUpdateTutorial,
  type GetTutorials200Item,
} from "@/api/swagger";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const updateTutorialSchema = z.object({
  title: z.string().min(1, "Titulo Obrigatório"),
  category: z.nativeEnum(GetTutorials200ItemCategory),
});

export function UpdateTutorialButton(tutorial: GetTutorials200Item) {
  const { id, title, category } = tutorial;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: updateTutorial } = useUpdateTutorial();
  const form = useForm<GetTutorials200Item>({
    resolver: zodResolver(updateTutorialSchema),
    defaultValues: {
      title,
      category,
    },
  });

  async function handleUpdateTutorial(data: GetTutorials200Item) {
    setIsLoading(true);
    try {
      await updateTutorial({ id, data });
      await queryClient.invalidateQueries({
        queryKey: getGetTutorialsQueryKey(),
      });
      toast.success("Tutorial Atualizado com sucesso!");
      navigate(`/tutorials/editor/${id}`);
    } catch (err) {
      console.error("Error Updating tutorial:", err);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Tutorial</DialogTitle>
          <DialogDescription>
            Defina um titulo e uma categoria
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateTutorial)}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                defaultValue={title}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 justify-between items-center">
                      <FormLabel>Titulo</FormLabel>
                      <FormMessage className="text-xs font-semibold" />
                    </div>
                    <FormControl>
                      <Input placeholder="Titulo do Tutorial" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                defaultValue={category}
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
                        <SelectItem
                          value={GetTutorials200ItemCategory.FINANCIAL}
                        >
                          Financeiro
                        </SelectItem>
                        <SelectItem value={GetTutorials200ItemCategory.OTHERS}>
                          Outros
                        </SelectItem>
                        <SelectItem
                          value={GetTutorials200ItemCategory.REGISTER}
                        >
                          Cadastro
                        </SelectItem>
                        <SelectItem
                          value={GetTutorials200ItemCategory.MOVEMENT}
                        >
                          Movimento
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Fechar</Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
