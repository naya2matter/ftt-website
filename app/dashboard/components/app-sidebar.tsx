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
  CaptionsIcon,
  CrownIcon,
  BookOpenCheckIcon,
  PhoneIcon,
  SproutIcon,
  ListOrderedIcon,
  Images,
  FootprintsIcon,
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
    {
      title: "Hero",
      url: "/dashboard/hero",
      icon: CaptionsIcon,
    },
    {
      title: "Owner Message",
      url: "/dashboard/owner-message",
      icon: CrownIcon,
    },
    {
      title: "Testimonials",
      url: "/dashboard/testimonials",
      icon: BookOpenCheckIcon,
    },
    {
      title: "Contact",
      url: "/dashboard/cta",
      icon: PhoneIcon,
    },
    {
      title: "Why FTT",
      url: "/dashboard/whyftt",
      icon: ArrowUpCircleIcon,
    },
    {
      title: "Sign-On Bonus",
      url: "/dashboard/sign-on-bonus",
      icon: FileIcon,
    },
    {
      title: "Pay & Growth",
      url: "/dashboard/pay-growth",
      icon: SproutIcon,
    },
    {
      title: "Benefits",
      url: "/dashboard/benefits",
      icon: ArrowUpCircleIcon,
    },
    {
      title: "Requirement",
      url: "/dashboard/requirements",
      icon: ListOrderedIcon,
    },
    {
      title: "Gallery",
      url: "/dashboard/gallery",
      icon: Images,
    },
    {
      title: "Footer",
      url: "/dashboard/footer",
      icon: FootprintsIcon,
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
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
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
