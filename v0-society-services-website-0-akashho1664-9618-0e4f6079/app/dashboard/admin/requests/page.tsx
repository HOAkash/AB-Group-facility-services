"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { StatusBadge, PriorityBadge } from "@/components/dashboard/status-badge"
import { PageTransition } from "@/components/shared/page-transition"
import { serviceRequests, staff } from "@/lib/mock-data"
import type { ServiceRequest } from "@/lib/types"
import { toast } from "sonner"

export default function AdminRequestsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [requests, setRequests] = useState(serviceRequests)
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      r.residentName.toLowerCase().includes(search.toLowerCase()) ||
      r.society.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || r.status === statusFilter
    const matchesPriority = priorityFilter === "all" || r.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  function handleAssign(reqId: string, staffName: string) {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId ? { ...r, status: "assigned" as const, assignedStaff: staffName } : r
      )
    )
    toast.success(`Assigned to ${staffName}`)
  }

  function handleStatusChange(reqId: string, newStatus: ServiceRequest["status"]) {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: newStatus } : r))
    )
    toast.success(`Status updated to ${newStatus}`)
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Request Management</h1>
          <p className="text-muted-foreground">
            Manage, assign, and track all service requests across societies.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">All Requests ({filtered.length})</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requests..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="mr-2 size-3.5" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell">Resident</TableHead>
                    <TableHead className="hidden lg:table-cell">Society</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Assigned</TableHead>
                    <TableHead className="hidden lg:table-cell">Date</TableHead>
                    <TableHead className="w-[50px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">{req.id}</TableCell>
                      <TableCell className="font-medium">{req.serviceName}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>
                          <span className="text-sm">{req.residentName}</span>
                          <span className="ml-1 text-xs text-muted-foreground">({req.residentFlat})</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-sm lg:table-cell">{req.society}</TableCell>
                      <TableCell><PriorityBadge priority={req.priority} /></TableCell>
                      <TableCell><StatusBadge status={req.status} /></TableCell>
                      <TableCell className="hidden text-sm sm:table-cell">{req.assignedStaff ?? "Unassigned"}</TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">{req.createdAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRequest(req)
                                setDetailOpen(true)
                              }}
                            >
                              <Eye className="mr-2 size-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {!req.assignedStaff && (
                              <>
                                {staff
                                  .filter((s) => s.availability)
                                  .slice(0, 3)
                                  .map((s) => (
                                    <DropdownMenuItem
                                      key={s.id}
                                      onClick={() => handleAssign(req.id, s.name)}
                                    >
                                      <UserPlus className="mr-2 size-4" />
                                      Assign: {s.name}
                                    </DropdownMenuItem>
                                  ))}
                                <DropdownMenuSeparator />
                              </>
                            )}
                            {req.status !== "completed" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(req.id, "completed")}>
                                <CheckCircle2 className="mr-2 size-4" />
                                Mark Complete
                              </DropdownMenuItem>
                            )}
                            {req.status !== "cancelled" && (
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(req.id, "cancelled")}
                                className="text-destructive"
                              >
                                <XCircle className="mr-2 size-4" />
                                Cancel Request
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                        No requests found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
              <DialogDescription>
                {selectedRequest?.id} - {selectedRequest?.serviceName}
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Resident</p>
                    <p>{selectedRequest.residentName}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Flat</p>
                    <p>{selectedRequest.residentFlat}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Society</p>
                    <p>{selectedRequest.society}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Priority</p>
                    <PriorityBadge priority={selectedRequest.priority} />
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Status</p>
                    <StatusBadge status={selectedRequest.status} />
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Assigned To</p>
                    <p>{selectedRequest.assignedStaff ?? "Unassigned"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Created</p>
                    <p>{selectedRequest.createdAt}</p>
                  </div>
                  {selectedRequest.scheduledDate && (
                    <div>
                      <p className="font-medium text-muted-foreground">Scheduled</p>
                      <p>{selectedRequest.scheduledDate}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-muted-foreground">Description</p>
                  <p className="rounded-lg bg-muted p-3 text-sm">{selectedRequest.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  )
}
