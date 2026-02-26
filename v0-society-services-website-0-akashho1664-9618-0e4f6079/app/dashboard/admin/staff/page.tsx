"use client"

import { useState } from "react"
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Star,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PageTransition } from "@/components/shared/page-transition"
import { staff as initialStaff } from "@/lib/mock-data"
import type { Staff } from "@/lib/types"
import { toast } from "sonner"

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState(initialStaff)
  const [search, setSearch] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
  })

  const filtered = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.specialty.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  )

  const available = staffList.filter((s) => s.availability).length
  const totalAssigned = staffList.reduce((a, s) => a + s.assignedRequests, 0)

  function handleToggleAvailability(id: string) {
    setStaffList((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, availability: !s.availability } : s
      )
    )
    toast.success("Availability updated")
  }

  function handleAddStaff() {
    if (!newStaff.name || !newStaff.email || !newStaff.specialty) {
      toast.error("Please fill all required fields")
      return
    }
    const member: Staff = {
      id: `st${Date.now()}`,
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone,
      specialty: newStaff.specialty,
      availability: true,
      assignedRequests: 0,
      rating: 0,
      joinedDate: new Date().toISOString().split("T")[0],
    }
    setStaffList((prev) => [...prev, member])
    setNewStaff({ name: "", email: "", phone: "", specialty: "" })
    setAddOpen(false)
    toast.success(`${member.name} added to staff`)
  }

  function handleRemoveStaff(id: string) {
    setStaffList((prev) => prev.filter((s) => s.id !== id))
    toast.success("Staff member removed")
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
            <p className="text-muted-foreground">
              {staffList.length} staff members - {available} available - {totalAssigned} active assignments
            </p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 size-4" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>
                  Enter the details for the new staff member.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="staff-name">Full Name *</Label>
                  <Input
                    id="staff-name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff-email">Email *</Label>
                  <Input
                    id="staff-email"
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff((p) => ({ ...p, email: e.target.value }))}
                    placeholder="name@abgroup.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff-phone">Phone</Label>
                  <Input
                    id="staff-phone"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff-specialty">Specialty *</Label>
                  <Input
                    id="staff-specialty"
                    value={newStaff.specialty}
                    onChange={(e) => setNewStaff((p) => ({ ...p, specialty: e.target.value }))}
                    placeholder="e.g. Plumbing, Electrical"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAddStaff}>Add Staff Member</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search staff by name, email, or specialty..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((member) => (
            <Card key={member.id} className="relative">
              <CardContent className="space-y-4 pt-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {member.specialty}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>View Assignments</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleRemoveStaff(member.id)}
                      >
                        Remove Staff
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-3.5" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="size-3.5" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{member.rating > 0 ? member.rating : "New"}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {member.assignedRequests} tasks
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.availability ? (
                      <CheckCircle className="size-3.5 text-emerald-500" />
                    ) : (
                      <XCircle className="size-3.5 text-red-500" />
                    )}
                    <Switch
                      checked={member.availability}
                      onCheckedChange={() => handleToggleAvailability(member.id)}
                      aria-label={`Toggle availability for ${member.name}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-8 text-center text-muted-foreground">
              No staff members found matching your search.
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
