"use client";

import React from "react";
import {
  ArrowUpCircleIcon,
  LayoutDashboardIcon,
  FileIcon,
  SettingsIcon,
  InspectionPanelIcon,
  CaptionsIcon,
  CrownIcon,
  BookOpenCheckIcon,
  PhoneIcon,
  SproutIcon,
  ListOrderedIcon,
  Images,
  FootprintsIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/app/dashboard/components/ui/card";
import { Button } from "@/app/dashboard/components/ui/button";

interface QuickLink {
  title: string;
  url: string;
  icon: LucideIcon;
  description: string;
  color?: string;
}

const quickLinks: QuickLink[] = [
  {
    title: "Site Metadata",
    url: "/dashboard/site-metadata",
    icon: InspectionPanelIcon,
    description: "Manage site metadata and SEO",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Hero",
    url: "/dashboard/hero",
    icon: CaptionsIcon,
    description: "Edit hero section content",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Owner Message",
    url: "/dashboard/owner-message",
    icon: CrownIcon,
    description: "Update owner message section",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Testimonials",
    url: "/dashboard/testimonials",
    icon: BookOpenCheckIcon,
    description: "Manage driver testimonials",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Contact (CTA)",
    url: "/dashboard/cta",
    icon: PhoneIcon,
    description: "Manage call-to-action section",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Why FTT",
    url: "/dashboard/whyftt",
    icon: ArrowUpCircleIcon,
    description: "Edit why choose FTT section",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Sign-On Bonus",
    url: "/dashboard/sign-on-bonus",
    icon: FileIcon,
    description: "Manage sign-on bonus details",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Pay & Growth",
    url: "/dashboard/pay-growth",
    icon: SproutIcon,
    description: "Update pay and growth information",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Benefits",
    url: "/dashboard/benefits",
    icon: ArrowUpCircleIcon,
    description: "Manage employee benefits",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Requirements",
    url: "/dashboard/requirements",
    icon: ListOrderedIcon,
    description: "Update application requirements",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Gallery",
    url: "/dashboard/gallery",
    icon: Images,
    description: "Manage gallery images",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Footer",
    url: "/dashboard/footer",
    icon: FootprintsIcon,
    description: "Edit footer content",
    color: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Settings",
    url: "/dashboard/setting",
    icon: SettingsIcon,
    description: "System settings and preferences",
    color: "bg-red-50 dark:bg-red-950",
  },
];

export function QuickLinks() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Quick Access</h2>
        <p className="text-sm text-muted-foreground">
          Click on any section below to manage your content
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.url} href={link.url}>
              <Card className={`h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${link.color}`}>
                <div className="p-6 flex flex-col items-start space-y-3 h-full">
                  <div className="p-2 rounded-lg bg-background/50">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm leading-tight">
                      {link.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
