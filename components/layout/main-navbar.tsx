import { GithubIcon } from "../icons/github";
import { SidebarExpandTrigger } from "../sidebar-expand-trigger";

export const MainNavbar = () => {
  return (
    <div className="p-2.5 gap-2 w-full border-b flex justify-start items-center">
      <SidebarExpandTrigger />
      <GithubIcon />
    </div>
  );
};
