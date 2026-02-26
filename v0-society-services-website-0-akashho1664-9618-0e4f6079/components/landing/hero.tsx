"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Search } from "lucide-react"

const images = [
  "/images/bg1.jpg",
  "/images/bg2.jpg",
  "/images/bg3.jpg",
  "/images/bg4.jpg",
  "/images/bg5.jpg",
  "/images/bg6.jpg",
  "/images/bg7.jpg",
  "/images/bg8.jpg",
]

const highlights = [
  "24/7 Service Available",
  "Trusted Professionals",
  "Digital-First Platform",
]

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const themeTokens = {
  dark: {
    sectionBg: "linear-gradient(135deg, #0d0b1e 0%, #12103a 50%, #0a1628 100%)",
    gridColor: "rgba(120,80,255,0.3)",
    blob1: "#7c3aed",
    blob2: "#2563eb",
    orbGradient: "radial-gradient(circle at 35% 35%, #e0e0e0 0%, #a0a0a0 50%, #606060 100%)",
    orbShadow: "inset -4px -4px 12px rgba(0,0,0,0.4), 4px 4px 16px rgba(0,0,0,0.5)",
    panelChrome: "rgba(30,25,60,0.95)",
    panelUrlBg: "rgba(255,255,255,0.05)",
    panelUrlText: "rgba(255,255,255,0.4)",
    panelShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
    imgOverlay: "linear-gradient(135deg, rgba(0,80,160,0.2) 0%, rgba(80,0,180,0.15) 100%)",
    eyebrow: "rgba(255,255,255,0.5)",
    headlineBase: "#ffffff",
    headlineAccent1: "linear-gradient(90deg, #f59e0b, #f97316)",
    headlineAccent2: "linear-gradient(90deg, #a78bfa, #818cf8)",
    description: "rgba(255,255,255,0.5)",
    badgeText: "rgba(255,255,255,0.5)",
    btnOutlineBorder: "rgba(255,255,255,0.2)",
    btnOutlineColor: "#ffffff",
    dotActive: "#7c3aed",
    dotInactive: "rgba(255,255,255,0.2)",
  },
  light: {
    sectionBg: "linear-gradient(135deg, #f0f4ff 0%, #ebe8ff 50%, #f5f0ff 100%)",
    gridColor: "rgba(100,60,200,0.1)",
    blob1: "#c4b5fd",
    blob2: "#93c5fd",
    orbGradient: "radial-gradient(circle at 35% 35%, #ffffff 0%, #d4d4d4 50%, #9a9a9a 100%)",
    orbShadow: "inset -4px -4px 12px rgba(0,0,0,0.12), 4px 4px 16px rgba(0,0,0,0.18)",
    panelChrome: "rgba(245,243,255,0.97)",
    panelUrlBg: "rgba(0,0,0,0.05)",
    panelUrlText: "rgba(100,90,140,0.6)",
    panelShadow: "0 25px 60px rgba(100,80,200,0.15), 0 0 0 1px rgba(120,80,255,0.1)",
    imgOverlay: "linear-gradient(135deg, rgba(100,60,255,0.06) 0%, rgba(0,80,200,0.04) 100%)",
    eyebrow: "rgba(80,60,120,0.6)",
    headlineBase: "#1e1b4b",
    headlineAccent1: "linear-gradient(90deg, #d97706, #ea580c)",
    headlineAccent2: "linear-gradient(90deg, #7c3aed, #6366f1)",
    description: "rgba(60,50,100,0.6)",
    badgeText: "rgba(60,50,100,0.6)",
    btnOutlineBorder: "rgba(100,80,200,0.3)",
    btnOutlineColor: "#3730a3",
    dotActive: "#7c3aed",
    dotInactive: "rgba(0,0,0,0.15)",
  },
}

// ─── Panel layout config ──────────────────────────────────────────────────────
const panelConfig = [
  {
    rotate: "rotateY(-18deg) rotateX(4deg) translateZ(-80px) translateX(60px) translateY(-20px)",
    opacity: 0.7,
    zIndex: 1,
    width: "42%",
    top: "14%",
    right: "2%",
  },
  {
    rotate: "rotateY(-10deg) rotateX(2deg) translateZ(-30px) translateX(20px) translateY(10px)",
    opacity: 0.85,
    zIndex: 2,
    width: "44%",
    top: "20%",
    right: "8%",
  },
  {
    rotate: "rotateY(-3deg) rotateX(0deg) translateZ(0px)",
    opacity: 1,
    zIndex: 3,
    width: "46%",
    top: "26%",
    right: "14%",
  },
]

type Tokens = typeof themeTokens.dark

// ─── FloatingOrb ─────────────────────────────────────────────────────────────
function FloatingOrb({
  size,
  style,
  delay = 0,
  tokens,
}: {
  size: number
  style: React.CSSProperties
  delay?: number
  tokens: Tokens
}) {
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: tokens.orbGradient,
        boxShadow: tokens.orbShadow,
        ...style,
      }}
      animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    />
  )
}

// ─── ImagePanel ───────────────────────────────────────────────────────────────
function ImagePanel({
  panelIndex,
  currentIndex,
  totalImages,
  tokens,
}: {
  panelIndex: number
  currentIndex: number
  totalImages: number
  tokens: Tokens
}) {
  const cfg = panelConfig[panelIndex]
  const imgIndex = (currentIndex + panelIndex) % totalImages

  return (
    <motion.div
      className="absolute overflow-hidden rounded-2xl"
      style={{
        width: cfg.width,
        top: cfg.top,
        right: cfg.right,
        zIndex: cfg.zIndex,
        transform: `perspective(1200px) ${cfg.rotate}`,
        opacity: cfg.opacity,
        boxShadow: tokens.panelShadow,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: cfg.opacity, y: 0 }}
      transition={{ duration: 0.8, delay: panelIndex * 0.15 }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{ background: tokens.panelChrome }}
      >
        <div className="size-2.5 rounded-full bg-red-400" />
        <div className="size-2.5 rounded-full bg-yellow-400" />
        <div className="size-2.5 rounded-full bg-green-400" />
        <div
          className="ml-2 flex flex-1 items-center gap-1 rounded px-2 py-0.5 text-xs"
          style={{ background: tokens.panelUrlBg, color: tokens.panelUrlText }}
        >
          <Search className="size-2.5" />
          <span>abgroupfmc.com</span>
        </div>
      </div>

      {/* Sliding image */}
      <div className="relative" style={{ aspectRatio: "16/10" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={images[imgIndex]}
              alt={`Slide ${imgIndex + 1}`}
              fill
              className="object-cover"
              sizes="50vw"
              priority={panelIndex === 2 && imgIndex === 0}
            />
            <div className="absolute inset-0" style={{ background: tokens.imgOverlay }} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  // Avoid hydration flash — only read theme after mount
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const tokens = mounted && resolvedTheme === "light"
    ? themeTokens.light
    : themeTokens.dark

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: tokens.sectionBg,
        transition: "background 0.5s ease",
      }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${tokens.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${tokens.gridColor} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute rounded-full opacity-20 blur-3xl"
        style={{
          width: 500, height: 500,
          background: `radial-gradient(circle, ${tokens.blob1}, transparent)`,
          top: "10%", right: "30%",
          transition: "background 0.5s ease",
        }}
      />
      <div
        className="absolute rounded-full opacity-15 blur-3xl"
        style={{
          width: 350, height: 350,
          background: `radial-gradient(circle, ${tokens.blob2}, transparent)`,
          bottom: "15%", right: "10%",
          transition: "background 0.5s ease",
        }}
      />

      {/* Orbs */}
      <FloatingOrb tokens={tokens} size={90} style={{ top: "12%", right: "42%" }} delay={0} />
      <FloatingOrb tokens={tokens} size={60} style={{ top: "8%", right: "36%" }} delay={0.5} />
      <FloatingOrb tokens={tokens} size={40} style={{ top: "18%", right: "33%" }} delay={1} />
      <FloatingOrb tokens={tokens} size={75} style={{ bottom: "18%", right: "16%" }} delay={0.3} />
      <FloatingOrb tokens={tokens} size={50} style={{ bottom: "28%", right: "44%" }} delay={0.8} />
      <FloatingOrb tokens={tokens} size={35} style={{ bottom: "12%", right: "38%" }} delay={1.2} />

      {/* Right — panels */}
      <div className="absolute inset-0 hidden lg:block" style={{ pointerEvents: "none" }}>
        {[0, 1, 2].map((pi) => (
          <ImagePanel
            key={pi}
            panelIndex={pi}
            currentIndex={index}
            totalImages={images.length}
            tokens={tokens}
          />
        ))}
      </div>

      {/* Left — text */}
      <div className="relative z-10 flex h-full items-center px-6 lg:px-20">
        <div className="max-w-xl">

          <motion.p
            className="mb-4 text-sm font-medium tracking-wide"
            style={{ color: tokens.eyebrow, transition: "color 0.5s ease" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Introducing new technology
          </motion.p>

       <motion.h1
  className="text-5xl font-black leading-tight lg:text-6xl xl:text-7xl"
  style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, delay: 0.1 }}
>
  <span
    style={{
      color: tokens.headlineBase,
      WebkitTextFillColor: tokens.headlineBase,
      transition: "color 0.5s ease",
    }}
  >
    Premium{" "}
  </span>

  <span
    style={{
      display: "inline-block",
      backgroundImage: tokens.headlineAccent1,  // ← backgroundImage, not background
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
    }}
  >
    Facility
  </span>

  <br />

  <span
    style={{
      display: "inline-block",
      backgroundImage: tokens.headlineAccent2,  // ← backgroundImage, not background
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
    }}
  >
    Services
  </span>

  <span
    style={{
      color: tokens.headlineBase,
      WebkitTextFillColor: tokens.headlineBase,
      transition: "color 0.5s ease",
    }}
  >
    {" "}for
  </span>

  <br />

  <span
    className="text-4xl lg:text-5xl"
    style={{
      color: tokens.headlineBase,
      WebkitTextFillColor: tokens.headlineBase,
      transition: "color 0.5s ease",
    }}
  >
    Modern Societies
  </span>
</motion.h1>

          <motion.p
            className="mt-6 text-base leading-relaxed lg:text-lg"
            style={{ color: tokens.description, transition: "color 0.5s ease" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            From security to housekeeping, plumbing to pest control — end-to-end
            facility management that keeps your society running smoothly.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <Link href="/login">
              <Button
                size="lg"
                className="gap-2 px-8 font-bold"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                  border: "none",
                  color: "#ffffff",
                  boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
                }}
              >
                Get Started <ArrowRight className="size-4" />
              </Button>
            </Link>
            <a href="#services">
              <Button
                size="lg"
                variant="outline"
                className="px-8 font-bold"
                style={{
                  border: `1px solid ${tokens.btnOutlineBorder}`,
                  color: tokens.btnOutlineColor,
                  backdropFilter: "blur(8px)",
                  transition: "color 0.5s ease, border-color 0.5s ease",
                }}
              >
                Explore Services
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {highlights.map((h) => (
              <span
                key={h}
                className="flex items-center gap-1.5"
                style={{ color: tokens.badgeText, transition: "color 0.5s ease" }}
              >
                <CheckCircle2 className="size-4 text-emerald-400" />
                {h}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="rounded-full"
                style={{
                  width: i === index ? 24 : 8,
                  height: 8,
                  background: i === index ? tokens.dotActive : tokens.dotInactive,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}