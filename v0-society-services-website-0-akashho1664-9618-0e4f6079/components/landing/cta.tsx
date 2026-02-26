"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/shared/page-transition"

export function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-6 py-16 text-center text-primary-foreground sm:px-12 lg:px-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            <div className="relative">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Transform Your Society?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-primary-foreground/80">
                Join 500+ societies that trust AB Group for their facility
                management needs. Get started in minutes.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="gap-2 px-6"
                  >
                    Request a Service <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <a href="#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/20 px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    Contact Sales
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
