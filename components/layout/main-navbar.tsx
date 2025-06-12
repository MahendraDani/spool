import { GithubIcon } from "../icons/github";
import { SidebarExpandTrigger } from "../sidebar-expand-trigger";

export const MainNavbar = () => {
  return (
    <div className="gap-2 min-h-7 w-full flex justify-start items-center">
      <SidebarExpandTrigger />
      <GithubIcon />
    </div>
  );
};
