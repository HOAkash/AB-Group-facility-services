"use client"

import { Download } from "lucide-react"
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
import { PaymentBadge } from "@/components/dashboard/status-badge"
import { StatCard } from "@/components/dashboard/stat-card"
import { PageTransition } from "@/components/shared/page-transition"
import { payments } from "@/lib/mock-data"
import { CreditCard, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

const myPayments = payments.filter((p) => p.residentName === "Rajesh Sharma")

export default function PaymentsPage() {
  const totalPaid = myPayments.filter((p) => p.status === "paid").reduce((a, p) => a + p.amount, 0)
  const totalPending = myPayments.filter((p) => p.status === "pending").reduce((a, p) => a + p.amount, 0)

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">View your payment history and download invoices.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Paid" value={`\u20B9${totalPaid.toLocaleString("en-IN")}`} icon={CheckCircle2} index={0} />
          <StatCard title="Pending" value={`\u20B9${totalPending.toLocaleString("en-IN")}`} icon={Clock} index={1} />
          <StatCard title="Transactions" value={String(myPayments.length)} icon={CreditCard} index={2} />
          <StatCard title="Overdue" value="0" icon={AlertTriangle} index={3} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myPayments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono text-sm">{p.invoiceNumber}</TableCell>
                      <TableCell className="font-medium">{p.serviceName}</TableCell>
                      <TableCell className="text-muted-foreground">{p.date}</TableCell>
                      <TableCell className="font-medium">{"\u20B9"}{p.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell><PaymentBadge status={p.status} /></TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() => toast.success("Invoice downloaded", { description: p.invoiceNumber })}
                        >
                          <Download className="size-3.5" /> Invoice
                        </Button>
                      </TableCell>
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
