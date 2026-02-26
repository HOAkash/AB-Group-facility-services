"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import {
  Shield,
  Wrench,
  Trees,
  Sparkles,
  SprayCanIcon,
  Zap,
  Bug,
  Wind,
} from "lucide-react"
import { services } from "@/lib/mock-data"
import { StaggerContainer, StaggerItem } from "@/components/shared/page-transition"

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Wrench,
  Trees,
  Sparkles,
  SprayCanIcon,
  Zap,
  Bug,
  Wind,
}

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const themeTokens = {
  dark: {
    sectionBg: "linear-gradient(135deg, #0d0b1e 0%, #12103a 50%, #0a1628 100%)",
    gridColor: "rgba(120,80,255,0.3)",
    sectionHeading: "#ffffff",
    sectionSubtext: "rgba(255,255,255,0.5)",

    cardBg: "#0d1b3e",
    // Strong dark overlay so text is readable over images
    cardOverlay: "linear-gradient(to bottom, rgba(10,15,40,0.55) 0%, rgba(10,15,40,0.3) 40%, rgba(10,15,40,0.88) 100%)",
    cardBorderHover: "rgba(0,200,255,0.3)",
    divider: "rgba(255,255,255,0.2)",

    logoIconBg: "#00aaff",
    logoText: "#ffffff",
    logoAccent: "#00ccff",

    headlineAccent: "#facc15",
    headlineBase: "#ffffff",
    headlineTextShadow: "2px 2px 0px rgba(0,0,0,0.7)",

    badgeLabel: "rgba(255,255,255,0.8)",
    badgeValue: "#ffdd00",
    badgeTextShadow: "1px 1px 0 rgba(0,0,0,0.4)",

    dividerColor: "rgba(255,255,255,0.2)",
    businessName: "#ffffff",
    businessAddress: "rgba(255,255,255,0.5)",
    callLabel: "#00ccff",
    callNumber: "rgba(255,255,255,0.6)",
    website: "rgba(255,255,255,0.4)",
    imgOpacity: 1,
  },
  light: {
    sectionBg: "linear-gradient(135deg, #f0f4ff 0%, #ebe8ff 50%, #f5f0ff 100%)",
    gridColor: "rgba(100,60,200,0.08)",
    sectionHeading: "#1e1b4b",
    sectionSubtext: "rgba(60,50,100,0.6)",

    cardBg: "#ffffff",
    // Light mode: just a subtle bottom-dark gradient so bottom text is legible
    // Images show fully, cards look clean like a modern service card
    cardOverlay: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.72) 100%)",
    cardBorderHover: "rgba(124,58,237,0.5)",
    divider: "rgba(255,255,255,0.35)",

    logoIconBg: "#7c3aed",
    logoText: "#ffffff",
    logoAccent: "#c4b5fd",

    headlineAccent: "#fbbf24",   // amber-400 — vivid on dark overlay area
    headlineBase: "#ffffff",     // white — bottom of card has dark overlay
    headlineTextShadow: "1px 1px 4px rgba(0,0,0,0.8)",

    badgeLabel: "rgba(255,255,255,0.9)",
    badgeValue: "#fde68a",
    badgeTextShadow: "1px 1px 0 rgba(0,0,0,0.5)",

    dividerColor: "rgba(255,255,255,0.3)",
    businessName: "#ffffff",
    businessAddress: "rgba(255,255,255,0.7)",
    callLabel: "#a78bfa",
    callNumber: "rgba(255,255,255,0.7)",
    website: "rgba(255,255,255,0.5)",
    imgOpacity: 1,   // full opacity — images look great without heavy overlay
  },
}

const cardVariants = [
  { headlineSize: "text-3xl", useAccent: true,  centered: false, showBadge: true  },
  { headlineSize: "text-2xl", useAccent: false, centered: true,  showBadge: true  },
  { headlineSize: "text-3xl", useAccent: true,  centered: false, showBadge: true  },
  { headlineSize: "text-xl",  useAccent: false, centered: false, showBadge: true  },
  { headlineSize: "text-3xl", useAccent: true,  centered: true,  showBadge: false },
  { headlineSize: "text-2xl", useAccent: true,  centered: false, showBadge: true  },
]

const adHeadlines: Record<string, string[]> = {
  s1: ["24/7", "SECURITY", "SERVICES"],
  s2: ["EXPERT", "PLUMBING", "SUPPORT"],
  s3: ["SMART", "GARDENING", "SOLUTIONS"],
  s4: ["PROFESSIONAL", "HOUSEKEEPING", "STAFF"],
  s5: ["DEEP", "CLEANING", "SERVICES"],
  s6: ["FAST", "ELECTRICAL", "REPAIRS"],
  s7: ["ADVANCED", "PEST", "CONTROL"],
  s8: ["HVAC", "MAINTENANCE", "&", "REPAIR"],
}

export function ServicesGrid() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const t = mounted && resolvedTheme === "light"
    ? themeTokens.light
    : themeTokens.dark

  return (
    <section
      id="services"
      className="py-20 lg:py-28 relative"
      style={{ background: t.sectionBg, transition: "background 0.5s ease" }}
    >
      {/* Subtle grid — same as Hero */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${t.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${t.gridColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              color: t.sectionHeading,
              transition: "color 0.5s ease",
            }}
          >
            Comprehensive Facility Services
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: t.sectionSubtext, transition: "color 0.5s ease" }}
          >
            Everything your society needs under one roof, managed by experts
            with a digital-first approach.
          </p>
        </div>

        {/* Grid */}
        <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Shield
            const variant = cardVariants[index % cardVariants.length]
            const headlines = adHeadlines[service.id] || [service.name.toUpperCase()]
            const headlineColor = variant.useAccent ? t.headlineAccent : t.headlineBase

            return (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <Card
                    className="group relative overflow-hidden border-0"
                    style={{
                      height: "260px",
                      background: t.cardBg,
                      borderRadius: "12px",
                      transition: "background 0.5s ease",
                    }}
                  >
                    {/* Background image — full opacity in both modes */}
                    <div className="absolute inset-0">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ opacity: t.imgOpacity }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={service.id === "s1"}
                      />
                    </div>

                    {/* Overlay — dark mode: mid tones; light mode: only bottom darkens */}
                    <div
                      className="absolute inset-0 z-10"
                      style={{ background: t.cardOverlay, transition: "background 0.5s ease" }}
                    />

                    {/* Logo top-left */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                      <div
                        className="flex size-6 items-center justify-center rounded-full shadow-md"
                        style={{ background: t.logoIconBg, transition: "background 0.5s ease" }}
                      >
                        <Icon className="size-3 text-white" />
                      </div>
                      <span
                        className="text-xs font-black tracking-tight leading-none drop-shadow-md"
                        style={{
                          color: t.logoText,
                          fontFamily: "'Arial Black', Impact, sans-serif",
                        }}
                      >
                        AB<span style={{ color: t.logoAccent, transition: "color 0.5s ease" }}>Group</span>
                        <br />
                        <span className="text-[8px] font-bold" style={{ color: t.logoAccent }}>
                          Facility.
                        </span>
                      </span>
                    </div>

                    {/* Card content */}
                    <CardContent className="relative z-20 flex h-full flex-col justify-between p-4 pt-12">

                      {/* Headline — in both modes rendered over dark area of image or overlay */}
                      <div className={`flex flex-col ${variant.centered ? "items-center text-center flex-1 justify-center" : ""}`}>
                        {headlines.map((line, i) => (
                          <div
                            key={i}
                            className={`font-black leading-none uppercase ${variant.headlineSize}`}
                            style={{
                              color: headlineColor,
                              fontFamily: "'Arial Black', Impact, 'Franklin Gothic Heavy', sans-serif",
                              letterSpacing: "-0.02em",
                              textShadow: t.headlineTextShadow,
                              transition: "color 0.5s ease",
                            }}
                          >
                            {line}
                          </div>
                        ))}
                      </div>

                      {/* Bottom info — sits on the darkened bottom gradient */}
                      <div className="mt-auto">
                        {variant.showBadge && (
                          <div className="flex items-baseline gap-1 mb-2">
                            <span
                              className="text-xs font-bold uppercase"
                              style={{
                                color: t.badgeLabel,
                                fontFamily: "Arial, sans-serif",
                                transition: "color 0.5s ease",
                              }}
                            >
                              Get First
                            </span>
                            <span
                              className="text-2xl font-black"
                              style={{
                                color: t.badgeValue,
                                fontFamily: "'Arial Black', Impact, sans-serif",
                                textShadow: t.badgeTextShadow,
                                transition: "color 0.5s ease",
                              }}
                            >
                              30% OFF
                            </span>
                          </div>
                        )}

                        <div
                          className="w-full h-px mb-2"
                          style={{ background: t.dividerColor, transition: "background 0.5s ease" }}
                        />

                        <div className="flex items-end justify-between">
                          <div>
                            <p
                              className="text-xs font-bold leading-tight"
                              style={{ color: t.businessName, fontFamily: "Arial, sans-serif" }}
                            >
                              AB Group Facility
                            </p>
                            <p
                              className="text-[10px] leading-tight"
                              style={{ color: t.businessAddress, fontFamily: "Arial, sans-serif" }}
                            >
                              No.23, Site No 98, Neeladri Road
                              <br />
                              Electronic City, Bangalore - 560100.
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className="text-xs font-bold"
                              style={{ color: t.callLabel, fontFamily: "Arial, sans-serif", transition: "color 0.5s ease" }}
                            >
                              Call Us
                            </p>
                            <p
                              className="text-[10px]"
                              style={{ color: t.callNumber, fontFamily: "Arial, sans-serif" }}
                            >
                              +91 9036954451
                            </p>
                          </div>
                        </div>

                        <p
                          className="mt-1 text-[9px]"
                          style={{ color: t.website, fontFamily: "Arial, sans-serif" }}
                        >
                          www.abgroupfmc.com
                        </p>
                      </div>
                    </CardContent>

                    {/* Hover border glow */}
                    <div
                      className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: `inset 0 0 0 2px ${t.cardBorderHover}`,
                        borderRadius: "12px",
                      }}
                    />
                  </Card>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}