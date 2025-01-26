import { BrainCog, Edit } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { items } from "@/lib/constants";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b">
        <div className="flex h-full w-full items-center justify-center gap-2.5">
          <Input type="text" placeholder="Search Chats..." className="flex-1" />
          <Button type="button" variant="outline" size="icon">
            <Edit />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
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
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
