import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { RequestStatus } from "@/lib/types"

const statusConfig: Record<RequestStatus, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-700 border-amber-200 dark:text-amber-400 dark:border-amber-800",
  },
  approved: {
    label: "Approved",
    className: "bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-400 dark:border-blue-800",
  },
  assigned: {
    label: "Assigned",
    className: "bg-indigo-500/10 text-indigo-700 border-indigo-200 dark:text-indigo-400 dark:border-indigo-800",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-cyan-500/10 text-cyan-700 border-cyan-200 dark:text-cyan-400 dark:border-cyan-800",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-500/10 text-red-700 border-red-200 dark:text-red-400 dark:border-red-800",
  },
}

export function StatusBadge({ status }: { status: RequestStatus }) {
  const config = statusConfig[status]
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", config.className)}
    >
      {config.label}
    </Badge>
  )
}

const paymentStatusConfig: Record<string, { label: string; className: string }> = {
  paid: {
    label: "Paid",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-700 border-amber-200 dark:text-amber-400 dark:border-amber-800",
  },
  overdue: {
    label: "Overdue",
    className: "bg-red-500/10 text-red-700 border-red-200 dark:text-red-400 dark:border-red-800",
  },
  refunded: {
    label: "Refunded",
    className: "bg-muted text-muted-foreground border-border",
  },
}

export function PaymentBadge({ status }: { status: string }) {
  const config = paymentStatusConfig[status] ?? paymentStatusConfig.pending
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", config.className)}
    >
      {config.label}
    </Badge>
  )
}

const priorityConfig: Record<string, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-muted text-muted-foreground border-border" },
  medium: { label: "Medium", className: "bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-400 dark:border-blue-800" },
  high: { label: "High", className: "bg-amber-500/10 text-amber-700 border-amber-200 dark:text-amber-400 dark:border-amber-800" },
  urgent: { label: "Urgent", className: "bg-red-500/10 text-red-700 border-red-200 dark:text-red-400 dark:border-red-800" },
}

export function PriorityBadge({ priority }: { priority: string }) {
  const config = priorityConfig[priority] ?? priorityConfig.low
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", config.className)}
    >
      {config.label}
    </Badge>
  )
}
