import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { LogInIcon, Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";

const borderAnimation =
  "relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-amber-700 after:scale-x-0 after:origin-left";

export function Header() {
  return (
    <div className="flex items-center border-b">
      <header className="flex justify-between items-center w-full p-3">
        <nav className="flex gap-16 items-center py-1/2">
          <Link to="/">
            <img src={Logo} alt="Logotipo" className="max-w-32 object-cover" />
          </Link>
          <div className="hidden lg:flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex gap-3 items-center font-semibold text-muted-foreground transition-colors ease-in py-2 ${borderAnimation} ${
                  isActive
                    ? "after:animate-border_in text-primary"
                    : "after:animate-border_out"
                }`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `flex gap-3 items-center font-semibold text-muted-foreground transition-colors ease-in py-2 ${borderAnimation} ${
                  isActive
                    ? "after:animate-border_in text-primary"
                    : "after:animate-border_out"
                }`
              }
            >
              Relatórios
            </NavLink>
            <NavLink
              to="/tutorials"
              className={({ isActive }) =>
                `flex gap-3 items-center font-semibold text-muted-foreground transition-colors ease-in py-2 ${borderAnimation} ${
                  isActive
                    ? "after:animate-border_in text-primary"
                    : "after:animate-border_out"
                }`
              }
            >
              Tutoriais
            </NavLink>
          </div>
        </nav>
        <div className="lg:hidden">
          <Dialog>
            <DialogTrigger>
              <Menu />
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center justify-center gap-3">
              <DialogHeader>Menu de Navegação</DialogHeader>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex gap-3 items-center font-semibold text-muted-foreground transition-colors ease-in py-2 ${borderAnimation} ${
                    isActive
                      ? "after:animate-border_in text-primary"
                      : "after:animate-border_out"
                  }`
                }
              >
                Inicio
              </NavLink>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `flex gap-3 items-center font-semibold text-muted-foreground transition-colors ease-in py-2 ${borderAnimation} ${
                    isActive
                      ? "after:animate-border_in text-primary"
                      : "after:animate-border_out"
                  }`
                }
              >
                Relatórios
              </NavLink>
              <NavLink
                to="/tutorials"
                className={({ isActive }) =>
                  `flex gap-3 items-center font-semibold text-muted-foreground transition-colors ease-in py-2 ${borderAnimation} ${
                    isActive
                      ? "after:animate-border_in text-primary"
                      : "after:animate-border_out"
                  }`
                }
              >
                Tutoriais
              </NavLink>
            </DialogContent>
          </Dialog>
        </div>
        <SignedOut>
          <SignInButton>
            <Button
              className="flex gap-2 items-center"
              variant="outline"
              size="sm"
            >
              Entrar <LogInIcon />
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
}
