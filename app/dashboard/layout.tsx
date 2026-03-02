"use client";

import "./dashboard.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarProvider } from "./components/ui/sidebar";
import { useAuthStore } from "./stores/auth.store";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Check if user has a token in localStorage
    const token = localStorage.getItem("cms_token");
    if (!token && !isAuthenticated) {
      // Redirect to login if no token
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Show loading state or empty while checking auth
  const token = typeof window !== "undefined" ? localStorage.getItem("cms_token") : null;
  if (!token && !isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "16rem",
          "--header-height": "3rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <main style={{ fontFamily: 'var(--font-display)' }} className="relative flex min-h-svh flex-1 flex-col bg-background">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">{children}</div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
