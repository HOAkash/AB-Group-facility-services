"use client"

import {
  IndianRupee,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Download,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatCard } from "@/components/dashboard/stat-card"
import { PaymentBadge } from "@/components/dashboard/status-badge"
import { PageTransition } from "@/components/shared/page-transition"
import { payments, monthlyRevenue } from "@/lib/mock-data"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useState } from "react"
import { toast } from "sonner"

export default function AdminBillingPage() {
  const [statusFilter, setStatusFilter] = useState("all")

  const totalRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((a, p) => a + p.amount, 0)
  const pendingAmount = payments
    .filter((p) => p.status === "pending")
    .reduce((a, p) => a + p.amount, 0)
  const overdueAmount = payments
    .filter((p) => p.status === "overdue")
    .reduce((a, p) => a + p.amount, 0)

  const filtered = payments.filter(
    (p) => statusFilter === "all" || p.status === statusFilter
  )

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Billing & Revenue</h1>
            <p className="text-muted-foreground">
              Track payments, invoices, and revenue across all societies.
            </p>
          </div>
          <Button variant="outline" onClick={() => toast.success("Report downloading...")}>
            <Download className="mr-2 size-4" />
            Export Report
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Collected"
            value={`\u20B9${totalRevenue.toLocaleString("en-IN")}`}
            change="+12%"
            trend="up"
            icon={IndianRupee}
            index={0}
          />
          <StatCard
            title="Pending"
            value={`\u20B9${pendingAmount.toLocaleString("en-IN")}`}
            icon={TrendingUp}
            index={1}
          />
          <StatCard
            title="Overdue"
            value={`\u20B9${overdueAmount.toLocaleString("en-IN")}`}
            change="-5%"
            trend="down"
            icon={AlertCircle}
            index={2}
          />
          <StatCard
            title="Invoices Paid"
            value={`${payments.filter((p) => p.status === "paid").length}/${payments.length}`}
            icon={CheckCircle2}
            index={3}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue Trend (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    color: "var(--color-foreground)",
                  }}
                  formatter={(value: number) => [
                    `\u20B9${value.toLocaleString("en-IN")}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">All Invoices ({filtered.length})</CardTitle>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 size-3.5" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell">Resident</TableHead>
                    <TableHead className="hidden lg:table-cell">Society</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono text-xs">{p.invoiceNumber}</TableCell>
                      <TableCell className="font-medium">{p.serviceName}</TableCell>
                      <TableCell className="hidden text-sm md:table-cell">{p.residentName}</TableCell>
                      <TableCell className="hidden text-sm lg:table-cell">{p.society}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-0.5 font-medium">
                          <IndianRupee className="size-3 text-muted-foreground" />
                          {p.amount.toLocaleString("en-IN")}
                        </div>
                      </TableCell>
                      <TableCell><PaymentBadge status={p.status} /></TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">{p.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
