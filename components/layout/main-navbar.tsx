import { LogoutButton } from "../logout";
import { SidebarExpandTrigger } from "../sidebar-expand-trigger";
import { ThemeToggleButton } from "../theme-toggle";

export const MainNavbar = () => {
  return (
    <div className="pr-4 gap-2 min-h-7 w-full flex justify-between items-center">
      <div className="flex justify-start items-center gap-2">
        <SidebarExpandTrigger />
        <p>Spool</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <ThemeToggleButton/>
        <LogoutButton/>
      </div>
    </div>
  );
};
