import {
  CreateTutorialBodyCategory,
  getGetTutorialsQueryKey,
  useCreateTutorial,
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
import { Loader2Icon, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const createTutorialSchema = z.object({
  title: z.string().min(1, "Titulo Obrigatório"),
  category: z.nativeEnum(CreateTutorialBodyCategory),
});
type TutorialType = z.infer<typeof createTutorialSchema>;

export function CreateTutorialButton() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createTutorial } = useCreateTutorial();
  const form = useForm<TutorialType>({
    resolver: zodResolver(createTutorialSchema),
    defaultValues: {
      title: "",
      category: CreateTutorialBodyCategory.OTHERS,
    },
  });

  async function handleCreateTutorial(data: TutorialType) {
    setIsLoading(true);
    const { category, title } = data;
    try {
      const {
        data: { id },
      } = await createTutorial({ data: { category, title } });
      await queryClient.invalidateQueries({
        queryKey: getGetTutorialsQueryKey(),
      });
      toast.success("Tutorial Criado com sucesso!");
      navigate(`/tutorials/editor/${id}`);
    } catch (err) {
      console.error("Error creating tutorial:", err);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Criar Tutorial <PlusCircleIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Tutorial</DialogTitle>
          <DialogDescription>
            Defina um titulo e uma categoria
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateTutorial)}
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
                      <Input placeholder="Titulo do Tutorial" {...field} />
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
                        <SelectItem
                          value={CreateTutorialBodyCategory.FINANCIAL}
                        >
                          Financeiro
                        </SelectItem>
                        <SelectItem value={CreateTutorialBodyCategory.OTHERS}>
                          Outros
                        </SelectItem>
                        <SelectItem value={CreateTutorialBodyCategory.REGISTER}>
                          Cadastro
                        </SelectItem>
                        <SelectItem value={CreateTutorialBodyCategory.MOVEMENT}>
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
