"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  IndianRupee,
  ToggleLeft,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { services as initialServices } from "@/lib/mock-data"
import type { Service } from "@/lib/types"
import { toast } from "sonner"

export default function AdminServicesPage() {
  const [serviceList, setServiceList] = useState(initialServices)
  const [search, setSearch] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    category: "",
    basePrice: "",
    priceUnit: "/visit",
  })

  const filtered = serviceList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  )

  const active = serviceList.filter((s) => s.active).length

  function handleToggleActive(id: string) {
    setServiceList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    )
    toast.success("Service status updated")
  }

  function handleAddService() {
    if (!newService.name || !newService.category || !newService.basePrice) {
      toast.error("Please fill all required fields")
      return
    }
    const service: Service = {
      id: `s${Date.now()}`,
      name: newService.name,
      description: newService.description,
      category: newService.category,
      icon: "Wrench",
      basePrice: parseInt(newService.basePrice),
      priceUnit: newService.priceUnit,
      active: true,
    }
    setServiceList((prev) => [...prev, service])
    setNewService({ name: "", description: "", category: "", basePrice: "", priceUnit: "/visit" })
    setAddOpen(false)
    toast.success(`${service.name} added`)
  }

  function handleDeleteService(id: string) {
    setServiceList((prev) => prev.filter((s) => s.id !== id))
    toast.success("Service removed")
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Services Admin</h1>
            <p className="text-muted-foreground">
              {serviceList.length} services configured - {active} active
            </p>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 size-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Configure a new service offering.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="svc-name">Service Name *</Label>
                  <Input
                    id="svc-name"
                    value={newService.name}
                    onChange={(e) => setNewService((p) => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Carpentry"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="svc-desc">Description</Label>
                  <Textarea
                    id="svc-desc"
                    value={newService.description}
                    onChange={(e) => setNewService((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Describe the service..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="svc-cat">Category *</Label>
                    <Input
                      id="svc-cat"
                      value={newService.category}
                      onChange={(e) => setNewService((p) => ({ ...p, category: e.target.value }))}
                      placeholder="e.g. Maintenance"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="svc-price">Base Price *</Label>
                    <Input
                      id="svc-price"
                      type="number"
                      value={newService.basePrice}
                      onChange={(e) => setNewService((p) => ({ ...p, basePrice: e.target.value }))}
                      placeholder="500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="svc-unit">Price Unit</Label>
                  <Input
                    id="svc-unit"
                    value={newService.priceUnit}
                    onChange={(e) => setNewService((p) => ({ ...p, priceUnit: e.target.value }))}
                    placeholder="/visit, /month, /session"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button onClick={handleAddService}>Add Service</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden sm:table-cell">Description</TableHead>
                    <TableHead className="w-[80px] text-center">Active</TableHead>
                    <TableHead className="w-[50px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((svc) => (
                    <TableRow key={svc.id}>
                      <TableCell className="font-medium">{svc.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary">{svc.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-0.5">
                          <IndianRupee className="size-3 text-muted-foreground" />
                          <span className="font-medium">{svc.basePrice.toLocaleString("en-IN")}</span>
                          <span className="text-xs text-muted-foreground">{svc.priceUnit}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden max-w-[250px] truncate text-sm text-muted-foreground sm:table-cell">
                        {svc.description}
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={svc.active}
                          onCheckedChange={() => handleToggleActive(svc.id)}
                          aria-label={`Toggle ${svc.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Service</DropdownMenuItem>
                            <DropdownMenuItem>View Statistics</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteService(svc.id)}
                            >
                              Delete Service
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
