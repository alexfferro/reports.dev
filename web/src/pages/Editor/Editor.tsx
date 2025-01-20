import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import {
  getTutorial,
  GetTutorial200Category,
  updateTutorial,
  type GetTutorial200,
} from "@/api/swagger";
import { Badge } from "@/components/ui/badge";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import "highlight.js/styles/tokyo-night-dark.css";
import { Placeholder } from "@tiptap/extension-placeholder";
import { BubbleGroup } from "./components/BubbleGroup";
import { useAuth } from "@clerk/clerk-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FloatingGroup } from "./components/FloatingGroup";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

const lowlight = createLowlight(all);
const CATEGORY_LABELS_MAP = {
  [GetTutorial200Category.OTHERS]: "Outros",
  [GetTutorial200Category.FINANCIAL]: "Financeiro",
  [GetTutorial200Category.MOVEMENT]: "Movimento",
  [GetTutorial200Category.REGISTER]: "Cadastro",
};

export function Editor() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState<GetTutorial200 | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      editor?.setEditable(false);
    }
    if (userId) {
      editor?.setEditable(true);
    }
  }, [userId]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageResize.configure({
        allowBase64: true,
      }),
      TaskList,
      TaskItem,
      Placeholder.configure({
        placeholder: "Escreva algo ...",
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    onUpdate: async ({ editor }) => {
      if (tutorial && tutorial.content != "") {
        const content = editor.getHTML();
        await updateTutorial(Number(id), { content });
      }
    },
    autofocus: true,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const { data } = await getTutorial(Number(id));
        setTutorial(data);
        if (data.content && editor) {
          editor.commands.setContent(data.content);
        }
      } catch (err) {
        console.error("Erro ao carregar tutorial:", err);
      }
    };

    if (id) fetchTutorial();
  }, [id]);

  return (
    <div>
      <div className="pt-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/tutorials">Tutoriais</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{tutorial?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-6 justify-center w-full">
          <span className="text-2xl font-bold">{tutorial?.title}</span>
          <Badge className="text-sm rounded-full font-bold">
            {tutorial?.category && CATEGORY_LABELS_MAP[tutorial?.category]}
          </Badge>
        </div>
        <EditorContent
          editor={editor}
          className="max-w-xs lg:max-w-4xl mx-auto prose prose-invert max-h-[400px]"
        />
        {editor && <BubbleGroup editor={editor} />}
        {editor && <FloatingGroup editor={editor} />}
      </div>
    </div>
  );
}
