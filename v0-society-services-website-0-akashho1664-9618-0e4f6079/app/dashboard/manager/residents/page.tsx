"use client"

import { useState } from "react"
import { Search, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PageTransition } from "@/components/shared/page-transition"
import { residents, serviceRequests } from "@/lib/mock-data"

const societyResidents = residents.filter((r) => r.society === "Sunrise Heights")

export default function ResidentsPage() {
  const [search, setSearch] = useState("")

  const filtered = societyResidents.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.flatNumber?.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resident Management</h1>
          <p className="text-muted-foreground">Manage residents of Sunrise Heights.</p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search residents..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Residents ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resident</TableHead>
                    <TableHead>Flat</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Active Requests</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => {
                    const activeReqs = serviceRequests.filter(
                      (sr) => sr.residentName === r.name && !["completed", "cancelled"].includes(sr.status)
                    ).length
                    return (
                      <TableRow key={r.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8">
                              <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                                {r.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{r.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{r.flatNumber}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Mail className="size-3" /> {r.email}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="size-3" /> {r.phone}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {activeReqs > 0 ? (
                            <Badge variant="default">{activeReqs}</Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{r.joinedDate}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
