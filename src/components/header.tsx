import { Notebook } from "lucide-react";

import { AccountMenu } from "./account-menu";
import { ThemeToggle } from "./theme/theme-toggle";
import { Separator } from "./ui/separator";
import { Sidebar } from "./sidebar";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <div className="flex gap-2 items-center justify-center text-primary">
          <Notebook className="h-6 w-6 ml-10 md:ml-0" />
          <h2 className="text-xl font-semibold hidden md:block">Fiaposts</h2>
        </div>

        <Separator orientation="vertical" className="h-6" />
        <Sidebar />
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
