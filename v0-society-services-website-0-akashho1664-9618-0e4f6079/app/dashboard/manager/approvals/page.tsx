"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { StatusBadge, PriorityBadge } from "@/components/dashboard/status-badge"
import { PageTransition } from "@/components/shared/page-transition"
import { serviceRequests } from "@/lib/mock-data"
import type { ServiceRequest } from "@/lib/types"
import { toast } from "sonner"

export default function ApprovalsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>(
    serviceRequests.filter((r) => r.society === "Sunrise Heights")
  )

  const pending = requests.filter((r) => r.status === "pending")
  const others = requests.filter((r) => r.status !== "pending")

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r))
    )
    toast.success("Request approved", { description: "The service request has been approved." })
  }

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "cancelled" as const } : r))
    )
    toast.error("Request rejected", { description: "The service request has been rejected." })
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Approvals</h1>
          <p className="text-muted-foreground">Review and approve service requests from residents.</p>
        </div>

        {pending.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pending Approval ({pending.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pending.map((req) => (
                  <div key={req.id} className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{req.serviceName}</p>
                        <PriorityBadge priority={req.priority} />
                      </div>
                      <p className="text-sm text-muted-foreground">{req.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {req.residentName} ({req.residentFlat}) - {req.createdAt}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="gap-1" onClick={() => handleApprove(req.id)}>
                        <Check className="size-3.5" /> Approve
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive" className="gap-1">
                            <X className="size-3.5" /> Reject
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Reject Request?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will reject the {req.serviceName} request from {req.residentName}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleReject(req.id)}>
                              Reject
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {pending.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              All requests have been reviewed. No pending approvals.
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Processed Requests ({others.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {others.slice(0, 8).map((req) => (
                <div key={req.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{req.serviceName}</p>
                    <p className="text-xs text-muted-foreground">
                      {req.residentName} ({req.residentFlat})
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
