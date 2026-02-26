"use client"

import Link from "next/link"
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  CreditCard,
  Wrench,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge, PriorityBadge } from "@/components/dashboard/status-badge"
import { PageTransition } from "@/components/shared/page-transition"
import { serviceRequests, payments } from "@/lib/mock-data"

const myRequests = serviceRequests.filter((r) => r.residentName === "Rajesh Sharma")
const myPayments = payments.filter((p) => p.residentName === "Rajesh Sharma")

export default function ResidentDashboard() {
  const active = myRequests.filter((r) => !["completed", "cancelled"].includes(r.status))
  const completed = myRequests.filter((r) => r.status === "completed")
  const pendingPayments = myPayments.filter((p) => p.status === "pending")

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, Rajesh</h1>
          <p className="text-muted-foreground">
            {"Here's an overview of your service requests and payments."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Requests"
            value={String(active.length)}
            icon={ClipboardList}
            index={0}
          />
          <StatCard
            title="Completed"
            value={String(completed.length)}
            change="+1 this week"
            trend="up"
            icon={CheckCircle2}
            index={1}
          />
          <StatCard
            title="Pending Payments"
            value={`\u20B9${pendingPayments.reduce((a, p) => a + p.amount, 0).toLocaleString("en-IN")}`}
            icon={CreditCard}
            index={2}
          />
          <StatCard
            title="Next Scheduled"
            value="Feb 21"
            icon={Clock}
            index={3}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Requests</CardTitle>
              <Link href="/dashboard/resident/requests">
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  View All <ArrowRight className="size-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myRequests.slice(0, 4).map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                        <Wrench className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{req.serviceName}</p>
                        <p className="text-xs text-muted-foreground">
                          {req.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={req.priority} />
                      <StatusBadge status={req.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="/dashboard/resident/services">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col items-start gap-1 p-4"
                  >
                    <Wrench className="size-5 text-primary" />
                    <span className="font-medium">Request Service</span>
                    <span className="text-xs text-muted-foreground">
                      Browse available services
                    </span>
                  </Button>
                </Link>
                <Link href="/dashboard/resident/requests">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col items-start gap-1 p-4"
                  >
                    <ClipboardList className="size-5 text-primary" />
                    <span className="font-medium">Track Request</span>
                    <span className="text-xs text-muted-foreground">
                      Check request progress
                    </span>
                  </Button>
                </Link>
                <Link href="/dashboard/resident/payments">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col items-start gap-1 p-4"
                  >
                    <CreditCard className="size-5 text-primary" />
                    <span className="font-medium">View Payments</span>
                    <span className="text-xs text-muted-foreground">
                      Payment history & invoices
                    </span>
                  </Button>
                </Link>
                <Link href="/dashboard/resident/profile">
                  <Button
                    variant="outline"
                    className="h-auto w-full flex-col items-start gap-1 p-4"
                  >
                    <Clock className="size-5 text-primary" />
                    <span className="font-medium">Schedule Service</span>
                    <span className="text-xs text-muted-foreground">
                      Book a future date
                    </span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
