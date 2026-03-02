"use client";
import * as React from "react";
import {
  ArrowUpCircleIcon,
  LayoutDashboardIcon,
  FileIcon,
  SettingsIcon,
  HelpCircleIcon,
  SearchIcon,
  InspectionPanelIcon,
} from "lucide-react";
import { NavMain } from "@/app/dashboard/components/nav-main";
import { NavSecondary } from "@/app/dashboard/components/nav-secondary";
import { NavUser } from "@/app/dashboard/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/dashboard/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Site Metadata",
      url: "/dashboard/site-metadata",
      icon: InspectionPanelIcon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/setting",
      icon: SettingsIcon,
    },
    
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <Image src="/FTT-Logo.png" alt="Ftt-CMS Logo" width={40} height={40} />
                <span className="text-base font-semibold">Ftt-CMS</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser  />
      </SidebarFooter>
    </Sidebar>
  );
}
