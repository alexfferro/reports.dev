import { GetReports200ItemCategory, useGetTutorials } from "@/api/swagger";
import { CreateTutorialButton } from "./components/create-tutorial-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TutorialCard } from "./components/TutorialCard";

export function Tutorials() {
  const { data: tutorials } = useGetTutorials();
  const [searchInput, setSearchInput] = useState("");
  const { userId } = useAuth();

  const filteredTutorials = tutorials?.data.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 p-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tutoriais</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-3 md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Tutoriais</h1>
        <div className="flex gap-3 items-center w-full max-w-sm">
          <Input
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            name="filter"
            type="search"
            className="text-sm text-muted-foreground w-full max-w-xs mx-auto"
            placeholder="Busque por título"
          />
        </div>
        {userId && <CreateTutorialButton />}
        {!userId && <div className="max-w-32 w-full"></div>}
      </div>
      <div className="flex items-center justify-center">
        <Tabs defaultValue={GetReports200ItemCategory.OTHERS}>
          <TabsList>
            <TabsTrigger value={GetReports200ItemCategory.OTHERS}>
              Outros
            </TabsTrigger>
            <TabsTrigger value={GetReports200ItemCategory.FINANCIAL}>
              Financeiro
            </TabsTrigger>
            <TabsTrigger value={GetReports200ItemCategory.MOVEMENT}>
              Movimento
            </TabsTrigger>
            <TabsTrigger value={GetReports200ItemCategory.REGISTER}>
              Cadastro
            </TabsTrigger>
          </TabsList>
          {tutorials ? (
            filteredTutorials ? (
              filteredTutorials.map((tutorial) => (
                <TabsContent value={tutorial.category} key={tutorial.id}>
                  <TutorialCard
                    category={tutorial.category}
                    title={tutorial.title}
                    id={tutorial.id}
                  />
                </TabsContent>
              ))
            ) : (
              tutorials.data.map((tutorial) => (
                <TabsContent value={tutorial.category} key={tutorial.id}>
                  <TutorialCard
                    category={tutorial.category}
                    title={tutorial.title}
                    id={tutorial.id}
                  />
                </TabsContent>
              ))
            )
          ) : (
            <div className="flex items-center justify-center w-full">
              <Loader2Icon className="animate-spin" />
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
