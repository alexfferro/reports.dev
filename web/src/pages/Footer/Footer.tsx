import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <div className="hidden lg:flex items-center justify-center gap-1 text-sm text-muted-foreground border-t">
      <span className="flex gap-1 items-center">Desenvolvido por</span>
      <a
        href="https://github.com/alexfferro"
        target="_blank"
        rel="noopener noreferrer"
      >
        Alex Ferro
      </a>
      <Button variant="ghost" size="icon" asChild className="rounded-full">
        <a
          href="https://github.com/alexfferro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
      </Button>
    </div>
  );
}
