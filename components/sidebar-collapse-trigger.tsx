"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

export const SidebarCollapseTrigger = () => {
  const { state } = useSidebar();
  return (
    <div>
      {state === "expanded" && (
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger />
          </TooltipTrigger>
          <TooltipContent>
            <p>Collapse sidebar</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
