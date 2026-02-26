"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Building2,
  LayoutDashboard,
  Wrench,
  ClipboardList,
  CreditCard,
  UserCircle,
  Users,
  CheckSquare,
  Bell,
  BarChart3,
  UserCog,
  Settings2,
  Megaphone,
  LogOut,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { UserRole } from "@/lib/types"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const navByRole: Record<UserRole, { main: NavItem[]; secondary?: NavItem[] }> = {
  resident: {
    main: [
      { label: "Dashboard", href: "/dashboard/resident", icon: LayoutDashboard },
      { label: "Services", href: "/dashboard/resident/services", icon: Wrench },
      { label: "My Requests", href: "/dashboard/resident/requests", icon: ClipboardList },
      { label: "Payments", href: "/dashboard/resident/payments", icon: CreditCard },
    ],
    secondary: [
      { label: "Profile", href: "/dashboard/resident/profile", icon: UserCircle },
    ],
  },
  manager: {
    main: [
      { label: "Dashboard", href: "/dashboard/manager", icon: LayoutDashboard },
      { label: "Residents", href: "/dashboard/manager/residents", icon: Users },
      { label: "Approvals", href: "/dashboard/manager/approvals", icon: CheckSquare },
      { label: "Notifications", href: "/dashboard/manager/notifications", icon: Bell },
    ],
  },
  admin: {
    main: [
      { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { label: "Requests", href: "/dashboard/admin/requests", icon: ClipboardList },
      { label: "Staff", href: "/dashboard/admin/staff", icon: UserCog },
      { label: "Services", href: "/dashboard/admin/services", icon: Settings2 },
      { label: "Billing", href: "/dashboard/admin/billing", icon: BarChart3 },
      { label: "Announcements", href: "/dashboard/admin/announcements", icon: Megaphone },
    ],
  },
}

const roleLabels: Record<UserRole, string> = {
  resident: "Resident",
  manager: "Society Manager",
  admin: "Vendor Admin",
}

const roleUser: Record<UserRole, { name: string; email: string }> = {
  resident: { name: "Rajesh Sharma", email: "rajesh@email.com" },
  manager: { name: "Anil Mehta", email: "anil@abgroup.com" },
  admin: { name: "Admin User", email: "admin@abgroup.com" },
}

export function AppSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname()
  const nav = navByRole[role]
  const user = roleUser[role]

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                  <Building2 className="size-4 text-primary-foreground" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">AB Group</span>
                  <span className="text-xs text-muted-foreground">
                    {roleLabels[role]}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.main.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {nav.secondary && (
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.secondary.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip={user.name}>
              <Link href="/login">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col gap-0.5 leading-none">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <LogOut className="size-4 text-muted-foreground" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
