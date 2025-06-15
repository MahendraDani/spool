"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { useMediaQuery } from "@/hooks/use-media-query";

export const SidebarExpandTrigger = () => {
  const { state } = useSidebar();
  const {isMobile} = useMediaQuery();
  return (
    <div className={state==="collapsed" || isMobile ? "block" : "hidden"}>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger />
          </TooltipTrigger>
          <TooltipContent>
            <p>Expand sidebar</p>
          </TooltipContent>
        </Tooltip>
    </div>
  );
};
