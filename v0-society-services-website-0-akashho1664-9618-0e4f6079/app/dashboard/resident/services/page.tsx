"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Shield, Wrench, Trees, Sparkles, SprayCanIcon, Zap, Bug, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageTransition } from "@/components/shared/page-transition"
import { services } from "@/lib/mock-data"
import { toast } from "sonner"

const iconMap: Record<string, React.ElementType> = {
  Shield, Wrench, Trees, Sparkles, SprayCanIcon, Zap, Bug, Wind,
}

const categories = ["All", ...new Set(services.map((s) => s.category))]

export default function ServicesPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = services.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === "All" || s.category === category
    return matchSearch && matchCat
  })

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Service Catalog</h1>
          <p className="text-muted-foreground">Browse and request facility services for your society.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((service, i) => {
            const Icon = iconMap[service.icon] || Shield
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <Card className="group h-full">
                  <CardContent className="flex h-full flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">{service.category}</Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="flex items-center justify-between border-t pt-3">
                      <p className="text-sm font-medium text-primary">
                        {"\u20B9"}{service.basePrice.toLocaleString("en-IN")}{service.priceUnit}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => toast.success(`Requested ${service.name}`, { description: "Your request has been submitted." })}
                      >
                        Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No services found matching your criteria.
          </div>
        )}
      </div>
    </PageTransition>
  )
}
