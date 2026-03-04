"use client"

import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/dashboard/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/dashboard/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/dashboard/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuthStore } from "../stores/auth.store"
import { HttpClient } from "@/lib/http/http-client"
import { toast } from "sonner"
import { ConfirmDialog } from "./ui/confirm-dialog"
import Cookies from "js-cookie";
import { getStoredUser } from "@/lib/http/auth"


export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token, logout } = useAuthStore();
  const storedUser = getStoredUser();
  const displayUser = { ...(storedUser ?? {}), ...(user ?? {}) };

  const handleLogout = async () => {
    try {
      setLoading(true);

      const client = new HttpClient({
        baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "/api",
        getToken: () => token,
      });

      await client.logout();
      toast.success("Logged out successfully");
    } catch {
      console.warn("Logout API failed, continuing cleanup...");
    } finally {
      setLoading(false);

      Cookies.remove("cms_token");
      try { localStorage.removeItem("cms_user"); } catch {}
      logout();

      router.replace("/login");
    }
  };
  return (
    <>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarFallback className="rounded-lg">{(displayUser.name || "").split(" ").map(s=>s[0]).slice(0,2).join("") || "CN"}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayUser.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {displayUser.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">{(displayUser.name || "").split(" ").map(s=>s[0]).slice(0,2).join("") || "CN"}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayUser.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {displayUser.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowConfirmDialog(true)}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>

    {showConfirmDialog && (
        <ConfirmDialog
          message="Are you sure you want to log out?"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </>
  )
}
