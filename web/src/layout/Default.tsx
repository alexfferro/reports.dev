import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/pages/Footer/Footer";
import { Header } from "@/pages/Header/Header";
import { Outlet } from "react-router-dom";
export function Default() {
  return (
    <div className="grid grid-rows-[10%_1fr_7%] h-screen">
      <Header />
      <div>
        <ScrollArea className="w-full h-full px-2">
          <Outlet />
        </ScrollArea>
        <Toaster />
      </div>
      <Footer />
    </div>
  );
}
