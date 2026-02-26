import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | AB Group Facility Services",
  description: "Manage your society services from one place.",
}

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
