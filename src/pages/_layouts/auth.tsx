import { Notebook } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Notebook className="h-5 w-5" />
          <span className="font-semibold">fiaposts</span>
        </div>

        <footer className="text-sm">
          Painel do professor &copy; fiaposts - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
