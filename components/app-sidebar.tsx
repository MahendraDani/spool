"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarCollapseTrigger } from "./sidebar-collapse-trigger";

// Menu items.
const items = [
  {
    title: "Workspaces",
    url: "#",
    icon: Home,
  },
  {
    title: "Folders",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Snippets",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

/*
/<username> show user profile in sidebar header
/<username>/* show workspace in sidebar header
*/
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="group flex flex-row justify-between items-center">
        <span>Hello</span>
        <div className="group-hover:visible invisible">
          <SidebarCollapseTrigger />
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
