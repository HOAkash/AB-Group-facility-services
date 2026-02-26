"use client"

import Link from "next/link"
import {
  Users,
  CheckSquare,
  ClipboardList,
  AlertTriangle,
  ArrowRight,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge, PriorityBadge } from "@/components/dashboard/status-badge"
import { PageTransition } from "@/components/shared/page-transition"
import { serviceRequests, residents, notifications } from "@/lib/mock-data"

const societyRequests = serviceRequests.filter((r) => r.society === "Sunrise Heights")
const pendingApprovals = societyRequests.filter((r) => r.status === "pending")
const societyResidents = residents.filter((r) => r.society === "Sunrise Heights")

export default function ManagerDashboard() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manager Dashboard</h1>
          <p className="text-muted-foreground">
            Sunrise Heights overview and management tools.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Residents" value={String(societyResidents.length)} change="+2 this month" trend="up" icon={Users} index={0} />
          <StatCard title="Active Requests" value={String(societyRequests.filter((r) => !["completed", "cancelled"].includes(r.status)).length)} icon={ClipboardList} index={1} />
          <StatCard title="Pending Approvals" value={String(pendingApprovals.length)} icon={CheckSquare} index={2} />
          <StatCard title="Urgent Issues" value={String(societyRequests.filter((r) => r.priority === "urgent").length)} icon={AlertTriangle} index={3} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Pending Approvals</CardTitle>
              <Link href="/dashboard/manager/approvals">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All <ArrowRight className="size-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApprovals.length === 0 ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">No pending approvals</p>
                ) : (
                  pendingApprovals.map((req) => (
                    <div key={req.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium">{req.serviceName}</p>
                        <p className="text-xs text-muted-foreground">
                          {req.residentName} - {req.residentFlat}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority={req.priority} />
                        <StatusBadge status={req.status} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.slice(0, 5).map((n) => (
                  <div key={n.id} className="flex items-start gap-3 rounded-lg border p-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
