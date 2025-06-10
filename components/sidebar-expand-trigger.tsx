"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

export const SidebarExpandTrigger = () => {
  const { state } = useSidebar();
  return (
    <div>
      {state === "collapsed" && (
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger />
          </TooltipTrigger>
          <TooltipContent>
            <p>Expand sidebar</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
