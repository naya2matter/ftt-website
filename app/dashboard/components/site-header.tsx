"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Separator } from "@/app/dashboard/components/ui/separator"
import { SidebarTrigger } from "@/app/dashboard/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/dashboard/components/ui/breadcrumb"

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  "site-metadata": "Site Metadata",
  hero: "Hero",
  "owner-message": "Owner Message",
  testimonials: "Testimonials",
  cta: "Contact",
  whyftt: "Why FTT",
  "sign-on-bonus": "Sign-On Bonus",
  "pay-growth": "Pay & Growth",
  benefits: "Benefits",
  requirements: "Requirements",
  gallery: "Gallery",
  footer: "Footer",
  setting: "Settings",
  profile: "Profile",
  account: "Account",
  create: "Create",
  edit: "Edit",
  blank: "Blank",
}

function getLabel(segment: string) {
  return SEGMENT_LABELS[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1)
}

export function SiteHeader() {
  const pathname = usePathname()

  // Build breadcrumb segments from the path
  const segments = pathname.split("/").filter(Boolean)

  // Build cumulative hrefs: ["dashboard"], ["dashboard","hero"], …
  const crumbs = segments.map((seg, i) => ({
    label: getLabel(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
  }))

  return (
    <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1
              return (
                <React.Fragment key={crumb.href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
