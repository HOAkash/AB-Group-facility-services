"use client"

import { useState } from "react"
import { Plus, Send, Megaphone, Building2, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PageTransition } from "@/components/shared/page-transition"
import { societies } from "@/lib/mock-data"
import { toast } from "sonner"

interface Announcement {
  id: string
  title: string
  message: string
  targetSociety: string
  type: "info" | "warning" | "urgent"
  createdAt: string
}

const initialAnnouncements: Announcement[] = [
  {
    id: "a1",
    title: "Scheduled Water Supply Maintenance",
    message: "Water supply will be interrupted on Feb 25 from 10 AM to 2 PM for maintenance work in Block A and B. Please store adequate water.",
    targetSociety: "Sunrise Heights",
    type: "warning",
    createdAt: "2026-02-22",
  },
  {
    id: "a2",
    title: "New Pest Control Schedule",
    message: "Quarterly pest control treatment has been scheduled for all common areas. Building-wise schedule will be shared via email.",
    targetSociety: "all",
    type: "info",
    createdAt: "2026-02-20",
  },
  {
    id: "a3",
    title: "Emergency: Lift Maintenance",
    message: "Lift #2 in Tower C is under emergency repair. Expected resolution by Feb 23 evening. Please use Lift #1 or stairs.",
    targetSociety: "Green Valley Residency",
    type: "urgent",
    createdAt: "2026-02-21",
  },
  {
    id: "a4",
    title: "Holi Celebration Cleaning Drive",
    message: "Post-Holi cleaning drive scheduled for March 15. Extra housekeeping staff will be deployed across all societies.",
    targetSociety: "all",
    type: "info",
    createdAt: "2026-02-18",
  },
  {
    id: "a5",
    title: "Security Guard Shift Change",
    message: "Night shift security guard change effective from March 1. New guard briefing sessions will be held this week.",
    targetSociety: "Palm Grove Estates",
    type: "info",
    createdAt: "2026-02-17",
  },
]

const typeConfig: Record<string, { label: string; className: string }> = {
  info: {
    label: "Info",
    className: "bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-400 dark:border-blue-800",
  },
  warning: {
    label: "Warning",
    className: "bg-amber-500/10 text-amber-700 border-amber-200 dark:text-amber-400 dark:border-amber-800",
  },
  urgent: {
    label: "Urgent",
    className: "bg-red-500/10 text-red-700 border-red-200 dark:text-red-400 dark:border-red-800",
  },
}

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState({
    title: "",
    message: "",
    targetSociety: "all",
    type: "info" as "info" | "warning" | "urgent",
  })

  function handleCreate() {
    if (!form.title || !form.message) {
      toast.error("Title and message are required")
      return
    }
    const announcement: Announcement = {
      id: `a${Date.now()}`,
      title: form.title,
      message: form.message,
      targetSociety: form.targetSociety,
      type: form.type,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setAnnouncements((prev) => [announcement, ...prev])
    setForm({ title: "", message: "", targetSociety: "all", type: "info" })
    setAddOpen(false)
    toast.success("Announcement published")
  }

  function handleDelete(id: string) {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
    toast.success("Announcement deleted")
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
            <p className="text-muted-foreground">
              Broadcast important updates to residents and managers.
            </p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 size-4" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Announcement</DialogTitle>
                <DialogDescription>
                  This will be sent to all residents and managers of the selected society.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ann-title">Title *</Label>
                  <Input
                    id="ann-title"
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="Announcement title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ann-msg">Message *</Label>
                  <Textarea
                    id="ann-msg"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Write the announcement message..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Target Society</Label>
                    <Select
                      value={form.targetSociety}
                      onValueChange={(v) => setForm((p) => ({ ...p, targetSociety: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Societies</SelectItem>
                        {societies.map((s) => (
                          <SelectItem key={s.id} value={s.name}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={form.type}
                      onValueChange={(v) =>
                        setForm((p) => ({
                          ...p,
                          type: v as "info" | "warning" | "urgent",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button onClick={handleCreate}>
                  <Send className="mr-2 size-4" />
                  Publish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {announcements.map((ann) => {
            const tc = typeConfig[ann.type]
            return (
              <Card key={ann.id}>
                <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Megaphone className="size-4 text-primary" />
                      <h3 className="font-semibold">{ann.title}</h3>
                      <Badge variant="outline" className={tc.className}>
                        {tc.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ann.message}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="size-3" />
                        {ann.targetSociety === "all" ? "All Societies" : ann.targetSociety}
                      </span>
                      <span>{ann.createdAt}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(ann.id)}
                  >
                    <Trash2 className="size-4" />
                    <span className="sr-only">Delete announcement</span>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
          {announcements.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No announcements yet. Create one to get started.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
