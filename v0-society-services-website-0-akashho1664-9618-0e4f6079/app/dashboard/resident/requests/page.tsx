"use client"

import { useState, Fragment } from "react"
import { Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge, PriorityBadge } from "@/components/dashboard/status-badge"
import { PageTransition } from "@/components/shared/page-transition"
import { Progress } from "@/components/ui/progress"
import { serviceRequests } from "@/lib/mock-data"
import type { RequestStatus } from "@/lib/types"

const myRequests = serviceRequests.filter(
  (r) => r.residentName === "Rajesh Sharma"
)

const statusSteps: RequestStatus[] = [
  "pending",
  "approved",
  "assigned",
  "in-progress",
  "completed",
]

function getProgress(status: RequestStatus) {
  if (status === "cancelled") return 0
  const idx = statusSteps.indexOf(status)
  return ((idx + 1) / statusSteps.length) * 100
}

export default function RequestsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = myRequests.filter((r) => {
    const matchSearch =
      r.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())

    const matchStatus =
      statusFilter === "all" || r.status === statusFilter

    return matchSearch && matchStatus
  })

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            My Requests
          </h1>
          <p className="text-muted-foreground">
            Track and manage your service requests.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 size-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Service Requests ({filtered.length})
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filtered.map((req) => (
                    <Fragment key={req.id}>
                      <TableRow
                        className="cursor-pointer"
                        onClick={() =>
                          setExpanded(
                            expanded === req.id ? null : req.id
                          )
                        }
                      >
                        <TableCell className="font-medium">
                          {req.serviceName}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-muted-foreground">
                          {req.description}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {req.createdAt}
                        </TableCell>
                        <TableCell>
                          <PriorityBadge priority={req.priority} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={req.status} />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            {expanded === req.id
                              ? "Collapse"
                              : "Details"}
                          </Button>
                        </TableCell>
                      </TableRow>

                      {expanded === req.id && (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="bg-muted/30"
                          >
                            <div className="space-y-4 p-2">
                              <p className="text-sm">
                                <span className="font-medium">
                                  Full Description:
                                </span>{" "}
                                {req.description}
                              </p>

                              {req.assignedStaff && (
                                <p className="text-sm">
                                  <span className="font-medium">
                                    Assigned To:
                                  </span>{" "}
                                  {req.assignedStaff}
                                </p>
                              )}

                              {req.scheduledDate && (
                                <p className="text-sm">
                                  <span className="font-medium">
                                    Scheduled:
                                  </span>{" "}
                                  {req.scheduledDate}
                                </p>
                              )}

                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  Progress
                                </p>

                                <Progress
                                  value={getProgress(req.status)}
                                  className="h-2"
                                />

                                <div className="flex justify-between text-xs text-muted-foreground">
                                  {statusSteps.map((s) => (
                                    <span
                                      key={s}
                                      className={
                                        statusSteps.indexOf(s) <=
                                        statusSteps.indexOf(req.status)
                                          ? "text-primary font-medium"
                                          : ""
                                      }
                                    >
                                      {s
                                        .charAt(0)
                                        .toUpperCase() +
                                        s.slice(1).replace("-", " ")}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filtered.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                No requests found.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
