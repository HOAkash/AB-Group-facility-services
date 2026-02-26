"use client"

import {
  ClipboardList,
  Clock,
  CheckCircle2,
  TrendingUp,
  Building2,
  IndianRupee,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge, PriorityBadge } from "@/components/dashboard/status-badge"
import { PageTransition } from "@/components/shared/page-transition"
import { serviceRequests, monthlyRevenue, serviceStats, societies } from "@/lib/mock-data"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function AdminDashboard() {
  const total = serviceRequests.length
  const pending = serviceRequests.filter((r) => r.status === "pending").length
  const inProgress = serviceRequests.filter((r) => r.status === "in-progress").length
  const completed = serviceRequests.filter((r) => r.status === "completed").length
  const totalRevenue = monthlyRevenue.reduce((a, m) => a + m.revenue, 0)

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of all operations across {societies.length} societies.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <StatCard title="Total Requests" value={String(total)} change="+12%" trend="up" icon={ClipboardList} index={0} />
          <StatCard title="Pending" value={String(pending)} icon={Clock} index={1} />
          <StatCard title="In Progress" value={String(inProgress)} icon={TrendingUp} index={2} />
          <StatCard title="Completed" value={String(completed)} change="+8%" trend="up" icon={CheckCircle2} index={3} />
          <StatCard title="Revenue (6mo)" value={`\u20B9${(totalRevenue / 100000).toFixed(1)}L`} change="+15%" trend="up" icon={IndianRupee} index={4} />
          <StatCard title="Active Societies" value={String(societies.length)} icon={Building2} index={5} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                  <YAxis className="text-xs" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-foreground)",
                    }}
                    formatter={(value: number) => [`\u20B9${value.toLocaleString("en-IN")}`, "Revenue"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                    dot={{ fill: "var(--color-primary)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Requests by Service</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={serviceStats}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} angle={-20} textAnchor="end" height={50} />
                  <YAxis className="text-xs" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-foreground)",
                    }}
                  />
                  <Bar dataKey="requests" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {serviceRequests.slice(0, 6).map((req) => (
                <div key={req.id} className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">{req.serviceName}</span>
                      <span className="text-xs text-muted-foreground">{req.society}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {req.residentName} ({req.residentFlat}) - {req.createdAt}
                    </p>
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
      </div>
    </PageTransition>
  )
}
